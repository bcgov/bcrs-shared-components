import Vue from 'vue'
import Vuetify from 'vuetify'
import Affix from 'vue-affix'
import VueRouter from 'vue-router'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { CompletingParty } from '@/components/completing-party'
import { CompletingPartyIF } from '@/interfaces'

Vue.use(Vuetify)
Vue.use(Affix)

const vuetify = new Vuetify({})
const localVue = createLocalVue()
localVue.use(VueRouter)

describe('CompletingParty', () => {
  const party: CompletingPartyIF = {
    firstName: 'first',
    middleName: 'middle',
    lastName: 'last',
    mailingAddress: {
      addressCity: 'city',
      addressCountry: 'CAN',
      addressRegion: 'BC',
      addressType: '',
      deliveryInstructions: '',
      postalCode: 'V',
      streetAddress: 'V',
      streetAddressAdditional: 'V'
    },
    email: '',
    phone: ''
  }
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(
      CompletingParty,
      {
        propsData: {
          enableAddEdit: true,
          completingParty: party,
          invalidSection: false
        },
        vuetify,
        localVue
      }
    )
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('initializes correctly', () => {
    // verify that component mounts
    expect(wrapper.findComponent(CompletingParty).exists()).toBe(true)
    expect(wrapper.find('#person__first-name').exists()).toBe(true)
    expect(wrapper.find('#person__middle-name').exists()).toBe(true)
    expect(wrapper.find('#person__last-name').exists()).toBe(true)
  })

  it('verify max length for first name', async () => {
    // Need help with this: I cannot use setValue on input
    // const input = wrapper.find('#person__first-name')
    // input.setValue('first name max length is over the limit')
  })
})
