<template>
  <div class="expandable-help">
    <!-- top button -->
    <div
      class="help-btn top"
      @click="helpToggle = !helpToggle"
    >
      <v-icon color="primary">
        mdi-help-circle-outline
      </v-icon>
      <span class="pl-2 help-label">{{ !helpToggle ? helpLabel : 'Hide Help' }}</span>
    </div>

    <v-expand-transition>
      <div
        v-show="helpToggle"
        class="help-section mt-3 pa-6"
      >
        <!-- help content passed in a slot -->
        <slot name="content" />

        <!-- bottom button -->
        <div class="d-flex justify-end">
          <div
            class="help-btn bottom"
            @click="helpToggle = !helpToggle"
          >
            <span>Hide Help</span>
          </div>
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component({})
export default class ExpandableHelp extends Vue {
  @Prop({ default: 'Show Help' }) readonly helpLabel!: string

  helpToggle = false
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.help-btn,
.help-label {
  cursor: pointer;
}

.help-btn {
  color: $app-blue;
  text-decoration: underline;
}

.v-icon {
  margin-top: -3px;
}

.help-section {
  border-top: 1px dashed $gray7;
  border-bottom: 1px dashed $gray7;
}
</style>
