import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendTarget = env.VITE_API_BASE_URL || 'http://localhost:8080';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': { target: backendTarget, changeOrigin: true, secure: false },
        '/admin': { target: backendTarget, changeOrigin: true, secure: false },
        '/auth': { target: backendTarget, changeOrigin: true, secure: false },
        '/logout': { target: backendTarget, changeOrigin: true, secure: false },
      },
    },
  };
});
