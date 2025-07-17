import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/prx/phd': {
        target: 'https://eu.i.posthog.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prx\/phd/, '')
      }
    }
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
  ],
})
