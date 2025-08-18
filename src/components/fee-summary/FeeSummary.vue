<template>
  <aside id="fee-summary">
    <SbcFeeSummary
      :filingData="[...filingData]"
      :payURL="payApiUrl"
    />

    <v-row no-gutters>
      <v-col
        v-if="isSummaryMode"
        class="pt-3 pr-3"
      >
        <v-btn
          id="back-btn"
          large
          :loading="loadingButton === FeeSummaryActions.BACK"
          @click="emitAction(FeeSummaryActions.BACK)"
        >
          <span><v-icon>mdi-chevron-left</v-icon>Back</span>
        </v-btn>
      </v-col>
      <v-col class="pt-3">
        <v-btn
          id="cancel-btn"
          large
          :loading="loadingButton === FeeSummaryActions.CANCEL"
          @click="emitAction(FeeSummaryActions.CANCEL)"
        >
          <span>Cancel</span>
        </v-btn>
      </v-col>
      <v-col class="pt-3">
        <v-btn
          id="save-resume-later-btn"
          large
          :disabled="isSaveResumeLaterDisabled"
          :loading="loadingButton === FeeSummaryActions.SAVE_RESUME_LATER"
          @click="emitAction(FeeSummaryActions.SAVE_RESUME_LATER)"
        >
          <span>Save and Resume Later</span>
        </v-btn>
      </v-col>
      <v-col class="pt-3">
        <v-btn
          id="confirm-btn"
          large
          :disabled="isConfirmDisabled"
          :loading="loadingButton === FeeSummaryActions.CONFIRM"
          @click="emitAction(FeeSummaryActions.CONFIRM)"
        >
          <span>{{ confirmLabel }}<v-icon>mdi-chevron-right</v-icon></span>
        </v-btn>
      </v-col>
    </v-row>

    <div
      v-if="errorMessage"
      class="error-msg pre-wrap mt-1"
      v-html="errorMessage"
    />
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { FeeSummaryActions } from '@bcrs-shared-components/enums'
import { FilingDataIF } from '@bcrs-shared-components/interfaces'
import SbcFeeSummary from './SbcFeeSummary.vue'

@Component({
  components: { SbcFeeSummary }
})
export default class FeeSummary extends Vue {
  readonly FeeSummaryActions = FeeSummaryActions

  /** Filing information to calculate fees. */
  @Prop({ default: () => [] }) readonly filingData!: Array<FilingDataIF>

  /** URL for Sbc Fee Summary component to get fees. */
  @Prop({ default: '' }) readonly payApiUrl!: string

  /** Whether to disable the Save and Resume Later button. */
  @Prop({ default: false }) readonly disableSaveResumeLater!: boolean

  /** Indicator that something isn't valid. This disables the confirm button. */
  @Prop({ default: false }) readonly hasConflicts!: boolean

  /** Label for Confirm button. */
  @Prop({ default: 'Confirm' }) readonly confirmLabel!: string

  /** Message to display if there is an error. */
  @Prop({ default: '' }) readonly errorMessage!: string

  /** Prop to indicate summary mode. */
  @Prop({ default: false }) readonly isSummaryMode!: boolean

  /** Prop to indicate loading button. */
  @Prop({ default: null }) readonly loadingButton!: FeeSummaryActions | null

  /** Emit action event. */
  @Emit('action')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emitAction (action: FeeSummaryActions): void {}

  get isSaveResumeLaterDisabled (): boolean {
    return (
      this.disableSaveResumeLater ||
      (this.loadingButton != null && this.loadingButton !== FeeSummaryActions.SAVE_RESUME_LATER)
    )
  }

  get isConfirmDisabled (): boolean {
    return (
      this.hasConflicts || (this.loadingButton != null && this.loadingButton !== FeeSummaryActions.CONFIRM)
    )
  }
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

  :deep(.fee-list) {
    padding-left: 0;
  }
}
</style>
