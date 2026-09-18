import type { IconDataType, IconJsModuleType } from "../types"

const regexTabler = /\s*createReactComponent\s*\(([^)]*)\)/

export function tablerExtractor(
	fileName: string,
	jsModule: IconJsModuleType,
): IconDataType | undefined  {
	const iconNode = jsModule?.__iconNode
	const match = fileName.match(regexTabler)
	if (!match) return
	const [_full, params] = match
	const paramsArr = (params?.split(",") ?? []).map((s) => s.trim())
	const [type, iconName, iconNamePascal] = paramsArr
	return {
		type: type?.slice(1, -1),
		iconName: iconName?.slice(1, -1),
		iconNamePascal: iconNamePascal?.slice(1, -1),
		iconNode,
	}
}
