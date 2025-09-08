<template>
  <v-container
    id="correct-name-options"
    class="pa-0 pr-4"
  >
    <p
      v-if="!isOneOption"
      class="info-text mb-0 pb-5 bottom-border"
    >
      You can {{ actionTxt || 'correct the company name' }} in one of the following ways:
    </p>

    <v-expansion-panels
      v-model="panel"
      class="bottom-border"
      accordion
    >
      <v-expansion-panel
        v-for="(item,i) in displayedOptions"
        :id="`x-panel-${item.id}`"
        :key="i"
        class="py-4"
        :disabled="isOneOption"
        @click="identifyForm(item.id)"
      >
        <v-expansion-panel-header :class="{'name-options-header': isOneOption}">
          <span class="names-option-title">{{ item.title }}</span>
          <template #actions>
            <v-icon color="primary">
              mdi-menu-down
            </v-icon>
          </template>
        </v-expansion-panel-header>

        <v-expansion-panel-content class="name-options-content py-4">
          <div
            v-if="item.description"
            class="info-text pb-6"
            color="primary"
          >
            {{ item.description }}
          </div>
          <component
            :is="item.component"
            :key="item.id"
            :amalgamatingBusinesses="amalgamatingBusinesses"
            :businessId="businessId"
            :companyName="companyName"
            :entityType="entityType"
            :fetchAndValidateNr="fetchAndValidateNr"
            :formType="formType"
            :nameRequest="nameRequest"
            :validate="validate"
            @error="emitError($event)"
            @saved="emitSaved($event)"
            @update:nameRequest="emitNameRequest($event)"
            @update:companyName="emitCompanyName($event)"
            @valid="isSubComponentValid = $event"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="action-btns">
      <v-btn
        id="done-btn"
        large
        color="primary"
        :loading="isLoading"
        @click="onDoneClicked()"
      >
        <span>Done</span>
      </v-btn>

      <v-btn
        id="cancel-btn"
        large
        outlined
        color="primary"
        @click="onCancelClicked()"
      >
        <span>Cancel</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { NameRequestIF } from '@bcrs-shared-components/interfaces'
import { CorrectNameOptions } from '@bcrs-shared-components/enums'
import { CorpTypeCd } from '@bcrs-shared-components/corp-type-module'
import CorrectAmlAdopt from './CorrectAmlAdopt.vue'
import CorrectAmlNumbered from './CorrectAmlNumbered.vue'
import CorrectCompanyName from './CorrectCompanyName.vue'
import CorrectNameToNumber from './CorrectNameToNumber.vue'
import CorrectNameRequest from './CorrectNameRequest.vue'
import CorrectNameRequestStaff from './CorrectNameRequestStaff.vue'

interface CorrectNameOptionIF {
  id: CorrectNameOptions,
  title: string,
  description?: string,
  component: any
}

/**
 * Operation:
 * 1. To initialize this component option list, pass in an array of id's of the components you want to display.
 *    I.e., ['correct-new-nr', 'correct-name', 'correct-name-to-number']
 * 2. If this options list is only passed one value the option panel will be open by default.
 * 3. The parent component will have to watch for the 'save' and 'cancel' events and handle them accordingly.
 */
@Component({
  components: {
    CorrectAmlAdopt,
    CorrectAmlNumbered,
    CorrectCompanyName,
    CorrectNameToNumber,
    CorrectNameRequest,
    CorrectNameRequestStaff
  }
})
export default class CorrectName extends Vue {
  @Prop({ default: null }) readonly actionTxt!: string
  @Prop({ default: () => [] }) readonly amalgamatingBusinesses!: any[]
  @Prop({ required: true }) readonly businessId!: string
  @Prop({ required: true }) readonly companyName!: string
  @Prop({ default: () => [] }) readonly correctionNameChoices!: Array<CorrectNameOptions>
  @Prop({ required: true }) readonly entityType!: CorpTypeCd
  @Prop({ required: true }) readonly fetchAndValidateNr!: () => Promise<NameRequestIF>
  @Prop({ required: true }) readonly formType!: CorrectNameOptions
  @Prop({ required: true }) readonly nameRequest!: NameRequestIF

  // local properties
  displayedOptions: Array<CorrectNameOptionIF> = []
  panel: number = null
  currentFormType: CorrectNameOptions = null
  isLoading = false // for button animation
  isSubComponentValid = false
  validate = false // don't validate initially

  readonly correctionNameOptions: Array<CorrectNameOptionIF> = [
    {
      id: CorrectNameOptions.CORRECT_AML_ADOPT,
      title: 'Adopt from one of the amalgamating businesses',
      description: null, // 'You can choose the name of the resulting business in one of the following ways:',
      component: CorrectAmlAdopt
    },
    {
      id: CorrectNameOptions.CORRECT_NAME,
      title: 'Edit the company name',
      description: 'Correct typographical errors in the existing company name.',
      component: CorrectCompanyName
    },
    {
      id: CorrectNameOptions.CORRECT_NAME_TO_NUMBER,
      title: 'Use the incorporation number as the name',
      description: null,
      component: CorrectNameToNumber
    },
    {
      id: CorrectNameOptions.CORRECT_NEW_NR,
      title: 'Use a new name request number',
      description: 'Enter the new Name Request Number (e.g., NR 1234567) and either the applicant phone number ' +
        'OR the applicant email that was used when the name was requested.',
      component: CorrectNameRequest
    },
    {
      id: CorrectNameOptions.CORRECT_AML_NUMBERED,
      title: 'Use the new incorporation number as the name',
      description: null,
      component: CorrectAmlNumbered
    },
    {
      id: CorrectNameOptions.CORRECT_NEW_NR_STAFF,
      title: 'Use a new name request number',
      description: null,
      component: CorrectNameRequestStaff
    }
  ]

  /** True if only one correction name choice is configured. */
  get isOneOption (): boolean {
    return (this.correctionNameChoices.length === 1)
  }

  /** Called when component is mounted. */
  mounted (): void {
    // filter the options to be displayed by which ids were passed from the parent component
    this.displayedOptions = this.correctionNameOptions.filter(
      option => this.correctionNameChoices.includes(option.id)
    )
    // open by default and assign id if only 1 option
    if (this.isOneOption) {
      this.panel = 0
      this.currentFormType = this.displayedOptions[0].id
    }
  }

  /** When Done button is clicked, triggers form submission. */
  onDoneClicked (): void {
    if (this.isSubComponentValid) {
      this.isLoading = true
      // inform parent of new form type
      // this should come back to us as an updated formType prop
      this.emitFormType(this.currentFormType)
      // disable validation for next time
      this.validate = false
    } else {
      // tell sub-component to validate
      // (user will have to click Done again with valid once sub-component)
      this.validate = true
    }
  }

  /** When a panel is expanded, identifies the selected form. */
  identifyForm (type: CorrectNameOptions) {
    this.currentFormType = type
    this.isSubComponentValid = false
  }

  /** When Cancel button is clicked, informs parent that name correction is cancelled. */
  @Emit('cancel')
  onCancelClicked (): void {
    // first disable validation, then clear current panel
    this.validate = false
    this.panel = null
  }

  /** Inform parent of error. */
  @Emit('error')
  // eslint-disable-next-line handle-callback-err
  emitError (error: string): void {}

  /** Inform parent that name correction process is done. */
  @Emit('saved')
  emitSaved (saved: boolean): boolean {
    this.isLoading = false
    this.emitFormType(null)
    if (saved) this.panel = null
    return saved
  }

  /** Inform parent of updated company name. */
  @Emit('update:companyName')
  emitCompanyName (name: string): void {}

  /** Inform parent of updated form type. */
  @Emit('update:formType')
  emitFormType (formType: CorrectNameOptions): void {}

  /** Inform parent of updated name request object. */
  @Emit('update:nameRequest')
  emitNameRequest (nameRequest: NameRequestIF): void {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.name-options-header {
  align-items: start;
}

.bottom-border {
  border-color: rgba(0, 0, 0, 0.1) !important;
  border-bottom: 1px solid;
}

.names-option-title {
  font-size: 1rem;
  color: $app-blue;
}

.v-expansion-panel-content {
  :deep(.v-expansion-panel-content__wrap) {
    padding: 0;
  }
}

.v-expansion-panel-header {
  padding: 0;
  color: $app-blue;
}

.v-expansion-panel--active > .v-expansion-panel-header {
  font-weight: bold;
  min-height: 3rem;

  .names-option-title {
    color: $gray9 !important;
  }
}

.action-btns {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;

  .v-btn {
    min-width: 6.5rem;
  }

  #done-btn[disabled] {
    color: white !important;
    background-color: $app-blue !important;
    opacity: 0.2;
  }

  #cancel-btn {
    margin-left: 0.5rem;
  }
}
</style>
