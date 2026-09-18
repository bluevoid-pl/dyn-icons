import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: {
    tsgo: {},
  },
 	entry: {
		index: "src/index.ts",
		cli: "src/cli.ts",
		cliEntry: "src/cliEntry.ts",
		"bluevoid.config": "bluevoid.config.ts",
  },
  exports: {
		exclude: ["src/cliEntry.ts"],
		bin: { "dyn-icons": "src/cliEntry.ts" },
	},
})
