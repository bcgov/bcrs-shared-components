<template>
  <v-menu
    :close-on-content-click="false"
    :offset-x="isOffsetX"
    :offset-y="isOffsetY"
    :open-on-hover="isOpenOnHover"
    :transition="transition"
    :value="openMenu"
  >
    <template #activator="{ on }">
      <v-btn
        v-if="icon"
        :color="color"
        v-on="on"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
      <v-list-item
        v-else-if="isSubMenu"
        class="d-flex justify-space-between"
        v-on="on"
      >
        {{ name }}
        <div class="flex-grow-1" />
        <v-icon>mdi-chevron-right</v-icon>
      </v-list-item>
      <v-btn
        v-else
        :color="color"
        text
        v-on="on"
        @click="openMenu=true"
      >
        {{ name }}
      </v-btn>
    </template>
    <v-list>
      <template v-for="(item, index) in menuItems">
        <v-divider
          v-if="item.isDivider"
          :key="index"
        />
        <sub-menu
          v-else-if="item.menu"
          :key="index"
          :is-open-on-hover="false"
          :is-offset-x="true"
          :is-offset-y="false"
          :is-sub-menu="true"
          :name="item.name"
          :menu-items="item.menu"
          @menu-click="emitClickEvent($event)"
        />
        <v-list-item
          v-else
          :key="index"
          @click="emitClickEvent(item)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

/**
 * Adapted from https://codepen.io/Moloth/pen/ZEBOzQP.
 * See also https://github.com/vuetifyjs/vuetify/issues/1877.
 */
@Component({})
export default class SubMenu extends Vue {
  // props
  @Prop() readonly name!: string
  @Prop() readonly icon!: string
  @Prop() readonly menuItems!: Array<any>
  @Prop({ default: 'secondary' }) readonly color!: string
  @Prop({ default: false }) readonly isOffsetX!: boolean
  @Prop({ default: true }) readonly isOffsetY!: boolean
  @Prop({ default: false }) readonly isOpenOnHover!: boolean
  @Prop({ default: false }) readonly isSubMenu!: boolean
  @Prop({ default: 'scale-transition' }) readonly transition!: string

  // data
  openMenu = false

  // methods
  emitClickEvent (item: any) {
    this.$emit('menu-click', item)
    this.openMenu = false
  }
}
</script>
