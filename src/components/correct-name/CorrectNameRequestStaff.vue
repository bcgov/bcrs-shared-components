<template>
  <v-form
    id="correct-name-request-staff-form"
    ref="form"
    v-model="formValid"
    lazy-validation
  >
    <v-row no-gutters>
      <v-col>
        <v-text-field
          id="nr-number"
          v-model="nrNumber"
          autofocus
          filled
          persistent-hint
          class="text-input-field"
          label="Enter the NR Number"
          hint="Example: NR 1234567"
          :rules="nrNumRules"
          @keyup="nrNumber = nrNumber.toUpperCase()"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop, Watch } from 'vue-property-decorator'
import { NameRequestMixin } from '@bcrs-shared-components/mixins'
import { NameRequestIF } from '@bcrs-shared-components/interfaces'
import { CorrectNameOptions } from '@bcrs-shared-components/enums'

@Component({})
export default class CorrectNameRequestStaff extends Mixins(NameRequestMixin) {
  // Refs
  $refs!: {
    form: HTMLFormElement
  }

  @Prop({ required: true }) readonly fetchAndValidateNr!: (...args) => Promise<NameRequestIF>
  @Prop({ required: true }) readonly formType!: CorrectNameOptions
  @Prop({ required: true }) readonly nameRequest!: NameRequestIF
  @Prop({ required: true }) readonly validate!: boolean

  // Local properties
  formValid = false // initially invalid
  nrNumber = ''

  // Validation rules
  readonly nrNumRules = [
    (v: string) => !!v || 'Name Request Number is required',
    (v: string) => this.isValidNrNumber(v) || 'Name Request Number is invalid'
  ]

  /** Whether this component is valid. */
  get componentValid (): boolean {
    // 1. rules are valid
    // 2. we have a NR number
    return (
      this.formValid &&
      !!this.nrNumber
    )
  }

  /** Returns true if NR number is valid. */
  private isValidNrNumber (value: string): boolean {
    const VALID_FORMAT = new RegExp(/^(NR )\d{7}$/)
    return VALID_FORMAT.test(value)
  }

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private async onSubmit (): Promise<any> {
    // process only when current form type matches
    if (this.formType === CorrectNameOptions.CORRECT_NEW_NR_STAFF) {
      try {
        // validate and return the name request data
        const nr = await this.fetchAndValidateNr(this.nrNumber)

        // emit new data
        this.emitNameRequest(nr)
        this.emitCompanyName(this.getNrApprovedName(nr))
        this.emitSaved(true)
      } catch (error) {
        // inform parent of fetch/validation error
        this.emitError((error as any).message)

        // inform parent that process is complete
        this.$refs.form.resetValidation()
        this.emitSaved(false)
      }
    }
  }

  /** Validate or reset validation when parent tells us. */
  @Watch('validate')
  private onValidate (validate: boolean): void {
    if (validate) this.$refs.form.validate()
    else this.$refs.form.resetValidation()
  }

  /** Watch for changes and inform parent when component is valid. */
  @Watch('componentValid')
  @Emit('valid')
  private emitValid (): boolean {
    return this.componentValid
  }

  /** Inform parent of error. */
  @Emit('error')
  // eslint-disable-next-line handle-callback-err
  private emitError (error: string): void {}

  /** Inform parent that the process is complete. */
  @Emit('saved')
  private emitSaved (saved: boolean): void {}

  /** Inform parent of updated company name. */
  @Emit('update:companyName')
  private emitCompanyName (name: string): void {}

  /** Inform parent of updated name request object. */
  @Emit('update:nameRequest')
  private emitNameRequest (nameRequest: NameRequestIF): void {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.step-icon {
  border-color: $gray9;
  font-weight: bold;
  pointer-events: none;
}

// hide uppercase transformation delay from user
:deep(#nr-number) {
  text-transform: uppercase;
}

:deep(.theme--light.v-label) {
  font-size: 1rem;
  color: $gray7;
  font-weight: normal;
}
</style>
