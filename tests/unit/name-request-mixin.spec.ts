import { mount, shallowMount } from '@vue/test-utils'
import MixinTester from '@/mixin-tester.vue'
import { nextTick } from 'vue'

const validNamerequest = {
  nrNum: 'NR 1234567',
  corpNum: 'BC1234567',
  legalType: 'CP',
  applicants: {
    // address info
    addrLine1: '1012 Douglas St',
    addrLine2: 'Suite 200',
    addrLine3: 'Second Floor',
    city: 'Victoria',
    stateProvinceCd: 'BC',
    postalCd: 'V8W 2C3',
    countryTypeCd: 'CA',
    // contact info
    emailAddress: 'email@example.com',
    phoneNumber: '1234567890',
    // name info
    firstName: 'First',
    middleName: 'Middle',
    lastName: 'Last'
  },
  names: [
    {
      state: 'APPROVED',
      name: 'Approved CP Namerequest'
    }
  ],
  consentFlag: null,
  expirationDate: '2022-07-05T06:59:00+00:00',
  requestTypeCd: 'BEC',
  request_action_cd: 'NEW',
  state: 'APPROVED'
}

describe('Namerequest Mixin', () => {
  let vm: any

  beforeAll(async () => {
    // mount the component and wait for everything to stabilize
    const wrapper = mount(MixinTester)
    vm = wrapper.vm
    await nextTick()
  })

  it('identifies invalid NameRequest validateNameRequest()', () => {
    let nr = null
    expect(() => vm.validateNameRequest(nr)).toThrowError('Invalid Name Request: Invalid NR object')

    nr = {}
    expect(() => vm.validateNameRequest(nr)).toThrowError('Invalid Name Request: Invalid NR applicants')
    expect(() => vm.validateNameRequest(validNamerequest, 'AML')).toThrowError('Incorrect Request Action Code')
    expect(() => vm.validateNameRequest(validNamerequest, 'NEW', 'BC123456'))
      .toThrowError('Incorrect Business ID')
    expect(() => vm.validateNameRequest(validNamerequest, 'NEW', 'BC1234567', '1234567891'))
      .toThrowError('Incorrect Phone Number')
    expect(() => vm.validateNameRequest(validNamerequest, 'NEW', 'BC1234567', '1234567890', 'email1@example.com'))
      .toThrowError('Incorrect Email Address')
  })

  it('returns valid NameRequest validateNameRequest()', () => {
    expect(vm.isNrInvalid(validNamerequest, 'NEW', 'BC1234567', '1234567890', 'email1@example.com')).toBe(null)
  })

  it('returns invalid NameRequest isNrInvalid()', () => {
    let nr = null
    expect(vm.isNrInvalid(nr)).toBe('Invalid NR object')

    nr = {}
    expect(vm.isNrInvalid(nr)).toBe('Invalid NR applicants')
  })

  it('returns correct Name Request name getNrApprovedName()', () => {
    expect(vm.getNrApprovedName({ names: [{ state: 'APPROVED', name: 'Approved CP Namerequest' }] }))
      .toBe('Approved CP Namerequest')
    expect(vm.getNrApprovedName({ names: [{ state: 'INPROGRESS', name: 'CP Namerequest' }] })).toBeUndefined()
  })

  it('returns correct Name Request state getNrState()', () => {
    expect(vm.getNrState({ state: 'CONDITIONAL', consentFlag: 'Y' })).toBe('NEED_CONSENT')
    expect(vm.getNrState({ state: 'DRAFT' })).toBe('NOT_APPROVED')
    expect(vm.getNrState({ state: 'APPROVED' })).toBe('APPROVED')
    expect(vm.getNrState({ state: 'CONDITIONAL', consentFlag: 'R' })).toBe('CONDITIONAL')
    expect(vm.getNrState({ state: 'CONDITIONAL', consentFlag: 'N' })).toBe('CONDITIONAL')
    expect(vm.getNrState({ state: 'CONSUMED' })).toBe('CONSUMED')
    expect(vm.getNrState({ state: 'EXPIRED' })).toBe('EXPIRED')
  })

  it('returns correct NR request code description getNrRequestDesc(', () => {
    expect(vm.getNrRequestDesc('NEW')).toBe('New Business')
    expect(vm.getNrRequestDesc('CHG')).toBe('Change of Name')
    expect(vm.getNrRequestDesc('CNV')).toBe('Conversion')
    expect(vm.getNrRequestDesc('REH')).toBe('Restoration')
  })
})
