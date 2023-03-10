<template>
  <v-card flat id="relationships-panel">
    <div class="relationship-content" :style="{ backgroundColor: bgHex }">
      <v-row no-gutters class="align-center mt-5">

        <v-col cols="4">
          <v-checkbox id="heir-legal-rep-checkbox" class="mt-0" v-model="selectedRelationships"
            :value="RelationshipTypes.HEIR_LEGAL_REP" :label="RelationshipTypes.HEIR_LEGAL_REP"
            :rules="relationshipRules" />
        </v-col>

        <v-col cols="4">
          <v-checkbox id="officer-checkbox" class="mt-0" v-model="selectedRelationships"
            :value="RelationshipTypes.OFFICER" :label="RelationshipTypes.OFFICER" :rules="relationshipRules" />
        </v-col>

        <v-col cols="4">
          <v-checkbox id="director-checkbox" class="mt-0" v-model="selectedRelationships"
            :value="RelationshipTypes.DIRECTOR" :label="RelationshipTypes.DIRECTOR" :rules="relationshipRules" />
        </v-col>

        <v-col cols="4">
          <v-checkbox id="shareholder-checkbox" class="mt-0" v-model="selectedRelationships"
            :value="RelationshipTypes.SHAREHOLDER" :label="RelationshipTypes.SHAREHOLDER" :rules="relationshipRules" />
        </v-col>

        <v-col cols="4">
          <v-checkbox id="court-ordered-party-checkbox" class="mt-0" v-model="selectedRelationships"
            :value="RelationshipTypes.COURT_ORDERED_PARTY" :label="RelationshipTypes.COURT_ORDERED_PARTY"
            :rules="relationshipRules" />
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

  // Local properties
  private selectedRelationships: RelationshipTypes[] = []
  private relationshipRules: (() => void)[] = []

  readonly RelationshipTypes = RelationshipTypes

  /**
   * Called when component is mounted.
   * Automatically check all previously checked relationships (if any) when user continues a draft.
   */
  mounted (): void {
    if (this.draftRelationships.length > 0) {
      this.selectedRelationships.push(...this.draftRelationships)
    } else {
      this.selectedRelationships.push() // This is done to validate component immediately (no need to touch)
    }
  }

  /** The validation rules for the Relationships. */
  private setRelationshipRules (): void {
    this.relationshipRules = [
      () => this.selectedRelationships.length > 0 || ''
    ]
  }

  // Emit the selected relationships array.
  @Emit('changed')
  private relationshipsChanged (): any[] {
    return this.selectedRelationships
  }

  // Emit a boolean (validation) which is if at least one relationship is selected.
  @Emit('valid')
  private relationshipsValid (event: boolean): boolean {
    return event
  }

  /**
   * Emit events whenever the relationships array is changed (validation and the selected relationships array).
   */
  @Watch('selectedRelationships')
  private setRelationships (val) {
    this.setRelationshipRules()
    this.relationshipsChanged()
    if (this.selectedRelationships.length > 0) {
      this.relationshipsValid(true)
    } else {
      this.relationshipsValid(false)
    }
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

</style>
