import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nuxt Ignis",
  description: "A ready-to-use setup for your next application in Nuxt",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/1-installation' },
      { text: 'Full reference', link: '/2-1-overview' }
    ],

    sidebar: [
      {
        text: 'Get started',
        items: [
          { text: 'Installation', link: '/1-installation' },
        ]
      },
      {
        text: 'Full reference',
        items: [
          { text: 'Overview', link: '/2-1-overview' },
          { text: 'Configuration', link: '/2-2-configuration' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AloisSeckar/nuxt-ignis' }
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/AloisSeckar/nuxt-ignis/blob/main/LICENSE">MIT License</a>',
      copyright: 'Copyright © 2023-present <a href="https://alois-seckar.cz/">Alois Sečkár</a>'
    }
  }
})
