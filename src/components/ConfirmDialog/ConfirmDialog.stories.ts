import Vue from 'vue'
import { ConfirmDialog } from './index'
// import { ActionableItemIF } from '@/interfaces'
// import { ActionTypes } from '@/enums'
import Vuetify from 'vuetify'

export default {
  title: 'component/ConfirmDialog',
  component: ConfirmDialog,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  vuetify: new Vuetify({ iconfont: 'mdi' }),
  props: Object.keys(argTypes),
  components: { ConfirmDialog },
  template: '<confirm-dialog v-bind="$props" @hook:mounted="externalMount" />',
  methods: { // bind the new method to the component
    async externalMount () { // don't use an arrow function or this will have wrong scope
      const vm = this.$children[0] // target the component confirm-dialog
      await Vue.nextTick() // wait that mounted() finished
      vm.open(
        'Confirm Dialog Title',
        'Confirm dialog descriptor, ask your confirmation question here.',
        {
          width: '45rem',
          persistent: true,
          yes: 'yes',
          no: 'no',
          cancel: 'Cancel'
        }) // Show the modal / call the method
    }
  }
})

export const base = Template.bind({})
base.args = {}
