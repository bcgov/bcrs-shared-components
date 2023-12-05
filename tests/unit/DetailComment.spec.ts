import { createVuetify } from 'vuetify'
import { mount } from '@vue/test-utils'
import { DetailComment } from '@/components/detail-comment'
import { sleep } from '@/utils/sleep'
import flushPromises from 'flush-promises'
import { nextTick } from 'vue'

const detailCommentTxt = '#detail-comment-textarea'

describe('DetailComment', () => {
  const vuetify = createVuetify()
  it('initializes correctly', () => {
    const wrapper = mount(DetailComment,
      {
        vuetify
      })
    const vm: any = wrapper.vm

    expect(vm.value).toBe('')
    expect(vm.placeholder).toBe('')
    expect(vm.autofocus).toBe(false)

    // verify that v-model is not updated
    expect(wrapper.emitted('input')).toBeUndefined()

    // verify that component reports initial validity (false)
    expect(wrapper.emitted('valid').pop()[0]).toEqual(false)
  })

  it('handles props correctly', () => {
    const wrapper = mount(DetailComment,
      {
        props: {
          value: 'Initial comment',
          placeholder: 'Enter Comment Here',
          autofocus: true
        },
        vuetify
      })
    const vm: any = wrapper.vm

    expect(vm.value).toBe('Initial comment')
    expect(vm.placeholder).toBe('Enter Comment Here')
    expect(vm.autofocus).toBe(true)
  })

  it('emits valid event when value prop is changed', async () => {
    const wrapper = mount(DetailComment,
      {
        props: {
          value: 'testing 1 2 3'
        },
        vuetify
      })

    await sleep(300)
    await flushPromises()

    // verify valid event
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
  })

  it('emits events when value model is changed', async () => {
    const wrapper = mount(DetailComment,
      {
        props: {
          value: 'testing 1 2 3'
        },
        vuetify
      })
    const vm: any = wrapper.vm

    const element = wrapper.find('#detail-comment-textarea')

    // verify valid and input events
    expect(wrapper.emitted('valid').pop()[0]).toEqual(true)
    // expect(wrapper.emitted('updateValue')[0]).toEqual(['testing 4 5 6'])
  })
})
