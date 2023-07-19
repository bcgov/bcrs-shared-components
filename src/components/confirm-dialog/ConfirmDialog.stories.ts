import type { Meta } from '@storybook/vue'
import Vue from 'vue'
import { ConfirmDialog } from './index'

const meta: Meta<typeof ConfirmDialog> = {
  title: 'component/ConfirmDialog'
}
export default meta

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ConfirmDialog },
  template: '<confirm-dialog v-bind="$props" @hook:mounted="externalMount" />',
  methods: {
    async externalMount () {
      const vm = (this as any).$children[0] // target the component confirm-dialog
      await Vue.nextTick() // wait that mounted() finished
      vm.open(
        'Confirm Dialog Title',
        'Confirm dialog message. Ask your confirmation question here.',
        {
          width: '30rem',
          persistent: true,
          yes: 'Yes',
          no: 'No',
          cancel: 'Cancel'
        })
    }
  }
})

// Passing an ID that doesn't exist to attach the dialog throws an error in StoryBook
export const base = Template.bind({})
base['args'] = {}
