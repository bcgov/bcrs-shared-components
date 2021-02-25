<template>
  <div id="contact-info">
    <!-- Display Contact Info -->
    <v-layout row v-if="!isEditing" class="mx-0">
      <v-flex xs3>
        <label>
          <span>Registered Office <br> Contact Information</span>
          <v-flex>
            <v-chip v-if="hasBusinessContactInfoChange" x-small label color="primary" text-color="white">
              {{editedLabel}}
            </v-chip>
          </v-flex>
        </label>
      </v-flex>

      <!-- Email Address -->
      <v-flex xs4>
        <label class="d-flex flex-wrap">
          <span class="subtitle mr-2">Email Address</span>
        </label>
        <div id="lbl-email" class="info-text">
          {{ !!businessContact.email ? businessContact.email : "(Not entered)" }}
        </div>
      </v-flex>

      <!-- Phone Number -->
      <v-flex xs4>
        <label class="d-flex flex-wrap">
          <span class="subtitle mr-2">Phone Number</span>
        </label>
        <div id="lbl-phone" v-if="!!businessContact.phone" class="info-text">
          {{ businessContact.phone }}
          <span v-if="!!businessContact.extension">Ext: {{ businessContact.extension }}</span>
        </div>
        <div id="lbl-no-phone" v-else class="info-text">(Not entered)</div>
      </v-flex>

      <!-- Edit Actions -->
      <v-flex v-if="!disableActions" xs1 class="mt-n2">
        <div class="actions mr-4">
          <v-btn
            v-if="hasBusinessContactInfoChange"
            id="btn-undo-contact-info"
            text color="primary"
            @click="resetContactInfo()"
          >
            <v-icon small>mdi-undo</v-icon>
            <span>Undo</span>
          </v-btn>
          <v-btn
            v-else
            id="btn-correct-contact-info"
            text color="primary"
            @click="isEditing = true"
          >
            <v-icon small>mdi-pencil</v-icon>
            <span>{{editLabel}}</span>
          </v-btn>

          <!-- Drop Down Actions -->
          <span class="more-actions" v-if="hasBusinessContactInfoChange">
            <v-menu
              offset-y left nudge-bottom="4"
              v-model="dropdown"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text small color="primary"
                  id="btn-more-actions"
                  v-on="on"
                >
                  <v-icon>{{dropdown ? 'mdi-menu-up' : 'mdi-menu-down'}}</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  id="btn-more-actions-edit"
                  class="v-list-item"
                  @click="isEditing = true; dropdown = false"
                >
                  <v-list-item-subtitle>
                    <v-icon small color="primary">mdi-pencil</v-icon>
                    <span class="drop-down-action ml-1">Change</span>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-menu>
          </span>
        </div>
      </v-flex>
    </v-layout>

    <!-- Edit Contact Info -->
    <template v-else id="edit-contact-form">
      <v-layout row class="mx-0">
        <v-flex xs3>
          <label>Registered Office <br>Contact Information</label>
        </v-flex>
      </v-layout>

      <v-layout row class="mx-0">
        <v-flex xs3></v-flex>
        <v-flex xs9 class="my-4 info-text">
          There is no fee to change Registered Office Contact Information. Any changes made will be applied immediately.
        </v-flex>
      </v-layout>

      <v-form
        v-model="formValid"
        ref="editContactForm"
        name="business-contact-form"
        class="business-contact-form pt-5"
        @submit.prevent="submitContact()"
      >
        <!-- Line 1 -->
        <v-layout row class="mx-0">
          <v-flex xs3>
            <label>Email Address</label>
          </v-flex>
          <v-flex xs9>
            <v-text-field
              id="txt-email"
              filled
              label="Email Address"
              req
              persistent-hint
              :rules="emailRules"
              v-model="contactInfo.email"
              validate-on-blur
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <!-- Line 2 -->
        <v-layout row class="mx-0">
          <v-flex xs3>
            <label>Confirm Email</label>
          </v-flex>
          <v-flex xs9>
            <v-text-field
              id="txt-confirm-email"
              filled
              label="Confirm Email Address"
              req
              persistent-hint
              :rules="confirmEmailRules"
              v-model="contactInfo.confirmEmail"
              validate-on-blur
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <!-- Line 3 -->
        <v-layout row class="mx-0">
          <v-flex xs3>
            <label>Phone Number</label>
          </v-flex>
          <v-flex s4 class="mr-1">
            <v-text-field
              id="txt-phone"
              filled
              label="Phone Number"
              persistent-hint
              hint="Example: (555) 555-5555"
              type="tel"
              v-mask="['(###) ###-####']"
              v-model="contactInfo.phone"
              :rules="phoneRules"
              validate-on-blur
            >
            </v-text-field>
          </v-flex>
          <v-flex s4>
            <v-text-field
              id="txt-phone-extension"
              filled
              label="Extension (Optional)"
              persistent-hint
              v-mask="'#####'"
              v-model="contactInfo.extension"
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <!-- Form Actions -->
        <v-layout row class="mx-0 pt-3">
          <v-flex xs12>
            <div class="action-btns">
              <v-btn
                id="done-btn"
                large color="primary"
                type="submit"
                value="Submit"
              >
                <span>Save</span>
              </v-btn>
              <v-btn
                id="cancel-btn"
                large outlined color="primary"
                @click="cancelEdit()"
              >
                <span>Cancel</span>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-form>
    </template>
  </div>
</template>

<script lang="ts">
// Libraries
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator'
import { mask } from 'vue-the-mask'

// Interfaces & enums
import { ContactPointIF, FormIF } from '@bcrs-shared-components/interfaces'

@Component({
  directives: { mask }
})
export default class ContactInfo extends Vue {
  // Refs
  $refs!: Vue['$refs'] & {
    editContactForm: FormIF,
  }

  /** The current business contact information */
  @Prop()
  private businessContact!: ContactPointIF

  /** The baseline contact information */
  @Prop()
  private originalBusinessContact!: ContactPointIF

  /** Flag for identifying changes */
  @Prop()
  private hasBusinessContactInfoChange!: boolean

  /** Edit label name (ie 'Change' or 'Correct') */
  @Prop()
  private editLabel!: string

  /** Edited label name (ie 'Changed' or 'Corrected') */
  @Prop()
  private editedLabel!: string

  /** Option to disable the edit actions */
  @Prop({ default: false })
  private disableActions!: boolean

  // Local Properties
  private isEditing: boolean = false
  private contactInfo: ContactPointIF
  private formValid: boolean = false

  // Text-field Rules
  private emailRules = []
  private confirmEmailRules = []
  private phoneRules = []

  /** V-model for dropdown menu. */
  private dropdown: boolean = null

  /** Emit the updated data to parent component */
  private updateContactInfo (): void {
    this.emitContactInfo(this.contactInfo)
    this.isEditing = false
  }

  /** Cancel the current local edits */
  private cancelEdit (): void {
    this.contactInfo = { ...this.businessContact }
    this.emitContactInfo(this.contactInfo)
    this.isEditing = false
  }

  /** Restore the contact info to original values */
  private resetContactInfo (): void {
    this.contactInfo = { ...this.originalBusinessContact }
    this.emitContactInfo(this.contactInfo)
    this.isEditing = false
  }

  /** Submit method to handle validations and data update. */
  private async submitContact (): Promise<void> {
    // Set Rules on submission
    this.emailRules = [
      (v: string) => !!v || 'Email address is required',
      (v: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || 'Valid email is required'
      }
    ]
    this.confirmEmailRules = [
      (v: string) => !!v || 'Confirm email address',
      (v: string) => !v || (v.toString() === (this.$refs.editContactForm && this.$refs.editContactForm.$el[0].value)) ||
        'Email addresses must match'
    ]
    this.phoneRules = [
      (v: any) => !v || (v.length === 0 || v.length === 14) || 'Phone number is invalid'
    ]

    // Await the applied rules and validate form
    await Vue.nextTick()
    this.$refs.editContactForm.validate()

    // When valid, submit data
    if (this.formValid) this.updateContactInfo()
  }

  /** Initialize the contact info. */
  @Watch('businessContact', { deep: true, immediate: true })
  private initializeContactInfo () {
    this.contactInfo = { ...this.businessContact }
  }

  @Emit('contactInfoChange')
  private emitContactInfo (contactInfo: ContactPointIF): void { }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

[class^="col"] {
  padding-top: 0;
  padding-bottom: 0;
}

.actions {
  position: absolute;
  right: 0;

  .v-btn {
    min-width: 0.5rem;
  }
}

.action-btns {
  display: flex;
  justify-content: flex-end;

  .v-btn + .v-btn {
    margin-left: 0.5rem;
  }

  .v-btn {
    min-width: 6.5rem;
  }

  #done-btn[disabled] {
    color: white !important;
    background-color: $app-blue !important;
    opacity: 0.2;
  }
}

::v-deep .v-text-field .v-label {
  font-weight: normal;
  color: $gray7;
}

::v-deep .theme--light.v-input input {
  color: $gray9;
}
</style>
