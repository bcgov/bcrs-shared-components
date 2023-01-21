<template>
  <div id="approval-type">
    <v-row no-gutters>
      <v-col cols="12" sm="3" class="pr-4">
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
            <v-text-field
              id="court-order-number-input"
              v-model="courtOrderNumber"
              label="Court Order Number"
              :rules="courtOrderNumRules"
              :disabled="approvalTypeSelected === ApprovalTypes.VIA_REGISTRAR"
              @input="courtOrderNumberChanged"
              @update:error="emitValidationError($event)"
              filled
            />
          </v-form>
          <!-- REGISTRAR radio button -->
          <v-radio v-if="!isCourtOrderOnly"
             id="registrar-radio" class="mb-0 pt-2"
             :label="getRadioText(ApprovalTypes.VIA_REGISTRAR)"
             :value="ApprovalTypes.VIA_REGISTRAR"
          />
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { FormIF } from '@bcrs-shared-components/interfaces'

@Component({})
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
  @Prop({ default: 'restoration'}) readonly filingType!: string

  /** Show only the court order option; remove via registrar option. */
  @Prop({ default: false }) readonly isCourtOrderOnly!: boolean

  // Local properties
  private courtOrderNumber = ''
  private courtOrderNumRules = []
  private valid = false
  private approvalTypeSelected = ''

  /** Called when component is mounted. */
  mounted (): void {
    // Copy props to mutable properties
    if (this.draftApprovedByRegistrar) {
      this.courtOrderNumber = ''
      this.approvalTypeSelected = this.ApprovalTypes.VIA_REGISTRAR
    }
    if (this.draftCourtOrderNumber) {
      this.courtOrderNumber = this.draftCourtOrderNumber
      this.approvalTypeSelected = this.ApprovalTypes.VIA_COURT_ORDER
    }
  }

  /** Triggers the form validation. */
  public validate (): boolean {
    let status = this.$refs.courtNumRef.validate()
    this.$emit('emitValid', status)
    return status
  }

  private emitValidationError (event: boolean): void {
    this.$emit('emitValid', !event)
  }

  @Emit('emitRadioButtonChange')
  private radioButtonChanged (event: string): void {
    if (event === this.ApprovalTypes.VIA_REGISTRAR) {
      Vue.set(this, 'courtOrderNumber', '')
      Vue.set(this, 'courtOrderNumRules', [])
    }
    if (event === this.ApprovalTypes.VIA_COURT_ORDER) {
      this.setCourtNumberRules()
    }
    this.validate()
  }

  @Emit('emitCourtNumberChange')
  private courtOrderNumberChanged (event): void {
    Vue.set(this, 'approvalTypeSelected', this.ApprovalTypes.VIA_COURT_ORDER)
    this.$emit('emitRadioButtonChange', this.ApprovalTypes.VIA_COURT_ORDER)
    this.setCourtNumberRules()
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
