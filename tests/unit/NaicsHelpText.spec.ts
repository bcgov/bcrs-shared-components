import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import NaicsHelpText from '@/components/nature-of-business/NaicsHelpText.vue'

const vuetify = new Vuetify({})

describe('NAICS Help Text component', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(
      NaicsHelpText,
      { vuetify }
    )
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component properly', () => {
    expect(wrapper.find('#naics-help-text').exists()).toBe(true)
  })

  // FUTURE: add more tests here
})
