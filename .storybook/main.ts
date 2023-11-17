const path = require('path')
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [{
    name: "@storybook/addon-essentials",
    options: {
      actions: false,
      backgrounds: true,
      controls: true,
      docs: false,
      viewport: true,
      toolbars: false
    }
  }],
  docs: {
    autodocs: false
  }
};
export default config;
