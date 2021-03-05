<template>
  <div>
    <v-chip v-if="actionableItem.action === ActionTypes.ADDED"
            x-small label color="primary" text-color="white">ADDED</v-chip>
    <v-chip v-if="actionableItem.action === ActionTypes.EDITED"
            x-small label color="primary" text-color="white">{{editedLabel(isCorrection)}}</v-chip>
    <v-chip v-if="actionableItem.action === ActionTypes.REMOVED"
            x-small label color="#E0E0E0" text-color="#212529">REMOVED</v-chip>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { ActionTypes } from '@/enums'
import { ActionableItemIF } from '@/interfaces'
import { CommonMixin } from '@/mixins'

@Component({})
export default class ActionChip extends Mixins(CommonMixin) {
  @Prop({ default: {} })
  private actionableItem: ActionableItemIF

  @Prop()
  private isCorrection: boolean

  // Declaration for template
  readonly ActionTypes = ActionTypes
}
</script>
