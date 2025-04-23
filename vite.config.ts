import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Ensures the markdown-wasm binary is always served with the correct MIME type
 * in dev and is copied into the output folder for production builds.
 *
 * Using a plugin avoids committing the binary into /public and keeps the repo
 * lean while satisfying markdown-wasm’s hard-coded `fetch('markdown.wasm')`.
 */
function markdownWasmPlugin(): Plugin {
  const wasmFileName = 'markdown.wasm';
  const wasmSourcePath = path.resolve(
    __dirname,
    'node_modules',
    'markdown-wasm',
    'dist',
    wasmFileName,
  );

  return {
    name: 'markdown-wasm-loader',

    /**
     * Dev-server middleware: respond to `/markdown.wasm`
     * with the correct bytes & MIME type.
     */
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // remove query string and check the pathname only
        const pathname: string = req.url?.split('?')[0] ?? '';
        if (pathname.endsWith(wasmFileName)) {
          try {
            const data = await fs.readFile(wasmSourcePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/wasm');
            res.end(data);
            return;
          } catch (err) {
            // Fall through to default error handling
            console.error('[markdown-wasm] Unable to read wasm file:', err);
          }
        }
        next();
      });
    },

    /**
     * Copy the binary into the final build so the same
     * `/markdown.wasm` request works in production.
     */
    async generateBundle() {
      const bytes = await fs.readFile(wasmSourcePath);
      this.emitFile({
        type: 'asset',
        fileName: wasmFileName, // keep the name stable for the hard-coded fetch
        source: bytes,
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
    react(),
    markdownWasmPlugin(),
  ],
});