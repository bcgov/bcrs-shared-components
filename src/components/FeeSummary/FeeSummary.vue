<template>
  <aside id="fee-summary">
    <sbc-fee-summary
      :filingData="[...filingData]"
      :payURL="payApiUrl"
    />

    <v-row class="mt-1">
      <v-col cols="8" class="pr-2">
        <v-btn
          id="save-resume-btn"
          large
          :loading="isBusySaving"
          @click="emitAction(SummaryActions.SAVE_RESUME_LATER)"
        >
          <span>Save and Resume Later</span>
        </v-btn>
      </v-col>
      <v-col cols="4" class="pl-2">
        <v-btn
          id="delete-all-btn"
          large
          @click="emitAction(SummaryActions.DELETE_ALL)"
        >
          <span>Delete All</span>
        </v-btn>
      </v-col>
      <v-col cols="12" class="py-1">
        <v-btn
          id="confirm-btn"
          large
          :disabled="hasConflicts"
          @click="emitAction(SummaryActions.CONFIRM)"
        >
          <span>{{confirmLabel}}</span>
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="errorMessage" v-html="errorMessage" class="error-msg pre-wrap mt-1" />
  </aside>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

// Enums and Interfaces
import { SummaryActions } from '@bcrs-shared-components/enums'
import { FilingDataIF } from '@bcrs-shared-components/interfaces'

// Component Dependency
import SbcFeeSummary from 'sbc-common-components/src/components/SbcFeeSummary.vue'

@Component({
  components: { SbcFeeSummary }
})
export default class FeeSummary extends Vue {
  readonly SummaryActions = SummaryActions

  /** Filing information to calculate fees. */
  @Prop({ default: null })
  readonly filingData: FilingDataIF

  /** URL for Sbc Fee Summary component to get fees. */
  @Prop({ default: '' })
  readonly payApiUrl: string

  /** Indicator that something isn't valid. */
  @Prop({ default: false })
  readonly hasConflicts: boolean

  /** Indicator that there is a request in progress. */
  @Prop({ default: false })
  readonly isBusySaving: boolean

  /** Label for Confirm button. */
  @Prop({ default: 'Confirm' })
  readonly confirmLabel: boolean

  /** Message to display if there is an error. */
  @Prop({ default: '' })
  readonly errorMessage: string

  /** Emit action event. */
  @Emit('action')
  private emitAction (action: string): void {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

#fee-summary {
  .v-btn {
    width: 100%;
    border: 1.25px solid $app-blue;
    color: $app-blue;
    box-shadow: 0 1px 2px 0 rgba(33,37,41,0.2);
    border-radius: 4px;
  }

  #confirm-btn {
    color: white;
    background-color: $app-blue;
    font-weight: bold;
  }

  .v-btn[disabled] {
    color: white !important;
    background-color: $app-blue !important;
    opacity: 0.2;
  }

  .error-msg {
    font-size: 0.75rem;
    color: $app-red;
    text-align: center;
  }
}
</style>
