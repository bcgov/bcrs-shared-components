<template>
  <v-form
    id="correct-name-request-form"
    ref="form"
    v-model="formValid"
    lazy-validation
  >
    <ConfirmDialogShared
      ref="confirm"
      attach="#app"
    />

    <v-row no-gutters>
      <v-col
        cols="1"
        class="mt-3"
      >
        <v-chip
          outlined
          class="step-icon"
        >
          1
        </v-chip>
      </v-col>
      <v-col>
        <v-text-field
          id="nr-number"
          v-model="nrNumber"
          filled
          persistent-hint
          class="text-input-field"
          label="Enter the NR Number"
          hint="Example: NR 1234567"
          :rules="nrNumRules"
          @keyup="nrNumber = nrNumber.toUpperCase()"
        />
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="mt-4 mb-n1"
    >
      <v-col
        cols="1"
        class="mt-3"
      >
        <v-chip
          outlined
          class="step-icon"
        >
          2
        </v-chip>
      </v-col>
      <v-col cols="5">
        <v-text-field
          id="applicant-phone"
          v-model="applicantPhone"
          filled
          persistent-hint
          class="text-input-field"
          label="Applicant's Phone Number"
          hint="Example: 555-555-5555"
          type="tel"
          :rules="phoneRules"
        />
      </v-col>
      <div class="ma-5">
        or
      </div>
      <v-col>
        <v-text-field
          id="applicant-email"
          v-model="applicantEmail"
          filled
          persistent-hint
          class="text-input-field"
          label="Applicant's Notification Email"
          hint="Example: name@email.com"
          type="email"
          :rules="emailRules"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component, Emit, mixins, Prop, Watch, Vue } from 'vue-facing-decorator'
import { ConfirmDialog as ConfirmDialogShared } from '@bcrs-shared-components/confirm-dialog'
import { NameRequestMixin } from '@bcrs-shared-components/mixins'
import { ConfirmDialogType, NameRequestIF } from '@bcrs-shared-components/interfaces'
import { CorpTypeCd, CorrectNameOptions } from '@bcrs-shared-components/enums'
import { GetCorpFullDescription } from '@bcrs-shared-components/corp-type-module'

@Component({
  components: {
    ConfirmDialogShared
  },
  mixins: [NameRequestMixin]
})
export default class CorrectNameRequest extends Vue {
  // Refs
  $refs!: {
    confirm: ConfirmDialogType
    form: HTMLFormElement
  }

  @Prop({ required: true }) readonly businessId!: string
  @Prop({ required: true }) readonly entityType!: CorpTypeCd
  @Prop({ required: true }) readonly fetchAndValidateNr!: (...args) => Promise<NameRequestIF>
  @Prop({ required: true }) readonly formType!: CorrectNameOptions
  @Prop({ required: true }) readonly nameRequest!: NameRequestIF
  @Prop({ required: true }) readonly validate!: boolean

  // Local properties
  applicantEmail = ''
  applicantPhone = ''
  formValid = false // initially invalid
  nrNumber = ''

  // Validation rules
  readonly nrNumRules = [
    (v: string) => !!v || 'Name Request Number is required',
    (v: string) => this.isValidNrNumber(v) || 'Name Request Number is invalid'
  ]
  readonly phoneRules = [
    (v: string) => !/^\s/g.test(v) || 'Invalid spaces', // leading spaces
    (v: string) => !/\s$/g.test(v) || 'Invalid spaces', // trailing spaces
    (v: string) => !(v?.length > 12) || 'Phone number is invalid'
  ]
  readonly emailRules = [
    (v: string) => !/^\s/g.test(v) || 'Invalid spaces', // leading spaces
    (v: string) => !/\s$/g.test(v) || 'Invalid spaces', // trailing spaces
    (v: string) => this.isValidEmail(v) || 'Email is invalid'
  ]

  /** Whether this component is valid. */
  get componentValid (): boolean {
    // 1. rules are valid
    // 2. we have a NR number
    // 3. we have either a phone number or an email
    return (
      this.formValid &&
      !!this.nrNumber &&
      (!!this.applicantPhone || !!this.applicantEmail)
    )
  }

  /** Returns true if NR number is valid. */
  private isValidNrNumber (value: string): boolean {
    const VALID_FORMAT = new RegExp(/^(NR )\d{7}$/)
    return VALID_FORMAT.test(value)
  }

  /** Returns true if email is valid. */
  private isValidEmail (value: string): boolean {
    // don't validate empty value
    if (value?.length < 1) return true

    // if we have a phone number then email is optional
    if (!!this.applicantPhone && !!value) return true

    // check email format
    // eslint-disable-next-line max-len
    const VALID_FORMAT = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return VALID_FORMAT.test(value)
  }

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private async onSubmit (): Promise<any> {
    // process only when current form type matches
    if (this.formType === CorrectNameOptions.CORRECT_NEW_NR) {
      try {
        // validate and return the name request data
        const nr = await this.fetchAndValidateNr(this.nrNumber, this.businessId, this.applicantPhone,
          this.applicantEmail)

        if (this.entityType !== nr.legalType) {
          // invalid NR type - inform parent the process is done and show dialog
          this.$refs.form.resetValidation()
          this.emitSaved(false)

          const nrFullDescription = GetCorpFullDescription(nr.legalType)
          const entityFullDescription = GetCorpFullDescription(this.entityType)
          const dialogContent = `<p class="info-text">This ${nrFullDescription} Name Request ` +
            `does not match the current business type <b>${entityFullDescription}</b>.\n\n` +
            `The Name Request type must match the business type before you can continue.</p>`
          await this.showConfirmDialog(
            this.$refs.confirm,
            'Name Request Type Does Not Match Business Type',
            dialogContent
          )
        } else {
          // emit new data
          this.emitNameRequest(nr)
          this.emitCompanyName(this.getNrApprovedName(nr))
          this.emitSaved(true)
        }
      } catch (error) {
        alert((error as any).message)

        // inform parent that process is complete
        this.$refs.form.resetValidation()
        this.emitSaved(false)
      }
    }
  }

  /** Validate or reset validation when parent tells us. */
  @Watch('validate')
  private onValidate (val: boolean): void {
    if (val) this.$refs.form.validate()
    else this.$refs.form.resetValidation()
  }

  /** Watch for changes and inform parent when component is valid. */
  @Watch('componentValid')
  @Emit('valid')
  private emitValid (): boolean {
    return this.componentValid
  }

  /** Inform parent that the process is complete. */
  @Emit('saved')
  private emitSaved (val: boolean): void {}

  /** Inform parent of updated company name. */
  @Emit('update:companyName')
  private emitCompanyName (name: string): void {}

  /** Inform parent of updated name request object. */
  @Emit('update:nameRequest')
  private emitNameRequest (nameRequest: NameRequestIF): void {}

  /**
   * Helper to show the confirm dialogs.
   * @param ref The dialog reference
   * @param title The title content in dialog header
   * @param message The content body
   * */
  private async showConfirmDialog (ref: ConfirmDialogType, title: string, message: string):
    Promise<boolean> {
    return ref.open(title, message, {
      width: '45rem',
      persistent: true,
      yes: 'OK',
      no: null,
      cancel: null
    }).catch(() => false)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.step-icon {
  border-color: $gray9;
  font-weight: bold;
  pointer-events: none;
}

// hide uppercase transformation delay from user
:deep(#nr-number) {
  text-transform: uppercase;
}

:deep(.theme--light.v-label) {
  font-size: 1rem;
  color: $gray7;
  font-weight: normal;
}
</style>
