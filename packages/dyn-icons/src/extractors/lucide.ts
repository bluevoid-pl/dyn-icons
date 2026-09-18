import type { IconDataType, IconJsModuleType } from "../types"

const regexLucide = /\s*createLucideIcon\s*\(([^)]*)\)/

export function lucideExtractor(
	fileName: string,
	jsModule: IconJsModuleType,
): IconDataType | undefined {
	const iconNode = jsModule?.__iconNode
	const match = fileName.match(regexLucide)
  if (!match) return
  const [_full, params] = match
	const paramsArr = (params?.split(",") ?? []).map((s) => s.trim())
	const [_iconName] = paramsArr
	return {
		type: "outline",
		iconName: _iconName?.slice(1, -1),
		iconNode,
	}
}
