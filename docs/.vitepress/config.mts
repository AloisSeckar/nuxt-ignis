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
      { text: 'Get started', link: '/1-1-introduction' },
      { text: 'Configuration', link: '/2-1-configuration' }
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
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AloisSeckar/nuxt-ignis' }
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/AloisSeckar/nuxt-ignis/blob/main/LICENSE">MIT License</a>',
      copyright: 'Copyright © 2024-present <a href="https://alois-seckar.cz/">Alois Sečkár</a>'
    }
  }
})
