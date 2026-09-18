import { defineConfig } from 'tsdown'

export default defineConfig({
  platform: 'neutral',
  dts: {
    tsgo: {},
  },
  exports: true,
})
