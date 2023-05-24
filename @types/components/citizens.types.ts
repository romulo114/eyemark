/** @format */

import { ReactNode, RefObject } from "react"

export type appLayoutPropTypes = {
	children: ReactNode | ReactNode[]
	sidebar?: ReactNode
	layoutCenterRef?: RefObject<HTMLDivElement>
	mda?: boolean
	full?: boolean
}

export type bottomNavProps = {
	mda?: boolean
}
