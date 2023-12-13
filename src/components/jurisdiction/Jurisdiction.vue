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
import { CanJurisdictions, IntlJurisdictions } from './list-data'

@Component({
  components: { NestedSelect }
})
export default class Jurisdiction extends Vue {
  // props
  @Prop({ default: 'Select the home jurisdiction' }) readonly label!: string
  @Prop() readonly errorMessages!: string

  // variables
  jurisdiction = null

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

    // add in International jurisdictions (not including CA)
    array.push({ isHeader: true, group: 1, text: 'International' })
    IntlJurisdictions
      .filter(jur => jur.value !== JurisdictionLocation.CA)
      .forEach(jur => array.push({
        group: 1,
        text: jur.text,
        value: jur.value,
        separator: false
      }))

    return array
  }

  @Emit('change')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emitChangeEvent (jurisdiction: any): void {}
}
</script>

<style lang="scss" scoped>
</style>
