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
                :disabled="disableEdit"
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
                <div class="certify-stmt" :class="{'error-text': invalidSection && !isCertified}" v-if="isStaff">
                  <strong>{{ trimmedCertifiedBy || "[Legal Name]" }}</strong>
                  certifies that they have relevant knowledge of the
                  {{ entityDisplay || "association" }} and is authorized to
                  make this filing.
                </div>
                <div class="certify-stmt" :class="{'error-text': invalidSection && !isCertified}" v-else>
                  I,
                  <strong>{{ trimmedCertifiedBy || "[Legal Name]" }}</strong>
                  , certify that I have relevant knowledge of the
                  {{ entityDisplay || "association" }} and I am authorized to
                  make this filing.
                </div>
              </template>
            </v-checkbox>
            <ul class="certify-statements mt-4">
              <li v-for="(statement, index) in statements" :key="`statement-${index}`" class="pt-2">
                {{ statement }}
              </li>
            </ul>
            <p class="certify-clause py-3"><strong>Date:</strong> {{ currentDate }}</p>
            <p class="certify-clause">{{ message }}</p>

            <!-- Incorporation MailTo Section -->
            <template v-if="enableMailTo">
              <p class="mt-4">
                Copies of the incorporation documents will be sent to the following email addresses:
              </p>
              <ul class="email-addresses">
                <li id="business-email">
                  <span>Registered office email address:</span>
                  <a v-if="businessEmail" :href="`mailto:${businessEmail}`">{{ businessEmail }}</a>
                  <span v-else>(Not entered)</span>
                </li>
                <li id="completing-party-email">
                  <span>Completing party email address:</span>&nbsp;
                  <a v-if="completingPartyEmail" :href="`mailto:${completingPartyEmail}`">{{ completingPartyEmail }}</a>
                  <span v-else>(Not entered)</span>
                </li>
              </ul>
            </template>
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

  /** Certified Company statements . */
  @Prop({ default: [] })
  private statements: []

  /** Message prop. */
  @Prop({ default: '' })
  private message: string

  /** Entity Display prop. */
  @Prop({ default: '' })
  private entityDisplay: string

  /** Enable MailTo prop. */
  @Prop({ default: false })
  private enableMailTo: boolean

  /** Business Email address. */
  @Prop({ default: '' })
  private businessEmail: string

  /** Completing Party Email address. */
  @Prop({ default: '' })
  private completingPartyEmail: string

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

  /** Disable Text Input field. */
  @Prop({ default: false })
  private disableEdit: boolean

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

// Vuetify overrides
::v-deep .v-label {
  color: $gray7;
  font-weight: normal;
}

::v-deep .v-input--is-disabled input,
.v-input--is-disabled textarea {
  color: $gray9;
}
</style>
