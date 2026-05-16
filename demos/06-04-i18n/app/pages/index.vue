<template>
  <div style="padding: 20px;">
    <div>{{ useT('welcome') }}</div>
    <div style="padding-top: 10px;">
      <button
        v-for="loc in locales"
        :key="loc.code"
        :disabled="locale === loc.code"
        style="margin-right: 8px; padding: 4px 12px; cursor: pointer;"
        @click="setLocale(loc.code)">
        {{ loc.code.toUpperCase() }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { defaultLocale, locale, locales, setLocale } = useI18n()
log.debug('Default locale: ' + defaultLocale)
log.debug('Current locale: ' + locale.value)
log.debug('Available locales: ' + JSON.stringify(locales.value))
</script>
