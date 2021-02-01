<template>
  <aside id="fee-summary" v-if="showFeeSummary">
    <affix
      relative-element-selector=".col-lg-9"
      :offset="{ top: 86, bottom: 12 }">
      <sbc-fee-summary
        :filingData="[...filingData]"
        :payURL="payApiUrl"
      />
      <template>
        <v-row class="mt-1">
          <v-col cols="6" class="pr-2">
            <v-btn id="save-resume-btn" large
                   :loading="isBusySaving"
                   @click="emitAction('resume')">
              <span>Resume Later</span>
            </v-btn>
          </v-col>
          <v-col cols="6" class="pl-2">
            <v-btn id="cancel-btn" large
                   @click="emitAction('cancel')">
              <span>Cancel</span>
            </v-btn>
          </v-col>
          <v-col cols="12" class="py-1">
            <v-btn id="confirm-btn" large
                   :disabled="hasConflicts"
                   @click="emitAction('confirm')">
              <span>{{confirmLabel}}</span>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </affix>
  </aside>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

// Interfaces
import { FilingDataIF } from '@bcrs-shared-components/interfaces'

// Component Dependency
import SbcFeeSummary from 'sbc-common-components/src/components/SbcFeeSummary.vue'

@Component({
  components: { SbcFeeSummary }
})
export default class FeeSummary extends Vue {
  /** To hide or show the action summary. */
  @Prop({ default: false })
  readonly showFeeSummary: boolean

  /** Filing information to calculate fees. */
  @Prop({ default: null })
  readonly filingData: FilingDataIF

  /** Url at which to request fee calculations. */
  @Prop({ default: '' })
  readonly payApiUrl: string

  /** Indicating something isn't valid. */
  @Prop({ default: false })
  readonly hasConflicts: boolean

  /** Indicator that there is a request in progress. */
  @Prop({ default: false })
  readonly isBusySaving: boolean

  /** Indicator that the client is in Summary mode. */
  @Prop({ default: false })
  readonly isSummaryMode: boolean

  /** Return the correct btn label according to state. */
  private get confirmLabel (): string {
    return this.isSummaryMode ? 'File and Pay' : 'Review and Certify'
  }

  /** Emit action event. */
  @Emit('action')
  private emitAction (action: string): void {
    console.log()
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
}
</style>
