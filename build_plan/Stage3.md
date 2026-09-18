# Stage 3 - dyn-icons CLI and Generators

## Overview
`@bluevoid/dyn-icons` provides a CLI `dyn-icons` and programmatic API to generate icon manifests from providers like Tabler, Lucide.

## Core types
`packages/dyn-icons/src/types.ts`
```ts
export type BluevoidConfigType = z.infer<typeof bluevoidConfigValidator>
export type IconDataType = z.infer<typeof IconDataSchema>
export type StrategyType = z.infer<typeof strategySchema>
export interface IconDynProps { i: string; data?: IconDataType }
```
Key schemas in `validator.ts`:
- `bluevoidConfigValidator` - root config
- `iconProviderValidator` - per provider config
- `strategySchema` - build strategy
- `IconDataSchema` - shape of icon metadata

## CLI entry
`src/cliEntry.ts` exports `dyn-icons` bin.
`src/cli.ts` uses `commander` for argument parsing:

Installation:
```bash
pnpm add -D commander
```

Example:
```ts
import { Command } from 'commander'
const program = new Command()
program
  .name('dyn-icons')
  .command('gen')
  .option('--force', 'Force regeneration')
  .option('--p-limit <number>', 'Parallel limit', '1000')
  .option('--config <path>', 'Config path')
  .action(async (opts) => { /* ... */ })
program
  .command('clean')
  .action(async () => { /* ... */ })
program.parse(process.argv)
```

Commands:
- `gen` - generate output
- `clean` - clean caches
Flags: `--force`, `--p-limit`, `--config <path>`, `-v`

## Generator flow
`src/gen.ts`
1. Load config via `getConfigAsync` -> reads `bluevoid.config.ts` or `bluevoid.config.json`
2. Validate with Zod
3. For each provider:
   - Resolve extractor: `extractors/tabler.ts`, `extractors/lucide.ts`
   - Extract icon nodes from source package
   - Apply strategy:
     - `strategies/static.ts` - single file
     - `strategies/single.ts` - single icon bundle
     - `strategies/pages.ts` - paginated JSON
     - `strategies/pages_preload_duplicated.ts` - pages with duplicated paths
     - `strategies/buildIn.ts` - build-in provider
4. Write output to cache location defined in config:
   - `cacheClientPath/provider/manifest.json`
   - `cacheClientPath/provider/pages/page_0.json`, ...
   - `cacheClientPath/provider/paths.json` - shared SVG path strings
   - Output location is not committed unless customer manually sets it
5. Emit TypeScript types for generated manifest

TODO: config needs rework - output path handling and validation should be refactored

## Config file
`example.bluevoid.config.ts`
```ts
import { defineDynIconsConfig } from '@bluevoid/dyn-icons'

export default defineDynIconsConfig({
  icons: {
    cacheClientPath: '/icons',
    providers: {
      tabler: {
        strategy: 'pages',
        pageSize: 500,
        source: '@tabler/icons-react'
      }
    }
  }
})
```

## Programmatic API
```ts
import { gen } from '@bluevoid/dyn-icons'
import config from './bluevoid.config'

await gen({ force: true }, config)
```

## Types generation
After generation, run:
```bash
tsdown --watch
```
The package exports `./bluevoid.config` and `./cli` for programmatic use.

## Build output
- `dist/index.mjs` - core API
- `dist/cli.mjs` - CLI entry
- `dist/bluevoid.config.mjs` - config helper

The CLI is the build-time tool; runtime uses only generated JSON manifests.
