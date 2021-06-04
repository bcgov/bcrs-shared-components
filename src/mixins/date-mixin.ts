import { Component, Vue } from 'vue-property-decorator'
import { isDate } from 'lodash'

/**
 * This is a local, minimal mixin containing only the methods needed for the shared
 * components when they run within this project (ie, in Storybook).
 *
 * When imported into an app project, the shared components should use the mixins
 * local to that project.
 */
@Component({})
export default class DateMixin extends Vue {
  /**
   * Converts an API datetime string (in UTC) to a Date object.
   */
  apiToDate (dateTimeString: string): Date {
    // chop off the milliseconds and append "Zulu" timezone abbreviation
    // eg, 2020-08-28T21:53:58Z
    dateTimeString = dateTimeString.slice(0, 19) + 'Z'
    return new Date(dateTimeString)
  }

  /**
   * Converts a Date object to a date string (Month Day, Year) in Pacific timezone.
   * @example "2021-01-01 07:00:00 GMT" -> "Dec 31, 2020"
   * @example "2021-01-01 08:00:00 GMT" -> "Jan 1, 2021"
   */
  dateToPacificDate (date: Date): string {
    // safety check
    if (!isDate(date) || isNaN(date.getTime())) return null

    let dateStr = date.toLocaleDateString('en-CA', {
      timeZone: 'America/Vancouver',
      month: 'short', // Dec.
      day: 'numeric', // 31
      year: 'numeric' // 2020
    })

    // remove period after month
    dateStr = dateStr.replace('.', '')
    return dateStr
  }

  /**
     * Converts a Date object to a time string (HH:MM am/pm) in Pacific timezone.
     * @example "2021-01-01 07:00:00 GMT" -> "11:00 pm"
     * @example "2021-01-01 08:00:00 GMT" -> "12:00 am"
     */
  dateToPacificTime (date: Date): string {
    // safety check
    if (!isDate(date) || isNaN(date.getTime())) return null

    let timeStr = date.toLocaleTimeString('en-CA', {
      timeZone: 'America/Vancouver',
      hour: 'numeric', // 11
      minute: '2-digit', // 00
      hour12: true // a.m./p.m.
    })

    // replace a.m. with am and p.m. with pm
    timeStr = timeStr.replace('a.m.', 'am').replace('p.m.', 'pm')

    return timeStr
  }

  /**
   * Converts an API datetime string (in UTC) to a date and time string (Month Day, Year at HH:MM am/pm
   * Pacific time).
   * @example "2021-01-01T00:00:00.000000+00:00" -> "Dec 31, 2020 at 04:00 pm Pacific time" (PST example)
   * @example "2021-07-01T00:00:00.000000+00:00" -> "Jun 30, 2021 at 05:00 pm Pacific time" (PDT example)
   */
  apiToPacificDateTime (dateTimeString: string): string {
    if (!dateTimeString) return null // safety check

    const date = this.apiToDate(dateTimeString)
    const dateStr = this.dateToPacificDate(date)
    const timeStr = this.dateToPacificTime(date)

    return `${dateStr} at ${timeStr} Pacific time`
  }
}
