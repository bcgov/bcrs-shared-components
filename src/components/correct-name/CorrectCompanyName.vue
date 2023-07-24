<template>
  <v-form
    id="correct-company-name-form"
    ref="form"
    v-model="formValid"
  >
    <v-row no-gutters>
      <v-col>
        <v-text-field
          id="company-name-textfield"
          v-model="textfield"
          class="mb-n3"
          filled
          :rules="companyNameRules"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch, Provide } from 'vue-property-decorator'
import { CorrectNameOptions } from '@bcrs-shared-components/enums'
import { VuetifyRuleFunction } from '@bcrs-shared-components/types'

@Component({})
export default class CorrectCompanyName extends Vue {
  // Refs
  $refs: {
    form: HTMLFormElement
  }

  @Prop({ required: true }) readonly companyName!: string
  @Prop({ required: true }) readonly formType!: CorrectNameOptions
  @Prop({ required: true }) readonly validate!: boolean

  // Local properties
  @Provide() formValid = false // initially invalid
  @Provide() textfield = ''

  mounted (): void {
    // Filter the options to be displayed by what id's were passed from the parent component
    this.textfield = this.companyName
  }

  // Rules
  get companyNameRules (): Array<VuetifyRuleFunction> {
    return [
      (v: string) => !!v || ' A company name is required',
      (v: string) => (v !== this.companyName) || ' Enter a new company name'
    ]
  }

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private onSubmit (): void {
    // process only when current form type matches
    if (this.formType === CorrectNameOptions.CORRECT_NAME) {
      // emit new data
      this.emitCompanyName(this.textfield)
      this.emitSaved(true)
    }
  }

  /** Validate or reset validation when parent tells us. */
  @Watch('validate')
  private onValidate (val: boolean): void {
    if (val) this.$refs.form.validate()
    else this.$refs.form.resetValidation()
  }

  /** Watch for changes and inform parent when form/component is valid. */
  @Watch('formValid')
  @Emit('valid')
  private emitValid (): boolean {
    return this.formValid
  }

  /** Inform parent that the process is complete. */
  @Emit('saved')
  private emitSaved (val: boolean): void {}

  /** Inform parent of updated company name. */
  @Emit('update:companyName')
  private emitCompanyName (name: string): void {}
}
</script>
