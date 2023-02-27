<template>
  <v-container id="correct-name-options" class="pa-0 pr-4">
    <p class="info-text mb-5 pb-5 bottom-border" v-if="!isOneOption">
      You can {{ actionTxt || 'correct the company name' }} in one of the following ways:
    </p>

    <v-expansion-panels v-model="panel" class="bottom-border" accordion>
      <v-expansion-panel
        v-for="(item,i) in displayedOptions"
        class="mb-4"
        :id="`x-panel-${item.id}`"
        :key="i"
        :disabled="isOneOption"
        @click="identifyForm(item.id)"
      >
        <v-expansion-panel-header :class="{'name-options-header': isOneOption}">
          <span class="names-option-title">{{item.title}}</span>
          <template v-slot:actions>
            <v-icon color="primary">mdi-menu-down</v-icon>
          </template>
        </v-expansion-panel-header>

        <v-expansion-panel-content class="name-options-content pt-4">
          <div v-if="item.description" class="info-text mb-4" color="primary">{{item.description}}</div>
          <component
            :businessId="businessId"
            :companyName="companyName"
            :entityType="entityType"
            :fetchAndValidateNr="fetchAndValidateNr"
            :formType="formType"
            :is="item.component"
            :key="item.id"
            :nameRequest="nameRequest"
            :validate="validate"
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
        large color="primary"
        :loading="isLoading"
        @click="submitNameCorrection()"
      >
        <span>Done</span>
      </v-btn>

      <v-btn
        id="cancel-btn"
        large outlined color="primary"
        @click="emitCancel()"
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
import CorrectCompanyName from '@bcrs-shared-components/correct-name/CorrectCompanyName.vue'
import CorrectNameToNumber from '@bcrs-shared-components/correct-name/CorrectNameToNumber.vue'
import CorrectNameRequest from '@bcrs-shared-components/correct-name/CorrectNameRequest.vue'

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
    CorrectCompanyName,
    CorrectNameToNumber,
    CorrectNameRequest
  }
})
export default class CorrectName extends Vue {
  @Prop({ default: null }) readonly actionTxt!: string
  @Prop({ required: true }) readonly businessId!: string
  @Prop({ required: true }) readonly companyName!: string
  @Prop({ default: () => [] }) readonly correctionNameChoices!: Array<CorrectNameOptions>
  @Prop({ required: true }) readonly entityType!: CorpTypeCd
  @Prop({ required: true }) readonly fetchAndValidateNr!: () => Promise<NameRequestIF>
  @Prop({ required: true }) readonly formType!: CorrectNameOptions
  @Prop({ required: true }) readonly nameRequest!: NameRequestIF

  // local properties
  protected displayedOptions: Array<CorrectNameOptionIF> = []
  protected panel: number = null
  protected currentFormType: CorrectNameOptions = null
  protected isLoading = false
  protected isSubComponentValid = false
  protected validate = false // don't validate initially

  readonly correctionNameOptions: Array<CorrectNameOptionIF> = [
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
    }
  ]

  /** Called when component is mounted. */
  mounted (): void {
    // Filter the options to be displayed by what id's were passed from the parent component
    this.displayedOptions = this.correctionNameOptions.filter(
      option => this.correctionNameChoices.includes(option.id)
    )
    // open by default and assign id if only 1 option
    if (this.isOneOption) {
      this.panel = 0
      this.currentFormType = this.displayedOptions[0].id
    }
  }

  /** True if only one correction name choice is configured. */
  get isOneOption (): boolean {
    return (this.correctionNameChoices.length === 1)
  }

  /** When Done button is clicked, triggers form submission. */
  protected submitNameCorrection (): void {
    if (this.isSubComponentValid) {
      this.isLoading = true
      this.emitFormType(this.currentFormType)
      // disable validation for next time
      this.validate = false
    } else {
      // tell sub-component to validate
      this.validate = true
    }
  }

  /** When a panel is expanded, identifies the selected form. */
  protected identifyForm (type: CorrectNameOptions) {
    this.currentFormType = type
    this.isSubComponentValid = false
  }

  /** When Cancel button is clicked, informs parent that name correction is cancelled. */
  @Emit('cancel')
  protected emitCancel (): void {
    // first disable validation, then clear current panel
    this.validate = false
    this.panel = null
  }

  /** Inform parent that name correction process is done. */
  @Emit('saved')
  protected emitSaved (saved: boolean): boolean {
    this.isLoading = false
    this.emitFormType(null)
    if (saved) this.panel = null
    return saved
  }

  /** Inform parent of updated company name. */
  @Emit('update:companyName')
  private emitCompanyName (name: string): void {}

  /** Inform parent of updated form type. */
  @Emit('update:formType')
  private emitFormType (formType: CorrectNameOptions): void {}

  /** Inform parent of updated name request object. */
  @Emit('update:nameRequest')
  private emitNameRequest (nameRequest: NameRequestIF): void {}
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

.v-expansion-panel:not(:first-child) {
  padding-top: 1.25rem;
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
  padding: .25rem 0 0;
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

  .v-btn + .v-btn {
    margin-left: 0.5rem;
  }

  .v-btn {
    min-width: 6.5rem;
  }

  #done-btn[disabled] {
    color: white !important;
    background-color: $app-blue !important;
    opacity: 0.2;
  }
}
</style>
