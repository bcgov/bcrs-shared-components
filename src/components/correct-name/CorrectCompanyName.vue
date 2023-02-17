<template>
  <v-form id="correct-company-name-form" v-model="formValid" lazy-validation>
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
import { NameRequestIF } from '@bcrs-shared-components/interfaces'
import { NameChangeOptions } from '@bcrs-shared-components/enums'

@Component({})
export default class CorrectCompanyName extends Vue {
  @Prop({ default: null }) readonly formType!: NameChangeOptions
  @Prop({ default: () => {} }) readonly nameRequest!: NameRequestIF

  // Local properties
  formValid = false
  textfield = ''

  // Rules
  readonly companyNameRules = [
    (v: string) => !!v || ' A company name is required'
  ]

  /** Called when component is mounted. */
  mounted (): void {
    const legalName = this.nameRequest.legalName
    // Set the current company name to the form
    if (legalName) {
      this.textfield = legalName
    }
  }

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private onSubmit (): void {
    // safety check
    if (this.formType === NameChangeOptions.CORRECT_NAME) {
      // set the new company name
      this.emitNameRequest({
        ...this.nameRequest,
        legalName: this.textfield
      })

      this.emitSaved(true)
    }
  }

  /** Inform parent that the process is complete. */
  @Emit('saved')
  private emitSaved (val: boolean): void {}

  /** Watch for changes and inform parent when form is valid and ready for submission. */
  @Watch('formValid')
  @Emit('valid')
  private emitValid (): boolean {
    return this.formValid
  }

  /** Inform parent of updated name request object. */
  @Emit('update:nameRequest')
  private emitNameRequest (nameRequest: NameRequestIF): void {}
}
</script>
