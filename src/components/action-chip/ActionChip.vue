<template>
  <div>
    <v-chip v-if="actionableItem.action === ActionTypes.ADDED" id="added-chip"
            x-small label color="primary" text-color="white">ADDED</v-chip>
    <v-chip v-if="actionableItem.action === ActionTypes.EDITED" id="edited-chip"
            x-small label color="primary" text-color="white">{{editedLabel}}</v-chip>
    <v-chip v-if="actionableItem.action === ActionTypes.REMOVED" id="removed-chip"
            x-small label color="#E0E0E0" text-color="#212529">REMOVED</v-chip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ActionTypes } from '@/enums'
import { ActionableItemIF } from '@/interfaces'

@Component({})
export default class ActionChip extends Vue {
  @Prop({ default: {} })
  private actionableItem: ActionableItemIF

  @Prop({ default: 'EDITED' })
  private editedLabel: boolean

  // Declaration for template
  readonly ActionTypes = ActionTypes
}
</script>
