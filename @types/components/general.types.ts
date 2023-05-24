/** @format */

import { AllHTMLAttributes } from "react"
import statesCoordinates from "@/constants/general/state_coordinates.json"
import { formatRange } from "@/constants/general/distance"
import { shared } from "@/store/slices/filter.slice"
import { SDGImages, SDG_backgrounds } from "@/constants/general/defaults"

export type tagType = {
	title: string
	img: string
	data: any[]
	setSelectedItems: any
	scrollNumber: number
	totalSelected: number
	settings?: boolean
}

export type tabType = {
	tabOpen: number
	sendTab: (arg: boolean) => void
	auth_modal?: boolean
}

export type faqCardProps = {
	title: string
	content: string
}

export type projectTabType = {
	suggestion: any
}

export type paginatorPropTypes = {
	click: (data: { selected: number }) => void
	count: number
	selected: number
}

export enum textElementType {
	Paragraph,
	Span,
	heading,
}

export interface TextProps<T = {}> extends AllHTMLAttributes<T> {
	elementType?: textElementType
	headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
	children: string | number | (string[] | number[]) | (string | number)[]
	translation?: string
	extra?: string
}

export type distanceNumbers = keyof typeof formatRange

export type statesKey = keyof typeof statesCoordinates

export type customNavPropTypes = {
	onChange: (value: string) => void
	data: { value: string; id: number }[]
	active: string
	className?: string
}

export type noContentPropTypes = {
	title: string
	img: string
	body?: string
	buttonText?: string
	href?: string
	onClick?: () => void
}

export type sharePropTypes = {
	url: string
	title: string
	image: string
	body: string
	white?: boolean
}

export type TypeOfAccount =
	| "MINISTRY"
	| "CONTRACTOR"
	| "CITIZEN"
	| "ADMIN"
	| "CSO"
	| "DEPARTMENT"
	| "AGENCY"

export type AccountIconType = "MINISTRY" | "CONTRACTOR"

export type filterShared = keyof typeof shared
export type sdgBackgroundType = keyof typeof SDG_backgrounds
export type sdgImagesType = keyof typeof SDGImages

export type interestsProps = {
	settings?: boolean
	submitInterests?: number
}
