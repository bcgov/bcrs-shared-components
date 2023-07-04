const path = require('path');

module.exports = {
  framework: {
    name: '@storybook/vue-vite',
    options: {}
  },
  core: {
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
  ],
  features: {
    postcss: false, // see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-implicit-postcss-loader
    previewMdx2: true // see https://github.com/storybookjs/storybook/issues/18094#issuecomment-1134326831
  }
}