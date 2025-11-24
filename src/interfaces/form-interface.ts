// Reference to Vuetify Form API: https://vuetifyjs.com/en/api/v-form/#functions
export interface FormIF extends HTMLFormElement {
  /** Resets validation of all registered inputs, and clears their values. */
  reset(): void

  /** Resets validation of all registered inputs without modifying their values. */
  resetValidation(): void

  /** Validates all registered inputs. */
  validate(): boolean
}
