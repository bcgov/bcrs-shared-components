<template>
  <NestedSelect
    :label="label"
    :errorMessages="errorMessages"
    :hideDetails="false"
    :menuItems="jurisdictionOptions"
    :value="jurisdiction ? jurisdiction.text : ''"
    @change="emitChangeEvent($event)"
  />
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import NestedSelect from './NestedSelect.vue'
import { JurisdictionLocation } from '@bcrs-shared-components/enums'
import { CanJurisdictions, IntlJurisdictions, UsaJurisdiction } from './list-data'

@Component({
  components: { NestedSelect }
})
export default class Jurisdiction extends Vue {
  // props
  @Prop({ default: 'Select the home jurisdiction' }) readonly label!: string
  @Prop() readonly errorMessages!: string
  @Prop({ default: false }) readonly showUsaJurisdictions!: boolean
  @Prop({ default: null }) readonly initialValue!: string

  // variables
  jurisdiction = null

  /** Called when component is created. */
  created (): void {
    if (this.initialValue) {
      this.jurisdiction = this.initialValue
    }
  }

  /** The jursidiction select options */
  get jurisdictionOptions (): Array<any> {
    const array = [] as Array<any>

    // add in Canadian jurisdictions (not including BC)
    array.push({ isHeader: true, group: 0, text: 'Canadian' })
    CanJurisdictions
      .filter(jur => jur.value !== JurisdictionLocation.BC)
      .forEach(jur => array.push({
        group: 0,
        text: jur.text,
        value: jur.value,
        separator: (jur.value === JurisdictionLocation.FD)
      }))

    // add USA jurisdictions (conditionally)
    if (this.showUsaJurisdictions) {
      array.push({ isHeader: true, group: 1, text: 'United States' })
      UsaJurisdiction
        .forEach(jur => array.push({
          group: 1,
          text: jur.text,
          value: jur.value,
          separator: false
        }))
    }

    // add in International jurisdictions (not including CA)
    array.push({ isHeader: true, group: 2, text: 'International' })
    IntlJurisdictions
      .filter(jur => this.excludeJurisdictions(jur.value))
      .forEach(jur => array.push({
        group: 2,
        text: jur.text,
        value: jur.value,
        separator: (jur.value === JurisdictionLocation.IN)
      }))

    return array
  }

  /**
   * Always exclude CA
   * Exclude USA when states are listed in the jurisdiction list based on showUsaJurisdictions flag
   */
  excludeJurisdictions (jurisdiction): boolean {
    if (jurisdiction === JurisdictionLocation.CA) {
      return false
    }

    if (this.showUsaJurisdictions && (jurisdiction === JurisdictionLocation.US)) {
      return false
    }

    return true
  }

  @Emit('change')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emitChangeEvent (jurisdiction: any): void {}
}
</script>

<style lang="scss" scoped>
</style>
