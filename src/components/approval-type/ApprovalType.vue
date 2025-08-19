<template>
  <div
    id="approval-type"
    :class="{ 'invalid-section': invalidSection }"
  >
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="3"
        class="pr-4"
      >
        <label :class="{ 'error-text': invalidSection }">Approval Type</label>
      </v-col>

      <v-col
        cols="12"
        sm="9"
        class="mb-n5"
      >
        <v-radio-group
          class="mt-0"
          :value="approvalTypeSelected"
          @change="setApprovalTypeSelected($event)"
        >
          <!-- court order section -->
          <v-radio
            v-if="isCourtOrderRadio"
            id="court-order-radio"
            :label="getRadioText(ApprovalTypes.VIA_COURT_ORDER)"
            :value="ApprovalTypes.VIA_COURT_ORDER"
          />
          <span
            v-else
            class="v-label"
          >
            {{ getRadioText(ApprovalTypes.VIA_COURT_ORDER) }}
          </span>
          <v-expand-transition>
            <v-form
              v-if="approvalTypeSelected === ApprovalTypes.VIA_COURT_ORDER"
              ref="courtNumRef"
            >
              <v-text-field
                id="court-order-number-input"
                class="ml-8 mt-2"
                label="Court Order Number"
                :value="courtOrderNumberText"
                :rules="validate ? courtOrderNumRules : []"
                hide-details="auto"
                filled
                @input="setCourtOrderNumberText($event)"
              />
            </v-form>
          </v-expand-transition>

          <!-- registrar section -->
          <v-radio
            v-if="isCourtOrderRadio"
            id="registrar-radio"
            class="mt-4"
            :label="getRadioText(ApprovalTypes.VIA_REGISTRAR)"
            :value="ApprovalTypes.VIA_REGISTRAR"
          />
          <v-expand-transition>
            <div v-if="approvalTypeSelected === ApprovalTypes.VIA_REGISTRAR">
              <div class="ml-8 mt-2">
                <span class="v-label">Enter the date the Notice of the Application for Restoration was published in
                  the BC Gazette:
                </span>
                <DatePicker
                  id="date-picker-notice"
                  class="mt-2"
                  title="Select Date"
                  :nudgeRight="150"
                  :initialValue="noticeDateText"
                  :errorMsg="noticeDateErrorMsg"
                  @emitDateSync="setNoticeDateText($event)"
                />
              </div>
              <div class="ml-8 mt-5">
                <span class="v-label">Enter the date the applicant has mailed the Notice of the Application for 
                  Restoration to the company and director(s):</span>
                <DatePicker
                  id="date-picker-application"
                  class="mt-2"
                  title="Select Date"
                  :nudgeRight="150"
                  :initialValue="applicationDateText"
                  :errorMsg="applicationDateErrorMsg"
                  @emitDateSync="setApplicationDateText($event)"
                />
              </div>
            </div>
          </v-expand-transition>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { ApprovalTypes } from '@bcrs-shared-components/enums'
import { FormIF } from '@bcrs-shared-components/interfaces'
import { DatePicker } from '@bcrs-shared-components/date-picker'

@Component({
  components: {
    DatePicker
  }
})
export default class ApprovalType extends Vue {
  // Refs
  $refs!: Vue['$refs'] & {
    courtNumRef: FormIF
  }

  /**
   * The initial court order number.
   * Is only read when the component is mounted.
   */
  @Prop({ default: '' }) readonly courtOrderNumber!: string

  /** Whether restoration was approved by the registrar. */
  @Prop({ default: false }) readonly approvedByRegistrar!: boolean

  /** Whether restoration was approved by court order. */
  @Prop({ default: false }) readonly approvedByCourtOrder!: boolean

  /** Filing name used in radio options. */
  @Prop({ default: 'restoration' }) readonly filingType!: string

  /**
   * The initial date the notice of the application for restoration was published in the BC Gazette.
   * Is only read when the component is mounted.
   */
  @Prop({ default: '' }) readonly noticeDate!: string

  /**
   * The initial date the application for restoration was mailed to the company.
   * Is only read when the component is mounted.
   */
  @Prop({ default: '' }) readonly applicationDate!: string

  /** Whether this section is invalid. */
  @Prop({ default: false }) readonly invalidSection!: boolean

  /** Whether to show the court order radio button. */
  @Prop({ default: true }) readonly isCourtOrderRadio!: boolean

  /** Whether validation is enabled. */
  @Prop({ default: false }) readonly validate!: boolean

  // Local properties
  private approvalTypeSelected = null as ApprovalTypes
  private courtOrderNumberText = ''
  private noticeDateText = ''
  private applicationDateText = ''

  // For template
  readonly ApprovalTypes = ApprovalTypes

  /** Text field rules. */
  readonly courtOrderNumRules = [
    (v: string) => (!v || !/^\s/g.test(v)) || 'Invalid spaces', // leading spaces
    (v: string) => (!v || !/\s$/g.test(v)) || 'Invalid spaces', // trailing spaces
    (v: string) => (!v || !(v.length < 5)) || 'Court order number is too short',
    (v: string) => (!v || !(v.length > 20)) || 'Court order number is too long',
    (v: string) => !!v || 'A Court Order number is required'
  ]

  get noticeDateErrorMsg (): string {
    return (this.validate && !this.noticeDateText) ? 'Date is required' : null
  }

  get applicationDateErrorMsg (): string {
    return (this.validate && !this.applicationDateText) ? 'Date is required' : null
  }

  /** Called when component is mounted. */
  mounted (): void {
    // copy props to mutable properties
    if (this.approvedByRegistrar) {
      // first set approval type, then set values
      // otherwise, validation will fail
      this.setApprovalTypeSelected(ApprovalTypes.VIA_REGISTRAR)
      this.setNoticeDateText(this.noticeDate)
      this.setApplicationDateText(this.applicationDate)
    } else if (this.approvedByCourtOrder) {
      // first set approval type, then set values
      // otherwise, validation will fail
      this.setApprovalTypeSelected(ApprovalTypes.VIA_COURT_ORDER)
      this.setCourtOrderNumberText(this.courtOrderNumber)
    }
  }

  /** When validate flag is set, validates the component. */
  @Watch('validate')
  private async onValidateChanged (validate: boolean): Promise<void> {
    if (validate) {
      // wait for rules to get processed before validating
      await Vue.nextTick()
      this.validateComponent()
    }
  }

  /** Validates the component and emits the validity. */
  @Emit('valid')
  private validateComponent (): boolean {
    let valid = true
    if (this.approvalTypeSelected === ApprovalTypes.VIA_COURT_ORDER) {
      valid = this.$refs.courtNumRef?.validate()
    } else if (this.approvalTypeSelected === ApprovalTypes.VIA_REGISTRAR) {
      // Valid if validation flag is not set.
      // Valid if both dates are selected.
      valid = !this.validate || (!!this.noticeDateText && !!this.applicationDateText)
    } else {
      // no type selected (invalid)
      valid = false
    }
    return valid
  }

  /** Sets Approval Type property, clears old data and emits the new value. */
  @Emit('approvalTypeChange')
  private async setApprovalTypeSelected (approvalTypeSelected: ApprovalTypes): Promise<void> {
    this.approvalTypeSelected = approvalTypeSelected

    // wait for rules to get processed before validating
    await Vue.nextTick()

    // clear old data
    if (approvalTypeSelected === ApprovalTypes.VIA_REGISTRAR) {
      this.setCourtOrderNumberText('')
    } else if (approvalTypeSelected === ApprovalTypes.VIA_COURT_ORDER) {
      this.setNoticeDateText('')
      this.setApplicationDateText('')
    }
  }

  /** Sets Court Order Number property, validates the component and emits the new value. */
  @Emit('courtNumberChange')
  setCourtOrderNumberText (courtOrderNumberText: string): void {
    this.courtOrderNumberText = courtOrderNumberText
    this.validateComponent()
  }

  /** Returns the radio button text. */
  private getRadioText (option: string): string {
    if (option === ApprovalTypes.VIA_COURT_ORDER && this.isCourtOrderRadio) {
      return `This ${this.filingType} is approved by court order.`
    } else if (option === ApprovalTypes.VIA_COURT_ORDER && !this.isCourtOrderRadio) {
      return `Enter a Court Order number, as the restoration of this company was ordered by the court:`
    }
    if (option === ApprovalTypes.VIA_REGISTRAR) {
      return `This ${this.filingType} is approved by registrar.`
    }
    return '[unknown]' // should never happen
  }

  /** Sets Notice Date property, validates the component and emits the new value. */
  @Emit('update:noticeDate')
  private setNoticeDateText (noticeDateText: string): void {
    this.noticeDateText = noticeDateText
    this.validateComponent()
  }

  /** Sets Application Date property, validates the component and emits the new value. */
  @Emit('update:applicationDate')
  private setApplicationDateText (applicationDateText: string): void {
    this.applicationDateText = applicationDateText
    this.validateComponent()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

label {
  font-weight: bold;
}

:deep() {
  .v-input .v-label {
    font-weight: normal;
    color: $gray7;
  }

  .theme--light.v-input input {
    font-weight: normal;
    color: $gray7;
  }
}
</style>
