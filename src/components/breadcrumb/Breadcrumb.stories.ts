import type { Meta } from '@storybook/vue'
import { Breadcrumb } from './index'

const meta: Meta<typeof Breadcrumb> = {
  title: 'component/Breadcrumb'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Breadcrumb },
  template: '<Breadcrumb v-bind="$props" />' // $props comes from args below
})

export const homeRoute = Template.bind({})
homeRoute['args'] = {
  breadcrumbs: [
    {
      text: 'Service BC Connect Dashboard'
    }
  ]
}

export const baseRoute = Template.bind({})
baseRoute['args'] = {
  breadcrumbs: [
    {
      text: 'Service BC Connect Dashboard',
      to: { name: '/?path=/story/component-breadcrumb--home-route' }
    },
    {
      text: 'BC12345678'
    }
  ]
}

export const navigationRoute = Template.bind({})
navigationRoute['args'] = {
  breadcrumbs: [
    {
      text: 'Service BC Connect Dashboard',
      to: { name: 'component-breadcrumb--navigation-route' }
    },
    {
      text: 'BC12345678',
      to: { name: '/?path=/story/component-breadcrumb--base-route' }
    },
    {
      text: 'some route'
    }
  ]
}
