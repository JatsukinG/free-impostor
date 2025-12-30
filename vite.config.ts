import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
      // Atoms
      '@atoms': '/src/atoms/index',
      // constants
      '@constants': '/src/constants/index',
      // Components
      '@components': '/src/components/index',
      // hooks
      '@hooks': '/src/hooks/index',
      // layouts
      '@layouts': '/src/layouts/index',
      // GraphQL
      '@gql': '/src/gql/index',
      '@types': '/src/gql/graphql',
      // Modules
      // Snippets
      '@snippets': 'src/snippets/index',
    },
  },
  server: {
    host: true,
    // port: 5174,
    allowedHosts: true,
  },
})