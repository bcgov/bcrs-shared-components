import { isDate, isEmpty } from 'lodash'
// Converts date to string and pacific date string
// Example Output: August 11, 2023
export function shortPacificDate (date: Date | string): string {
  // safety check
  if (!isDate(date) || isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'America/Vancouver'
  }).format(new Date(date))
}
