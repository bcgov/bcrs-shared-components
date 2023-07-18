import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import { DocumentDelivery } from '@/components/document-delivery'

const vuetify = new Vuetify({})

// Test Case Data
const documentDeliveryCases = [
  {
    entityType: 'CP',
    tombstone: {
      userEmail: 'mockCPCompletingParty@email.com',
      contactLabel: 'Registered Office',
      additionalLabel: 'partners'
    },
    businessContact: {
      email: 'mockCPBusinessContact@email.com'
    },
    optionalEmail: false,
    custodianEmail: false
  },
  {
    entityType: 'BEN',
    tombstone: {
      userEmail: 'BENCompletingParty@email.com',
      contactLabel: 'Registered Office',
      additionalLabel: 'partners'
    },
    businessContact: {
      email: 'BENBusinessContact@email.com'
    },
    optionalEmail: false,
    custodianEmail: false
  },
  {
    entityType: 'CP',
    tombstone: {
      userEmail: 'mockCPCompletingParty@email.com',
      contactLabel: 'Registered Office',
      additionalLabel: 'partners'
    },
    businessContact: {
      email: 'mockCPBusinessContact@email.com'
    },
    optionalEmail: true,
    custodianEmail: true
  }
]

const shallowWrapperFactory = (component, propsData = null) => {
  return shallowMount(component, { propsData: { ...propsData }, vuetify })
}

for (const mock of documentDeliveryCases) {
  describe(`Document Delivery component for a ${mock.entityType}`, () => {
    let wrapper: any

    it('renders the component properly', () => {
      wrapper = shallowWrapperFactory(DocumentDelivery, {
        contactLabel: mock.tombstone.contactLabel
      })
      expect(wrapper.find('#document-delivery').exists()).toBe(true)
    })

    it('displays email labels', () => {
      wrapper = shallowWrapperFactory(DocumentDelivery, {
        contactLabel: mock.tombstone.contactLabel
      })
      expect(wrapper.findAll('label').at(0).text()).toBe(mock.tombstone.contactLabel)
      expect(wrapper.findAll('label').at(1).text()).toBe('Completing Party')
    })

    it('displays email computed values', () => {
      wrapper = shallowWrapperFactory(DocumentDelivery, {
        contactValue: mock.businessContact.email,
        completingPartyEmail: mock.tombstone.userEmail,
        contactLabel: mock.tombstone.contactLabel
      })
      expect(wrapper.find('#completing-party-email').text()).toBe(mock.tombstone.userEmail)
      expect(wrapper.find('#contact-value').text()).toBe(mock.businessContact.email)
    })

    it('displays additionalLabel and additionalValue ', () => {
      wrapper = shallowWrapperFactory(DocumentDelivery, {
        additionalValue: mock.tombstone.userEmail,
        additionalLabel: mock.tombstone.additionalLabel,
        contactLabel: mock.tombstone.contactLabel
      })

      expect(wrapper.findAll('label').at(1).text()).toBe(mock.tombstone.additionalLabel)
      expect(wrapper.find('#additional-value').text()).toBe(mock.tombstone.userEmail)
    })

    it('displays Not Entered text when computed values are absent', () => {
      mock.tombstone.userEmail = ''
      mock.businessContact.email = ''

      wrapper = shallowWrapperFactory(DocumentDelivery, {
        contactValue: mock.businessContact.email,
        completingPartyEmail: mock.tombstone.userEmail,
        contactLabel: mock.tombstone.contactLabel
      })
      expect(wrapper.find('#completing-party-email').text()).toBe('(Not entered)')
      expect(wrapper.find('#contact-value').text()).toBe('(Not entered)')
    })

    it('displays optionalEmail', () => {
      wrapper = shallowWrapperFactory(DocumentDelivery, {
        contactValue: mock.businessContact.email,
        completingPartyEmail: mock.tombstone.userEmail,
        editableCompletingParty: mock.optionalEmail,
        contactLabel: mock.tombstone.contactLabel
      })
      expect(wrapper.find('#optionalEmail').exists()).toBe(mock.optionalEmail)
    })

    it('displays showCustodianEmail', () => {
      wrapper = shallowWrapperFactory(DocumentDelivery, {
        contactValue: mock.businessContact.email,
        completingPartyEmail: mock.tombstone.userEmail,
        showCustodianEmail: mock.custodianEmail,
        contactLabel: mock.tombstone.contactLabel
      })
      expect(wrapper.find('#custodian-email').exists()).toBe(mock.custodianEmail)
    })
  })
}
