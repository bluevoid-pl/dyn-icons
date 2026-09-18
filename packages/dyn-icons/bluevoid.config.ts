import type { BluevoidConfigType } from "./src/types"

const config: BluevoidConfigType = {
	icons: {
		linkMode: "symlink",
		linkDir: "./public/icons",
		cacheClientPath: "/icons",
		providers: {
			"@tabler/icons-react": {
				enabled: true,
				input: "./node_modules/@tabler/icons-react/dist/esm/icons",
				inputSuffix: ".mjs",
				output: "./node_modules/@tabler/icons-react/json",
				extractor: "tabler-react",
				strategies: { single: {}, pages: { itemsPerPage: 50 } },
				alias: "tabler",
			},
			"lucide-react": {
				enabled: true,
				input: "./node_modules/lucide-react/dist/esm/icons",
				inputSuffix: ".js",
				output: "./node_modules/lucide-react/json",
				extractor: "lucide-react",
				strategies: { single: {}, pages: { itemsPerPage: 50 } },
				alias: "lucide",
			},
		},
	},
}

export default config
