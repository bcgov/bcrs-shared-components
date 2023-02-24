<template>
  <div class="d-none"></div>
</template>

<script lang="ts">
// Libraries
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

/**
 * @property {string} genesysURL - the URL to the genesys library
 * @property {string} environmentKey - the environment key (ID)
 * @property {string} deploymentKey - the deployment key (ID)
 * Go To README.md for more details.
 */
@Component({})
export default class GenesysWebMessage extends Vue {
  @Prop({ default: null }) readonly genesysURL!: string

  @Prop({ default: null }) readonly environmentKey!: string

  @Prop({ default: null }) readonly deploymentKey!: string

  mounted (): void {
    if (this.genesysURL && this.environmentKey && this.deploymentKey) {
      this.initWebMsg(
        window,
        'Genesys',
        this.genesysURL,
        {
          environment: this.environmentKey,
          deploymentId: this.deploymentKey
        },
        null
      )
    }
  }

  /**
   * From MAXIMUS Canada.
   * The New Web-Messaging Solution in Genesys.
   * @param {Window} g the global object
   * @param {string} e the 'Genesys' string
   * @param {string} n the link to the Genesys third-party library
   * @param {string} es the object with the environment and deployment IDs
   * @param {HTMLScriptElement} ys the element to be created
   */
  private initWebMsg (g, e, n, es, ys): void {
    g['_genesysJs'] = e
    g[e] = g[e] || function () {
      (g[e].q = g[e].q || []).push(arguments)
    }
    g[e].t = (new Date()).getTime()
    g[e].c = es
    ys = document.createElement('script')
    ys.async = 1
    ys.src = n
    ys.charset = 'utf-8'
    document.head.appendChild(ys)
    localStorage.removeItem('_actmu')
  }
}
</script>
