/** @format */

import { CSSProperties, ReactNode } from "react"

export type onBoardingLayoutProps = {
	children?: ReactNode | ReactNode[]
	title: string
	className?: string
	style?: CSSProperties
	id?: string
}

export type settingsLayoutProps = {
	children?: ReactNode | ReactNode[]
}

export type homeLayoutProps = {
	children?: ReactNode | ReactNode[]
}

export type smallModalPropTypes = {
	closeModal: () => void
	mda?: boolean
}

export type leftSidebarProps = {
	mda?: boolean
}
