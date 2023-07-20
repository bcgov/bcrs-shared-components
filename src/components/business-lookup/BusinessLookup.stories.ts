import type { Meta } from '@storybook/vue'
import { BusinessLookup } from './index'

const meta: Meta<typeof BusinessLookup> = {
  title: 'component/BusinessLookup'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BusinessLookup },
  template: '<business-lookup v-bind="$props" />' // $props comes from args below
})

// sample Business Lookup result
const result = {
  identifier: 'BC1234567',
  name: 'Test Business Name'
}

// mock Business Lookup Services class
class BusinessLookupServices {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async search (query: string): Promise<any[]> {
    return Promise.resolve([result])
  }
}

export const Default = Template.bind({})
Default['args'] = {
  showErrors: false,
  businessLookup: {
    identifier: result.identifier,
    name: result.name
  },
  BusinessLookupServices,
  hasBusinessLookupChanges: true
}
