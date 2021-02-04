import { Component, Vue } from 'vue-property-decorator'

//
// This mixin contains only the methods needed for the shared components.
//
@Component({})
export default class DateMixin extends Vue {
  /**
   * Converts an API datetime string (in UTC) to a simple date-time string (YYYY-MM-DD HH:MM:SS AM/PM)
   * in Pacific timezone.
   * @example "2021-01-01T00:00:00.000000+00:00" -> "2020-12-31 04:00:00 PM" (PST)
   * @example "2021-07-01T00:00:00.000000+00:00" -> "2021-06-30 05:00:00 PM" (PDT)
   */
  apiToSimpleDateTime (date: string): string {
    // safety check
    if (!date) return null

    // convert from API format
    const utc = new Date(date.replace('+00:00', 'Z'))

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/Vancouver'
    }

    // NB: locale 'en-CA' is the only one consistent between IE11 and other browsers
    // eg, "2019-12-31 04:00:00 PM"
    let pacific = new Intl.DateTimeFormat('en-CA', options).format(utc)

    // misc cleanup
    pacific = pacific.replace(',', '')
    pacific = pacific.replace('a.m.', 'AM')
    pacific = pacific.replace('p.m.', 'PM')

    // fix for Jest (which outputs MM/DD/YYYY no matter which 'en' locale is used)
    if (pacific.indexOf('/') >= 0) {
      const date = pacific.substr(0, 10).split('/')
      const time = pacific.slice(11)
      // set as YYYY-MM-DD HH:MM:SS AM/PM
      pacific = `${date[2]}-${date[0]}-${date[1]} ${time}`
    }

    return pacific
  }
}
