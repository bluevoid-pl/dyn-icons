import * as z from "zod/mini"

export const buildInExtractorNames = z.enum(["tabler-react", "lucide-react"])

export const buildInPathsStrategyNames = z.enum(["single", "pages"])

export const linkModeValidator = z.optional(
	z._default(z.enum(["symlink", "copy", "move", "off"]), "symlink"),
)

export const IconDataValidator = z.object({
	type: z.optional(z.string()),
  iconName: z.string(),
	iconNamePascal: z.optional(z.string()),
	iconNode: z.array(
		z.tuple([
			z.union([z.string(), z.number(), z.symbol()]),
			z.record(z.string(), z.string()),
		]),
	),
})

export const iconProviderValidator = z.object({
	enabled: z.boolean(),
	input: z.string({ error: "input path is missing or incorrect" }),
	inputSuffix: z.optional(z.string({ error: "inputSuffix is incorrect" })),
	nameOfCreateFn: z.optional(z.string()),
	name: z.optional(z.string()),
	output: z.string({ error: "output path is missing or incorrect" }),
	alias: z.optional(z.string()),
	extractor: z.union([
		z.string(),
		z.function({
			input: [z.string(), z.any()],
			output: z.any(),
		}),
	]),
	strategies: z.record(z.string(), z.looseObject({})),
})

export const generatorFnValidator =  z.function({
		input: [
			z.array(IconDataValidator),
			iconProviderValidator,
			z.record(z.string(), z.any()),
			z.any(),
		],
		output: z.any(),
	})
export const loaderFnValidator = z.function({
		input: z.any(),
		output: z.any(),
})

export const strategyValidator = z.object({
	generator: generatorFnValidator,
	pageLoader: loaderFnValidator,
	singleLoader: loaderFnValidator,
})

export const iconJsModuleValidator = z.object({ //
			__iconNode: z.array(z.tuple([z.string(), z.any()])),
			default: z.any(),
		})

const extractorValidator = z.function({
	input: [
		z.string(), // fileName
		iconJsModuleValidator // Js module, that contains single icon
	],
	output: IconDataValidator, // must be icon for now, TODO: make this dependent on client resolver
})

// Extend Validator for bluevoid config extends field
const extendsValidator = z.object({
	strategies: z.optional(z.record(z.string(), strategyValidator)),
	extractors: z.optional(z.record(z.string(), extractorValidator)),
})

export const bluevoidConfigValidator = z.looseObject({
	icons: z.optional(
		z.strictObject({
			linkMode: linkModeValidator,
			linkDir: z.optional(z.string()),
			cacheClientPath: z.optional(z.string()),
			extends: z.optional(extendsValidator),
			providers: z.optional(
				z.record(
					z.string(),
					iconProviderValidator,
				),
			),
		}),
	),
})
