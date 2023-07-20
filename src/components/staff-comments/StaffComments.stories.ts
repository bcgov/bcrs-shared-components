import type { Meta } from '@storybook/vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { StaffComments } from './index'

const meta: Meta<typeof StaffComments> = {
  title: 'component/StaffComments'
}
export default meta

const comments: any[] = [
  {
    comment: {
      comment: 'First comment.',
      submitterDisplayName: 'Tester',
      timestamp: '2019-06-02T19:22:59.003777+00:00'
    }
  }
]

// set the mock adapter on the default instance
const mock = new MockAdapter(axios)

// mock GET request
mock.onGet().reply(200, { comments })

// mock GET request
mock.onPost().reply(config => {
  // add new comment to comments array
  const comment = JSON.parse(config.data).comment
  comments.push({
    comment: {
      comment: comment.comment,
      submitterDisplayName: 'You',
      timestamp: new Date().toISOString().replace('Z', '+00:00')
    }
  })
  return [201, { comment }]
})

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StaffComments },
  // $props comes from args below
  template: `
    <div class="mt-10 ml-10">
      <staff-comments v-bind="$props" />
    </div>
    `
})

export const Default = Template.bind({})
Default['args'] = {
  axios: axios.create(),
  businessId: 'CP1234567',
  maxLength: 2000
}

export const StaffCommentsWithURL = Template.bind({})
StaffCommentsWithURL['args'] = {
  axios: axios.create(),
  businessId: 'RS001',
  maxLength: 2000,
  URL: 'test.com'
}
