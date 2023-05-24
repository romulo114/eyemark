/** @format */

import { ButtonHTMLAttributes } from "react"

export interface buttonPropTypes<T = {}> extends ButtonHTMLAttributes<T> {
	onClick?: () => void
	text: string
	className?: string
	translation?: string
	buttonType?: "new" | "default" | "rounded"
}

export interface onBoardingButtonPropTypes extends buttonPropTypes {
	back?: boolean
}

export interface tagButtonPropTypes extends buttonPropTypes {
	checked: boolean
}

export interface scrollArrowButtonPropTypes
	extends Omit<buttonPropTypes, "text"> {
	right?: boolean
	interests?: boolean
	settings?: boolean
	fromDiscover?: boolean
	hide?: boolean
	hover?: boolean
}

export interface eyeMarkButtonPropTypes extends Omit<buttonPropTypes, "text"> {
	isRounded?: boolean
	projectId: string
	projectName: string
	hover?: boolean
}
