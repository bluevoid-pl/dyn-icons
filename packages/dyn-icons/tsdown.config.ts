import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: {
    tsgo: {},
  },
 	entry: {
		index: "src/index.ts",
		cli: "src/cli/cli.ts",
		cliEntry: "src/cli/cliEntry.ts",
		"bluevoid.config": "bluevoid.config.ts",
  },
  exports: {
		exclude: ["src/cli/cliEntry.ts"],
		bin: { "dyn-icons": "src/cli/cliEntry.ts" },
	},
})
