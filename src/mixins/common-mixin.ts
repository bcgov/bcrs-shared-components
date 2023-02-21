import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { ConfirmDialogType } from '@bcrs-shared-components/interfaces'
import { getName } from 'country-list'

/**
 * This is a local, minimal mixin containing only the methods needed for the shared
 * components when they run within this project (ie, in Storybook).
 *
 * When imported into an app project, the shared components should use the mixins
 * local to that project.
 */
@Component({})
export default class CommonMixin extends Vue {
  /**
   * Returns the full (first-middle-last) name of the subject officer.
   * @param officer the object to get the names from
   * @returns the formatted full name string
   */
  formatFullName (officer: any): string {
    let fullName = ''
    if (officer?.firstName) fullName += officer.firstName + ' '
    if (officer?.middleName) fullName += officer.middleName + ' '
    if (officer?.lastName) fullName += officer.lastName
    return fullName.trimEnd()
  }

  /**
   * Returns the full address of the subject.
   * @param addressData the object to get the address from
   * @returns the formatted full address string
   */
  formatFullAddress (addressData: any): string {
    let fullAddress = ''
    if (addressData?.addrLine1) fullAddress += addressData.addrLine1 + ', '
    if (addressData?.city) fullAddress += addressData.city + ', '
    if (addressData?.stateProvinceCd) fullAddress += addressData.stateProvinceCd + ', '
    if (addressData?.postalCd) fullAddress += addressData.postalCd + ', '
    if (addressData?.countryTypeCd) fullAddress += getName(addressData.countryTypeCd)

    return fullAddress.trimEnd()
  }

  /**
   * Formats a phone number for display.
   * @param phoneNumber the phone number to format
   * @returns a formatted phone number
   */
  toDisplayPhone (phoneNumber: string): string {
    // Filter only numbers from the input
    let cleaned = ('' + phoneNumber).replace(/\D/g, '')

    // Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }

    return null
  }

  /**
   * Helper to show the confirm dialogs.
   * @param ref The dialog reference
   * @param title The title content in dialog header
   * @param message The content body
   * @param yes The YES action label
   * @param no The NO cancel label
   * */
  async showConfirmDialog (ref: ConfirmDialogType, title: string, message: string, yes: string, no: string = null):
    Promise<boolean> {
    return ref.open(title, message, {
      width: '45rem',
      persistent: true,
      yes,
      no,
      cancel: null
    }).catch(() => false)
  }
}
