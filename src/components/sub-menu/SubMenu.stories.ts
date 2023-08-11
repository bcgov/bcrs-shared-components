import type { Meta } from '@storybook/vue'
import { SubMenu } from './index'

const meta: Meta<typeof SubMenu> = {
  title: 'component/SubMenu'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubMenu },
  template: '<sub-menu name="Click me" v-bind="$props" />' // $props comes from args below
})

export const Default = Template.bind({})
Default['args'] = {
  menuItems: [
    {
      name: 'Menu Item 1',
      action: () => { console.log('menu-item-1') }
    },
    { isDivider: true },
    { name: 'Menu Item 2' },
    {
      name: 'Sub 1',
      menu: [
        { name: '1.1' },
        { name: '1.2' },
        {
          name: 'Sub-menu 2',
          menu: [
            { name: '2.1' },
            { name: '2.2' },
            {
              name: 'Sub-menu 3',
              menu: [
                { name: '3.1' },
                { name: '3.2' },
                {
                  name: 'Sub-menu 4',
                  menu: [{ name: '4.1' }, { name: '4.2' }, { name: '4.3' }]
                }
              ]
            }
          ]
        }
      ]
    },
    { name: 'Menu Item 3' },
    { isDivider: true },
    {
      name: 'Menu Item 4',
      action: () => { console.log('menu-item-4') }
    }
  ]
}
