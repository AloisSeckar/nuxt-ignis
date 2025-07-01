import { defineConfig, type Plugin } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nuxt Ignis",
  description: "A ready-to-use setup for your next application in Nuxt",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/1-1-introduction' },
      { text: 'Configuration', link: '/2-1-configuration' },
      { text: 'Features', link: '/3-1-features' },
      { text: 'Changelog', link: '/4-1-changelog' },
      { text: 'Contributing', link: '/5-1-contributing' },
    ],

    sidebar: [
      {
        text: 'Get started',
        items: [
          { text: 'Introduction', link: '/1-1-introduction' },
          { text: 'Overview', link: '/1-2-overview' },
          { text: 'Installation', link: '/1-3-installation' },
        ]
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Configuration', link: '/2-1-configuration' },
          { text: 'Core features', link: '/2-2-core-features' },
          { text: 'Optional features', link: '/2-3-optional-features' },
          { text: 'Full reference', link: '/2-4-full-reference' },
        ]
      },
      {
        text: 'Features',
        items: [
          { text: 'Index', link: '/3-1-features' },
          { text: 'UI', link: '/3-2-features-ui' },
          { text: 'DB', link: '/3-3-features-db' },
          { text: 'Forms', link: '/3-4-features-forms' },
          { text: 'Validation', link: '/3-5-features-validation' },
          { text: 'Content', link: '/3-6-features-content' },
        ]
      },
      {
        text: 'Changelog',
        items: [
          { text: 'Changelog', link: '/4-1-changelog' },
        ]
      },
      {
        text: 'Contributing',
        items: [
          { text: 'Contributing guide', link: '/5-1-contributing' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AloisSeckar/nuxt-ignis' }
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/AloisSeckar/nuxt-ignis/blob/main/LICENSE">MIT License</a>',
      copyright: 'Copyright © 2024-present <a href="https://alois-seckar.cz/">Alois Sečkár</a>'
    }
  },

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    }
  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          // in case custom icons are needed...
        }
      }) as Plugin
    ],
  },
})
