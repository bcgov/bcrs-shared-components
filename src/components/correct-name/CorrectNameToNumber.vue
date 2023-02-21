<template>
  <v-form id="correct-name-to-number-form" ref="form" v-model="formValid">
    <v-row no-gutters>
      <v-col>
        <v-checkbox
          v-model="checkbox"
          id="correct-name-to-number-checkbox"
          class="mb-n5"
          :label="`Change the company name to ${numberedName}`"
          :rules="[(v) => v]"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
import { EmptyNameRequest, NameRequestIF } from '@bcrs-shared-components/interfaces'
import { NameChangeOptions } from '@bcrs-shared-components/enums'

@Component({})
export default class CorrectNameToNumber extends Vue {
  // Refs
  $refs: {
    form: HTMLFormElement
  }

  @Prop({ required: true }) readonly formType!: NameChangeOptions
  @Prop({ required: true }) readonly businessId!: string
  @Prop({ required: true }) readonly nameRequest!: NameRequestIF
  @Prop({ required: true }) readonly validate!: boolean

  // Local properties
  formValid = false
  checkbox = false

  /** The business' numbered name. */
  get numberedName (): string {
    const businessId = this.businessId?.substring(2) || 'Unknown'
    return `${businessId} B.C. LTD.`
  }

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private async onSubmit (): Promise<any> {
    // process only when current form type matches
    if (this.formType === NameChangeOptions.CORRECT_NAME_TO_NUMBER) {
      // clear out any existing NR data and set new data
      this.emitNameRequest(EmptyNameRequest)
      this.emitApprovedName(this.numberedName)
      this.emitSaved(true)
    }
  }

  /** Validates or resets validation when parent tells us. */
  @Watch('validate')
  private onValidate (val: boolean): void {
    if (val) this.$refs.form.validate()
    else this.$refs.form.resetValidation()
  }

  /** Watch for changes and inform parent when form is valid. */
  @Watch('formValid')
  @Emit('valid')
  private emitValid (): boolean {
    return this.formValid
  }

  /** Inform parent that the process is complete. */
  @Emit('saved')
  private emitSaved (val: boolean): void {}

  /** Inform parent of updated name request object. */
  @Emit('update:nameRequest')
  private emitNameRequest (nameRequest: NameRequestIF): void {}

  /** Inform parent of updated approved name. */
  @Emit('update:approvedName')
  private emitApprovedName (name: string): void {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.v-input--selection-controls {
  padding: 0;
  margin: 0;
}

:deep(.theme--light.v-label) {
  font-size: 1rem;
  color: $gray7;
  font-weight: normal;
}
</style>
