<template>
  <div id="business-lookup">
    <div v-if="state !== States.SUMMARY">
      <v-autocomplete
        v-model="selectedBusiness"
        autofocus
        filled
        no-filter
        append-icon=""
        return-object
        autocomplete="chrome-off"
        menu-props="{ maxHeight: 380 }"
        item-text="identifier"
        :label="label"
        :hint="hint"
        :placeholder="placeholder"
        :name="Math.random()"
        :rules="showErrors ? businessLookupRules: []"
        :items="searchResults"
        :loading="state == States.SEARCHING"
        :hide-no-data="state != States.NO_RESULTS"
        @update:search-input="onSearchInput($event)"
      >
        <!-- Empty selection slot will stop re-triggering of search-input event -->
        <template #selection="" />

        <template #no-data>
          <v-list-item>
            <div>No matches found.</div>
          </v-list-item>
        </template>

        <template #item="{ item }">
          <v-row class="business-lookup-result pt-1">
            <v-col cols="2">
              <div class="result-identifier">
                {{ item.identifier }}
              </div>
            </v-col>
            <v-col cols="10">
              <div class="result-name">
                {{ item.name }}
              </div>
              <div class="result-bn">
                {{ item.bn }}
              </div>
            </v-col>
          </v-row>
        </template>
      </v-autocomplete>
    </div>

    <div
      v-if="state === States.SUMMARY && haveBusiness"
      class="summary-block"
    >
      <v-row no-gutters>
        <v-col cols="10">
          <v-row no-gutters>
            <v-col cols="12">
              <div
                v-if="editableBusinessName"
                class="d-flex align-center"
              >
                <label>Business or Corporation Name:</label>
                <v-text-field
                  id="organization-name"
                  dense
                  filled
                  hide-details="auto"
                  class="mx-4 mr-md-0"
                  :rules="businessNameRules"
                  :value="businessName"
                  @input="setBusinessName($event)"
                />
              </div>
              <template v-else>
                <label>Name: </label>
                <span>{{ businessName }}</span>
              </template>
            </v-col>
          </v-row>

          <v-row
            no-gutters
            class="mt-1"
          >
            <v-col cols="12">
              <label>Incorporation Number: </label>
              <span>{{ identifier }}</span>
            </v-col>
          </v-row>

          <v-row
            no-gutters
            class="mt-1"
          >
            <v-col cols="12">
              <label>Business Number: </label>
              <span>{{ businessNumber }}</span>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="2">
          <div id="bl-more-actions">
            <v-btn
              id="bl-undo-btn"
              text
              color="primary"
              @click="emitUndo()"
            >
              <v-icon small>
                mdi-undo
              </v-icon>
              <span>Undo</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { debounce } from 'lodash'
import { BusinessLookupIF, BusinessLookupResultIF } from '@/interfaces'

enum States {
  INITIAL = 'initial',
  SEARCHING = 'searching',
  SHOW_RESULTS = 'show results',
  NO_RESULTS = 'no results',
  SUMMARY = 'summary'
}

@Component({})
export default class BusinessLookup extends Vue {
  /** Whether to show errors. */
  @Prop({ required: true }) readonly showErrors!: boolean

  /** The BusinessLookup object. */
  @Prop({ required: true }) readonly businessLookup!: BusinessLookupIF

  /** Class for BusinessLookup services. */
  @Prop({ required: true }) readonly BusinessLookupServices!: any

  /** Whether to display Change features. */
  @Prop({ default: false }) readonly hasBusinessLookupChanges!: boolean

  /** Whether to allow editing of business name. */
  @Prop({ default: false }) readonly editableBusinessName!: boolean

  /** Business status to search for (eg, ACTIVE or HISTORICAL or '' to match all. */
  @Prop({ default: 'ACTIVE' }) readonly searchStatus!: string

  /** Label for BusinessLookup component. */
  @Prop({ default: 'Business or Corporation Name or Incorporation Number' }) readonly label!: string

  /** Hint for BusinessLookup component. */
  @Prop({ default: null }) readonly hint!: string

  /** Placeholder for BusinessLookup component. */
  @Prop({ default: null }) readonly placeholder!: string

  /** BusinessLookup legal types to search for. */
  @Prop({ default: 'BC,A,ULC,C,S,XP,GP,LP,CUL,XS,LLC,LL,BEN,CP,CC,XL,FI,XCP,PA' }) readonly legalTypes!: string

  // enum for template
  readonly States = States

  // local variables
  state = States.INITIAL
  searchResults: Array<BusinessLookupResultIF> = []
  selectedBusiness: BusinessLookupResultIF = null

  /** The business lookup validation rules. */
  readonly businessLookupRules: Array<(v) => boolean | string> = [
    v => !!v || 'Business is required'
  ]

  /** The business name validation rules. */
  readonly businessNameRules: Array<(v) => boolean | string> = [
    (v: string) => !!v?.trim() || 'Business or corporation name is required',
    (v: string) => (v?.length <= 150) || 'Cannot exceed 150 characters' // maximum character count
  ]

  /** The identifier. */
  get identifier (): string {
    return this.businessLookup.identifier
  }

  /** The business name. */
  get businessName (): string {
    return this.businessLookup.name
  }

  /** The business number. */
  get businessNumber (): string {
    return this.businessLookup.bn || ''
  }

  /** Whether we have stored business data. */
  get haveBusiness (): boolean {
    // allow empty business name if editable
    return (!!this.identifier && (!!this.businessName || this.editableBusinessName))
  }

  /** Whether this form is valid. */
  get isFormValid (): boolean {
    return (this.haveBusiness && this.state === States.SUMMARY)
  }

  /** Sets the business name. */
  setBusinessName (val: string): void {
    const name = val?.trim()
    this.onSelectedBusiness({ ...this.businessLookup, name } as any)
  }

  /**
   * Called when Search Input has been updated.
   * This method is debounced to prevent excessive calls to the API.
   */
  onSearchInput (searchInput: string) {
    this.onSearchInputDebounced(this, searchInput)
  }

  private onSearchInputDebounced = debounce(async (that: this, searchInput: string) => {
    // safety check
    if (searchInput?.length > 2) {
      that.state = States.SEARCHING
      that.searchResults =
        await that.BusinessLookupServices.search(searchInput, that.searchStatus, that.legalTypes).catch(() => [])
      // display appropriate section
      that.state = (that.searchResults.length > 0) ? States.SHOW_RESULTS : States.NO_RESULTS
    } else {
      that.searchResults = []
      that.state = States.INITIAL
    }
  }, 600)

  /** Called when selectedBusiness property has changed. */
  @Watch('selectedBusiness')
  private onSelectedBusiness (result: BusinessLookupResultIF): void {
    // safety check
    if (result) {
      this.setBusiness(result)
      this.selectedBusiness = null
    }
  }

  /** Called when haveBusiness property (which is based on this component's props) has changed. */
  @Watch('haveBusiness', { immediate: true })
  private onHaveBusinessChanged (val: boolean): void {
    this.state = val ? States.SUMMARY : States.INITIAL
  }

  /** Called when this form's validity has changed. */
  @Watch('isFormValid')
  private onIsFormValidChanged (val: boolean): void {
    this.emitValid(val)
  }

  /** Emits event to update the Business object. */
  @Emit('setBusiness')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private setBusiness (val: BusinessLookupResultIF): void {}

  /** Emits event to undo the selected business. */
  @Emit('undoBusiness')
  emitUndo (): void {}

  /** Emits event to update this component's validity. */
  @Emit('valid')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private emitValid (val: boolean): void {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.v-icon.mdi-open-in-new {
  margin-top: -2px;
  padding-left: 2px;
}

.business-lookup-result {
  font-size: $px-14;
  color: $gray7;

  &:hover {
    background-color: $gray1;
    color: $app-blue;
  }
}

.result-identifier,
.result-name {
  cursor: pointer;
  font-size: $px-16;
}

#bl-more-actions {
  margin-right: -14px;
  white-space: nowrap;

  #bl-undo-btn {
    min-width: unset;
    float: right;
  }
}

.summary-block {
  label {
    font-weight: bold;
    color: $gray9;
  }
}

// Vuetify overrides
:deep() {
  .v-text-field .v-label {
    font-weight: normal;
  }
}
</style>
