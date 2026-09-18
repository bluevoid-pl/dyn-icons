# Stage 5 - dyn-icons-react-devtools

## Purpose
Provide devtools panel for inspecting dyn-icons Query cache and usage.

## Package
`@bluevoid/dyn-icons-react-devtools`
Peer deps: `@bluevoid/dyn-icons`, `@bluevoid/dyn-icons-react`, `react`, `react-dom`

## Core API
`src/useIconCache.ts`
```ts
export function useIconCache() {
  const queryClient = useQueryClient()
  const providers = clientConfig.icons.providers

  const iconCache = useMemo(() => {
    const cache: Record<string, any> = {}
    for (const provider of providers) {
      const manifest = queryClient.getQueryData(dynIconKeys.manifest(provider))
      if (manifest?.icons) {
        for (const icon of manifest.icons) {
          cache[`${provider}:${icon.name}`] = icon
        }
      }
    }
    return cache
  }, [queryClient])

  return {
    pendingIcons: [],
    errors: {},
    iconCache,
    iconPaths: []
  }
}
```

## Devtools component
`DynIconsDevtools.tsx`
```tsx
import { QueryClient } from '@tanstack/react-query'
import { useIconCache } from './useIconCache'

export function DynIconsDevtools() {
  const { iconCache, iconPaths } = useIconCache()
  
  return (
    <div>
      <h3>Dyn Icons Cache</h3>
      <p>Providers: {Object.keys(iconCache).length}</p>
      <pre>{JSON.stringify({ iconCache, iconPaths }, null, 2)}</pre>
    </div>
  )
}
```

## Integration
Add to app:
```tsx
import { DynIconsDevtools } from '@bluevoid/dyn-icons-react-devtools'
import { TanStackQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <>
      <TanStackQueryDevtools />
      <DynIconsDevtools />
    </>
  )
}
```

## Features
- Inspect Query cache for manifests, pages, icons
- Show pending fetches and errors
- Display total paths count and icons count per provider
- No store mutation, read-only via `queryClient.getQueryData`

## Build
`tsdown` build to `dist/index.js`
Exports: `DynIconsDevtools`, `useIconCache`

The devtools relies on TanStack Query cache, not manual store.
