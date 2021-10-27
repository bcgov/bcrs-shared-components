import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import sinon from 'sinon'
import { mount, Wrapper } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import { sleep } from '@/utils/sleep'
import { StaffComments } from '@/components/StaffComments'

// suppress the "[Vuetify] Unable to locate target [data-app]" warning
document.body.setAttribute('data-app', 'true')

// suppress "Avoid mutating a prop directly" warnings
// ref: https://github.com/vuejs/vue-test-utils/issues/532
Vue.config.silent = true

Vue.use(Vuetify)
const vuetify = new Vuetify({})

// sample comments array for mocking API response
const sampleComments = [
  {
    comment: {
      comment: 'A comment.',
      submitterDisplayName: 'Tester',
      timestamp: '2021-02-04T22:08:27.930417+00:00'
    }
  }
]

describe('Staff Comments', () => {
  let wrapper: Wrapper<StaffComments>

  afterEach(() => {
    wrapper.destroy()
    sinon.restore()
  })

  it('displays correctly with no previous comments', async () => {
    // mock GET comments endpoint
    sinon.stub(axios, 'get').withArgs('businesses/CP0000001/comments')
      .returns(new Promise(resolve => resolve({ data: { comments: [] } })))

    // mount the component
    wrapper = mount(StaffComments, { propsData: { axios, businessId: 'CP0000001', maxLength: 2000 }, vuetify })
    const vm: any = wrapper.vm
    await flushPromises()

    // verify a few things
    expect(vm.maxLength).toBe(2000)
    expect(vm.comments.length).toBe(0)
    expect(wrapper.find('#comments-button span').text()).toBe('0 Comments')

    // open the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // verify empty section
    expect(wrapper.findAll('#existing-comments > div').length).toBe(0)
  })

  it('displays correctly with existing comments', async () => {
    // mock GET comments endpoint
    sinon.stub(axios, 'get').withArgs('businesses/CP0000002/comments')
      .returns(new Promise(resolve => resolve({ data: { comments: sampleComments } }))
      )

    // mount the component
    wrapper = mount(StaffComments, { propsData: { axios, businessId: 'CP0000002' }, vuetify })
    const vm: any = wrapper.vm
    await flushPromises()

    // verify a few things
    expect(vm.maxLength).toBe(4096)
    expect(vm.comments.length).toBe(1)
    expect(wrapper.find('#comments-button span').text()).toBe('1 Comment')

    // open the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // verify comment in div
    expect(wrapper.findAll('#existing-comments > div').length).toBe(1)
    expect(wrapper.find('#existing-comments > div').text()).toContain('A comment')
    expect(wrapper.find('#existing-comments > div').text()).toContain('Tester')
    expect(wrapper.find('#existing-comments > div').text()).toContain('Feb 4, 2021 at 2:08 pm Pacific time')
  })

  it('saves and updates correctly', async () => {
    // mock GET comments endpoint
    const callback = sinon.stub(axios, 'get').withArgs('businesses/CP0000003/comments')
    callback.onCall(0).returns(new Promise(resolve => resolve({
      data: { comments: [] }
    })))
    callback.onCall(1).returns(new Promise(resolve => resolve({
      data: { comments: sampleComments }
    })))

    // mock POST comments endpoint
    sinon.stub(axios, 'post').withArgs('businesses/CP0000003/comments')
      .returns(new Promise(resolve => resolve({})))

    // mount the component
    wrapper = mount(StaffComments, { propsData: { axios, businessId: 'CP0000003' }, vuetify })
    const vm: any = wrapper.vm
    await flushPromises()

    // verify initial comments list
    expect(vm.comments.length).toBe(0)

    // open the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // verify that textarea is empty
    const textarea = wrapper.find('textarea')
    expect((textarea.element as HTMLInputElement).value).toBe('')

    // enter a comment and verify textarea again
    await textarea.setValue('A comment')
    expect((textarea.element as HTMLInputElement).value).toBe('A comment')

    // save the comment
    await wrapper.find('#save-button').trigger('click')
    await flushPromises()

    // verify updated comments list
    expect(vm.comments.length).toBe(1)
  })

  it('closes the dialog correctly', async () => {
    // mock GET comments endpoint
    sinon.stub(axios, 'get').withArgs('businesses/CP0000004/comments')
      .returns(new Promise(resolve => resolve({ data: { comments: [] } })))

    // mount the component
    wrapper = mount(StaffComments, { propsData: { axios, businessId: 'CP0000004' }, vuetify })
    const vm: any = wrapper.vm
    await flushPromises()

    // verify init element states
    // NB: the actual menu is not initially rendered
    expect(wrapper.find('#comments-button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('.v-menu__content').exists()).toBe(false)

    // open the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // verify updated element states
    // NB: the menu is now rendered
    expect(wrapper.find('#comments-button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('.v-menu__content').isVisible()).toBe(true)

    // close the dialog
    // wait for Vue to finish transition
    await wrapper.find('#close-button').trigger('click')
    await sleep(500)

    // verify updated element states
    // NB: the menu is still rendered
    expect(wrapper.find('#comments-button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('.v-menu__content').isVisible()).toBe(false)
  })

  it('cancels the dialog correctly', async () => {
    // mock GET comments endpoint
    sinon.stub(axios, 'get').withArgs('businesses/CP0000005/comments')
      .returns(new Promise(resolve => resolve({ data: { comments: [] } })))

    // mount the component
    wrapper = mount(StaffComments, { propsData: { axios, businessId: 'CP0000005' }, vuetify })
    const vm: any = wrapper.vm
    await flushPromises()

    // verify init element states
    // NB: the actual menu is not initially rendered
    expect(wrapper.find('#comments-button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('.v-menu__content').exists()).toBe(false)

    // open the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // verify updated element states
    // NB: the menu is now rendered
    expect(wrapper.find('#comments-button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('.v-menu__content').isVisible()).toBe(true)

    // cancel the dialog
    // wait for Vue to finish transition
    await wrapper.find('#cancel-button').trigger('click')
    await sleep(500)

    // verify updated element states
    // NB: the menu is still rendered
    expect(wrapper.find('#comments-button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('.v-menu__content').isVisible()).toBe(false)
  })

  it('validates empty comment correctly', async () => {
    // mock GET comments endpoint
    sinon.stub(axios, 'get').withArgs('businesses/CP0000006/comments')
      .returns(new Promise(resolve => resolve({ data: { comments: [] } })))

    // mount the component
    wrapper = mount(StaffComments, { propsData: { axios, businessId: 'CP0000006' }, vuetify })
    const vm: any = wrapper.vm
    await flushPromises()

    // open the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // verify textarea component does not have error class
    // verify there are no error messages
    expect(wrapper.find('.v-textarea').classes('error--text')).toBe(false)
    expect(wrapper.findAll('.v-messages__message').length).toBe(0)

    // set empty value to make textarea "dirty"
    // then run validation
    await wrapper.find('textarea').setValue('')
    vm.$refs.textarea.validate()

    // verify textarea component has error class
    // verify the error message
    expect(wrapper.find('.v-textarea').classes('error--text')).toBe(true)
    expect(wrapper.findAll('.v-messages__message').length).toBe(1)
    expect(wrapper.find('.v-messages__message').text()).toContain('Enter a comment.')
  })

  // FUTURE: fix this test
  xit('validates excessive comment correctly', async () => {
    // mock GET comments endpoint
    sinon.stub(axios, 'get').withArgs('businesses/CP0000007/comments')
      .returns(new Promise(resolve => resolve({ data: { comments: [] } })))

    // mount the component
    wrapper = mount(StaffComments, { propsData: { axios, businessId: 'CP0000007', maxLength: 3 }, vuetify })
    const vm: any = wrapper.vm
    await flushPromises()

    // open the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // verify textarea component does not have error class
    // verify there are no error messages
    expect(wrapper.find('.v-textarea').classes('error--text')).toBe(false)
    expect(wrapper.findAll('.v-messages__message').length).toBe(0)

    // set value longer than max length
    // then run validation
    await wrapper.find('textarea').setValue('abcd')
    vm.$refs.textarea.validate()

    // verify textarea component has error class
    // verify the error message
    expect(wrapper.find('.v-textarea').classes('error--text')).toBe(true)
    expect(wrapper.findAll('.v-messages__message').length).toBe(1)
    expect(wrapper.find('.v-messages__message').text()).toContain('Maximum characters reached.')
  })

  it('resets validation when reopened', async () => {
    // mock GET comments endpoint
    sinon.stub(axios, 'get').withArgs('businesses/CP0000008/comments')
      .returns(new Promise(resolve => resolve({ data: { comments: [] } })))

    // mount the component
    wrapper = mount(StaffComments, { propsData: { axios, businessId: 'CP0000008' }, vuetify })
    const vm: any = wrapper.vm
    await flushPromises()

    // open the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // set empty value to make textarea "dirty"
    // then run validation
    await wrapper.find('textarea').setValue('')
    vm.$refs.textarea.validate()

    // verify textarea component has error class
    // verify the error message
    expect(wrapper.find('.v-textarea').classes('error--text')).toBe(true)
    expect(wrapper.findAll('.v-messages__message').length).toBe(1)
    expect(wrapper.find('.v-messages__message').text()).toContain('Enter a comment.')

    // cancel the dialog
    // wait for Vue to finish transition
    await wrapper.find('#cancel-button').trigger('click')
    await sleep(500)

    // reopen the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // verify textarea component does not have error class
    // verify there are no error messages
    expect(wrapper.find('.v-textarea').classes('error--text')).toBe(false)
    expect(wrapper.findAll('.v-messages__message').length).toBe(0)
  })

  it('displays correctly with existing comments when passing external URL', async () => {
    // mock GET comments endpoint
    sinon.stub(axios, 'get').withArgs('http://test.com')
      .returns(new Promise(resolve => resolve({ data: { comments: sampleComments } }))
      )

    // mount the component
    wrapper = mount(StaffComments, { propsData: { axios, businessId: 'RS001', url: 'http://test.com' }, vuetify })
    const vm: any = wrapper.vm
    await flushPromises()

    // verify a few things
    expect(vm.maxLength).toBe(4096)
    expect(vm.comments.length).toBe(1)
    expect(wrapper.find('#comments-button span').text()).toBe('1 Comment')

    // open the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // verify comment in div
    expect(wrapper.findAll('#existing-comments > div').length).toBe(1)
    expect(wrapper.find('#existing-comments > div').text()).toContain(sampleComments[0].comment.comment)
    expect(wrapper.find('#existing-comments > div').text()).toContain(sampleComments[0].comment.submitterDisplayName)
    expect(wrapper.find('#existing-comments > div').text()).toContain('Feb 4, 2021 at 2:08 pm Pacific time')
  })

  it('saves and updates correctly when URL passing', async () => {
    // mock GET comments endpoint
    const callback = sinon.stub(axios, 'get').withArgs('http://test.com')
    callback.onCall(0).returns(new Promise(resolve => resolve({
      data: { comments: [] }
    })))
    callback.onCall(1).returns(new Promise(resolve => resolve({
      data: { comments: sampleComments }
    })))

    // mock POST comments endpoint
    sinon.stub(axios, 'post').withArgs('http://test.com')
      .returns(new Promise(resolve => resolve({})))

    // mount the component
    wrapper = mount(StaffComments, { propsData: { axios, businessId: 'RS001', url: 'http://test.com' }, vuetify })
    const vm: any = wrapper.vm
    await flushPromises()

    // verify initial comments list
    expect(vm.comments.length).toBe(0)

    // open the dialog
    // wait for Vue to finish transition
    await wrapper.find('#comments-button').trigger('click')
    await sleep(500)

    // verify that textarea is empty
    const textarea = wrapper.find('textarea')
    expect((textarea.element as HTMLInputElement).value).toBe('')

    // enter a comment and verify textarea again
    await textarea.setValue('A comment')
    expect((textarea.element as HTMLInputElement).value).toBe('A comment')

    // save the comment
    await wrapper.find('#save-button').trigger('click')
    await flushPromises()

    // verify updated comments list
    expect(vm.comments.length).toBe(1)
  })
})
