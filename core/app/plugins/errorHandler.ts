// #154 - this should remain in core as the error handler must be globally available

// This plugin registeres custom error and warn handlers within Nuxt Ignis app.
// This feature can be disbled via `ignis.config.nuxt.error` flag.

export default defineNuxtPlugin((nuxtApp) => {
  if (useRuntimeConfig().public.ignis.config.nuxt.error) {
    nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
      log.error(err)
      // capture additional context
      log.debug(`Nuxt Ignis error handler - raw error:\n${err}`)
      log.debug(`Nuxt Ignis error handler - source:\n${instance?.$options?.__name || 'Unknown'} (${instance?.$options?.__file || '???'})`)
      log.debug(`Nuxt Ignis error handler - additional error context:\n${info}`)
    }
    nuxtApp.vueApp.config.warnHandler = (msg, instance, trace) => {
      log.warn(msg)
      // capture additional context
      log.debug(`Nuxt Ignis warn handler - raw warning:\n${msg}`)
      log.debug(`Nuxt Ignis warn handler - source:\n${instance?.$options?.__name || 'Unknown'} (${instance?.$options?.__file || '???'})`)
      log.debug(`Nuxt Ignis warn handler - additional warn context:\n${trace}`)
    }
    // set `ignis.config.nuxt.error` to false to turn them off
    log.info('Nuxt Ignis error/warn handlers were registered')
  } else {
    // set `ignis.config.nuxt.error` to true to turn them on
    log.debug('Nuxt Ignis error/warn handlers were NOT registered')
  }
})
