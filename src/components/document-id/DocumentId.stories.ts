import type { Meta } from '@storybook/vue'
import { DocumentId } from './index'
import Vuetify from 'vuetify'

const meta: Meta<typeof DocumentId> = {
  title: 'component/DocumentId'
}
export default meta

const Template = (args, { argTypes }) => ({
  vuetify: new Vuetify({ iconfont: 'mdi' }),
  props: Object.keys(argTypes),
  components: { DocumentId },
  template: '<document-id v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
