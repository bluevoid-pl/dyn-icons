// cc0 TODO: maybe use new URL( ) for this
export function normalizePath(path: string) {
	if (path.length > 1 && path[path.length - 1] === "/") {
		return path.slice(0, -1)
	}
	return path
}
// cc0
export function replaceNonAlphaNum(str: string): string {
	return str.replace(/[^a-zA-Z0-9]/g, "_")
}
