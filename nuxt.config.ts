// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  css: [
    '@/assets/css/main.css',
  ],
  app: {
    head: {
      title: 'EARTH → OUTER WORLDS',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Real planets. Real distances. Real time. A scientific journey from Earth to the edge of our Solar System.' },
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;700&display=swap' }
      ]
    }
  },
  image: {
    provider: 'ipx',
    dir: 'assets/images'
  },
  experimental: {
    payloadExtraction: false
  },
  typescript: {
    strict: true
  },
  devtools: { enabled: true }
})
