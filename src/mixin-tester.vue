<template>
  <div class="d-none" />
</template>

<script lang="ts">
import { Component, mixins } from 'vue-facing-decorator'
import { CountriesProvincesMixin,
  DateMixin,
  NameRequestMixin,
  ValidationMixin
} from '@/mixins'

@Component({})
export default class MixinTester extends mixins(
  CountriesProvincesMixin,
  DateMixin,
  NameRequestMixin,
  ValidationMixin
) {}
</script>

<style>
</style>
