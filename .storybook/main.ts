const path = require('path')
import type { StorybookConfig } from '@storybook/vue-vite'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/vue-vite',
    options: {}
  },
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true
  },
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
        backgrounds: true,
        controls: true,
        docs: false,
        viewport: true,
        toolbars: false
      }
    }
  ]
}

export default config
