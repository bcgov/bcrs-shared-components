<template>
  <v-card
    id="relationships-panel"
    flat
  >
    <div
      class="relationship-content"
      :style="{ backgroundColor: bgHex }"
    >
      <v-row
        no-gutters
        class="align-center mt-5"
      >
        <v-col cols="4">
          <v-checkbox
            id="heir-legal-rep-checkbox"
            v-model="selectedRelationships"
            class="mt-0"
            :value="RelationshipTypes.HEIR_LEGAL_REP"
            :error="displayErrorState"
          >
            <template #label>
              <span class="checkbox-label">{{ RelationshipTypes.HEIR_LEGAL_REP }}</span>
            </template>
          </v-checkbox>
        </v-col>
        <v-col cols="4">
          <v-checkbox
            id="officer-checkbox"
            v-model="selectedRelationships"
            class="mt-0"
            :value="RelationshipTypes.OFFICER"
            :error="displayErrorState"
          >
            <template #label>
              <span class="checkbox-label">{{ RelationshipTypes.OFFICER }}</span>
            </template>
          </v-checkbox>
        </v-col>
        <v-col cols="4">
          <v-checkbox
            id="director-checkbox"
            v-model="selectedRelationships"
            class="mt-0"
            :value="RelationshipTypes.DIRECTOR"
            :error="displayErrorState"
          >
            <template #label>
              <span class="checkbox-label">{{ RelationshipTypes.DIRECTOR }}</span>
            </template>
          </v-checkbox>
        </v-col>
        <v-col cols="4">
          <v-checkbox
            id="shareholder-checkbox"
            v-model="selectedRelationships"
            class="mt-0"
            :value="RelationshipTypes.SHAREHOLDER"
            :error="displayErrorState"
          >
            <template #label>
              <span class="checkbox-label">{{ RelationshipTypes.SHAREHOLDER }}</span>
            </template>
          </v-checkbox>
        </v-col>
        <v-col cols="4">
          <v-checkbox
            id="court-ordered-party-checkbox"
            v-model="selectedRelationships"
            class="mt-0"
            :value="RelationshipTypes.COURT_ORDERED_PARTY"
            :error="displayErrorState"
          >
            <template #label>
              <span class="checkbox-label">{{ RelationshipTypes.COURT_ORDERED_PARTY }}</span>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script lang="ts">

import Vue from 'vue'
import { Component, Watch, Emit, Prop } from 'vue-property-decorator'
import { RelationshipTypes } from '@bcrs-shared-components/enums'

@Component({})
export default class RelationshipsPanel extends Vue {
  /** Draft restoration relationships */
  @Prop({ default: () => [] }) readonly draftRelationships!: RelationshipTypes[]
  @Prop({ default: '#fff' }) readonly bgHex!: string
  @Prop({ default: false }) readonly showValidationErrors!: boolean

  // Local properties
  private selectedRelationships: RelationshipTypes[] = []
  private displayErrorState = false
  readonly RelationshipTypes = RelationshipTypes

  /**
   * Called when component is mounted.
   * Sets previously checked relationships (if any) and emits initial validity.
   */
  mounted (): void {
    if (this.draftRelationships.length > 0) {
      this.selectedRelationships.push(...this.draftRelationships)
    }
    this.emitValidity()
  }

  /** Emits the changed relationships array. */
  @Emit('changed')
  private emitChangedRelationships (): any[] {
    return this.selectedRelationships
  }

  /** Emits the component validity. */
  @Emit('valid')
  private emitValidity (): boolean {
    const valid = (this.selectedRelationships.length > 0)
    return valid
  }

  /**
   * Emit events whenever the relationships array is changed (validation and the selected relationships array).
   */
  @Watch('selectedRelationships')
  @Watch('showValidationErrors')
  private setRelationships (): void {
    // set checkbox error state
    // then emit latest values + validity
    this.displayErrorState = (this.showValidationErrors && (this.selectedRelationships.length === 0))
    this.emitChangedRelationships()
    this.emitValidity()
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.relationships-content {
  font-size: 1rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}

// don't show checkbox label error styling
.checkbox-label {
  color: $gray7;
  font-weight: normal;
}
</style>
