<template id="limited-restoration-panel">
  <v-radio-group class="mt-0 pt-0 ml-8" v-model="selectMonths" mandatory>
      <v-radio class="radio-button" id="twentyFour-radio" name="selectMonths" :value=24>
          <span slot="label" class="month-text">2 years</span>
      </v-radio>
      <v-radio class="radio-button" id="eighteen-radio" name="selectMonths" :value=18>
          <span slot="label" class="month-text">18 months</span>
      </v-radio>
      <v-radio class="radio-button" id="twelve-radio" name="selectMonths" :value=12>
          <span slot="label" class="month-text">12 months</span>
      </v-radio>
      <v-radio class="radio-button" id="six-radio" name="selectMonths" label="6 months" :value=6>
          <span slot="label" class="month-text">6 months</span>
      </v-radio>
      <v-row class="ml-0 mt-0 radio-button">
          <v-radio id="custom-months" name="selectMonths" value="customMonths" />
          <v-text-field
          class="shrink"
          style="width:73px;"
          hide-details="auto"
          type="number"
          dense
          hide-spin-buttons
          min=1
          max=24
          :rules="monthRules"
          v-model="numberOfMonths"
          :disabled="!customMonths"
          @change="onMonthsChanged"
          filled
          />
          <div class="ml-2 mt-2 month-text">month(s)</div>
      </v-row>
  </v-radio-group>
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop, Watch } from 'vue-property-decorator'
import { DateMixin } from '@/mixins' // NB: local mixin (StoryBook can't find it otherwise)

@Component({})
export default class LimitedRestorationPanel extends Mixins(DateMixin) {
  @Prop({ default: '' }) readonly currentDate!: string

  @Prop({ default: '' }) readonly expiryDate!: string

  // Local properties
  private customMonths: string = ''
  private selectMonths: string = ''
  private numberOfMonths: number = null
  private monthRules: ((data: string) => void)[] = []

  /**
   * Called when the component is mounted.
   * Auto select the previous months input of user (if any).
   * If there is no previous input, auto select 24 months.
   */
  mounted (): void {
    this.setMonthRules()
    const draftMonths = this.subtractDates(this.currentDate, this.expiryDate)
    if (draftMonths !== 24 && draftMonths !== 18 && draftMonths !== 12 && draftMonths !== 6) {
      this.selectMonths = 'customMonths'
      this.numberOfMonths = draftMonths
      this.setCustomMonths(this.numberOfMonths)
    } else {
      this.selectMonths = draftMonths
    }
  }

  /** The validation rules for the Month. */
  private setMonthRules (): void {
    this.monthRules = [
      (v:string) => !!v || 'Must be between 1 to 24',
      (v:string) => (v > 0 && v <= 24) || 'Must be between 1 to 24', // Keep month between 1 and 24
      (v:string) => (v % 1 === 0) || 'Invalid number' // Check if month is an integer
    ]
  }

  // Emit the expiry date.
  @Emit('expiry')
  private expiryChanged (event: string): string {
    return event
  }

  /**
   * Set restoration expiry date by adding the custom number of months (1-24) input by user to current date.
   * Prevent the user from selecting values above 24, lower than 1, and decimals.
   */
  onMonthsChanged (): void {
    if (this.numberOfMonths > 24) {
      this.numberOfMonths = 24
    } else if (this.numberOfMonths < 1) {
      this.numberOfMonths = 1
    } else {
      this.numberOfMonths = Math.floor(this.numberOfMonths)
    }
    this.expiryChanged(this.addMonthsToDate(this.numberOfMonths, this.currentDate))
  }

  /**
   * Set if custom number of months is selected.
   * Set expiry date by adding the value of the selected radio buttons to current date.
   * @param val The value of the selected radio button
   */
   @Watch('selectMonths')
  private setCustomMonths (val) {
    this.customMonths = val === 'customMonths'
    if (val !== 'customMonths') {
      this.expiryChanged(this.addMonthsToDate(val, this.currentDate))
    } else {
      if (this.numberOfMonths === null) {
        this.numberOfMonths = 1
      }
      this.expiryChanged(this.addMonthsToDate(this.numberOfMonths, this.currentDate))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.month-text {
  color: $gray7;
}

.radio-button {
    padding-top: 15px;
}
</style>
