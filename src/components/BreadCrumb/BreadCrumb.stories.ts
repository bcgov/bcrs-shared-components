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
      text: 'BC Registries Dashboard'
    }
  ]
}

export const baseRoute = Template.bind({})
baseRoute.args = {
  breadcrumbs: [
    {
      text: 'BC Registries Dashboard',
      to: { name: '/?path=/story/component-breadcrumb--home-route' }
    },
    {
      text: 'BC12345678'
    }
  ]
}

export const navigationRoute = Template.bind({})
navigationRoute.args = {
  breadcrumbs: [
    {
      text: 'BC Registries Dashboard',
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
