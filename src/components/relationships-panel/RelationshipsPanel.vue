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
              <span class="vuetify-label">{{ RelationshipTypes.HEIR_LEGAL_REP }}</span>
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
              <span class="vuetify-label">{{ RelationshipTypes.OFFICER }}</span>
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
              <span class="vuetify-label">{{ RelationshipTypes.DIRECTOR }}</span>
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
              <span class="vuetify-label">{{ RelationshipTypes.SHAREHOLDER }}</span>
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
              <span class="vuetify-label">{{ RelationshipTypes.COURT_ORDERED_PARTY }}</span>
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
   * Automatically check all previously checked relationships (if any) when user continues a draft.
   */
  mounted (): void {
    if (this.draftRelationships.length > 0) {
      this.selectedRelationships.push(...this.draftRelationships)
    }
  }

  /** The validation rules for the Relationships. */
  private setDisplayErrorState (): void {
    this.displayErrorState = (this.showValidationErrors && this.selectedRelationships.length === 0)
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
  @Watch('showValidationErrors')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private setRelationships (event) {
    this.setDisplayErrorState()
    this.relationshipsChanged()
    if (this.selectedRelationships.length === 0) {
      this.relationshipsValid(false)
    } else {
      this.relationshipsValid(true)
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

.vuetify-label {
    color: $gray7;
    font-weight: normal;
}

</style>
