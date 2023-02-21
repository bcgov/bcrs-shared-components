<template>
  <v-form id="correct-company-name-form" ref="form" v-model="formValid">
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="textfield"
          id="company-name-textfield"
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
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { EmptyNameRequest, NameRequestIF } from '@bcrs-shared-components/interfaces'
import { NameChangeOptions } from '@bcrs-shared-components/enums'

@Component({})
export default class CorrectCompanyName extends Vue {
  // Refs
  $refs: {
    form: HTMLFormElement
  }

  @Prop({ required: true }) readonly formType!: NameChangeOptions
  @Prop({ required: true }) readonly nameRequest!: NameRequestIF
  @Prop({ required: true }) readonly companyName!: string
  @Prop({ required: true }) readonly validate!: boolean

  // Local properties
  formValid = false
  textfield = ''

  // Rules
  readonly companyNameRules = [
    (v: string) => !!v || ' A company name is required'
  ]

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private onSubmit (): void {
    // process only when current form type matches
    if (this.formType === NameChangeOptions.CORRECT_NAME) {
      // clear out any existing NR data and set new data
      this.emitNameRequest(EmptyNameRequest)
      this.emitApprovedName(this.textfield)
      this.emitSaved(true)
    }
  }

  @Watch('companyName', { immediate: true, deep: true })
  private onCompanyName (val: string): void {
    this.textfield = val
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
