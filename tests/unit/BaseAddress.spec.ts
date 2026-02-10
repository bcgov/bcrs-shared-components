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
