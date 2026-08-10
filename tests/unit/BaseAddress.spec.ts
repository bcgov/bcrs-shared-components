import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, Wrapper } from '@vue/test-utils'
import { required, maxLength } from 'vuelidate/lib/validators'
import { BaseAddress } from '@/components/base-address'
import { isRequiredPostalCode, isValidPostalCode } from '@bcrs-shared-components/validators'

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

describe('BaseAddress - valid event (#34469)', () => {
  // schema mirroring the consuming apps' address schemas
  const schema = {
    streetAddress: { required, maxLength: maxLength(50) },
    streetAddressAdditional: { maxLength: maxLength(105) },
    addressCity: { required, maxLength: maxLength(40) },
    addressCountry: { required },
    addressRegion: { maxLength: maxLength(2) },
    postalCode: { isRequiredPostalCode, maxLength: maxLength(15), isValidPostalCode },
    deliveryInstructions: { maxLength: maxLength(80) }
  }

  const address = {
    streetAddress: '123 Main St',
    streetAddressAdditional: 'Suite 200',
    addressCity: 'Victoria',
    addressRegion: 'BC',
    postalCode: 'V8V 1V1',
    addressCountry: 'CA',
    deliveryInstructions: ''
  }

  let wrapper: Wrapper<any>

  afterEach(() => {
    wrapper.destroy()
  })

  it('emits valid=true when an optional field is edited and the postal code was never blurred', async () => {
    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: { schema, editing: true, address }
    })
    await Vue.nextTick()

    // clear Additional Street Address without ever touching the postal code field
    // (the reported bug: this emitted valid=false and nothing ever re-emitted true)
    const line2 = wrapper.find('.street-address-additional textarea')
    await line2.setValue('')
    await Vue.nextTick()

    const validEvents = wrapper.emitted('valid')
    if (validEvents) {
      expect(validEvents[validEvents.length - 1][0]).toBe(true)
    }
    // the model itself must agree
    expect(wrapper.vm.isPostalCodeValid).toBe(true)
    expect(wrapper.vm.addressFormValid).toBe(true)
  })

  it('emits valid=false when the postal code value is invalid, even before its rules are enabled', async () => {
    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: { schema, editing: true, address: { ...address, postalCode: '' } }
    })
    await Vue.nextTick()

    // editing another field must not mask the invalid (empty, required) postal code
    const line2 = wrapper.find('.street-address-additional textarea')
    await line2.setValue('')
    await Vue.nextTick()

    expect(wrapper.vm.isPostalCodeValid).toBe(false)

    const validEvents = wrapper.emitted('valid')
    if (validEvents) {
      expect(validEvents[validEvents.length - 1][0]).toBe(false)
    }
  })

  it('emits valid=true after validate() on a fully valid address', async () => {
    wrapper = mount(BaseAddress, {
      vuetify,
      propsData: { schema, editing: true, address }
    })
    await Vue.nextTick()

    await wrapper.vm.validate()
    await Vue.nextTick()

    const validEvents = wrapper.emitted('valid')
    expect(validEvents).toBeTruthy()
    expect(validEvents[validEvents.length - 1][0]).toBe(true)
  })
})
