<template>
  <v-form id="correct-name-to-number-form" v-model="formValid" lazy-validation>
    <v-row no-gutters>
      <v-col>
        <v-checkbox
          v-model="checkbox"
          id="correct-name-to-number-checkbox"
          class="mb-n5"
          :label="`Change the company name to ${nummberedName}`"
          :rules="[(v) => v]"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
import { NameRequestIF } from '@bcrs-shared-components/interfaces'
import { NameChangeOptions } from '@bcrs-shared-components/enums'

@Component({})
export default class CorrectNameToNumber extends Vue {
  @Prop({ default: null }) readonly formType!: NameChangeOptions
  @Prop({ default: null }) readonly businessId!: string
  @Prop({ default: () => {} }) readonly nameRequest!: NameRequestIF

  // Local properties
  formValid = false
  checkbox = false

  get nummberedName (): string {
    const businessId = this.businessId?.substring(2) || 'Unknown'
    return `${businessId} B.C. Ltd.`
  }

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private async onSubmit (): Promise<any> {
    // safety check
    if (this.formType === NameChangeOptions.CORRECT_NAME_TO_NUMBER) {
      // delete the current legal name and NR number
      this.emitNameRequest({
        ...this.nameRequest,
        legalName: undefined,
        nrNumber: undefined
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
