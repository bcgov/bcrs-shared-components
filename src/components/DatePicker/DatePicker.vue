<template>
  <v-form :attach="attach" ref="form" class="date-picker-form">
    <v-menu v-model="displayPicker"
            :close-on-click="false"
            :close-on-content-click="false"
            :nudge-top="nudgeTop"
            :nudge-bottom="nudgeBottom"
            :nudge-left="nudgeLeft"
            :nudge-right="nudgeRight"
            transition="scale-transition"
            offset-y
            bottom
            min-width="290"
    >
      <template v-slot:activator="{ on }">
        <v-text-field id="date-text-field"
                      append-icon="mdi-calendar"
                      autocomplete="chrome-off"
                      :error-messages="errorMsg"
                      :error="!!errorMsg"
                      :value="dateText"
                      :label="title"
                      :name="Math.random()"
                      :rules="inputRules"
                      :disabled="disablePicker"
                      v-on="on"
                      v-on:keydown="$event.preventDefault()"
                      v-on:keyup.enter="emitDate(dateText)"
                      v-on:click:append="on.click"
                      filled
        />
      </template>
      <v-date-picker id="date-picker-calendar" width="490" v-model="dateText" :min="minDate" :max="maxDate">
        <template v-slot:default>
          <div>
            <v-btn id="btn-done" text color="primary" @click="emitDate(dateText)"><strong>OK</strong></v-btn>
            <v-btn id="btn-cancel" text color="primary" @click="emitCancel()">Cancel</v-btn>
          </div>
        </template>
      </v-date-picker>
    </v-menu>
  </v-form>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { FormIF } from '@/interfaces'

@Component({})
export default class DatePicker extends Vue {

  // Add element types to refs
  $refs!: {
    form: FormIF
  }
  @Prop({ default: null })
  readonly attach: string

  @Prop({ default: '' })
  readonly title: string

  @Prop({ default: null })
  readonly errorMsg: string

  @Prop({ default: () => [] })
  readonly inputRules: Array<Function>

  @Prop({ default: false })
  readonly disablePicker: boolean

  @Prop({ default: '' })
  readonly minDate: string

  @Prop({ default: '' })
  readonly maxDate: string

  @Prop({ default: null })
  readonly nudgeTop: number

  @Prop({ default: null })
  readonly nudgeBottom: number

  @Prop({ default: null })
  readonly nudgeRight: number

  @Prop({ default: null })
  readonly nudgeLeft: number

  private dateText = ''
  private displayPicker = false

  /** Clear local model after each action. */
  public clearDate (): void {
    this.dateText = ''
    this.displayPicker = false
  }

  /** Triggers the form validation. */
  public validateForm (): boolean {
    return this.$refs.form.validate()
  }

  /** Emit date to add or remove. */
  @Emit('emitDate')
  private emitDate (date: string): void { this.displayPicker = false }

  /** Emit date to add or remove. */
  @Emit('emitCancel')
  private emitCancel (): void { this.clearDate() }

  @Watch('dateText')
  @Emit('emitDateSync')
  private emitDateSync (date: string): string { return this.dateText }
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

::v-deep .v-icon.v-icon {
  color: $app-blue
}

::v-deep .v-picker__title__btn:not(.v-picker__title__btn--active) {
  opacity: 1;
}

::v-deep .v-date-picker-table__current {
  border-color: $app-blue !important;
}

::v-deep .v-date-picker-table__current .v-btn__content{
  color: $app-blue !important;
}

::v-deep .theme--light.v-date-picker-table th {
  color: $gray9
}

::v-deep .v-date-picker-table .v-btn {
  color: $gray7
}

::v-deep .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: $app-blue !important;
  border-color: $app-blue !important;
  color: white !important;
}

::v-deep .v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active:before {
  opacity: 0;
}

::v-deep .v-icon.v-icon.v-icon--link {
  cursor: text;
}
</style>
