<template>
  <div style="padding: 20px;">
    <div>{{ $t('welcome') }}</div>
    <div style="padding-top: 10px;">
      <button
        v-for="loc in locales"
        :key="loc.code"
        :disabled="locale === loc.code"
        style="margin-right: 8px; padding: 4px 12px; cursor: pointer;"
        @click="setLocale(loc.code)"
      >
        {{ loc.code.toUpperCase() }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
console.warn('Current locale:', locale.value)
console.warn('Available locales:', locales.value)
</script>
