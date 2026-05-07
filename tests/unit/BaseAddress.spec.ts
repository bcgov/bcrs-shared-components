import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, Wrapper } from '@vue/test-utils'
import { BaseAddress } from '@/components/base-address'

const vuetify = new Vuetify({})

describe('BaseAddress - isSchemaRequired', () => {
  let wrapper: Wrapper<any>

  afterEach(() => {
    wrapper.destroy()
  })

  it('returns true when prop has required validator', () => {
    const schema = {
      streetAddress: { required: true },
      postalCode: { isRequiredPostalCode: true }
    }

    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: {
        schema,
        editing: false
      }
    })

    expect(wrapper.vm.isSchemaRequired('streetAddress')).toBe(true)
  })

  it('returns false when prop does not have required validator', () => {
    const schema = {
      streetAddressAdditional: { maxLength: 50 },
      postalCode: { isRequiredPostalCode: true }
    }

    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: {
        schema,
        editing: false
      }
    })

    expect(wrapper.vm.isSchemaRequired('streetAddressAdditional')).toBe(false)
  })

  it('returns false when prop has isRequiredPostalCode but not required', () => {
    const schema = {
      postalCode: { isRequiredPostalCode: true }
    }

    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: {
        schema,
        editing: false
      }
    })

    expect(wrapper.vm.isSchemaRequired('postalCode')).toBe(false)
  })

  it('returns false when schema is null', () => {
    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: {
        schema: null,
        editing: false
      }
    })

    expect(wrapper.vm.isSchemaRequired('streetAddress')).toBe(false)
  })

  it('returns false when prop does not exist in schema', () => {
    const schema = {
      streetAddress: { required: true }
    }

    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: {
        schema,
        editing: false
      }
    })

    expect(wrapper.vm.isSchemaRequired('nonExistentProp')).toBe(false)
  })

  it('returns false when required is false', () => {
    const schema = {
      streetAddress: { required: false }
    }

    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: {
        schema,
        editing: false
      }
    })

    expect(wrapper.vm.isSchemaRequired('streetAddress')).toBe(false)
  })
})

describe('BaseAddress - isLatin1Value', () => {
  let wrapper: Wrapper<any>

  beforeEach(() => {
    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: { schema: null, editing: false }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('returns true for empty / null / undefined', () => {
    expect(wrapper.vm.isLatin1Value('')).toBe(true)
    expect(wrapper.vm.isLatin1Value(null)).toBe(true)
    expect(wrapper.vm.isLatin1Value(undefined)).toBe(true)
  })

  it('returns true for plain ASCII strings', () => {
    expect(wrapper.vm.isLatin1Value('123 Main St')).toBe(true)
    expect(wrapper.vm.isLatin1Value('Vancouver')).toBe(true)
  })

  it('returns true for accented characters within Latin-1 (French / German / Spanish)', () => {
    expect(wrapper.vm.isLatin1Value('Montréal')).toBe(true)
    expect(wrapper.vm.isLatin1Value('Düsseldorf')).toBe(true)
    expect(wrapper.vm.isLatin1Value('Niño')).toBe(true)
    expect(wrapper.vm.isLatin1Value('Québec')).toBe(true)
  })

  it('returns false for CJK scripts', () => {
    expect(wrapper.vm.isLatin1Value('开封市')).toBe(false) // Kaifeng City
    expect(wrapper.vm.isLatin1Value('東京')).toBe(false) // Tokyo
    expect(wrapper.vm.isLatin1Value('서울')).toBe(false) // Seoul
  })

  it('returns false for Cyrillic / Greek / Arabic scripts', () => {
    expect(wrapper.vm.isLatin1Value('Москва')).toBe(false)
    expect(wrapper.vm.isLatin1Value('Αθήνα')).toBe(false)
    expect(wrapper.vm.isLatin1Value('القاهرة')).toBe(false)
  })

  it('returns false when even one character is outside Latin-1', () => {
    expect(wrapper.vm.isLatin1Value('Hello 世界')).toBe(false)
  })
})

describe('BaseAddress - isLatin1Record', () => {
  let wrapper: Wrapper<any>

  beforeEach(() => {
    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: { schema: null, editing: false }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('returns true when all displayable fields are Latin-1', () => {
    const record = {
      Line1: '123 Main St',
      City: 'Vancouver',
      Province: 'British Columbia',
      ProvinceName: 'British Columbia'
    }
    expect(wrapper.vm.isLatin1Record(record)).toBe(true)
  })

  it('returns true when displayable fields contain Latin-1 accented characters', () => {
    const record = {
      Line2: 'Province de Québec',
      City: 'Montréal',
      Province: 'Québec',
      ProvinceName: 'Québec'
    }
    expect(wrapper.vm.isLatin1Record(record)).toBe(true)
  })

  it('returns false when any displayable field contains non-Latin-1 characters', () => {
    const record = {
      Line2: 'Lankao County',
      City: '开封市', // Kaifeng City in CJK
      ProvinceName: 'Henan Province'
    }
    expect(wrapper.vm.isLatin1Record(record)).toBe(false)
  })

  it('ignores non-displayable fields like Id, Language, Neighbourhood', () => {
    const record = {
      Id: 'CN|UP|B|N2826763',
      Language: 'ENG',
      Neighbourhood: '仪封乡', // CJK, but not in latin1Fields
      Line1: '',
      Line2: 'Lankao County',
      City: 'Kaifeng City',
      Province: 'Henan Province',
      ProvinceName: 'Henan Province'
    }
    expect(wrapper.vm.isLatin1Record(record)).toBe(true)
  })
})

describe('BaseAddress - buildRetrieveFormattedUrl', () => {
  let wrapper: Wrapper<any>

  beforeEach(() => {
    (window as any).addressCompleteKey = 'TEST-KEY-123'
    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: { schema: null, editing: false }
    })
  })

  afterEach(() => {
    wrapper.destroy()
    delete (window as any).addressCompleteKey
  })

  it('returns null when picked record has no Id', () => {
    expect(wrapper.vm.buildRetrieveFormattedUrl({})).toBeNull()
  })

  it('returns null when window.addressCompleteKey is unset', () => {
    delete (window as any).addressCompleteKey
    expect(wrapper.vm.buildRetrieveFormattedUrl({ Id: 'CN|UP|B|N2826763' })).toBeNull()
  })

  it('targets json3ex.ws (the CORS-enabled XHR endpoint), not json.ws', () => {
    const url = wrapper.vm.buildRetrieveFormattedUrl({ Id: 'CN|UP|B|N2826763' })
    expect(url).toContain('/RetrieveFormatted/v2.10/json3ex.ws?')
    expect(url).not.toContain('/json.ws?')
  })

  it('includes the addressCompleteKey from window', () => {
    const url = wrapper.vm.buildRetrieveFormattedUrl({ Id: 'CN|UP|B|N2826763' })
    expect(url).toContain('Key=TEST-KEY-123')
  })

  it('URL-encodes the Id (pipe characters become %7C)', () => {
    const url = wrapper.vm.buildRetrieveFormattedUrl({ Id: 'CN|UP|B|N2826763' })
    expect(url).toContain('Id=CN%7CUP%7CB%7CN2826763')
    expect(url).not.toContain('Id=CN|UP|B|N2826763')
  })

  it('includes empty Source and Language=en parameters', () => {
    const url = wrapper.vm.buildRetrieveFormattedUrl({ Id: 'CN|UP|B|N2826763' })
    expect(url).toContain('Source=')
    expect(url).toContain('Language=en')
  })
})
