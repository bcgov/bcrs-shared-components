import { BreadCrumb } from './index'
import Vuetify from 'vuetify'

export default {
  title: 'component/BreadCrumb',
  component: BreadCrumb,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  vuetify: new Vuetify({ iconfont: 'mdi' }),
  props: Object.keys(argTypes),
  components: { BreadCrumb },
  template: '<BreadCrumb v-bind="$props" />' // $props comes from args below
})

export const homeRoute = Template.bind({})
homeRoute.args = {
  breadcrumbs: [
    {
      text: 'BC Registries Dashboard',
      disabled: false
    }
  ]
}

export const baseRoute = Template.bind({})
baseRoute.args = {
  breadcrumbs: [
    {
      text: 'BC Registries Dashboard',
      disabled: false,
      to: { name: '/?path=/story/component-breadcrumb--home-route' }
    },
    {
      text: 'BC12345678',
      disabled: false
    }
  ]
}

export const navigationRoute = Template.bind({})
navigationRoute.args = {
  breadcrumbs: [
    {
      text: 'BC Registries Dashboard',
      disabled: false,
      to: { name: 'component-breadcrumb--navigation-route' }
    },
    {
      text: 'BC12345678',
      disabled: false,
      to: { name: '/?path=/story/component-breadcrumb--base-route' }
    },
    {
      text: 'some route',
      disabled: false
    }
  ]
}
