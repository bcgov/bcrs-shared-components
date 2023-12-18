import { isDate, isEmpty } from 'lodash'
// Converts date to string and pacific date string
// Example Output: August 11, 2023
import { isDate } from 'lodash'

export function shortPacificDate (date: Date | string): string {
  // safety check
  if (!isDate(date) || isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'America/Vancouver'
  }).format(new Date(date))
}

/**
 * Converts a Date object to a date string (YYYY-MM-DD) in Pacific timezone.
 * @example "2021-01-01 07:00:00 GMT" -> "2020-12-31"
 * @example "2021-01-01 08:00:00 GMT" -> "2021-01-01"
 */
export function dateToYyyyMmDd (date: Date): string {
  // safety check
  if (!isDate(date) || isNaN(date.getTime())) return null

  return date.toLocaleDateString('en-CA', {
    timeZone: 'America/Vancouver',
    month: 'numeric', // 12
    day: 'numeric', // 31
    year: 'numeric' // 2020
  })
}
