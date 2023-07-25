/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    EnvironmentPlugin({ BUILD: 'web' }) // fix for Vuelidate
  ],
  resolve: {
    alias: {
      // to find local components in src/
      '@/': new URL('./src/', import.meta.url).pathname,
      // to find shared components in src/xxx
      '@bcrs-shared-components/corp-type-module': new URL('./src/modules/corp-type-module', import.meta.url).pathname,
      '@bcrs-shared-components/enums': new URL('./src/enums', import.meta.url).pathname,
      '@bcrs-shared-components/interfaces': new URL('./src/interfaces', import.meta.url).pathname,
      '@bcrs-shared-components/mixins': new URL('./src/mixins', import.meta.url).pathname,
      '@bcrs-shared-components/types': new URL('./src/types', import.meta.url).pathname,
      '@bcrs-shared-components/services': new URL('./src/services', import.meta.url).pathname,
      '@bcrs-shared-components/': new URL('./src/components/', import.meta.url).pathname
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  test: {
    // simulate DOM with happy-dom
    environment: 'happy-dom',
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
