<template>
  <NestedSelect
    :label="label"
    :errorMessages="errorMessages"
    hideDetails="auto"
    :menuItems="jurisdictionOptions"
    :readonly="readonly"
    :value="jurisdiction"
    @change="emitChangeEvent($event)"
  />
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop } from 'vue-property-decorator'
import NestedSelect from './NestedSelect.vue'
import { JurisdictionLocation } from '@bcrs-shared-components/enums'
import { ForeignJurisdictionIF } from '@bcrs-shared-components/interfaces/'
import { CountriesProvincesMixin } from '@bcrs-shared-components/mixins'
import { CanJurisdictions, IntlJurisdictions, UsaJurisdiction } from './list-data/'

@Component({
  components: { NestedSelect }
})
export default class Jurisdiction extends Mixins(CountriesProvincesMixin) {
  // props
  @Prop({ default: 'Select the home jurisdiction' }) readonly label!: string
  @Prop() readonly errorMessages!: string
  @Prop({ default: false }) readonly showUsaJurisdictions!: boolean
  @Prop({ default: null }) readonly initialValue!: ForeignJurisdictionIF
  @Prop({ default: false }) readonly readonly!: boolean

  // local variables
  jurisdiction = null

  /** Called when component is created. */
  created (): void {
    if (this.initialValue) {
      this.setInitialValue()
    }
  }

  /** Sets initial jurisdiction value. */
  setInitialValue (): void {
    const country = this.initialValue.country
    const region = this.initialValue.region || ''

    let jurisdictionGroup = NaN
    let jurisdictionText = ''
    let jurisdictionValue = ''

    if (country === JurisdictionLocation.CA) {
      jurisdictionGroup = 0
    } else if (country === JurisdictionLocation.US) {
      jurisdictionGroup = 1
    } else {
      jurisdictionGroup = 2
    }

    if (region) {
      if (region === 'FEDERAL') {
        jurisdictionText = 'Federal'
        jurisdictionValue = JurisdictionLocation.FD
      } else {
        const cr = this.getCountryRegions(country).find(p => p.short === region)
        jurisdictionText = cr?.name
        jurisdictionValue = cr?.short
      }
    } else {
      jurisdictionText = this.getCountryName(country)
      jurisdictionValue = country
    }

    this.jurisdiction = {
      group: jurisdictionGroup,
      text: jurisdictionText,
      value: jurisdictionValue
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

    // add in International jurisdictions (minus exclusions)
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
