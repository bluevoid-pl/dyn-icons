import type {
	IconNode as IconNodeType,
	IconProps as IconPropsType,
} from "@tabler/icons-react"

import type { z } from "zod/mini"

import type {
	bluevoidConfigValidator,
	IconDataValidator,
	iconProviderValidator,
	linkModeValidator,
  strategyValidator,
	iconJsModuleValidator
} from "./validators"

export type BluevoidConfigType = z.infer<typeof bluevoidConfigValidator>

export type StrictConfigProviderType = z.infer<typeof iconProviderValidator>
export type StrategyType = z.infer<typeof strategyValidator>
export type IconDataType = z.infer<typeof IconDataValidator>
export type linkModeType = z.infer<typeof linkModeValidator>

export interface IconDynProps extends IconPropsType {
	i: string
	data?: IconDataType
	className?: string
}

export type IconJsModuleType = z.infer<typeof iconJsModuleValidator>

export type { IconNodeType, IconPropsType }
