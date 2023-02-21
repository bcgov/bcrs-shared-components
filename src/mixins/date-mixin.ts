import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { isDate } from 'lodash'
import { ApiDateTimeUtc, IsoDatePacific } from '@bcrs-shared-components/interfaces'

/**
 * This is a local, minimal mixin containing only the methods needed for the shared
 * components when they run within this project (ie, in Storybook).
 *
 * When imported into an app project, the shared components should use the mixins
 * local to that project.
 */
@Component({
  extends: Vue
})
export default class DateMixin extends Vue {
  /**
   * Creates and returns a new Date object in UTC, given parameters in Pacific timezone.
   * (This works regardless of user's local clock/timezone.)
   * @example "2021, 0, 1, 0, 0" -> "2021-01-01T08:00:00.000Z"
   * @example "2021, 6, 1, 0, 0" -> "2021-07-01T07:00:00.000Z"
   */
  createUtcDate (year: number, month: number, day: number, hours: number = 0, minutes: number = 0): Date {
    // 1. create the new date in UTC
    // 2. compute the offset between UTC and Pacific timezone
    // 3. add the offset to convert the date to Pacific timezone
    // Ref: https://stackoverflow.com/questions/15141762/
    const date = new Date(Date.UTC(year, month, day, hours, minutes))
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Vancouver' }))
    const offset = utcDate.getTime() - tzDate.getTime()
    date.setTime(date.getTime() + offset)

    return date
  }

  /**
   * Converts an API datetime string (in UTC) to a Date object.
   * @example 2021-08-05T16:56:50.783101+00:00 -> 2021-08-05T16:56:50Z
   */
  apiToDate (dateTimeString: ApiDateTimeUtc): Date {
    if (!dateTimeString) return null // safety check

    // chop off the milliseconds and UTC offset and append "Zulu" timezone abbreviation
    // eg, 2020-08-28T21:53:58Z
    dateTimeString = dateTimeString.slice(0, 19) + 'Z'

    // NB: this `new Date()` is safe because the string is already UTC format
    //     so the conversion to JS Date ignores the browser's local timezone
    return new Date(dateTimeString)
  }

  /**
   * Converts a date string (YYYY-MM-DD) to a Date object at 12:00:00 am Pacific time.
   * @example 2021-11-22 -> 2021-11-22T08:00:00.00Z
   */
  yyyyMmDdToDate (dateStr: IsoDatePacific): Date {
    // safety checks
    if (!dateStr) return null
    if (dateStr.length !== 10) return null

    const split = dateStr.split('-')
    const year = +split[0]
    const month = +split[1]
    const day = +split[2]

    return this.createUtcDate(year, (month - 1), day)
  }

  /**
   * Converts a Date object to a date string (YYYY-MM-DD) in Pacific timezone.
   * @example "2021-01-01 07:00:00 GMT" -> "2020-12-31"
   * @example "2021-01-01 08:00:00 GMT" -> "2021-01-01"
   */
  dateToYyyyMmDd (date: Date): IsoDatePacific {
    // safety check
    if (!isDate(date) || isNaN(date.getTime())) return null

    // NB: some versions of Node have only en-US locale
    // so use that and convert results accordingly
    const dateStr = date.toLocaleDateString('en-US', {
      timeZone: 'America/Vancouver',
      month: 'numeric', // 12
      day: 'numeric', // 31
      year: 'numeric' // 2020
    })

    // convert mm/dd/yyyy to yyyy-mm-dd
    // and make sure month and day are 2 digits (eg, 03)
    const [ mm, dd, yyyy ] = dateStr.split('/')
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`
  }

  /**
   * Converts a Date object to a date string (Month Day, Year) in Pacific timezone.
   * @param longMonth whether to show long month name (eg, December vs Dec)
   * @param showWeekday whether to show the weekday name (eg, Thursday)
   * @example "2021-01-01 07:00:00 GMT" -> "Dec 31, 2020"
   * @example "2021-01-01 08:00:00 GMT" -> "Jan 1, 2021"
   */
  dateToPacificDate (date: Date, longMonth = false, showWeekday = false): string {
    // safety check
    if (!isDate(date) || isNaN(date.getTime())) return null

    // NB: some versions of Node have only en-US locale
    // so use that and convert results accordingly
    let dateStr = date.toLocaleDateString('en-US', {
      timeZone: 'America/Vancouver',
      weekday: showWeekday ? 'long' : undefined, // Thursday or nothing
      month: longMonth ? 'long' : 'short', // December or Dec.
      day: 'numeric', // 31
      year: 'numeric' // 2020
    })

    // remove period after month
    dateStr = dateStr.replace('.', '')

    return dateStr
  }

  /**
   * Converts a date string (YYYY-MM-DD) to a date string (Month Day, Year) in Pacific timezone.
   * @param longMonth whether to show long month name (eg, December vs Dec)
   * @param showWeekday whether to show the weekday name (eg, Thursday)
   * @example "2021-01-01" -> "Thursday, December 31, 2020"
   */
  yyyyMmDdToPacificDate (dateStr: IsoDatePacific, longMonth = false, showWeekday = false): string {
    return this.dateToPacificDate(this.yyyyMmDdToDate(dateStr), longMonth, showWeekday)
  }

  /**
     * Converts a Date object to a time string (HH:MM am/pm) in Pacific timezone.
     * @example "2021-01-01 07:00:00 GMT" -> "11:00 pm"
     * @example "2021-01-01 08:00:00 GMT" -> "12:00 am"
     */
  dateToPacificTime (date: Date): string {
    // safety check
    if (!isDate(date) || isNaN(date.getTime())) return null

    // NB: some versions of Node have only en-US locale
    // so use that and convert results accordingly
    let timeStr = date.toLocaleTimeString('en-US', {
      timeZone: 'America/Vancouver',
      hour: 'numeric', // 11
      minute: '2-digit', // 00
      hour12: true // a.m./p.m.
    })

    // replace AM with am and PM with pm
    timeStr = timeStr.replace('AM', 'am').replace('PM', 'pm')

    return timeStr
  }

  /**
   * Converts an API datetime string (in UTC) to a date and time string (Month Day, Year at HH:MM am/pm
   * Pacific time).
   * @example "2021-01-01T00:00:00.000000+00:00" -> "Dec 31, 2020 at 04:00 pm Pacific time" (PST example)
   * @example "2021-07-01T00:00:00.000000+00:00" -> "Jun 30, 2021 at 05:00 pm Pacific time" (PDT example)
   */
  apiToPacificDateTime (dateTimeString: ApiDateTimeUtc): string {
    if (!dateTimeString) return null // safety check

    const date = this.apiToDate(dateTimeString)
    const dateStr = this.dateToPacificDate(date, true)
    const timeStr = this.dateToPacificTime(date)

    return `${dateStr} at ${timeStr} Pacific time`
  }

  /**
   * Add a number of months to a date and return "YYYY-MM-DD".
   * Date must be in the format of "YYYY-MM-DD" and months is a number
   * @example (3, 2023-02-03) -> "2023-05-03"
   * @example (18, 2023-02-03) -> "2024-08-03"
   */
  addMonthsToDate (month: number, date: string): string {
    if (!date) {
      date = '2023-01-01'
    }
    const temp = this.yyyyMmDdToDate(date)
    temp.setMonth(temp.getMonth() + month)
    const dateAfterAddition = this.dateToYyyyMmDd(temp)
    return dateAfterAddition
  }

  /**
   * Decrease one date from another and return number of months as the difference.
   * Dates must be in the "YYYY-MM-DD" format
   * @example (2023-02-03, 2024-08-03) -> 18
   * @example (2023-02-03, 2023-04-03) -> 2
   */
  subtractDates (dateFrom: string, dateTo: string): number {
    if (!dateFrom) {
      dateFrom = '2023-01-01'
    }
    if (!dateTo) {
      dateTo = this.addMonthsToDate(24, dateFrom)
    }
    const expiryDate = this.yyyyMmDdToDate(dateTo)
    const currDate = this.yyyyMmDdToDate(dateFrom)
    const monthDiff = expiryDate.getMonth() - currDate.getMonth()
    const yearDiff = (12 * (expiryDate.getFullYear() - currDate.getFullYear()))
    let difference = monthDiff + yearDiff
    // For example if Jan 31st and March 1, difference is 1 not 2
    if (expiryDate.getDate() < currDate.getDate()) {
      difference--
    }
    return difference
  }
}
