<template>
  <v-card flat class="mt-4 py-8 pr-6">
    <v-row no-gutters align="start" class="mt-4">
      <v-col cols="3" class="px-6" v-if="displaySideLabels">
        <label :class="{'error-text': invalidSection}" id="court-order-label">Court Order <br>Number</label>
      </v-col>
      <v-col :cols="displaySideLabels ? 9 : 12" class="pl-2">
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
      <v-col cols="3" class="px-6" v-if="displaySideLabels">
        <label id="poa-label">Plan of <br>Arrangement</label>
      </v-col>
      <v-col :cols="displaySideLabels ? 9 : 12" class="pl-2">
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
  private autoValidation

  /** Draft court order number. */
  @Prop({ default: '' })
  private draftCourtOrderNumber

  /** Draft plan of arrangement. */
  @Prop({ default: false })
  private hasDraftPlanOfArrangement

  /** Prompt Error. */
  @Prop({ default: false })
  private invalidSection: boolean

  /** Display side labels. */
  @Prop({ default: true })
  private displaySideLabels: boolean

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

  /** Triggers the form validation. */
  public validate (): boolean {
    return this.$refs.courtNumRef.validate()
  }

  @Watch('courtOrderNumber')
  @Watch('planOfArrangement')
  @Watch('autoValidation')
  validateCourtNum (): void {
    if (this.autoValidation) {
      // Apply TextField rules
      this.courtOrderNumRules = [
        (v: string) => (!v || !/^\s/g.test(v)) || 'Invalid spaces', // leading spaces
        (v: string) => (!v || !/\s$/g.test(v)) || 'Invalid spaces', // trailing spaces
        (v: string) => (!v || !(v.length < 5)) || 'Court order number is invalid',
        (v: string) => (!v || !(v.length > 20)) || 'Court order number is invalid'
      ]
      if (this.planOfArrangement) {
        this.courtOrderNumRules.splice(0, 0, (v: string) => (!!v && this.planOfArrangement) || 'A Court Order number is required')
      }
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
