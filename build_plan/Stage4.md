# Stage 4 - dyn-icons-react with TanStack Query

## Goal
Replace manual store with TanStack Query data fetching. Package `@bluevoid/dyn-icons-react` is the React layer.

## Package structure
`packages/dyn-icons-react/src`
- `queryKeys.ts` - stable query keys
- `fetchers.ts` - fetchManifest, fetchPage, fetchIcon
- `useDynIcon.ts` - automagical hook for single icon
- `useDynIconPage.ts` - automagical hook for page
- `DynIcon.tsx` - component
- `DynIconPickerPrimitive.tsx` - picker

## Query keys
```ts
dynIconKeys.manifest(provider) => ['dyn-icons', provider, 'manifest']
dynIconKeys.page(provider, page) => ['dyn-icons', provider, 'page', page]
dynIconKeys.icon(provider, iconName) => ['dyn-icons', provider, 'icon', iconName]
```

## Fetchers
`fetchers.ts`
```ts
export async function fetchManifest(provider: string) {
  const path = clientConfig.icons.cacheClientPath
  const res = await fetch(`${path}/${provider}/pages/manifest.json`)
  return res.json()
}

export async function fetchPage(provider: string, page: number) {
  const path = clientConfig.icons.cacheClientPath
  const res = await fetch(`${path}/${provider}/pages/page_${page}.json`)
  return res.json()
}

export async function fetchIcon(provider: string, iconName: string) {
  const manifest = await queryClient.fetchQuery(...)
  // resolve icon from manifest.icons + paths
}
```

## Hooks
Automagical hooks:
`useDynIcon(provider, iconName)` - loads single icon with staleTime 1h
`useDynIconPage(provider, page)` - loads page JSON

Synchronous read:
```ts
const queryClient = useQueryClient()
const data = queryClient.getQueryData(dynIconKeys.icon(provider, iconName))
```

## DynIcon component
```tsx
export default function DynIcon({ i, className }) {
  const [provider, name] = i.split(':')
  const { data } = useDynIcon(provider, name)
  
  if (!data) return <IconQuestionMark />
  
  return <TablerIcon component={data.iconNode} className={className} />
}
```

For instant render, prefetch manifest at app bootstrap:
```ts
await queryClient.prefetchQuery({
  queryKey: dynIconKeys.manifest('tabler'),
  queryFn: () => fetchManifest('tabler')
})
```

## DynIconPickerPrimitive
```tsx
function DynIconPickerPrimitive({ provider, page, search }) {
  const { data } = useDynIconPage(provider, page)
  const icons = useMemo(() => {
    if (!data) return []
    return data.icons.filter(i => i.name.includes(search))
  }, [data, search])
  return <Grid>{icons.map(... )}</Grid>
}
```

## Integration steps
1. Install peer deps: `react`, `react-dom`, `@tanstack/react-query`, `@bluevoid/dyn-icons`
2. Provide `QueryClient` at root
3. Prefetch manifest via `useDynIcon` or manual prefetch
4. Use `queryClient.getQueryData` for synchronous reads after prefetch
5. No store, no `useSyncExternalStore`

This removes the manual store and uses Query cache as source of truth.
