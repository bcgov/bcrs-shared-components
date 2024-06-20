<template>
  <v-form
    id="correct-aml-numbered-form"
    ref="form"
    v-model="formValid"
  >
    <v-checkbox
      id="correct-new-numbered-checkbox"
      v-model="checkbox"
      hide-details
      :label="label"
      :rules="[(v) => v]"
    />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
import { CorrectNameOptions } from '@bcrs-shared-components/enums'
import { CorpTypeCd } from '@bcrs-shared-components/corp-type-module'

@Component({})
export default class CorrectAmlNumbered extends Vue {
  // Refs
  $refs: {
    form: HTMLFormElement
  }

  @Prop({ required: true }) readonly entityType!: CorpTypeCd
  @Prop({ required: true }) readonly formType!: CorrectNameOptions
  @Prop({ required: true }) readonly validate!: boolean

  checkbox = false // initially unchecked
  formValid = false // initially invalid

  readonly label = 'The resulting company name will be the incorporation number followed ' +
    'by a suffix. The suffix will reflect the type of resulting business type.'

  /**
   * The business' numbered name.
   * It will be created from the new incorporation number by the Filer.
   */
  get numberedName (): string {
    switch (this.entityType) {
      case CorpTypeCd.BC_ULC_COMPANY:
        return '[Incorporation Number] B.C. UNLIMITED LIABILITY COMPANY'
      case CorpTypeCd.BC_CCC:
        return '[Incorporation Number] B.C. COMMUNITY CONTRIBUTION COMPANY LTD.'
      default:
        return '[Incorporation Number] B.C. LTD.'
    }
  }

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private onSubmit (): void {
    // process only when current form type matches
    if (this.formType === CorrectNameOptions.CORRECT_AML_NUMBERED) {
      // emit new data
      this.emitCompanyName(null) // no name
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
  @Watch('formValid', { immediate: true })
  @Emit('valid')
  private emitValid (): boolean {
    return this.formValid
  }

  /** Inform parent that the process is complete. */
  @Emit('saved')
  private emitSaved (saved: boolean): void {}

  /** Inform parent of updated company name. */
  @Emit('update:companyName')
  private emitCompanyName (companyName: string): void {}
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
  padding-top: 2px;
}

// align checkbox with label
:deep(.v-input--checkbox) {
  .v-input__slot {
    align-items: flex-start;
  }
}
</style>
