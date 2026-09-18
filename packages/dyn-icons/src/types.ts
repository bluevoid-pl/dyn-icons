import type {
	IconNode as IconNodeType,
	IconProps as IconPropsType,
} from "@tabler/icons-react"


import type { z } from "zod/mini"


import type {
	bluevoidConfigValidator,
	IconDataSchema,
	iconProviderValidator,
	linkModeSchema,
	strategySchema,
} from "./validators"

export type BluevoidConfigType = z.infer<typeof bluevoidConfigValidator>

export type StrictConfigProviderType = z.infer<typeof iconProviderValidator>
export type StrategyType = z.infer<typeof strategySchema>
export type IconDataType = z.infer<typeof IconDataSchema>
export type linkModeType = z.infer<typeof linkModeSchema>

export interface IconDynProps extends IconPropsType {
	i: string
	data?: IconDataType
	className?: string
}


export type IconJsModuleType = { __iconNode: [string, any][]; default: any }

export type { IconNodeType, IconPropsType }
