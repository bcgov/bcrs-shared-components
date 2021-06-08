<template>
    <v-form id="folio-number-form" ref="folioForm" v-model="folioFormValid">
      <v-text-field
        filled
        id="folio-number-textfield"
        label="Folio Number (Optional)"
        :value="folioNumber"
        :rules="folioNumberRules"
        :disabled="disabled"
        @input="emitFolioNumber($event)"
        autocomplete="chrome-off"
        :name="Math.random()"
      />
    </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { FormIF } from '@bcrs-shared-components/interfaces'

@Component({})
export default class FolioNumberInput extends Vue {
  $refs!: Vue['$refs'] & {
    folioForm: FormIF
  }

  /** Whether to validate the fields. */
  @Prop({ default: false })
  readonly validate: boolean

  /** Folio Number prop. */
  @Prop({ default: null })
  readonly folioNumber: string

  /** Folio form model property. */
  private folioFormValid = false

  /** Validation rules for Folio Number. */
  private readonly folioNumberRules: Array<Function> = [
    v => (!v || !this.validate || v.length <= 50) || 'Cannot exceed 50 characters' // maximum character count
  ]

  /** Emits an event indicating whether or not this component is valid. */
  @Emit('valid')
  private emitValid (): boolean {
    return this.folioFormValid
  }

  /** Prompt the field validations. */
  @Watch('folioFormValid')
  @Watch('validate')
  private validateField (): void {
    if (this.validate) {
      this.$refs.folioForm.validate()
      this.emitValid()
    }
  }
  /** Emits an event to update the Folio Number. */
  @Emit('emitFolioNumber')
  private emitFolioNumber (val: string): void {}
}
</script>
