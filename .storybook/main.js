const path = require('path');

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
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
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.module.rules.push({
      test: [/\.scss$/, /\.sass$/],
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // Alternately, for an alias:
    config.resolve.alias['@bcrs-shared-components/enums'] = path.resolve(__dirname, '../') + '/src/enums';
    config.resolve.alias['@bcrs-shared-components/interfaces'] = path.resolve(__dirname, '../') + '/src/interfaces';
    config.resolve.alias['@bcrs-shared-components/corp-type-module'] = path.resolve(__dirname, '../') + '/src/modules/corp-type-module';
    config.resolve.alias['@bcrs-shared-components'] = path.resolve(__dirname, '../') + '/src/components';
    config.resolve.alias['@'] = path.resolve(__dirname, '../') + '/src';

    // Return the altered config
    return config;
  },
  features: {
    postcss: false, // see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-implicit-postcss-loader
    previewMdx2: true // see https://github.com/storybookjs/storybook/issues/18094#issuecomment-1134326831
  },
}
