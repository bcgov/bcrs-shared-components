import { DetailComment } from './index'

export default {
  title: 'component/DetailComment',
  component: DetailComment,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DetailComment },
  template: '<detail-comment v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Provide a detail comment'
}
