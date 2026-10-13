import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base so the build also works from a sub-path (e.g. a Vercel preview folder)
  base: process.env.VITE_BASE_PATH || '/toto-global',
  plugins: [react()],
  // If the port is taken (e.g. a Claude Code preview is running), Vite moves to the next free one
  server: { host: '127.0.0.1', port: 4173 },
  preview: { host: '127.0.0.1', port: 4174 },
});
