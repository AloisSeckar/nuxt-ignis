/**
 * Available variants for UI libraries.
 *
 * `nuxt-ui` - full https://ui.nuxt.com/ via `@nuxt/ui` connector module **[RECOMMENDED]**
 *
 * `tailwind` - only https://tailwindcss.com/ via `@nuxtjs/tailwindcss` connector module
 *
 * `off` - no UI library **[DEFAULT]**
 */
export type UIOptions = 'nuxt-ui' | 'tailwind' | 'off'

/**
 * Available variants for Database connector.
 *
 * `neon` - https://neon.tech/ via `nuxt-neon` connector module **[RECOMMENDED]**
 *
 * `supabase` - https://supabase.com/ via `@nuxtjs/supabase` connector module
 *
 * `off` - no database module **[DEFAULT]**
 */
export type DBOptions = 'neon' | 'supabase' | 'off'
