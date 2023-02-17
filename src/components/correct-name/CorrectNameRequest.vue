<template>
  <v-form id="correct-name-request-form" ref="form" v-model="formValid" lazy-validation>
    <ConfirmDialogShared
      ref="confirm"
      attach="#app"
    />

    <v-row no-gutters>
      <v-col cols="1" class="mt-1">
        <v-chip class="step-icon">1</v-chip>
      </v-col>
      <v-col>
        <v-text-field
          v-model="nrNumber"
          id="nr-number"
          filled
          persistent-hint
          class="text-input-field"
          label="Enter the NR Number"
          hint="Example: NR 1234567"
          :rules="nrNumRules"
          @keyup="uppercase('nrNumber')"
        />
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-4 mb-n1">
      <v-col cols="1" class="mt-1">
        <v-chip class="step-icon">2</v-chip>
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="applicantPhone"
          id="applicant-phone"
          filled
          persistent-hint
          class="text-input-field"
          label="Applicant's Phone Number"
          hint="Example: 555-555-5555"
          type="tel"
          :rules="phoneRules"
        />
      </v-col>
      <div class="ma-5">or</div>
      <v-col>
        <v-text-field
          v-model="applicantEmail"
          id="applicant-email"
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
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
import { ConfirmDialog as ConfirmDialogShared } from '@bcrs-shared-components/confirm-dialog'
import { CommonMixin, NameRequestMixin } from '@/mixins' // *** TODO - verify this
import { ConfirmDialogType, NameRequestIF, NrResponseIF } from '@bcrs-shared-components/interfaces'
import { NameChangeOptions } from '@bcrs-shared-components/enums'
import { CorpTypeCd, GetCorpFullDescription } from '@bcrs-shared-components/corp-type-module'

interface NrCorrectionIF {
  legalType: CorpTypeCd,
  nrNumber: string,
  legalName: string,
  expiry: string,
  requestType: string,
  status: NameRequestStates,
  applicant: NrApplicantIF
}

@Component({
  components: {
    ConfirmDialogShared
  },
  mixins: [
    CommonMixin,
    NameRequestMixin
  ]
})
export default class CorrectNameRequest extends Vue {
  // Refs
  $refs!: {
    confirm: ConfirmDialogType
    form: HTMLFormElement
  }

  @Prop({ default: null }) readonly formType!: NameChangeOptions
  @Prop({ default: null }) readonly entityType!: CorpTypeCd
  @Prop({ default: () => {} }) readonly nameRequest!: NameRequestIF
  @Prop({ default: false }) readonly validate!: boolean

  // Local properties
  formValid = false
  nrNumber = ''
  applicantPhone = ''
  applicantEmail = ''

  // Rules
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

  /** Returns true if NR number is valid. */
  private isValidNrNumber (value: string): boolean {
    const VALID_FORMAT = new RegExp(/^(NR )\d{7}$/)
    return VALID_FORMAT.test(value)
  }

  /** Returns true if email is valid. */
  private isValidEmail (value: string): boolean {
    // don't validate empty value
    if (value?.length < 1) return true // *** TODO: shouldn't this be False?

    // if we have a phone number then email is optional
    if (!!this.applicantPhone && !!value) return true

    // check email format
    // eslint-disable-next-line max-len
    const VALID_FORMAT = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return VALID_FORMAT.test(value)
  }

  @Watch('validate')
  private onValidate (): void {
    this.$refs.form.validate()
  }

  /** Watch for form submission and emit results. */
  @Watch('formType')
  private async onSubmit (): Promise<any> {
    // safety check
    if (this.formType === NameChangeOptions.CORRECT_NEW_NR) {
      try {
        // *** TODO: fetch NR here - call fetchAndValidate() ?
        // *** TODO: update Name Request Mixin as per shared repo
        let nr = {} as NrResponseIF
        // Validate and return the name request data
        nr = this.validateNameRequest(nr, this.applicantPhone, this.applicantEmail)

        if (this.entityType !== nr.legalType) {
          // Invalid NR type, inform parent the process is done and prompt confirm dialog
          this.$refs.form.resetValidation()
          this.emitSaved(false)

          const nrFullDescription = GetCorpFullDescription(nr.entity_type_cd)
          const entityFullDescription = GetCorpFullDescription(this.entityType)
          const dialogContent = `<p class="info-text">This ${nrFullDescription} Name Request` +
            `does not match the current business type <b>${entityFullDescription}</b>.\n\n` +
            `The Name Request type must match the business type before you can continue.</p>`
          await this.showConfirmDialog(
            this.$refs.confirm,
            'Name Request Type Does Not Match Business Type',
            dialogContent,
            'OK'
          )
        } else {
          this.parseNameRequest(nr)
          this.emitSaved(true)
        }
      } catch {
        // "validateNameRequest" handles its own errors
        // inform parent that process is complete
        this.$refs.form.resetValidation()
        this.emitSaved(false)
      }
    }
  }

  /** Parse and set the name request object. */
  private parseNameRequest (nr: NrResponseIF): void {
    const nrCorrection: NrCorrectionIF = {
      legalType: nr.legalType,
      nrNumber: this.nrNumber,
      legalName: this.getNrApprovedName(nr) || '',
      expiry: nr.expirationDate,
      status: nr.state,
      requestType: nr.request_action_cd,
      applicant: {
        fullName: this.formatFullName(nr.applicants),
        fullAddress: this.formatFullAddress(nr.applicants),
        phoneNumber: nr.applicants.phoneNumber,
        emailAddress: nr.applicants.emailAddress
      }
    }

    // set the new correction NR data
    this.emitNameRequest({
      ...this.nameRequest,
      ...nrCorrection
    })
  }

  /** Inform parent that the process is complete. */
  @Emit('saved')
  private emitSaved (val: boolean): void {}

  /** Watch for changes and inform parent when form is valid and ready for submission. */
  @Watch('formValid')
  @Watch('nrNumber')
  @Watch('applicantPhone')
  @Watch('applicantEmail')
  @Emit('valid')
  private emitValid (): boolean {
    return (
      this.formValid &&
      !!this.nrNumber &&
      (!!this.applicantPhone || !!this.applicantEmail)
    )
  }

  /** Inform parent of updated name request object. */
  @Emit('update:nameRequest')
  private emitNameRequest (nameRequest: NameRequestIF): void {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.step-icon {
  font-size: small;
  font-weight: bold;
  pointer-events: none;
}

:deep(#nr-number) {
  // hide uppercase transformation delay from user
  text-transform: uppercase;
}

:deep(.theme--light.v-label) {
  font-size: 1rem;
  color: $gray7;
  font-weight: normal;
}
</style>
