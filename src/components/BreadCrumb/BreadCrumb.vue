<template>
  <div id="breadcrumb">
    <v-container>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-btn
            id="breadcrumb-back-btn"
            class="back-btn"
            exact
            :href="backUrl"
            icon small
            :disabled="breadcrumbs.length <= 1"
          >
            <v-icon color="#38598a">mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>

        <v-divider class="mx-3" color="white" vertical />

        <v-col cols="auto" class="breadcrumb-col">
          <v-breadcrumbs :items="breadcrumbs" class="pa-0 ma-0">
            <template v-slot:divider>
              <v-icon color="white" class="mx-n2">mdi-chevron-right</v-icon>
            </template>

            <v-breadcrumbs-item
              slot="item"
              slot-scope="{ item }"
              exact
              :to="item.to"
              :href="item.href"
            >
              <span class="breadcrumb-text" :class="{'active-crumb': isActiveCrumb(item)}">{{ item.text }}</span>
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BreadcrumbIF } from '@/interfaces'

@Component({})
export default class BreadCrumb extends Vue {
  /** Breadcrumb meta data.
   * Example breadcrumb:
   * {
   *  text: My Dashboard,
   *  disabled: false,
   *  exact: true,
   *  to: { name: Routes.DASHBOARD }
   * }
   * */
  @Prop({ default: () => [] })
  readonly breadcrumbs: Array<BreadcrumbIF>

  /**
   *  The url tied to the breadcrumb back button.
   *  Cross application requires href.
   *  Returns to previous route when navigating locally.
   */
  private get backUrl (): string {
    const routeIndex = this.breadcrumbs.findIndex(item => item.to?.name === this.$route?.name)
    return this.breadcrumbs[routeIndex - 1]?.href || this.breadcrumbs[routeIndex - 1]?.to?.name
  }

  /** Is true when the crumb is not the current route. */
  isActiveCrumb (item: BreadcrumbIF): boolean {
    return this.$route?.name !== item?.to?.name
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

#breadcrumb {
  max-height: 45px;
  background-color: $app-dk-blue;
  color: white;
  display: flex;
  align-items: center;

  li {
    margin-bottom: 0 !important;
  }
}

.back-btn {
  background-color: white;
  color: $app-dk-blue;
}

.breadcrumb-text {
  font-size: 0.8125rem !important;
  color: white;
}

.breadcrumb-col {
  display: flex;
  align-items: center;
}

.active-crumb {
  text-decoration: underline !important;
  cursor: pointer !important;
}

::v-deep .v-breadcrumbs .v-breadcrumbs__divider {
  color: white !important;
  margin-bottom: 0;
}
</style>
