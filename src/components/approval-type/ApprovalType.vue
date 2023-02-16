<template>
  <div id="approval-type">
    <v-row no-gutters>
      <v-col cols="12" sm="3" class="pr-4 pt-5">
        <label id="approval-type-label">Approval Type</label>
      </v-col>
      <v-col cols="12" sm="9">
        <v-radio-group class="payment-group" v-model="approvalTypeSelected" @change="radioButtonChanged">
          <!-- COURT ORDER radio button -->
          <v-radio id="court-order-radio" class="mb-0"
            :label="getRadioText(ApprovalTypes.VIA_COURT_ORDER)"
            :value="ApprovalTypes.VIA_COURT_ORDER"
          />
          <v-form ref="courtNumRef" id="court-num-form" v-model="valid" class="mt-4 ml-8">
            <v-expand-transition class="pb-0 mb-0">
              <v-text-field
                v-if="approvalTypeSelected === ApprovalTypes.VIA_COURT_ORDER"
                id="court-order-number-input"
                v-model="courtOrderNumber"
                label="Court Order Number"
                :rules="courtOrderNumRules"
                :disabled="approvalTypeSelected === ApprovalTypes.VIA_REGISTRAR"
                @input="courtOrderNumberChanged"
                @update:error="emitValidationError($event)"
                filled
              />
            </v-expand-transition>
          </v-form>
          <!-- REGISTRAR radio button -->
          <v-radio v-if="!isCourtOrderOnly"
            id="registrar-radio" class="mb-0 pt-2"
            :label="getRadioText(ApprovalTypes.VIA_REGISTRAR)"
            :value="ApprovalTypes.VIA_REGISTRAR"
          />
          <v-expand-transition>
            <v-card flat v-if="approvalTypeSelected === ApprovalTypes.VIA_REGISTRAR">
              <div class="ml-8 mt-3">
                <span class="v-label">Enter the date the Notice of the Application for Restoration was published in
                  <br/>
                  the BC Gazette:
                </span>
                <DatePicker
                class="mt-2"
                id="date-picker-notice"
                ref="noticeDateRef"
                title="Select Date"
                :nudgeRight="150"
                :initialValue="notice"
                :inputRules="datePickerRules"
                @emitDateSync="noticeDate($event)"
                />
              </div>
              <div class="ml-8">
                <span class="v-label">Enter the date the Application for Restoration was mailed to the company:</span>
                <DatePicker
                class="mt-2"
                id="date-picker-application"
                ref="applicationDateRef"
                title="Select Date"
                :nudgeRight="150"
                :initialValue="application"
                :inputRules="datePickerRules"
                @emitDateSync="applicationDate($event)"
                />
              </div>
            </v-card>
          </v-expand-transition>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
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

  ApprovalTypes = {
    VIA_COURT_ORDER: 'VIA COURT ORDER',
    VIA_REGISTRAR: 'VIA REGISTRAR'
  }

  /** Draft court order number. */
  @Prop({ default: '' }) readonly draftCourtOrderNumber!: string

  /** Whether approved by the registrar. */
  @Prop({ default: false }) readonly draftApprovedByRegistrar!: boolean

  /** filing name used in radio options. */
  @Prop({ default: 'restoration' }) readonly filingType!: string

  /** Show only the court order option; remove via registrar option. */
  @Prop({ default: false }) readonly isCourtOrderOnly!: boolean

  /** Draft notice date. */
  @Prop({ default: '' }) readonly notice!: string

  /** Draft application date. */
  @Prop({ default: '' }) readonly application!: string

  // Local properties
  private courtOrderNumber = ''
  private courtOrderNumRules = []
  private valid = false
  private approvalTypeSelected = ''
  private datePickerRules = []
  private noticeDateText = ''
  private applicationDateText = ''

  /** Called when component is mounted. */
  mounted (): void {
    this.setDateRules()
    this.setCourtNumberRules()
    // Copy props to mutable properties
    if (this.draftApprovedByRegistrar) {
      this.courtOrderNumber = ''
      this.approvalTypeSelected = this.ApprovalTypes.VIA_REGISTRAR
    } else if (this.draftCourtOrderNumber) {
      this.courtOrderNumber = this.draftCourtOrderNumber
      this.approvalTypeSelected = this.ApprovalTypes.VIA_COURT_ORDER
    } else {
      // Default state (no button selected)
      this.radioButtonChanged('')
    }
  }

  /** Triggers the form validation. */
  public validate (): boolean {
    if (this.approvalTypeSelected === this.ApprovalTypes.VIA_COURT_ORDER) {
      let status = this.$refs.courtNumRef.validate()
      this.$emit('emitValid', status)
      return status
    } else if (this.approvalTypeSelected === this.ApprovalTypes.VIA_REGISTRAR) {
      // Emit true (valid) if both dates were selected. Emit false (invalid) if at least one was empty.
      let status = (!!this.noticeDateText && !!this.applicationDateText)
      this.$emit('emitValid', status)
      return status
    } else {
      // Default state. Emit false (invalid).
      return false
    }
  }

  /** Validations rules for the date picker fields. */
  private setDateRules (): void {
    this.datePickerRules = [
      (v: string) => !!v || 'Date is required'
    ]
  }

  private emitValidationError (event: boolean): void {
    this.$emit('emitValid', !event)
  }

  // Emit the approval type (radio button selected).
  @Emit('emitRadioButtonChange')
  private radioButtonChanged (event: string): void {
    if (event === this.ApprovalTypes.VIA_REGISTRAR) {
      Vue.set(this, 'courtOrderNumber', '')
      Vue.set(this, 'courtOrderNumRules', [])
    } else if (event === this.ApprovalTypes.VIA_COURT_ORDER) {
      this.setCourtNumberRules()
      this.noticeDate('')
      this.applicationDate('')
      this.$emit('emitValid', false)
    } else {
      // Default State.
      this.$emit('emitValid', false)
    }
  }

  // Emit the court number.
  @Emit('emitCourtNumberChange')
  private courtOrderNumberChanged (event): void {
    this.validate()
  }

  private setCourtNumberRules (): void {
    // Apply TextField rules
    this.courtOrderNumRules = [
      (v: string) => (!v || !/^\s/g.test(v)) || 'Invalid spaces', // leading spaces
      (v: string) => (!v || !/\s$/g.test(v)) || 'Invalid spaces', // trailing spaces
      (v: string) => (!v || !(v.length < 5)) || 'Court order number is invalid',
      (v: string) => (!v || !(v.length > 20)) || 'Court order number is invalid',
      (v: string) => !!v || 'A Court Order number is required'
    ]
  }

  private getRadioText (option: string): string {
    if (option === this.ApprovalTypes.VIA_COURT_ORDER) {
      return `This ${this.filingType} is approved by court order.`
    } else if (option === this.ApprovalTypes.VIA_REGISTRAR) {
      return `This ${this.filingType} is approved by registrar.`
    }
    return '[error]'
  }

  /**
   * Emit the date the notice of the application for restoration was published in the BC Gazette.
   * Validate that a date was successfully selected.
   * @param event is the date that was selected (if any)
   */
  @Emit('emitNoticeDate')
  private noticeDate (event: string): string {
    this.noticeDateText = event
    this.validate()
    return event
  }

  /**
   * Emit the date the application for restoration was mailed to the company.
   * Validate that a date was successfully selected.
   * @param event is the date that was selected (if any)
   */
  @Emit('emitApplicationDate')
  private applicationDate (event: string): string {
    this.applicationDateText = event
    this.validate()
    return event
  }

  /* Set court order number to empty if approved by registrar option is selected. */
 @Watch('courtOrderNumber')
  private setCourtOrderNumber () {
    // When going from valid to invalid (boundaries), the form's validity doesn't update immediately.
    if (this.courtOrderNumber.length === 4 || this.courtOrderNumber.length > 20) {
      this.valid = false
    } else if (this.courtOrderNumber.length === 5 || this.courtOrderNumber.length === 20) {
      this.valid = true
    }
    if (this.approvalTypeSelected === this.ApprovalTypes.VIA_REGISTRAR || this.valid === false) {
      this.courtOrderNumberChanged('')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

:deep() {
  .v-card__actions {
    justify-content: flex-end;
  }

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
