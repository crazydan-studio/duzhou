import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // https://cn.vitejs.dev/config/server-options#server-proxy
    proxy: {
      '/graphql': 'http://localhost:8080'
    }
  }
});
