/** @format */

import { tagsAssets } from "@/constants/general/discover"
import { ReactNode } from "react"
import { filterShared, TypeOfAccount } from "./general.types"
import { projectType, sentimentString } from "./projects.types"

export type verticalOverviewPropTypes = {
	title: string
	subtitle: string
	children?: ReactNode | ReactNode[]
	isMap?: boolean
	data?: any[]
	isReview?: boolean
}

export type votesTypes = {
	count: number
	votes: { user: ownerType }[]
}

export type ownerType = {
	avatar: string
	email: string
	display_name: string
	username: string
	account_type: TypeOfAccount
	created: string
	public_id: string
	bio: string
	state_of_residence: string
	reviews_count?: number
	eyemarked_count?: number
	total_no_of_projects?: number
	total_appropriated_amount?: number
}

export type PopularReviewPropTypes = {
	body: string
	public_id: string
	owner: ownerType
	sentiment: sentimentString
	created: string
	images: any[]
	title: string
	upvotes: votesTypes
	downvotes: votesTypes
	project: projectType
}

export type votingPropTypes = {
	upvotes: votesTypes
	downvotes: votesTypes
	postId: string
	projectId: string
	title: string
}

export type allowLocationPropTypes = {
	map?: boolean
	toggleLocation?: () => void
}

export type showMorePropTypes = {
	onClick?: () => void
	href?: string
	state?: string | boolean
	show?: boolean
}

export type infoCardPropTypes = {
	info: ownerType
	category: string
	index: number
}

export type topPropTypes = {
	citizens: ownerType[]
	mda: ownerType[]
	contractors: ownerType[]
	results: projectType[]
	count: number
	q?: string | string[]
	navigate: (value: string) => void
}

export type filterWrapperPropTypes = {
	children: ReactNode | ReactNode[]
	title: string
	selectedCount?: number
	selected: boolean
	filterKey: filterShared
}

export type tagHeaderPropTypes = {
	activeView: string
	setActiveView: (view: string) => void
	toggleLocation: () => void
}

export type filterFrom = "discover" | "search" | "categories" | "mda"

export type tagsAssetsType = keyof typeof tagsAssets
