/**
 * This file is to provide the correct setup for the Vue instance.
 * It can save people time when writing tests, as they won't need to figure out
 * why some of the errors are showing up due to Vue not having the plugins it needs.
 */
import { config } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify'
import * as matchers from 'vitest-axe/matchers'
import 'vitest-axe/extend-expect'
import { expect } from 'vitest'

// Extend vitest with axe matchers
expect.extend(matchers)

// Add properties to the wrapper
config.global.plugins.push([vuetify])
// Suppress Vue warnings
config.global.config.warnHandler = () => null
global.css = { supports: () => false }

beforeAll(() => {
  // Mock the ResizeObserver
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }))
  // Stub the global ResizeObserver
  vi.stubGlobal('ResizeObserver', ResizeObserverMock)

  // Mock Sentry
  vi.mock('@sentry/browser', () => ({
    captureException: vi.fn()
  }))

  // Extend JSDOM with canvas to facilitate AA testing
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: vi.fn(),
    writable: true
  })
})
