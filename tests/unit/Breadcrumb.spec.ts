import Vue from 'vue'
import Vuetify from 'vuetify'
import Affix from 'vue-affix'
import VueRouter from 'vue-router'
import { createLocalVue, mount } from '@vue/test-utils'
import { Breadcrumb } from '@/components/breadcrumb'
import { BreadcrumbIF } from '@/interfaces'

Vue.use(Vuetify)
Vue.use(Affix)

const vuetify = new Vuetify({})
const localVue = createLocalVue()
localVue.use(VueRouter)

const homeBreadCrumb = [
  {
    text: 'BC Registries Dashboard'
  }
]

const baseBreadCrumb = [
  {
    text: 'BC Registries Dashboard',
    href: 'someUrl'
  },
  {
    text: 'BC12345678'
  }
]

const navigationBreadCrumb = [
  {
    text: 'BC Registries Dashboard',
    href: 'someUrl'
  },
  {
    text: 'BC12345678',
    href: 'someUrl'
  },
  {
    text: 'some route',
    to: { name: 'someRoute' }
  },
  {
    text: 'some route',
    to: { name: 'someRoute' }
  }
]

describe('BreadCrumb', () => {
  const wrapperFactory = (breadcrumbs: Array<BreadcrumbIF>) => {
    const routes = [{ path: '', name: 'someRoute' }]
    return mount(Breadcrumb, {
      localVue,
      propsData: { breadcrumbs },
      router: new VueRouter({ routes }),
      vuetify
    })
  }

  it('initializes correctly', () => {
    const wrapper = wrapperFactory(homeBreadCrumb)

    // verify that component mounts
    expect(wrapper.findComponent(Breadcrumb).exists()).toBe(true)
  })

  it('disables the back btn with only 1 crumb ', () => {
    const wrapper = wrapperFactory(homeBreadCrumb)

    // verify disabled
    expect(wrapper.find('#breadcrumb-back-btn').attributes('disabled')).toBeDefined()
  })

  it('enables the back btn with more than 1 crumb crumb ', () => {
    const wrapper = wrapperFactory(baseBreadCrumb)

    // verify enabled
    expect(wrapper.find('#breadcrumb-back-btn').attributes('disabled')).toBeUndefined()
  })

  it('provides the correct text labels', async () => {
    const wrapper = wrapperFactory(navigationBreadCrumb)
    const breadcrumbs = wrapper.findAll('.breadcrumb-text')
    expect(breadcrumbs.length).toBe(4)

    expect(breadcrumbs.at(0).text()).toContain('BC Registries Dashboard')
    expect(breadcrumbs.at(1).text()).toContain('BC12345678')
    expect(breadcrumbs.at(2).text()).toContain('some route')
    expect(breadcrumbs.at(3).text()).toContain('some route')
  })
})
