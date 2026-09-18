# Stage 6 - Rollup Plugin for dyn-icons

## Purpose
Rollup plugin to integrate dyn-icons build-time generation into Vite/Rollup builds.

## Package
`rollup-plugin-dyn-icons`
No peer deps, pure build tool.

## Plugin API
`src/index.ts`
```ts
export default function dynIcons(iconsConfig: {
  cacheClientPath?: string
  providers?: Record<string, any>
}) {
  return {
    name: 'rollup-plugin-dyn-icons',
    iconsConfig,
    
    config(config) {
      // modify rollup config
      return config
    },
    
    async configResolved(config) {
      // config is resolved
    },
    
    async buildStart() {
      // trigger generation if needed
    }
  }
}
```

## Usage
In `vite.config.ts`:
```ts
import dynIcons from 'rollup-plugin-dyn-icons'

export default defineConfig({
  plugins: [
    dynIcons({
      cacheClientPath: '/icons',
      providers: { tabler: { strategy: 'pages', pageSize: 500 } }
    })
  ]
})
```

## Build-time workflow
1. Plugin runs `buildStart`
2. Checks if `bluevoid.config.ts` exists
3. Runs `gen` from `@bluevoid/dyn-icons` if manifest missing or stale
4. Virtual modules are internal only:
   - `virtual:dyn-icons/manifest` -> generated manifest.json
   - `virtual:dyn-icons/provider` -> provider data
   Note: virtual modules should not be exposed to consumers directly; they are resolved internally by the plugin



## Integration with dev server
- In dev mode, plugin watches `bluevoid.config.ts` changes
- On change, re-runs generation and invalidates Query cache
- `queryClient.invalidateQueries(dynIconKeys.manifest(provider))`

## Output
Plugin does not emit files directly; it ensures generation runs before dev/build.
It can also inject `clientConfig` into bundle via `this.emitFile`.

## Build
`tsdown` compiles to `dist/index.mjs`
Exports default plugin factory.

## Notes
- Only used in build step, not runtime
- Keeps generation logic centralized
- Works with Vite via Rollup plugin API
