import * as z from "zod/mini"

export const buildInExtractorNames = z.enum(["tabler-react", "lucide-react"])

export const buildInPathsStrategyNames = z.enum(["single", "pages"])
export const linkModeSchema = z.optional(
	z._default(z.enum(["symlink", "copy", "move", "off"]), "symlink"),
)

export const IconDataSchema = z.object({
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

export const strategySchema = z.object({
	generator: z.function({
		input: [
			z.array(IconDataSchema),
			iconProviderValidator,
			z.record(z.string(), z.any()),
			z.any(),
		],
		output: z.any(),
	}),
	pageLoader: z.function({
		input: z.any(),
		output: z.any(),
	}),
	singleLoader: z.function({
		input: z.any(),
		output: z.any(),
	}),
})

const extractorSchema = z.function({
	input: [
		z.string(),
		z.object({
			__iconNode: z.array(z.tuple([z.string(), z.any()])),
			default: z.any(),
		}),
	],
	output: z.any(),
})

// Extend schema for bluevoid config extends field
const extendsSchema = z.object({
	strategies: z.optional(z.record(z.string(), strategySchema)),
	extractors: z.optional(z.record(z.string(), extractorSchema)),
})

export const bluevoidConfigValidator = z.looseObject({
	icons: z.optional(
		z.strictObject({
			linkMode: linkModeSchema,
			linkDir: z.optional(z.string()),
			cacheClientPath: z.optional(z.string()),
			extends: z.optional(extendsSchema),
			providers: z.optional(
				z.record(
					z.string(),
					z.strictObject({
						name: z.optional(z.string()),
						alias: z.optional(z.string()),
						enabled: z.optional(z.boolean()),
						input: z.optional(z.string()),
						inputSuffix: z.optional(z.string()),
						nameOfCreateFn: z.optional(z.string()),
						output: z.optional(z.string()),
						extractor: z.optional(
							z.union([
								z.string(),
								z.function({
									input: [z.string(), z.any()],
									output: z.any(),
								}),
							]),
						),
						strategies: z.record(z.string(), z.looseObject({})),
						metaProvider: z.optional(z.string()),
						metaPath: z.optional(z.string()),
					}),
				),
			),
		}),
	),
})
