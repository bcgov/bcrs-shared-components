<template>
  <v-card flat class="mt-4 py-8 pr-6">
    <v-row no-gutters align="start" class="mt-4">
      <v-col cols="3" class="px-6">
        <label :class="{'error-text': invalidSection}">Court Order <br>Number</label>
      </v-col>
      <v-col cols="9" class="pl-2">
        <v-form ref="courtNumRef" id="court-num-form" v-model="valid">
          <v-text-field
            id="court-order-number-input"
            v-model="courtOrderNumber"
            label="Court Order Number"
            :rules="courtOrderNumRules"
            filled
          />
        </v-form>
      </v-col>
    </v-row>
    <v-row no-gutters align="end">
      <v-col cols="3" class="px-6">
        <label>Plan of <br>Arrangement</label>
      </v-col>
      <v-col cols="9" class="pl-2">
        <v-checkbox
          id="plan-of-arrangement-checkbox"
          v-model="planOfArrangement"
          label="This filing is pursuant to a Plan of Arrangement"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { FormIF } from '@bcrs-shared-components/interfaces'

@Component({})
export default class CourtOrderPoa extends Vue {
  // Refs
  $refs!: Vue['$refs'] & {
    courtNumRef: FormIF
  }

  /** Prompt the validations. Used for global validations. */
  @Prop({ default: false })
  private validate

  /** Draft court order number. */
  @Prop({ default: '' })
  private draftCourtOrderNumber

  /** Draft plan of arrangement. */
  @Prop({ default: false })
  private hasDraftPlanOfArrangement

  /** Prompt Error. */
  @Prop({ default: false })
  private invalidSection: boolean

  // Local properties
  private courtOrderNumber = ''
  private courtOrderNumRules = []
  private planOfArrangement = false
  private valid = false

  mounted () {
    // Set default draft values if they exist
    if (this.draftCourtOrderNumber) this.courtOrderNumber = this.draftCourtOrderNumber
    if (this.hasDraftPlanOfArrangement) this.planOfArrangement = this.hasDraftPlanOfArrangement
  }

  /** Clear rules and reset validations. */
  private clearValidations (): void {
    this.courtOrderNumRules = []
    this.$refs.courtNumRef.resetValidation()
  }

  /** Local getter to know when to validate. */
  private get validateForm (): boolean {
    return this.validate && this.planOfArrangement
  }

  @Watch('validateForm')
  validateCourtNum (): void {
    if (this.validateForm) {
      // Apply TextField rules
      this.courtOrderNumRules = [
        (v: string) => !!v || 'A Court Order number is required',
        (v: string) => !/^\s/g.test(v) || 'Invalid spaces', // leading spaces
        (v: string) => !/\s$/g.test(v) || 'Invalid spaces', // trailing spaces
        (v: string) => !(v.length < 5) || 'Court order number is invalid',
        (v: string) => !(v.length > 20) || 'Court order number is invalid'
      ]
      this.$refs.courtNumRef.validate()
    } else this.clearValidations()
  }

  /** Emit court order number. */
  @Watch('courtOrderNumber')
  @Emit('emitCourtNumber')
  private emitCourtNumber (): string { return this.courtOrderNumber }

  /** Emit plan of arrangement. */
  @Watch('planOfArrangement')
  @Emit('emitPoa')
  private emitPoa (): boolean {
    if (!this.planOfArrangement) this.clearValidations()
    return this.planOfArrangement
  }

  @Watch('valid')
  @Emit('emitValid')
  private emitValid (): boolean {
    return this.valid
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

::v-deep .v-card__actions {
  justify-content: flex-end;
}
::v-deep .v-input .v-label {
  font-weight: normal;
  color: $gray7;
}
::v-deep .theme--light.v-input input {
  font-weight: normal;
  color: $gray7;
}
</style>
