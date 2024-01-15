<template>
  <div id="staff-payment-container">
    <v-row no-gutters>
      <v-col
        v-if="displaySideLabel"
        cols="12"
        sm="3"
        class="pr-4 pb-4"
      >
        <label
          class="title-label"
          :class="{'error-text': invalidSection}"
        >Payment</label>
      </v-col>

      <v-col
        cols="12"
        :sm="displaySideLabel ? 9 : 12"
      >
        <v-radio-group
          v-model="staffPaymentData.option"
          class="payment-group"
        >
          <!-- Cash or Cheque radio button and form -->
          <v-radio
            id="fas-radio"
            class="mb-0"
            label="Cash or Cheque"
            color="primary"
            :value="StaffPaymentOptions.FAS"
          />
          <v-form
            ref="fasForm"
            v-model="fasFormValid"
            class="mt-4 ml-8"
          >
            <v-text-field
              id="routing-slip-number-textfield"
              v-model="staffPaymentData.routingSlipNumber"
              variant="filled"
              label="Routing Slip Number"
              :rules="validate ? routingSlipNumberRules : []"
              :disabled="fasFormInputDisabled"
              @keyup="staffPaymentData.routingSlipNumber = staffPaymentData.routingSlipNumber.trim()"
              @focus="staffPaymentData.option = StaffPaymentOptions.FAS"
            />
          </v-form>

          <!-- BC Online radio button and form -->
          <v-radio
            id="bcol-radio"
            class="mb-0 pt-2"
            label="BC Online"
            color="primary"
            :value="StaffPaymentOptions.BCOL"
          />
          <v-form
            ref="bcolForm"
            v-model="bcolFormValid"
            class="mt-4 ml-8"
          >
            <v-text-field
              id="bcol-account-number-textfield"
              v-model="staffPaymentData.bcolAccountNumber"
              variant="filled"
              label="BC Online Account Number"
              :rules="validate ? bcolAccountNumberRules : []"
              :disabled="bcolFormInputDisabled"
              @keyup="staffPaymentData.bcolAccountNumber = staffPaymentData.bcolAccountNumber.trim()"
              @focus="staffPaymentData.option = StaffPaymentOptions.BCOL"
            />
            <v-text-field
              id="dat-number-textfield"
              v-model="staffPaymentData.datNumber"
              variant="filled"
              label="DAT Number"
              :rules="validate ? datNumberRules : []"
              :disabled="bcolFormInputDisabled"
              @keyup="staffPaymentData.datNumber = staffPaymentData.datNumber.trim()"
              @focus="staffPaymentData.option = StaffPaymentOptions.BCOL"
            />
            <FolioNumberInput
              ref="folioNumberInputRef"
              :folioNumber="staffPaymentData.folioNumber"
              :disabled="bcolFormInputDisabled"
              validate="true"
              @focus="staffPaymentData.option = StaffPaymentOptions.BCOL"
              @emitFolioNumber="staffPaymentData.folioNumber = $event"
            />
          </v-form>

          <!-- No Fee radio button -->
          <v-radio
            id="no-fee-radio"
            class="mb-0 pt-2"
            label="No Fee"
            color="primary"
            :value="StaffPaymentOptions.NO_FEE"
          />
        </v-radio-group>
        <template v-if="displayPriorityCheckbox">
          <v-divider class="mt-6" />

          <!-- Priority checkbox -->
          <v-checkbox
            id="priority-checkbox"
            v-model="staffPaymentData.isPriority"
            class="priority-checkbox mt-6 pt-0"
            label="Priority (add $100.00)"
            color="primary"
            hide-details
            :disabled="staffPaymentData.option === StaffPaymentOptions.NO_FEE"
          />
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-facing-decorator'
import { StaffPaymentOptions } from '@bcrs-shared-components/enums'
import { FolioNumberInput } from '@bcrs-shared-components/folio-number-input'
import { FormIF, StaffPaymentIF } from '@bcrs-shared-components/interfaces'

@Component({
  components: { FolioNumberInput }
})
export default class StaffPayment extends Vue {
  // To fix "property X does not exist on type Y" errors, annotate types for referenced components.
  // ref: https://github.com/vuejs/vetur/issues/1414
  // ref: https://github.com/vuejs/vue-class-component/issues/94
  $refs!: Vue['$refs'] & {
    fasForm: FormIF,
    bcolForm: FormIF,
    folioNumberInputRef: FolioNumberInput
  }

  /** Enum for template. */
  readonly StaffPaymentOptions = StaffPaymentOptions

  /** Whether to display side label. */
  @Prop({ default: true }) readonly displaySideLabel!: boolean

  /** Whether to display priority checkbox. */
  @Prop({ default: true }) readonly displayPriorityCheckbox!: boolean

  /** Whether to validate the fields. */
  @Prop({ default: false }) readonly validate!: boolean

  /** Whether to show invalid section styling (label only). */
  @Prop({ default: false }) readonly invalidSection!: boolean

  /** Staff Payment Data prop. */
  @Prop({
    default: () => {
      return {
        option: StaffPaymentOptions.NONE,
        routingSlipNumber: null,
        bcolAccountNumber: null,
        datNumber: null,
        folioNumber: null,
        isPriority: false
      }
    }
  })
  readonly staffPaymentData!: StaffPaymentIF

  /** Whether this component has been mounted. */
  private isMounted = false

  /** FAS form model property. */
  private fasFormValid = false

  /** BCOL form model property. */
  private bcolFormValid = false

  /** If FAS form inputs are disabled. */
  get fasFormInputDisabled (): boolean {
    return this.staffPaymentData.option === StaffPaymentOptions.BCOL ||
      this.staffPaymentData.option === StaffPaymentOptions.NO_FEE
  }

  /** If BCOL form inputs are disabled. */
  get bcolFormInputDisabled (): boolean {
    return this.staffPaymentData.option === StaffPaymentOptions.FAS ||
      this.staffPaymentData.option === StaffPaymentOptions.NO_FEE
  }

  /** Validation rules for Routing Slip Number. */
  readonly routingSlipNumberRules: Array<(v) => boolean | string> = [
    v => !!v || 'Enter FAS Routing Slip Number',
    v => /^\d{9}$/.test(v) || 'Routing Slip Number must be 9 digits'
  ]

  /** Validation rules for BCOL Account Number. */
  readonly bcolAccountNumberRules: Array<(v) => boolean | string> = [
    v => !!v || 'Enter BC Online Account Number',
    v => /^\d{6}$/.test(v) || 'BC Online Account Number must be 6 digits'
  ]

  /** Validation rules for DAT Number. */
  readonly datNumberRules: Array<(v) => boolean | string> = [
    v => !!v || 'Enter DAT Number',
    v => /^[A-Z]{1}[0-9]{7,9}$/.test(v) || 'DAT Number must be in standard format (eg, C1234567)'
  ]

  /** Called when component is mounted. */
  async mounted (): Promise<void> {
    await this.$nextTick()
    this.isMounted = true
  }

  /** Called when staff payment data option (radio group item) has changed. */
  @Watch('staffPaymentData.option')
  private onPaymentOptionChanged (val: number): void {
    switch (val) {
      case StaffPaymentOptions.FAS:
        // reset other form
        this.$refs.bcolForm.resetValidation()
        this.$refs.folioNumberInputRef.resetFolioNumberValidation()
        // enable validation for this form
        this.$refs.fasForm.validate()
        break

      case StaffPaymentOptions.BCOL:
        // reset other form
        this.$refs.fasForm.resetValidation()
        // enable validation for this form
        this.$refs.bcolForm.validate()
        break

      case StaffPaymentOptions.NO_FEE:
        // reset other forms
        this.$refs.fasForm.resetValidation()
        this.$refs.bcolForm.resetValidation()
        this.$refs.folioNumberInputRef.resetFolioNumberValidation()
        // update data
        this.staffPaymentData.isPriority = false
        break
    }
  }

  /** Watches for changes to Staff Payment Data prop. */
  @Watch('staffPaymentData', { deep: true, immediate: true })
  private async onStaffPaymentDataChanged (val: StaffPaymentIF): Promise<void> {
    this.emitStaffPaymentData({ ...this.staffPaymentData })
    this.emitValid()
  }

  /** Emits an event to update the Staff Payment Data prop. */
  @Emit('update:staffPaymentData')
  private emitStaffPaymentData ({
    option = StaffPaymentOptions.NONE,
    routingSlipNumber = '',
    bcolAccountNumber = '',
    datNumber = '',
    folioNumber = '',
    isPriority = false
  }): StaffPaymentIF {
    // return only the appropriate fields for each option
    switch (option) {
      case StaffPaymentOptions.FAS:
        return { option, routingSlipNumber, isPriority } as StaffPaymentIF

      case StaffPaymentOptions.BCOL:
        return { option, bcolAccountNumber, datNumber, folioNumber, isPriority } as StaffPaymentIF

      case StaffPaymentOptions.NO_FEE:
        return { option } as StaffPaymentIF
    }
  }

  /** Watches for change to FAS form validity. */
  @Watch('fasFormValid')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onFasFormValid (val: boolean) {
    // ignore initial condition
    if (!this.isMounted) return
    this.emitValid()
  }

  /** Watches for change to BCOL form validity. */
  @Watch('bcolFormValid')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onBcolFormValid (val: boolean) {
    // ignore initial condition
    if (!this.isMounted) return
    this.emitValid()
  }

  /** Emits an event indicating whether or not this component is valid. */
  @Emit('valid')
  private emitValid (): boolean {
    return (this.fasFormValid ||
      (this.bcolFormValid && this.$refs.folioNumberInputRef.validateFolioNumber()) ||
      (this.staffPaymentData.option === StaffPaymentOptions.NO_FEE)
    )
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

#staff-payment-container {
  line-height: 1.2rem;
  font-size: $px-16;
}

.title-label {
  font-weight: bold;
  color: $gray9;
}

.payment-container {
  > label:first-child {
    font-weight: 700;
    margin-bottom: 2rem;
  }
}

.payment-group {
  margin-top: 0;
  padding-top: 0;

  :deep(> .v-input__control) {
    margin-bottom: -12px;
  }
}

// override Vuetify label colors
:deep() {
  .v-input--selection-controls__ripple,
  .v-text-field__slot .v-label,
  .v-radio .v-label,
  .v-input--checkbox .v-label {
    color: $gray7 !important;
  }
}
</style>
