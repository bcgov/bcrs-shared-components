import { shallowMount } from '@vue/test-utils'
import MixinTester from '@/mixin-tester.vue'
import { nextTick } from 'vue'

describe('Date Mixin', () => {
  let vm: any

  beforeAll(async () => {
    // mount the component and wait for everything to stabilize
    const wrapper = shallowMount(MixinTester)
    vm = wrapper.vm
    await nextTick()
  })

  it('returns correct values for createUtcDate()', () => {
    expect(vm.createUtcDate(2021, 0, 1, 0, 0).toISOString()).toBe('2021-01-01T08:00:00.000Z') // PST
    expect(vm.createUtcDate(2021, 6, 1, 0, 0).toISOString()).toBe('2021-07-01T07:00:00.000Z') // PDT
  })

  it('returns correct values for yyyyMmDdToDate()', () => {
    expect(vm.yyyyMmDdToDate(null)).toBeNull()
    expect(vm.yyyyMmDdToDate('12345678901')).toBeNull()
    expect(vm.yyyyMmDdToDate('2021-01-01').toISOString()).toEqual('2021-01-01T08:00:00.000Z') // PST
    expect(vm.yyyyMmDdToDate('2021-07-01').toISOString()).toEqual('2021-07-01T07:00:00.000Z') // PDT
  })

  it('returns correct values for dateToYyyyMmDd()', () => {
    expect(vm.dateToYyyyMmDd(null)).toBeNull()
    expect(vm.dateToYyyyMmDd(new Date('not a date'))).toBeNull()
    // verify that GMT/UTC is correctly converted to Pacific
    expect(vm.dateToYyyyMmDd(new Date('2021-01-01 07:00:00 GMT'))).toBe('2020-12-31') // Standard Time
    expect(vm.dateToYyyyMmDd(new Date('2021-01-01 08:00:00 GMT'))).toBe('2021-01-01') // Standard Time
    expect(vm.dateToYyyyMmDd(new Date('2021-07-01 06:00:00 GMT'))).toBe('2021-06-30') // Daylight Time
    expect(vm.dateToYyyyMmDd(new Date('2021-07-01 07:00:00 GMT'))).toBe('2021-07-01') // Daylight Time
    // verify that Pacific is correctly converted to Pacific
    expect(vm.dateToYyyyMmDd(new Date('2021-01-01 00:00:00 PST'))).toBe('2021-01-01')
    expect(vm.dateToYyyyMmDd(new Date('2021-01-01 23:59:59 PST'))).toBe('2021-01-01')
    expect(vm.dateToYyyyMmDd(new Date('2021-07-01 00:00:00 PDT'))).toBe('2021-07-01')
    expect(vm.dateToYyyyMmDd(new Date('2021-07-01 23:59:59 PDT'))).toBe('2021-07-01')
    // verify that Eastern is correctly converted to Pacific
    expect(vm.dateToYyyyMmDd(new Date('2021-01-01 02:00:00 EST'))).toBe('2020-12-31')
    expect(vm.dateToYyyyMmDd(new Date('2021-01-01 03:00:00 EST'))).toBe('2021-01-01')
    expect(vm.dateToYyyyMmDd(new Date('2021-07-01 02:00:00 EDT'))).toBe('2021-06-30')
    expect(vm.dateToYyyyMmDd(new Date('2021-07-01 03:00:00 EDT'))).toBe('2021-07-01')
  })

  it('returns correct values for dateToPacificTime()', () => {
    expect(vm.dateToPacificTime(null)).toBeNull()
    expect(vm.dateToPacificTime(new Date('not a date'))).toBeNull()
    // verify that GMT/UTC is correctly converted to Pacific
    expect(vm.dateToPacificTime(new Date('2021-01-01 07:00:00 GMT'))).toBe('11:00 pm') // Standard Time
    expect(vm.dateToPacificTime(new Date('2021-01-01 08:00:00 GMT'))).toBe('12:00 am') // Standard Time
    expect(vm.dateToPacificTime(new Date('2021-07-01 06:00:00 GMT'))).toBe('11:00 pm') // Daylight Time
    expect(vm.dateToPacificTime(new Date('2021-07-01 07:00:00 GMT'))).toBe('12:00 am') // Daylight Time
    // verify that Pacific is correctly converted to Pacific
    expect(vm.dateToPacificTime(new Date('2021-01-01 00:00:00 PST'))).toBe('12:00 am')
    expect(vm.dateToPacificTime(new Date('2021-01-01 23:59:59 PST'))).toBe('11:59 pm')
    expect(vm.dateToPacificTime(new Date('2021-07-01 00:00:00 PDT'))).toBe('12:00 am')
    expect(vm.dateToPacificTime(new Date('2021-07-01 23:59:59 PDT'))).toBe('11:59 pm')
    // verify that Eastern is correctly converted to Pacific
    expect(vm.dateToPacificTime(new Date('2021-01-01 02:00:00 EST'))).toBe('11:00 pm')
    expect(vm.dateToPacificTime(new Date('2021-01-01 03:00:00 EST'))).toBe('12:00 am')
    expect(vm.dateToPacificTime(new Date('2021-07-01 02:00:00 EDT'))).toBe('11:00 pm')
    expect(vm.dateToPacificTime(new Date('2021-07-01 03:00:00 EDT'))).toBe('12:00 am')
  })

  it('returns correct values for apiToPacificDateTime()', () => {
    expect(vm.apiToPacificDateTime('2021-01-01T00:00:00+00:00'))
      .toBe('December 31, 2020 at 4:00 pm Pacific time') // PST
    expect(vm.apiToPacificDateTime('2021-07-01T00:00:00+00:00')).toBe('June 30, 2021 at 5:00 pm Pacific time') // PDT
  })

  it('returns correct values for addMonthsToDate()', () => {
    expect(vm.addMonthsToDate(3, '2023-02-03')).toBe('2023-05-03')
    expect(vm.addMonthsToDate(18, '2023-02-03')).toBe('2024-08-03')
    expect(vm.addMonthsToDate(10, '2023-02-03')).toBe('2023-12-03')
    expect(vm.addMonthsToDate(24, '2023-02-03')).toBe('2025-02-03')
    expect(vm.addMonthsToDate(2, null)).toBe('2023-03-01')
  })

  it('returns correct values for subtractDates()', () => {
    expect(vm.subtractDates('2023-02-03', '2024-08-03')).toBe(18)
    expect(vm.subtractDates('2023-02-03', '2023-04-03')).toBe(2)
    expect(vm.subtractDates('2023-01-31', '2023-03-01')).toBe(1)
    expect(vm.subtractDates('2023-01-31', '2023-03-31')).toBe(2)
    expect(vm.subtractDates('2023-02-03', '2025-02-03')).toBe(24)
    expect(vm.subtractDates(null, null)).toBe(24)
    expect(vm.subtractDates('2023-05-05', null)).toBe(24)
    expect(vm.subtractDates(null, '2023-04-04')).toBe(3)
  })
})
