<template>
  <v-card flat id="relationship-style">
    <div class="form__row three-column mt-3">
      <v-card flat rounded="sm" class="relationship_title gray-card px-4">
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
              :value="RelationshipTypes.SHAREHOLDER" :label="RelationshipTypes.SHAREHOLDER"
              :rules="relationshipRules" />
          </v-col>

          <v-col cols="4">
            <v-checkbox id="court-ordered-party-checkbox" class="mt-0" v-model="selectedRelationships"
              :value="RelationshipTypes.COURT_ORDERED_PARTY" :label="RelationshipTypes.COURT_ORDERED_PARTY"
              :rules="relationshipRules" />
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-card>
</template>
<script lang="ts">

import Vue from 'vue'
import { Component, Watch, Emit, Prop } from 'vue-property-decorator'

@Component({})
export default class RelationshipsPanelShared extends Vue {
  /** Draft restoration relationships */
  @Prop({ default: ['Heir or Legal Representative'] }) readonly draftRelationships!: []

  // Local properties
  private selectedRelationships = []
  private relationshipRules = []

  // Relationship Types Enum for the template
  RelationshipTypes = {
    COURT_ORDERED_PARTY: 'Court Ordered Party',
    DIRECTOR: 'Director',
    HEIR_LEGAL_REP: 'Heir or Legal Representative',
    OFFICER: 'Officer',
    SHAREHOLDER: 'Shareholder'
  }

  /**
   * Called when component is mounted.
   * Automatically check all previously checked relationships (if any) when user continues a draft.
   */
  mounted (): void {
    if (this.draftRelationships !== null) {
      this.selectedRelationships.push(...this.draftRelationships)
    } else {
      this.selectedRelationships.push(this.RelationshipTypes.HEIR_LEGAL_REP)
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
    * Change the tooltip text to red (error) if no relationships are selected.
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

#relationship-style {
  padding-bottom: 1rem;
  padding-left: 1rem;
  margin-right: 1.5rem;
  line-height: 1.2rem;
}

.gray-card {
  background-color: rgba(0, 0, 0, 0.06);
  margin-right: 3rem;
}

.form__row.three-column {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  margin-right: -0.5rem;
  margin-left: -0.5rem;

}

.relationship_title {
  margin-left: 1rem;
  font-size: 1rem;
}

</style>

