/** @format */

import { InputHTMLAttributes, SyntheticEvent } from "react"

export interface inputPropTypes<T = {}> extends InputHTMLAttributes<T> {
	label?: string
	error?: boolean | null
	testId?: string
	containerClassName?: string
	cancel?: boolean
	onCancelPress?: () => void
}

export interface currencyInputProps extends Omit<inputPropTypes, "onChange"> {
	onChange?: (e: { name: string; value: number }) => void
}
