/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import EnvironmentPlugin from 'vite-plugin-environment'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    EnvironmentPlugin({ BUILD: 'web' }) // fix for Vuelidate
  ],
  resolve: {
    alias: {
      // to find local components in src/
      '@': path.resolve(__dirname, './src'),
      // to find shared components in src/xxx
      '@bcrs-shared-components/corp-type-module': path.resolve(__dirname, './src/modules/corp-type-module'),
      '@bcrs-shared-components/enums': path.resolve(__dirname, './src/enums'),
      '@bcrs-shared-components/interfaces': path.resolve(__dirname, './src/interfaces'),
      '@bcrs-shared-components/mixins': path.resolve(__dirname, './src/mixins'),
      '@bcrs-shared-components/types': path.resolve(__dirname, './src/types'),
      '@bcrs-shared-components/services': path.resolve(__dirname, './src/services'),
      '@bcrs-shared-components': path.resolve(__dirname, './src/components')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  test: {
    // simulate DOM with jsdom
    environment: 'jsdom',
    // enable jest-like global test APIs
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    // disable threads on GH actions to speed it up
    threads: !process.env.GITHUB_ACTIONS,
    // hide Vue Devtools message
    onConsoleLog: function (log) {
      if (log.includes('Download the Vue Devtools extension')) {
        return false
      }
    }
  }
})
