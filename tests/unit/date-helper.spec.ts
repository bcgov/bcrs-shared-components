import { shortPacificDate } from '../../src/utils/date-helper'

describe('Date Helper', () => {
  it('returns short pacific date shortPacificDate()', () => {
    expect(shortPacificDate('2021-07-01T00:00:00+00:00')).toBe('June 30, 2021')
  })

  it('returns RangeError when empty string is passed shortPacificDate()', () => {
    expect(() => shortPacificDate('')).toThrowError('Invalid time value')
  })
})
