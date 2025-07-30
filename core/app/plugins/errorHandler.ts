// This registeres custom error and warn handlers within Nuxt Ignis app.
// You can set NUXT_PUBLIC_IGNIS_ERROR to 'false' to disable this feature.

export default defineNuxtPlugin((nuxtApp) => {
  if (useRuntimeConfig().public.ignis.error) {
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
    // set NUXT_PUBLIC_IGNIS_ERROR=false to turn them off
    log.info('Nuxt Ignis error/warn handlers were registered')
  } else {
    // set NUXT_PUBLIC_IGNIS_ERROR=true to turn them on
    log.info('Nuxt Ignis error/warn handlers were NOT registered')
  }
})
