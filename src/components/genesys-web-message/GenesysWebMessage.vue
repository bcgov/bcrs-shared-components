<template>
  <div class="d-none"></div>
</template>

<script lang="ts">
// Libraries
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

/**
 * This component creates the button to generate a chat with Service BC Helpdesk.
 * This component cannot be unit tested because it heavily relies on a third-party library.
 * @property {string} deploymentKey - the deployment key (ID)
 */
@Component({})
export default class GenesysWebMessage extends Vue {
  @Prop({ default: '0' }) readonly deploymentKey!: string

  mounted (): void {
    if (this.deploymentKey !== '0') {
      this.initWebMsg(
        window,
        'Genesys',
        'https://apps.cac1.pure.cloud/genesys-bootstrap/genesys.min.js',
        {
          environment: 'cac1',
          deploymentId: this.deploymentKey
        },
        null
      )
    }
  }

  /**
   * From Maximus.
   * @param {Window} g the global object
   * @param {string} e the 'Genesys' string
   * @param {string} n the link to the Genesys third-party library
   * @param {string} es the object with the environment and deployment IDs
   * @param {HTMLScriptElement} ys the script to be created
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
