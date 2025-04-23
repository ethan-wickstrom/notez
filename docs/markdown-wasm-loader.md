# Markdown-wasm Loader (Vite Plugin)

## Overview
`markdown-wasm` expects to fetch a sibling file called **`markdown.wasm`** at
run-time.
When Vite is run with **Bun** the generated module path lives inside
`/node_modules/.vite/*`, so the relative request falls back to the document
root and returns `index.html` instead of the binary, breaking initialization.

`markdown-wasm-loader` is a _very_ small Vite plugin that:

1. **Dev mode** – intercepts `GET /markdown.wasm`, streams the real binary from
   `node_modules/markdown-wasm/dist/markdown.wasm`, and sets the correct
   `Content-Type: application/wasm`.
2. **Build mode** – emits the same binary into the output directory as the
   top-level asset `markdown.wasm`, ensuring the production bundle works
   without further configuration.

No application code changes are needed and the solution is fully compatible
with Hot-Module Reloading.

## Installation
The plugin is declared inline in `vite.config.ts`, so no extra dependencies are
required.

## Usage
Nothing to do — simply run:

```bash
bun run dev   # development with HMR
bun run build # production build; wasm copied automatically
```

## Troubleshooting
| Symptom                                   | Fix                                               |
| ----------------------------------------- | ------------------------------------------------- |
| `Incorrect response MIME type` persists   | Verify `vite.config.ts` includes the plugin and restart the dev server. |
| 404 on `/markdown.wasm` in production     | Ensure the build artefacts were freshly rebuilt after introducing the plugin. |

## Changelog
- **2025-04-22** – Initial implementation.