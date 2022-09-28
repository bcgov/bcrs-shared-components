<template>
  <div class="d-inline" id="staff-comments">
    <!-- NB: attach the menu to component div so we can unit test it -->
    <v-menu
      bottom
      v-model="showComments"
      attach="#staff-comments"
      :nudge-top="nudgeTop"
      :nudge-left="nudgeLeft"
      :close-on-click="false"
      :close-on-content-click="false"
    >
      <!-- the button -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small text color="primary"
          id="comments-button"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon medium>mdi-comment-text-outline</v-icon>
          <span>{{numComments}}</span>
        </v-btn>
      </template>

      <!-- the menu (panel) -->
      <v-card flat id="staff-comment-container" class="px-8 py-6">
        <v-card-title class="d-flex justify-space-between pa-0">
          <div>
            <v-icon medium color="primary">mdi-comment-text-outline</v-icon>
            <span>{{numComments}}</span>
          </div>
          <v-btn icon large class="mr-n3" id="close-button" @click="close()">
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-2 pa-0">
          <v-textarea
            ref="textarea"
            autofocus
            no-resize
            filled
            rows="5"
            v-model="comment"
            placeholder="Enter Comments"
            :rules="rules"
          />
        </v-card-text>

        <v-card-actions class="d-flex justify-space-between pa-0">
          <div class="body-2 mt-1">{{charsRemaining}}</div>
          <div class="mr-n3">
            <v-btn
              text
              color="primary"
              class="font-weight-bold"
              id="save-button"
              :loading="isSaving"
              @click="save()"
            >
              Save
            </v-btn>
            <v-btn
              text
              color="primary"
              id="cancel-button"
              @click="close()"
            >
              Cancel
            </v-btn>
          </div>
        </v-card-actions>

        <v-card-text class="mt-6 pa-0">
          <div class="pr-5" id="existing-comments">
            <div v-for="(comment, i) in comments" :key="i" class="body-2">
              <p class="pre-line" v-html="comment.comment" />
              <p class="font-italic">
                {{ comment.submitterDisplayName }}
                &hyphen;
                {{apiToPacificDateTime(comment.timestamp)}}
              </p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { CommentIF, FormIF } from '@bcrs-shared-components/interfaces'
import { DateMixin } from '@/mixins' // NB: local mixin (StoryBook can't find it otherwise)

@Component({})
export default class StaffComments extends Mixins(DateMixin) {
  $refs!: Vue['$refs'] & {
    textarea: FormIF
  }

  @Prop({ required: true }) readonly axios!: any
  @Prop({ required: true }) readonly businessId!: string
  @Prop({ default: null }) readonly url!: string // pass URL if need to override
  @Prop({ default: 33 }) readonly nudgeTop!: number
  @Prop({ default: 20 }) readonly nudgeLeft!: number
  @Prop({ default: 4096 }) readonly maxLength!: number

  /** Model property for v-menu (ie, whether to show the panel). */
  private showComments = false

  /** The list of comments. */
  private comments: Array<CommentIF> = []

  /** The new comment's text. */
  private comment: string = null

  /** Whether a comment is being saved. */
  private isSaving = false

  /** The number of chars remaining in the new comment. */
  get charsRemaining (): number {
    const length = this.comment ? this.comment.length : 0 // comment may be null
    return (this.maxLength - length)
  }

  /** The Number of Comments string for this entity. */
  get numComments (): string {
    const numComments = this.comments.length
    return (numComments === 1 ? '1 Comment' : `${numComments} Comments`)
  }

  /** Array of validations rules for the textarea. */
  get rules (): Array<(v) => boolean | string> {
    // exclude whitespace in minimum length check
    // include whitespace in maximum length check
    return [
      val => (val && val.trim().length > 0) || 'Enter a comment.',
      val => (val && val.length <= this.maxLength) || 'Maximum characters reached.'
    ]
  }
  /** get Endpoint URL. */
  get getUrl (): string {
    return this.url || `businesses/${this.businessId}/comments`
  }

  /** Called when component is created. */
  async created (): Promise<void> {
    await this.fetchStaffComments()
  }

  /** Fetches the staff comments from the API. */
  private async fetchStaffComments (): Promise<void> {
    this.comments = await this.axios.get(this.getUrl)
      .then(res => {
        const comments = (res && res.data && res.data.comments) || []
        // if comments is array of object with 'comment as key' flatten structure
        if (Array.isArray(comments) && comments[0] && typeof comments[0].comment === 'string') {
          return comments
        }
        return this.flattenAndSortComments(comments)
      })
      .catch(() => [])
  }

  /** Saves the new comment to the API. */
  protected async save (): Promise<void> {
    // don't save if invalid
    if (!this.$refs.textarea.validate()) return

    // prevent double saving
    if (this.isSaving) return
    this.isSaving = true

    const data = {
      comment: {
        businessId: this.businessId,
        comment: this.comment
      }
    }

    let success = false
    await this.axios.post(this.getUrl, data).then(res => {
      success = true
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log('save() error =', error)
      alert('Could not save your comment. Please try again or cancel.')
    })

    this.isSaving = false
    if (success) {
      // clear the data and reload the staff comments
      this.$refs.textarea.reset()
      await this.fetchStaffComments()
    }
  }

  /** Closes the menu (panel). */
  protected close (): void {
    // clear any errors; leave the data
    this.$refs.textarea.resetValidation()
    this.showComments = false
  }

  /**
   * Flattens and sorts an array of comments.
   * @param comments the array of comments to sort and deconstruct
   * @returns the sorted and flattened array of comments
   */
  private flattenAndSortComments (comments: Array<any>): Array<any> {
    if (comments && comments.length > 0) {
      // first use map to change comment.comment to comment
      const temp: Array<any> = comments.map(c => c.comment)
      // then sort newest to oldest
      temp.sort((a, b) => new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1)
      return temp
    }
    return []
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

#staff-comment-container {
  width: 33rem;
  height: 36rem;
  overflow: hidden;
}

.v-card__title {
  .v-icon {
    margin-top: 1px;
  }

  span {
    color: $app-blue;
    font-size: 0.75rem;
    letter-spacing: normal;
    margin-left: 5px;
  }
}

::v-deep .v-textarea textarea {
  font-size: 0.875rem !important;
  color: $gray7 !important;

  &::placeholder {
    color: $gray7 !important;
  }
}

// reduce overall textarea height when there are no error messages
::v-deep .v-textarea:not(.error--text) {
  margin-bottom: -24px;
}

// reduce overall textarea height when there are errors messages
::v-deep .v-textarea.error--text {
  margin-bottom: -12px;
}

// shrink input area to make space for error messages
::v-deep .v-textarea.error--text textarea {
  height: calc(140px - 12px) !important;
}

.v-card__actions .body-2 {
  color: $gray7;
}

#existing-comments {
  height: 16rem;
  max-height: 16rem;
  overflow-y: scroll;
  text-align: left;

  .body-2 {
    color: $gray7;
    line-height: 1.375rem;
  }

  .body-2 + .body-2 {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid $gray7;
    border-radius: 0;
  }
}
</style>
