import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue2'
import { defineConfig } from 'vitest/config'

// ref: https://vitest.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url))
    }
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
