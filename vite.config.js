import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    headers: {
      historyApiFallback: true,
    }
  },
  base: '/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'පවුලේ සභාව',
        short_name: 'පවුලේ සභාව',
        description: 'පවුලේ සභාව',
        theme_color: '#2563EB',//'#42b983',
        background_color: 'transparent',
        display: 'standalone',
        start_url: "/",
        icons: [
          {
            src: '/img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\.(?:js|css|json|jpg|jpeg|png|svg|woff|woff2|mp3|ogg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 7 days
              },
            },
          },
        ],
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    minify: 'esbuild', // Use ESBuild for faster & smaller output
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Separate vendor libraries (Vue, etc.)
          }
          if (id.includes('components')) {
            return 'components'; // Separate Vue components
          }
          return 'main'; // Other JS
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase limit to suppress warnings
  }
})
