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
import { CorpTypeCd, CorrectNameOptions } from '@bcrs-shared-components/enums'

@Component({})
export default class CorrectNameToNumber extends Vue {
  // Refs
  $refs: {
    form: HTMLFormElement
  }

  @Prop({ required: true }) readonly businessId!: string
  @Prop({ required: true }) readonly entityType!: CorpTypeCd
  @Prop({ required: true }) readonly formType!: CorrectNameOptions
  @Prop({ required: true }) readonly validate!: boolean

  checkbox = false
  formValid = false // initially invalid

  /** The business' numbered name. */
  get numberedName (): string {
    const id = this.businessId?.substring(2) || 'Unknown'

    switch (this.entityType) {
      case CorpTypeCd.BC_ULC_COMPANY:
        return `${id} B.C. UNLIMITED LIABILITY COMPANY`
      case CorpTypeCd.BC_CCC:
        return `${id} B.C. COMMUNITY CONTRIBUTION COMPANY LTD.`
      default:
        return `${id} B.C. LTD.`
    }
  }

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private onSubmit (): void {
    // process only when current form type matches
    if (this.formType === CorrectNameOptions.CORRECT_NAME_TO_NUMBER) {
      // emit new data
      this.emitCompanyName(this.numberedName)
      this.emitSaved(true)
    }
  }

  /** Validate or reset validation when parent tells us. */
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

  /** Inform parent of updated company name. */
  @Emit('update:companyName')
  private emitCompanyName (name: string): void {}
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
