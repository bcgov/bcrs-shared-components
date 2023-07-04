module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
      babelConfig: true
    }
  },
  // Have to do this for LINUX right now as a work around.
  // I noticed this is done in one of the webpack files as well.
  // It's possible the @ in the name of the package get confused with the alias somehow.
  moduleNameMapper: {
    '@bcrs-shared-components/enums': '<rootDir>/src/enums',
    '@bcrs-shared-components/interfaces': '<rootDir>/src/interfaces',
    '@bcrs-shared-components/mixins': '<rootDir>/src/mixins',
    '@bcrs-shared-components/types': '<rootDir>/src/types',
    '@bcrs-shared-components/corp-type-module': '<rootDir>/src/modules/corp-type-module',
    '@bcrs-shared-components/(.*)': '<rootDir>/src/components/$1'
  },
  setupFiles: ['./tests/setup.ts'],
  // Configure Jest to transform the Storybook packages, ref:
  // https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#packages-now-available-as-esmodules
  transformIgnorePatterns: ['/node_modules/(?!@storybook)']
}
