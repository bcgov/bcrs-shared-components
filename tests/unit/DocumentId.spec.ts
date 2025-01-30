import { nextTick } from 'vue'
import Vuetify from 'vuetify'
import { mount, Wrapper } from '@vue/test-utils'
import { DocumentId } from '@/components/document-id'

const vuetify = new Vuetify({})

/**
 * Creates and mounts a component, so that it can be tested.
 * @returns a Wrapper<DocumentId> object with the given parameters.
 */
function createComponent (): Wrapper<DocumentId> {
  return mount(DocumentId, {
    propsData: {
      docApiUrl: 'http://example.com',
      docApiKey: 'test-api-key',
      validate: false
    },
    vuetify
  })
}

describe('DocumentId', () => {
  let wrapper
  beforeEach(() => {
    wrapper = createComponent()
  })

  it('renders the component', () => {
    expect(wrapper.findComponent(DocumentId).exists()).toBe(true)
  })

  it('renders default component and text', () => {
    expect(wrapper.text()).toContain('Document Id')
  })

  it('disables the text field when generateDocumentId is true', async () => {
    wrapper.setData({ generateDocumentId: true })
    await nextTick()
    expect(wrapper.find('#doc-id-field').attributes('disabled')).toBeTruthy()
  })

  it('resets documentId when generateDocumentId changes', async () => {
    wrapper.setData({ generateDocumentId: true })
    await nextTick()
    expect(wrapper.vm.$data.documentId).toBe('')
  })
})
