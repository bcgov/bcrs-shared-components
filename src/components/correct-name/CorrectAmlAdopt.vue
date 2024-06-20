<template>
  <v-form
    id="correct-aml-adopt-form"
    ref="form"
    v-model="formValid"
  >
    <v-radio-group
      v-if="radioOptions.length > 0"
      v-model="option"
      hide-details
      :rules="[(option !== null)]"
    >
      <v-radio
        v-for="(item, index) in radioOptions"
        :id="`radio-${index}`"
        :key="item.id"
        :value="index"
      >
        <template #label>
          <div
            class="radio-option ml-6"
            v-html="item.name"
          />
        </template>
      </v-radio>
    </v-radio-group>

    <v-card
      v-else
      outlined
      class="rounded-0 ma-0"
    >
      <div class="px-7 py-5">
        You will be able to adopt a name from the businesses in the list that have
        the same business type as the resulting business.
      </div>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
import { CorrectNameOptions } from '@bcrs-shared-components/enums'

@Component({})
export default class CorrectAmlAdopt extends Vue {
  // Refs
  $refs: {
    form: HTMLFormElement
  }

  @Prop({ default: () => [] }) readonly amalgamatingBusinesses!: any[]
  @Prop({ required: true }) readonly formType!: CorrectNameOptions
  @Prop({ required: true }) readonly validate!: boolean

  option = null as string // initially "none"
  formValid = false // initially invalid

  /** The list of applicable amalgamating business names. */
  get radioOptions (): Array<any> {
    return this.amalgamatingBusinesses
      .map((business: any) => ({ name: business.name, id: business.identifier }))
  }

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private onSubmit (): void {
    // process only when current form type matches
    if (this.formType === CorrectNameOptions.CORRECT_AML_ADOPT) {
      // emit new data
      this.emitCompanyName(this.radioOptions[this.option].name)
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
  private emitSaved (saved: boolean): void {}

  /** Inform parent of updated company name. */
  @Emit('update:companyName')
  private emitCompanyName (companyName: string): void {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

// styling same as message box in Create UI
.v-card {
  background-color: $BCgovGold0 !important;
  border-color: $BCgovGold5 !important;

  div {
    font-size: $px-14;
    letter-spacing: 0.01rem;
    color: $gray7;
  }
}

// remove extra padding and margin from radio group
.v-input--selection-controls {
  padding: 0;
  margin: 0;
}

// increase vertical space between radio buttons
:deep(.v-input--radio-group--column .v-radio:not(:last-child):not(:only-child)) {
  margin-bottom: 0.75rem;
}

// style the radio labels
:deep(.theme--light.v-label) {
  font-size: 1rem;
  color: $gray7;
}
</style>
