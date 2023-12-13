<template>
  <div class="d-none" />
</template>

<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'
import { CountriesProvincesMixin,
  DateMixin,
  NameRequestMixin,
  ValidationMixin
} from '@/mixins'

@Component({
  mixins: [toNative(CountriesProvincesMixin),
    toNative(DateMixin),
    toNative(NameRequestMixin),
    toNative(ValidationMixin)]
})
export default class MixinTester extends Vue {}
</script>

<style>
</style>
