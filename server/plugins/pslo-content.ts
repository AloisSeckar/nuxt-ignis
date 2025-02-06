import { preventSingleLetterOrphans } from 'elrh-pslo'

// this plugin will auto-treat all Nuxt Content page data
// with "preventSingleLetterOrphans" function
// but only if relevant options are set up
export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig().public.ignis
  if (config.content && config.pslo.enabled && config.pslo.content) {
    console.log('elrh-pslo plugin initialized')
    nitroApp.hooks.hook('content:file:beforeParse', (file) => {
      console.log('Treating Markdown with elrh-pslo')
      if (file._id.endsWith('.md')) {
        file.body = preventSingleLetterOrphans(file.body)
      }
    })
  }
})
