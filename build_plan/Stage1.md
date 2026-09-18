# Stage 1 - Monorepo Setup Recipe

## Prerequisites
- Node.js >= 20
- pnpm >= 9
- Nx >= 23

## 1. Init workspace
```bash
mkdir dyn-icons-monorepo
cd dyn-icons-monorepo
pnpm init
npx create-nx-workspace@latest . --preset=ts --installDeps false
```

Create `pnpm-workspace.yaml`:
```yaml
packages:
  - packages/*
  - apps/*
allowBuilds:
  esbuild: true
  nx: true
```

Create root `package.json`:
```json
{
  "name": "dyn-icons",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "pnpm --filter '!demo' --recursive run build",
    "dev": "pnpm --filter '!demo' --recursive run dev",
    "typecheck": "pnpm --recursive run typecheck",
    "lint": "pnpm --recursive run lint"
  },
  "devDependencies": {
    "nx": "23.2.1",
    "tsdown": "~0.23.0",
    "typescript": "~7.0.2"
  }
}
```

Configure `nx.json`:
```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "targetDefaults": {
    "build": { "dependsOn": ["^build"], "cache": true },
    "dev": { "dependsOn": ["^dev"] }
  },
  "plugins": [{ "plugin": "@nx/vite/plugin" }]
}
```

## 2. Packages to create
Only four packages are required for the final library:

### dyn-icons (core)
`packages/dyn-icons`
- Name: `@bluevoid/dyn-icons`
- Build tool: tsdown
- Exports: `./`, `./bluevoid.config`, `./cli`
- Dev deps: `zod`, `fast-glob`, `p-limit`, `@tabler/icons-react`
- No runtime React dependency
- No inlined dependencies; all provider packages are peer deps of consumers

### dyn-icons-react (react query layer)
`packages/dyn-icons-react`
- Name: `@bluevoid/dyn-icons-react`
- Peer deps: `react`, `react-dom`, `@tanstack/react-query`, `@bluevoid/dyn-icons`
- Build tool: tsdown
- Provides hooks: `useDynIcon`, `useDynIconPage`

### dyn-icons-react-devtools
`packages/dyn-icons-react-devtools`
- Name: `@bluevoid/dyn-icons-react-devtools`
- Peer deps: `@bluevoid/dyn-icons`, `@bluevoid/dyn-icons-react`, `react`, `react-dom`
- Build tool: tsdown
- Provides devtools panel for Query cache inspection

### rollup-plugin-dyn-icons
`packages/rollup-plugin-dyn-icons`
- Name: `rollup-plugin-dyn-icons` (no @bluevoid prefix per rollup naming conventions)
- Build tool: tsdown
- Exports Rollup plugin for build-time generation
- No runtime dependencies

## 3. Installation instructions per package
Each package must declare only deps used inside it.

**dyn-icons**
```bash
pnpm add -D zod fast-glob p-limit @tabler/icons-react @types/node
```

**dyn-icons-react**
```bash
pnpm add -D @tanstack/react-query @types/react @types/react-dom typescript tsdown
pnpm add -w @bluevoid/dyn-icons
```

**dyn-icons-react-devtools**
```bash
pnpm add -D @bluevoid/dyn-icons-react @bluevoid/dyn-icons typescript tsdown
```

**rollup-plugin-dyn-icons**
```bash
pnpm add -D typescript tsdown
```

## 4. Nx project registration
```bash
nx g @nx/js:library dyn-icons --directory packages/dyn-icons --bundler=tsdown --importScope=@bluevoid
nx g @nx/js:library dyn-icons-react --directory packages/dyn-icons-react --bundler=tsdown --importScope=@bluevoid
nx g @nx/js:library dyn-icons-react-devtools --directory packages/dyn-icons-react-devtools --bundler=tsdown --importScope=@bluevoid
nx g @nx/js:library rollup-plugin-dyn-icons --directory packages/rollup-plugin-dyn-icons --bundler=tsdown
```

Set `nx.json` targets to run `build`, `dev`, `typecheck` via pnpm.

## 5. Workspace links
- Use `workspace:*` for inter-package deps.
- Run `pnpm install` at root.
- Build order: `dyn-icons` -> `dyn-icons-react` -> `dyn-icons-react-devtools` -> `rollup-plugin-dyn-icons`.

## 6. Build config note
All packages use `tsdown`. Configure `tsdown.config.ts` to use `tsgo` for faster builds:
```ts
export default {
  entry: ['src/index.ts'],
  tsgo: true,
  dts: true
}
```

This recipe yields a minimal monorepo with the four libraries required for the final functional version.
