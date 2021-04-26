<template>
  <v-card flat id="AR-step-4-container" class="pr-5">
    <v-form id="certify-form" ref="certifyForm" lazy-validation class="mt-4" v-on:submit.prevent>
      <v-container>
        <v-row class="pl-2" no-gutters>
          <v-col :cols="firstColumn">
            <label :class="{'error-text': invalidSection}"><strong>Legal Name</strong></label>
          </v-col>
          <v-col :cols="secondColumn" class="px-0">
            <div class="value certified-by">
              <v-text-field
                filled
                persistent-hint
                id="certified-by-textfield"
                label="Legal name of authorized person"
                :value="certifiedBy"
                :rules="[(v) => !!v || 'A person\'s legal name is required.']"
                @input="emitCertifiedBy($event)"
              />
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="pl-1">
          <v-col :cols="firstColumn" />
          <v-col :cols="secondColumn">
            <v-checkbox
              hide-details
              :value="isCertified"
              @change="emitIsCertified($event)"
              id="isCertified-checkbox"
            >
              <template slot="label">
                <div class="certify-stmt" :class="{'error-text': invalidSection}" v-if="isStaff">
                  <strong>{{ trimmedCertifiedBy || "[Legal Name]" }}</strong>
                  certifies that they have relevant knowledge of the
                  {{ entityDisplay || "association" }} and is authorized to
                  make this filing.
                </div>
                <div class="certify-stmt" :class="{'error-text': invalidSection}" v-else>
                  I,
                  <strong>{{ trimmedCertifiedBy || "[Legal Name]" }}</strong>
                  , certify that I have relevant knowledge of the
                  {{ entityDisplay || "association" }} and I am authorized to
                  make this filing.
                </div>
              </template>
            </v-checkbox>
            <p class="certify-clause py-3"><strong>Date:</strong> {{ currentDate }}</p>
            <p class="certify-clause">{{ message }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { FormIF } from '@bcrs-shared-components/interfaces'

@Component({})
export default class Certify extends Vue {
  @Prop({ default: '' })
  private currentDate!: string

  /** Is Staff prop. */
  @Prop({ default: false })
  private isStaff: boolean

  /** Certified By prop. */
  @Prop({ default: '' })
  private certifiedBy: string

  /** Is Certified prop. */
  @Prop({ default: false })
  private isCertified: boolean

  /** Message prop. */
  @Prop({ default: '' })
  private message: string

  /** Entity Display prop. */
  @Prop({ default: '' })
  private entityDisplay: string

  /** First column columns. */
  @Prop({ default: 2 })
  private firstColumn: number

  /** Second column columns. */
  @Prop({ default: 10 })
  private secondColumn: number

  /** Call field validations. */
  @Prop({ default: false })
  private validate: boolean

  /** Prompt Error. */
  @Prop({ default: false })
  private invalidSection: boolean

  // Form Ref
  $refs: { certifyForm: FormIF }

  /** Called when component is created. */
  private created (): void {
    // inform parent of initial validity
    this.emitValid(Boolean(this.trimmedCertifiedBy && this.isCertified))
  }

  /** The trimmed "Certified By" string (may be ''). */
  private get trimmedCertifiedBy (): string {
    // remove repeated inline whitespace, and leading/trailing whitespace
    return this.certifiedBy && this.certifiedBy.replace(/\s+/g, ' ').trim()
  }

  /** Prompt the field validations. */
  @Watch('validate')
  private validateFields (): void {
    this.$refs.certifyForm.validate()
  }

  /** Emits an event to update the Certified By prop. */
  @Emit('update:certifiedBy')
  private emitCertifiedBy (certifiedBy: string): string {
    // remove repeated inline whitespace, and leading/trailing whitespace
    certifiedBy = certifiedBy && certifiedBy.replace(/\s+/g, ' ').trim()
    this.emitValid(Boolean(certifiedBy && this.isCertified))
    return certifiedBy
  }

  /** Emits an event to update the Is Certified prop. */
  @Emit('update:isCertified')
  private emitIsCertified (isCertified: boolean): boolean {
    this.emitValid(Boolean(this.trimmedCertifiedBy && isCertified))
    return isCertified
  }

  /** Emits an event indicating whether or not the form is valid. */
  @Emit('valid')
  private emitValid (valid: boolean): void { }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

#AR-step-4-container {
  margin-top: 1rem;
  padding-bottom: 0.5rem;
  padding-top: 1rem;
  line-height: 1.2rem;
  font-size: 0.875rem;
}

.certified-by-container {
  display: flex;
  flex-flow: column nowrap;
  position: relative;

  > label:first-child {
    font-weight: 700;
    margin-bottom: 2rem;
  }
}

@media (min-width: 768px) {
  .certified-by-container {
    flex-flow: row nowrap;

    > label:first-child {
      flex: 0 0 auto;
      padding-right: 2rem;
      width: 12rem;
    }
  }
}

.value.certifiedBy {
  width: 100%;
}

.certify-clause {
  padding-left: 2rem;
  color: $gray7;
  font-size: 0.875rem;
}

.certify-stmt {
  display: inline;
  font-size: 0.875rem;
  color: $gray7;
  font-weight: normal;
}

::v-deep .v-label {
  color: $gray7;
  font-weight: normal;
}
</style>
