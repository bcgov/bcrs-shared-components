import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import { NatureOfBusiness } from '@/components/NatureOfBusiness'

Vue.use(Vuetify)
const vuetify = new Vuetify({})

describe('Nature Of Business component', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(
      NatureOfBusiness,
      {
        vuetify,
        propsData: {
          showErrors: false,
          naics: {},
          NaicsServices: {}
        }
      }
    )
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component properly', () => {
    expect(wrapper.find('#nature-of-business').exists()).toBe(true)
  })

  // *** TODO: add more tests here
})
