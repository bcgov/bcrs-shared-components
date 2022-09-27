import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import { ShareStructure } from '@/components/share-structure'
import { ActionChip } from '@/components/action-chip'

// suppress the "[Vuetify] Unable to locate target [data-app]" warning
document.body.setAttribute('data-app', 'true')

// suppress the "[Vuetify] Unable to locate target #share-structure" warning
document.body.setAttribute('id', 'share-structure')

Vue.use(Vuetify)
Vue.use(Vuelidate)

const vuetify = new Vuetify({})
const localVue = createLocalVue()

describe('Share Structure component', () => {
  let wrapper: any

  const shareClassesOriginal: any = [
    {
      id: '1',
      name: 'Common Shares',
      priority: 0,
      maxNumberOfShares: 10000,
      parValue: 1.58,
      currency: 'CAD',
      hasRightsOrRestrictions: true,
      series: [
        {
          id: '1',
          name: 'Share Series 1',
          priority: 1,
          hasMaximumShares: true,
          maxNumberOfShares: 50,
          hasRightsOrRestrictions: false
        },
        {
          id: '2',
          name: 'Share Series 2',
          priority: 2,
          hasMaximumShares: true,
          maxNumberOfShares: 100,
          hasRightsOrRestrictions: false
        }
      ]
    },
    {
      id: '2',
      name: 'Non-voting Shares',
      priority: 1,
      maxNumberOfShares: 1000,
      parValue: null,
      currency: '',
      hasRightsOrRestrictions: false,
      series: [
        {
          id: '1',
          name: 'Share Series 3',
          priority: 1,
          hasMaximumShares: true,
          maxNumberOfShares: 50,
          hasRightsOrRestrictions: false
        }
      ]
    },
    {
      id: '3',
      name: 'Common Shares 2',
      priority: 2,
      maxNumberOfShares: 10000,
      parValue: 0.568,
      currency: 'CAD',
      hasRightsOrRestrictions: true,
      series: []
    },
    {
      id: '4',
      priority: 3,
      name: 'Non-voting Shares 2',
      maxNumberOfShares: 1000,
      parValue: null,
      currency: '',
      hasRightsOrRestrictions: false,
      series: []
    }]

  const shareClasses: any = [
    {
      id: '1',
      name: 'Common Shares',
      priority: 0,
      maxNumberOfShares: 10000,
      parValue: 1.58,
      currency: 'CAD',
      hasRightsOrRestrictions: true,
      series: [
        {
          id: '1',
          name: 'Share Series 1',
          priority: 1,
          hasMaximumShares: true,
          maxNumberOfShares: 50,
          hasRightsOrRestrictions: false,
          action: 'REMOVED'
        },
        {
          id: '2',
          name: 'Share Series 2B',
          priority: 2,
          hasMaximumShares: true,
          maxNumberOfShares: 100,
          hasRightsOrRestrictions: false,
          action: 'EDITED'
        },
        {
          id: '3',
          name: 'Share Series 3C',
          priority: 3,
          hasMaximumShares: true,
          maxNumberOfShares: 100,
          hasRightsOrRestrictions: false,
          action: 'ADDED'
        }
      ]
    },
    {
      id: '2',
      name: 'Non-voting Shares',
      priority: 1,
      maxNumberOfShares: 1000,
      parValue: null,
      currency: '',
      hasRightsOrRestrictions: false,
      series: [
        {
          id: '1',
          name: 'Share Series 3',
          priority: 1,
          hasMaximumShares: true,
          maxNumberOfShares: 50,
          hasRightsOrRestrictions: false
        },
        {
          id: '2',
          name: 'Share Series 3B',
          priority: 2,
          hasMaximumShares: true,
          maxNumberOfShares: 50,
          hasRightsOrRestrictions: false,
          action: 'ADDED'
        }
      ]
    },
    {
      id: '3',
      name: 'Common Shares 2B',
      priority: 2,
      maxNumberOfShares: 10000,
      parValue: 0.568,
      currency: 'CAD',
      hasRightsOrRestrictions: true,
      series: [],
      action: 'EDITED'
    },
    {
      id: '4',
      priority: 3,
      name: 'Non-voting Shares 2',
      maxNumberOfShares: 1000,
      parValue: null,
      currency: '',
      hasRightsOrRestrictions: false,
      series: [],
      action: 'REMOVED'
    },
    {
      id: '5',
      priority: 4,
      name: 'Non-voting Shares 3',
      maxNumberOfShares: 1000,
      parValue: null,
      currency: '',
      hasRightsOrRestrictions: false,
      series: [],
      action: 'ADDED'
    }]

  const shareClassesNestedSeriesCorrected: any = [
    {
      id: '1',
      name: 'Common Shares',
      priority: 0,
      maxNumberOfShares: 10000,
      parValue: 1.58,
      currency: 'CAD',
      hasRightsOrRestrictions: true,
      series: [
        {
          id: '1',
          name: 'Share Series 1',
          priority: 1,
          hasMaximumShares: true,
          maxNumberOfShares: 50,
          hasRightsOrRestrictions: false
        },
        {
          id: '2',
          name: 'Share Series 2',
          priority: 2,
          hasMaximumShares: true,
          maxNumberOfShares: 100,
          hasRightsOrRestrictions: false
        }
      ]
    },
    {
      id: '2',
      name: 'Non-voting Shares',
      priority: 1,
      maxNumberOfShares: 1000,
      parValue: null,
      currency: '',
      hasRightsOrRestrictions: false,
      series: [
        {
          id: '1',
          name: 'Share Series 3B',
          priority: 1,
          hasMaximumShares: true,
          maxNumberOfShares: 50,
          hasRightsOrRestrictions: false,
          action: 'CORRECTED'
        }
      ]
    },
    {
      id: '3',
      name: 'Common Shares 2',
      priority: 2,
      maxNumberOfShares: 10000,
      parValue: 0.568,
      currency: 'CAD',
      hasRightsOrRestrictions: true,
      series: []
    },
    {
      id: '4',
      priority: 3,
      name: 'Non-voting Shares 2',
      maxNumberOfShares: 1000,
      parValue: null,
      currency: '',
      hasRightsOrRestrictions: false,
      series: []
    }]

  beforeEach(() => {
    wrapper = mount(ShareStructure, {
      localVue,
      vuetify,
      propsData: {
        originalShareStructure: shareClassesOriginal,
        shareClasses: shareClasses
      }
    })
  })

  afterEach(async () => {
    await wrapper.destroy()
  })

  it('displays the correct amount of share classes / series when data is present', () => {
    const classRowCount = wrapper.vm.$el.querySelectorAll('.v-data-table .class-row').length
    const seriesRowCount = wrapper.vm.$el.querySelectorAll('.v-data-table .series-row').length

    expect(classRowCount).toEqual(5)
    expect(seriesRowCount).toEqual(5)
  })

  it('displays the correct name data in the share classes / series table', () => {
    const classListItem1 = wrapper.vm.$el.querySelectorAll('.v-data-table .class-row')[0]
    const seriesListItem1 = wrapper.vm.$el.querySelectorAll('.v-data-table .series-row')[0]

    expect(classListItem1.querySelector('.list-item__title').textContent).toContain('Common Shares')
    expect(seriesListItem1.querySelector('.series-name').textContent).toContain('Share Series 1')
  })

  it('displays the correct data in the selected table rows for shareClass', () => {
    const classListItem1 = wrapper.vm.$el.querySelectorAll('.v-data-table .class-row')[2]

    expect(classListItem1.querySelectorAll('td')[0].textContent).toContain('Common Shares 2')
    expect(classListItem1.querySelectorAll('td')[1].textContent).toContain('10,000')
    expect(classListItem1.querySelectorAll('td')[2].textContent).toContain('0.568')
    expect(classListItem1.querySelectorAll('td')[3].textContent).toContain('CAD')
    expect(classListItem1.querySelectorAll('td')[4].textContent).toContain('Yes')

    const classListItem2 = wrapper.vm.$el.querySelectorAll('.v-data-table .class-row')[3]

    expect(classListItem2.querySelectorAll('td')[0].textContent).toContain('Non-voting Shares 2')
    expect(classListItem2.querySelectorAll('td')[1].textContent).toContain('1,000')
    expect(classListItem2.querySelectorAll('td')[2].textContent).toContain('No Par Value')
    expect(classListItem2.querySelectorAll('td')[3].textContent).toContain('')
    expect(classListItem2.querySelectorAll('td')[4].textContent).toContain('No')
  })

  it('displays the correct data in the selected table rows for ShareSeries', () => {
    const seriesListItem1 = wrapper.vm.$el.querySelectorAll('.v-data-table .series-row')[1]

    expect(seriesListItem1.querySelectorAll('td')[0].textContent).toContain('Share Series 2')
    expect(seriesListItem1.querySelectorAll('td')[1].textContent).toContain(100)
    expect(seriesListItem1.querySelectorAll('td')[2].textContent).toContain('1.58')
    expect(seriesListItem1.querySelectorAll('td')[3].textContent).toContain('CAD')
    expect(seriesListItem1.querySelectorAll('td')[4].textContent).toContain('No')

    const seriesListItem2 = wrapper.vm.$el.querySelectorAll('.v-data-table .series-row')[2]

    expect(seriesListItem2.querySelectorAll('td')[0].textContent).toContain('Share Series 3')
    expect(seriesListItem2.querySelectorAll('td')[1].textContent).toContain(100)
    expect(seriesListItem2.querySelectorAll('td')[2].textContent).toContain('1.58')
    expect(seriesListItem2.querySelectorAll('td')[3].textContent).toContain('')
    expect(seriesListItem2.querySelectorAll('td')[4].textContent).toContain('No')
  })

  it('checks for the Action chips on modified Class shares', async () => {
    expect(wrapper.findComponent(ActionChip).exists()).toBe(true)

    wrapper.setProps({ editedLabel: 'CORRECTED' })
    await Vue.nextTick()

    const classSharesEdited = wrapper.findAllComponents(ActionChip).at(4)
    const classSharesRemoved = wrapper.findAllComponents(ActionChip).at(5)
    const classSharesAdded = wrapper.findAllComponents(ActionChip).at(6)

    expect(classSharesEdited.text()).toContain('CORRECTED')
    expect(classSharesRemoved.text()).toContain('REMOVED')
    expect(classSharesAdded.text()).toContain('ADDED')
    expect(wrapper.vm.hasClassChanges).toBe(true)
  })

  it('checks for the Action chips on modified Series shares', async () => {
    expect(wrapper.findComponent(ActionChip).exists()).toBe(true)

    wrapper.setProps({ editedLabel: 'CORRECTED' })
    await Vue.nextTick()

    const seriesSharesRemoved = wrapper.findAllComponents(ActionChip).at(0)
    const seriesSharesEdited = wrapper.findAllComponents(ActionChip).at(1)
    const seriesSharesAdded = wrapper.findAllComponents(ActionChip).at(2)

    expect(seriesSharesRemoved.text()).toContain('REMOVED')
    expect(seriesSharesEdited.text()).toContain('CORRECTED')
    expect(seriesSharesAdded.text()).toContain('ADDED')
    expect(wrapper.vm.hasSeriesChanges).toBe(true)
  })

  it('checks for correct CLASS primary action', async () => {
    wrapper.setProps({ editLabel: 'Correct' })
    await Vue.nextTick()

    // Verify the correct PRIMARY action
    const classRows = wrapper.vm.$el.querySelectorAll('.v-data-table .class-row')
    expect(classRows[0].querySelector('#class-0-change-btn').textContent).toContain('Correct')
    expect(classRows[3].querySelector('#class-3-undo-btn').textContent).toContain('Undo')
    expect(classRows[4].querySelector('#class-4-change-added-btn').textContent).toContain('Edit')
  })

  it('checks for correct SERIES primary action', async () => {
    wrapper.setProps({ editLabel: 'Correct' })
    await Vue.nextTick()

    // Verify the correct PRIMARY action
    const seriesRows = wrapper.vm.$el.querySelectorAll('.v-data-table .series-row')
    expect(seriesRows[0].querySelector('#series-0-undo-btn').textContent).toContain('Undo')
    expect(seriesRows[2].querySelector('#series-2-change-added-btn').textContent).toContain('Edit')
    expect(seriesRows[3].querySelector('#series-0-change-btn').textContent).toContain('Correct')
  })

  it('assigns the correct data for ShareClasses after moving an item', async () => {
    // Validate the Class values pre move
    expect(wrapper.vm.shareClasses[0].name).toBe('Common Shares')
    expect(wrapper.vm.shareClasses[1].name).toBe('Non-voting Shares')

    // Validate the Series values pre move
    expect(wrapper.vm.shareClasses[0].series[0].name).toBe('Share Series 1')
    expect(wrapper.vm.shareClasses[0].series[1].name).toBe('Share Series 2B')

    // Identify and click the dropdown menu
    const dropDownMenu = wrapper.find('.actions__more-actions__btn')
    await dropDownMenu.trigger('click')

    expect(wrapper.find('.move-up-selector').exists()).toBe(true)
    expect(wrapper.find('.move-down-selector').exists()).toBe(true)

    const moveDown = wrapper.find('.move-down-selector')
    await moveDown.trigger('click')

    // Validate class data post move
    expect(wrapper.vm.shareClasses[0].name).toBe('Non-voting Shares')
    expect(wrapper.vm.shareClasses[1].name).toBe('Common Shares')

    // Validate series data post move
    expect(wrapper.vm.shareClasses[0].series[0].name).toBe('Share Series 3')
  })

  it('displays the Confirm Class Removal dialog when the class to remove has Series', async () => {
    // Confirm dialog is not viewable by default
    expect(wrapper.find('.confirm-dialog').exists()).toBe(false)

    const dropDownMenu = wrapper.find('.actions__more-actions__btn')
    await dropDownMenu.trigger('click')
    await Vue.nextTick()

    const moveDown = wrapper.find('.remove-selector')
    await moveDown.trigger('click')
    await Vue.nextTick()

    expect(wrapper.find('.confirm-dialog').exists()).toBe(true)
  })

  it('correctly identifies no changes in the class and series structure', async () => {
    // Restore the Share Structure to it's original state
    wrapper.setProps({ shareClasses: shareClassesOriginal })

    await Vue.nextTick()

    expect(wrapper.vm.hasClassChanges).toBe(false)
    expect(wrapper.vm.hasSeriesChanges).toBe(false)
  })

  it('correctly identifies changes in the nested series structure', async () => {
    // Restore the Share Structure to it's original state
    wrapper.setProps({ shareClasses: shareClassesOriginal })
    await Vue.nextTick()
    expect(wrapper.vm.hasSeriesChanges).toBe(false)

    // Modify the structure
    wrapper.setProps({ shareClasses: shareClassesNestedSeriesCorrected })
    await Vue.nextTick()

    expect(wrapper.vm.hasSeriesChanges).toBe(true)
  })

  // Checks for alterations label
  it('checks for the Action chips on modified Class shares', async () => {
    wrapper.setProps({ editedLabel: 'CHANGED' })
    await Vue.nextTick()

    expect(wrapper.findComponent(ActionChip).exists()).toBe(true)

    const classSharesEdited = wrapper.findAllComponents(ActionChip).at(4)
    const classSharesRemoved = wrapper.findAllComponents(ActionChip).at(5)
    const classSharesAdded = wrapper.findAllComponents(ActionChip).at(6)

    expect(classSharesEdited.text()).toContain('CHANGED')
    expect(classSharesRemoved.text()).toContain('REMOVED')
    expect(classSharesAdded.text()).toContain('ADDED')
    expect(wrapper.vm.hasClassChanges).toBe(true)
  })

  it('checks for the Action chips on modified Series shares', async () => {
    wrapper.setProps({ editedLabel: 'CHANGED' })
    await Vue.nextTick()

    expect(wrapper.findComponent(ActionChip).exists()).toBe(true)

    const seriesSharesRemoved = wrapper.findAllComponents(ActionChip).at(0)
    const seriesSharesEdited = wrapper.findAllComponents(ActionChip).at(1)
    const seriesSharesAdded = wrapper.findAllComponents(ActionChip).at(2)

    expect(seriesSharesRemoved.text()).toContain('ADDED')
    expect(seriesSharesEdited.text()).toContain('REMOVED')
    expect(seriesSharesAdded.text()).toContain('CHANGED')
    expect(wrapper.vm.hasSeriesChanges).toBe(true)
  })

  it('checks for correct CLASS primary action', async () => {
    wrapper.setProps({ editLabel: 'Change' })
    await Vue.nextTick()

    // Verify the correct PRIMARY action
    const classRows = wrapper.vm.$el.querySelectorAll('.v-data-table .class-row')
    expect(classRows[0].querySelector('#class-0-change-btn').textContent).toContain('Change')
    expect(classRows[3].querySelector('#class-3-undo-btn').textContent).toContain('Undo')
    expect(classRows[4].querySelector('#class-4-change-added-btn').textContent).toContain('Edit')
  })

  it('displays the error message when invalid minimum Share Classes', async () => {
    wrapper.setProps({ invalidMinimumShareClass: true })
    await Vue.nextTick()

    expect(wrapper.find('.share-info-container').text())
      .toContain('Your share structure must contain at least one share class.')
  })
})
