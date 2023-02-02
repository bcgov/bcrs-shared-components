<template>
  <v-card flat id="relationships-panel" class="pb-4 pl-4">
    <v-card flat rounded="sm" class="relationships-vcard px-4 mt-3 mr-9 ml-4">
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
    </v-card>
  </v-card>
</template>
<script lang="ts">

import Vue from 'vue'
import { Component, Watch, Emit, Prop } from 'vue-property-decorator'
import { RelationshipTypes } from '@/enums/relationship-types'

@Component({})
export default class RelationshipsPanel extends Vue {
  /** Draft restoration relationships */
  @Prop({ default: () => [] }) readonly draftRelationships!: RelationshipTypes[]

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
  @Emit('emitRelationshipsChanged')
  private relationshipsChanged (): any[] {
    return this.selectedRelationships
  }

  // Emit a boolean (validation) which is if at least one relationship is selected.
  @Emit('emitRelationshipsValid')
  private relationshipsValid (event: boolean): boolean {
    return event
  }

  /**
   * Emit events whenever the relationships array is changed (validation and the selected relationships array).
   */
  @Watch('selectedRelationships')
  private setRelationships (val) {
    this.setRelationshipRules()
    this.$emit('emitRelationshipsChanged', this.selectedRelationships)
    if (this.selectedRelationships.length > 0) {
      this.$emit('emitRelationshipsValid', true)
    } else {
      this.$emit('emitRelationshipsValid', false)
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.relationships-vcard {
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.06);
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}

</style>
