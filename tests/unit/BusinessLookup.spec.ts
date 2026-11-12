import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, shallowMount } from '@vue/test-utils'
import { vi } from 'vitest'
import { BusinessLookup } from '@/components/business-lookup'

const vuetify = new Vuetify({})

const DEFAULT_LEGAL_TYPES = 'A,BC,BEN,C,CBEN,CC,CCC,CP,CS,CUL,FI,GP,LL,LLC,LP,PA,S,SP,ULC,XCP,XL,XP,XS'

/** Lets promises (e.g. the mocked search) settle. */
const flushPromises = () => new Promise(resolve => setTimeout(resolve))

/**
 * Stubs for a full mount. The autocomplete stub renders only the named slots we care about
 * (the real menu content is lazy and attached elsewhere in the DOM, which is hard to test).
 */
const slotStub = { template: '<div><slot /></div>' }
const fullMountStubs = {
  VAutocomplete: {
    template: '<div class="autocomplete-stub"><slot name="prepend-item" /><slot name="no-data" /></div>'
  },
  VListItem: slotStub,
  VRow: slotStub,
  VCol: slotStub,
  VBtn: slotStub,
  VIcon: slotStub,
  VTextField: slotStub
}

describe('Business Lookup component', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(
      BusinessLookup,
      {
        vuetify,
        propsData: {
          showErrors: false,
          businessLookup: {},
          BusinessLookupServices: {},
          hasBusinessLookupChanges: false
        }
      }
    )
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component properly', () => {
    expect(wrapper.find('#business-lookup').exists()).toBe(true)
  })

  it('renders the undo action when prompted', async () => {
    wrapper.vm.state = 'summary'
    wrapper.setProps({
      businessLookup: {
        identifier: 'BC1234567',
        name: 'test business name'
      },
      hasBusinessLookupChanges: true
    })
    await Vue.nextTick()

    expect(wrapper.find('#bl-undo-btn').exists()).toBe(true)
  })

  // *** new props: defaults (backward compatibility for existing callers) ***

  describe('default props', () => {
    it('has no excluded legal types, no heading and the generic no-data message', () => {
      expect(wrapper.props('excludeLegalTypes')).toEqual([])
      expect(wrapper.props('resultsHeading')).toBeNull()
      expect(wrapper.props('noDataMessage')).toBe('No matches found.')
      expect(wrapper.props('noDataDetails')).toBeNull()
    })
  })

  // *** excludeLegalTypes / effectiveLegalTypes ***

  describe('effectiveLegalTypes', () => {
    it('returns the full default list when nothing is excluded', () => {
      expect(wrapper.vm.effectiveLegalTypes).toBe(DEFAULT_LEGAL_TYPES)
    })

    it('removes an excluded type from the default list', async () => {
      wrapper.setProps({ excludeLegalTypes: ['SP'] })
      await Vue.nextTick()

      const types = wrapper.vm.effectiveLegalTypes.split(',')
      expect(types).not.toContain('SP')
      // all other types are still present
      expect(types).toHaveLength(DEFAULT_LEGAL_TYPES.split(',').length - 1)
      expect(types).toContain('GP')
      expect(types).toContain('BC')
    })

    it('removes multiple excluded types', async () => {
      wrapper.setProps({ excludeLegalTypes: ['SP', 'GP'] })
      await Vue.nextTick()

      const types = wrapper.vm.effectiveLegalTypes.split(',')
      expect(types).not.toContain('SP')
      expect(types).not.toContain('GP')
    })

    it('does not change the list when excluding a type that is not in it', async () => {
      wrapper.setProps({ excludeLegalTypes: ['ZZZ'] })
      await Vue.nextTick()

      expect(wrapper.vm.effectiveLegalTypes).toBe(DEFAULT_LEGAL_TYPES)
    })

    it('applies exclusions on top of a custom legalTypes list', async () => {
      wrapper.setProps({ legalTypes: 'BC,GP,SP', excludeLegalTypes: ['SP'] })
      await Vue.nextTick()

      expect(wrapper.vm.effectiveLegalTypes).toBe('BC,GP')
    })

    it('tolerates whitespace in the lists', async () => {
      wrapper.setProps({ legalTypes: 'BC, GP, SP', excludeLegalTypes: [' SP '] })
      await Vue.nextTick()

      expect(wrapper.vm.effectiveLegalTypes).toBe('BC,GP')
    })
  })

  // *** the search call uses the effective legal types ***

  describe('search', () => {
    let search: ReturnType<typeof vi.fn>

    beforeEach(() => {
      search = vi.fn().mockResolvedValue([])
      wrapper.setProps({ BusinessLookupServices: { search } })
    })

    it('passes the full default list to the service when nothing is excluded', async () => {
      wrapper.vm.onSearchInput('test')
      wrapper.vm.onSearchInputDebounced.flush()
      await flushPromises()

      expect(search).toHaveBeenCalledWith('test', 'ACTIVE', DEFAULT_LEGAL_TYPES)
    })

    it('passes the list without the excluded types to the service', async () => {
      wrapper.setProps({ excludeLegalTypes: ['SP'] })
      await Vue.nextTick()

      wrapper.vm.onSearchInput('test')
      wrapper.vm.onSearchInputDebounced.flush()
      await flushPromises()

      const legalTypesArg = search.mock.calls[0][2] as string
      expect(legalTypesArg.split(',')).not.toContain('SP')
      expect(legalTypesArg).toBe(wrapper.vm.effectiveLegalTypes)
    })

    it('does not search for fewer than 3 characters', async () => {
      wrapper.vm.onSearchInput('te')
      wrapper.vm.onSearchInputDebounced.flush()
      await flushPromises()

      expect(search).not.toHaveBeenCalled()
      expect(wrapper.vm.state).toBe('initial')
    })

    it('shows the no results state when the search returns nothing', async () => {
      wrapper.vm.onSearchInput('test')
      wrapper.vm.onSearchInputDebounced.flush()
      await flushPromises()

      expect(wrapper.vm.state).toBe('no results')
    })

    it('shows the no results state when the search fails', async () => {
      search.mockRejectedValue(new Error('network error'))

      wrapper.vm.onSearchInput('test')
      wrapper.vm.onSearchInputDebounced.flush()
      await flushPromises()

      expect(wrapper.vm.state).toBe('no results')
    })
  })

  // *** heading and no-data rendering ***

  describe('results heading and no-data message', () => {
    let fullWrapper: any

    const mountFull = (extraProps: any = {}) =>
      mount(BusinessLookup, {
        vuetify,
        stubs: fullMountStubs,
        propsData: {
          showErrors: false,
          businessLookup: {},
          BusinessLookupServices: {},
          ...extraProps
        }
      })

    afterEach(() => {
      fullWrapper?.destroy()
    })

    it('does not render a heading by default', () => {
      fullWrapper = mountFull()

      expect(fullWrapper.find('.result-title').exists()).toBe(false)
    })

    it('renders the heading when resultsHeading is set', () => {
      fullWrapper = mountFull({ resultsHeading: 'Active B.C. Businesses:' })

      const heading = fullWrapper.find('.result-title')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('Active B.C. Businesses:')
    })

    it('renders the default no-data message as plain text for existing callers', () => {
      fullWrapper = mountFull()

      const noData = fullWrapper.find('.autocomplete-stub')
      expect(noData.text()).toBe('No matches found.')
      expect(noData.find('strong').exists()).toBe(false)
      expect(noData.find('br').exists()).toBe(false)
      expect(noData.find('.result-no-data').exists()).toBe(false)
    })

    it('renders a custom no-data message without details as plain text', () => {
      fullWrapper = mountFull({ noDataMessage: 'Nothing here.' })

      const noData = fullWrapper.find('.autocomplete-stub')
      expect(noData.text()).toBe('Nothing here.')
      expect(noData.find('strong').exists()).toBe(false)
    })

    it('renders a bold message plus details when noDataDetails is set', () => {
      fullWrapper = mountFull({
        noDataMessage: 'No active B.C. businesses found.',
        noDataDetails: 'Ensure you have entered the name or incorporation/registration number.'
      })

      const noData = fullWrapper.find('.result-no-data')
      expect(noData.exists()).toBe(true)
      expect(noData.find('strong').text()).toBe('No active B.C. businesses found.')
      expect(noData.find('br').exists()).toBe(true)
      expect(noData.text()).toContain('Ensure you have entered the name or incorporation/registration number.')
    })

    it('renders both the heading and the detailed no-data message together', () => {
      fullWrapper = mountFull({
        resultsHeading: 'Active B.C. Businesses:',
        noDataMessage: 'No active B.C. businesses found.',
        noDataDetails: 'Ensure you have entered the name or number.'
      })

      expect(fullWrapper.find('.result-title').text()).toBe('Active B.C. Businesses:')
      expect(fullWrapper.find('.result-no-data strong').text()).toBe('No active B.C. businesses found.')
    })
  })
})
