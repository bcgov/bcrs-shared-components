<template>
  <section id="completing-party" class="section-container" :class="{'invalid-section': invalidCompletingParty }">
    <!-- Add/Edit Block -->
    <template v-if="enableAddEdit">
      <v-row no-gutters>
        <v-col cols="12" sm="3">
          <label class="add-person-header">
            <span :class="{ 'error-text': invalidCompletingParty }">Add Person</span>
          </label>
        </v-col>

        <v-col>
          <v-form
            id="completing-party-form"
            ref="completingPartyForm"
            v-model="completingPartyFormValid"
            v-on:submit.prevent
          >
            <!-- Person's Name -->
            <label class="sub-header">Person's Name</label>
            <v-row no-gutters class="pt-6">
              <v-col>
                <v-text-field
                  filled
                  class="item"
                  label="First Name"
                  id="person__first-name"
                  :rules="firstNameRules"
                  v-model="completingParty.firstName"
                />
              </v-col>
              <v-col class="px-4">
                <v-text-field
                  filled
                  class="item"
                  label="Middle Name"
                  id="person__middle-name"
                  :rules="middleNameRules"
                  v-model="completingParty.middleName"
                />
              </v-col>
              <v-col>
                <v-text-field
                  filled
                  class="item"
                  label="Last Name"
                  id="person__last-name"
                  :rules="lastNameRules"
                  v-model="completingParty.lastName"
                />
              </v-col>
            </v-row>

            <!-- Mailing Address -->
            <div class="mt-2">
              <label class="sub-header">Mailing Address</label>
              <div class="address-wrapper pt-6">
                <base-address
                  ref="mailingAddress"
                  :editing="true"
                  :schema="addressSchema"
                  :address="currentCompletingParty && currentCompletingParty.mailingAddress"
                  @update:address="completingParty.mailingAddress = $event"
                  @valid="addressValid = $event"
                />
              </div>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </template>

    <template v-else-if="hasCurrentCompletingParty">

      <!-- List Headers -->
      <v-row class="list-header pb-3" no-gutters>
        <v-col
          v-for="(title, index) in tableHeaders"
          :key="index"
          cols="12" sm="3"
        >
          <span>{{ title }}</span>
        </v-col>
      </v-row>

      <!-- List Content -->
      <v-row class="list-content section-container" no-gutters>
        <!-- Name -->
        <v-col class="pr-2" cols="12" sm="3">
          <v-row no-gutters>
            <v-col cols="1" class="mt-n1 ml-n1 mr-3">
              <v-icon color="gray9">mdi-account</v-icon>
            </v-col>
            <v-col>
              <p class="list-subtitle ma-0 mb-1">{{ getCompletingPartyName }}</p>
            </v-col>
          </v-row>
        </v-col>

        <!-- Mailing Address -->
        <v-col cols="12" :sm="8">
          <base-address class="peoples-roles-mailing-address" :address="currentCompletingParty.mailingAddress" />
        </v-col>
      </v-row>
    </template>

    <template v-else>Unknown Completing Party</template>
  </section>
</template>

<script lang="ts">
import { Component, Emit, Prop, Watch, Vue } from 'vue-property-decorator'
import { CompletingPartyIF, FormIF } from '@bcrs-shared-components/interfaces'
import BaseAddress from 'sbc-common-components/src/components/BaseAddress.vue'
import { cloneDeep } from 'lodash'

@Component({
  components: {
    BaseAddress
  }
})
export default class CompletingParty extends Vue {
  // Refs
  $refs!: {
    completingPartyForm: FormIF
    mailingAddress: FormIF,
  }

  /** The current completing party. */
  @Prop({ default: () => {} })
  readonly currentCompletingParty: CompletingPartyIF

  /** Enable Add / Edit mode. */
  @Prop({ default: false })
  readonly enableAddEdit: boolean

  @Prop({ default: () => {} })
  readonly addressSchema: any

  @Prop({ default: false })
  readonly validate: boolean

  /** Headers for the completing party table. */
  readonly tableHeaders = ['Name', 'Mailing Address']

  /** Models value for completing party form validity. */
  private completingPartyFormValid = null
  private addressValid = null

  /** The local completing party model. */
  private completingParty: CompletingPartyIF = {
    firstName: '',
    lastName: '',
    middleName: '',
    mailingAddress: {
      streetAddress: '',
      streetAddressAdditional: '',
      addressCity: '',
      addressRegion: '',
      postalCode: '',
      addressCountry: '',
      deliveryInstructions: ''
    }
  }

  private firstNameRules = [
    (v: string) => !!v || 'A first name is required',
    (v: string) => !/^\s/g.test(v) || 'Invalid spaces', // leading spaces
    (v: string) => !/\s$/g.test(v) || 'Invalid spaces', // trailing spaces
    (v: string) => (v?.length <= 30) || 'Cannot exceed 30 characters' // maximum character count
  ]

  private middleNameRules = [
    (v: string) => !/^\s/g.test(v) || 'Invalid spaces', // leading spaces
    (v: string) => !/\s$/g.test(v) || 'Invalid spaces', // trailing spaces
    (v: string) => (!v || v.length <= 30) || 'Cannot exceed 30 characters' // maximum character count
  ]

  private lastNameRules = [
    (v: string) => !!v || 'A last name is required',
    (v: string) => !/^\s/g.test(v) || 'Invalid spaces', // leading spaces
    (v: string) => !/\s$/g.test(v) || 'Invalid spaces', // trailing spaces
    (v: string) => (v?.length <= 30) || 'Cannot exceed 30 characters' // maximum character count
  ]

  /** True when the current completing party has all required properties. */
  private get hasCurrentCompletingParty (): boolean {
    return (
      !!this.currentCompletingParty?.firstName &&
      !!this.currentCompletingParty?.lastName &&
      !!this.currentCompletingParty?.mailingAddress.addressCity &&
      !!this.currentCompletingParty?.mailingAddress.addressCountry &&
      !!this.currentCompletingParty?.mailingAddress.addressRegion &&
      !!this.currentCompletingParty?.mailingAddress.postalCode &&
      !!this.currentCompletingParty?.mailingAddress.streetAddress
    )
  }

  created (): void {
    if (this.currentCompletingParty) {
      this.completingParty = cloneDeep(this.currentCompletingParty)
    }
  }

  private get getCompletingPartyName (): string {
    return (`
      ${this.currentCompletingParty.firstName}
      ${this.currentCompletingParty.middleName || ''}
      ${this.currentCompletingParty.lastName}
    `) || 'Unknown'
  }

  /** The name section validity state (when prompted by app). */
  private get invalidCompletingParty (): boolean {
    return this.validate && !this.hasCurrentCompletingParty && !this.addressValid
  }

  /** Emits Add or Edit completing party event. */
  @Watch('validate')
  @Emit('addEditCompletingParty')
  private addEditCompletingParty (): CompletingPartyIF {
    this.$refs.completingPartyForm && this.$refs.completingPartyForm.validate()
    this.$refs.mailingAddress && this.$refs.mailingAddress.$refs.addressForm.validate()

    return this.completingParty
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';
.list-header {
  // NB: same styles as v-data-table header
  color: $gray9;
  font-size: $px-14;
  font-weight: bold;
}

.list-content {
  margin: 0 -28px;
  border-top: 1px solid $gray3;

  p {
    font-size: $px-14;
  }

  .list-subtitle {
    color: $gray9;
    font-weight: bold;
  }
}

.actions {
  position: absolute;
  right: 0;
  margin-top: -0.5rem;

  .v-btn {
    min-width: 0.5rem;
  }

  .v-btn + .v-btn {
    margin-left: 0.5rem;
  }
}

// Override base Address font style/colour
::v-deep {
  .address-block {
    font-size: $px-14;
    color: $gray7;
  }
  .v-chip {
    opacity: 1 !important;
  }

  .theme--light.v-label {
    font-size: 1rem;
    color: $gray7;
    font-weight: normal;
  }

  .theme--light.v-input input, .theme--light.v-input textarea {
    color: $gray9;
  }
}
</style>
