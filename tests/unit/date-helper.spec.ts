import { shortPacificDate } from '../../src/utils/date-helper'

describe('Date Helper', () => {
  it('returns short pacific date shortPacificDate()', () => {
    expect(shortPacificDate(new Date('2021-06-30 07:00:00 GMT'))).toBe('June 30, 2021')
  })

  it('returns RangeError when empty string is passed shortPacificDate()', () => {
    expect(shortPacificDate('')).toBe(null)
  })
})
