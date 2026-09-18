import type { BluevoidConfigType } from "@bluevoid/dyn-icons"

const config: BluevoidConfigType = {
	icons: {
		linkMode: "symlink",
		linkDir: "./public",
		extends: {
			// chunkingStrategy: {
			//   "limited": async (icons, provider, config) => {
			//     const dirPath = resolve(provider.output, "limited", "icons");
			//     await mkdirIfNotPresent(dirPath, { recursive: true });
			//     for (let i = 0; i < 10; i++) {
			//       const dataObj = icons[i];
			//       const filePath = resolve(dirPath, `${dataObj.iconName}.json`);
			//       await writeFileINE(filePath, JSON.stringify(dataObj));
			//     }
			//   }
			// },
			// extractor: {
			//   "test_ext": async (file, jsModule) => {
			//    	const data = jsModule?.__iconNode;
			//    	const match = file.match(regexLucide);
			//    	if (!match) return undefined;
			//    	const [_full, params] = match;
			//    	const paramsArr = (params?.split(",") ?? []).map((s) => s.trim());
			//    	const [_iconName] = paramsArr;
			//    	return {
			//     		type: "outline",
			//     		iconName: _iconName?.slice(1, -1),
			//     		data,
			//    	};
			//   }
			// }
		},
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
