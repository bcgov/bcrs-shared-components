import { Component, Vue } from 'vue-property-decorator'

/**
 * Mixin that provides some useful common utilities.
 */
@Component({})
export default class CommonMixin extends Vue {
  /** True if Jest is running the code. */
  get isJestRunning (): boolean {
    return (process.env.JEST_WORKER_ID !== undefined)
  }

  /** Returns the appropriate edit label for corrections or alterations */
  editLabel (isCorrection: boolean): string {
    return isCorrection ? 'Correct' : 'Change'
  }

  /** Returns the appropriate edited label for corrections or alterations */
  editedLabel (isCorrection: boolean): string {
    return isCorrection ? 'CORRECTED' : 'CHANGED'
  }

  /**
   * Scrolls the window to the top of the specified element.
   * @param element the element to scroll to the top of
   */
  scrollToTop (element: any): void {
    Vue.nextTick(() => {
      // don't call window.scrollTo during Jest tests because jsdom doesn't implement it
      if (!this.isJestRunning) window.scrollTo({ top: element.offsetTop, behavior: 'smooth' })
    })
  }
}
