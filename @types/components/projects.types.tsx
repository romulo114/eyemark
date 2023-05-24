/** @format */

import { statusType } from "../app.types"
import { ownerType, votesTypes } from "./discover.types"

export type ProjectToEyeMarkPropTypes = {
	name: string
	state: string[]
	status: statusType
	id: string
	thisproject: any
}

export type projectSentimentType = {
	angry: number
	unimpressed: number
	hopeful: number
	excited: number
	impressed: number
	suggestion: number
}

export enum sentimentString {
	excited = "excited",
	angry = "angry",
	impressed = "impressed",
	hopeful = "hopeful",
	unimpressed = "unimpressed",
}

export type projectType = {
	start_date: string
	end_date: string
	status: statusType
	geolocations: any[]
	name: string
	total_project_cost: string | number
	sentiments: projectSentimentType
	public_id: string
	image: string
	total_appropriation: string | number
	description: string
	sectors: string[]
	code: string
	contractor: string
	contractors: ownerType[]
	contractor_id: string
	contractor_logo: string
	contractor_type: string
	states: any
	owner: ownerType
	ministry: ownerType
	other_ministries: ownerType[]
	total_amount_utilized: string | number
	total_financial_commitment: string | number
	total_amount_released: string | number
	plan: string
	percentage_completed: number
	sdgs: string[]
	reviews_count: number
	eyemarked_count: number
	is_published: boolean
	appropriation_for_2021: number
	views: number
	modified: string
	project_type: string
	department: string
	child_projects: projectType[]
	yearly_appropriation: any
	contract_type: string
	geo_political_zone: string
}

export interface projectInfoPropType extends projectType {
	thisProject?: boolean
	fromPost?: boolean
	fromMap?: boolean
	MDAUpdate?: boolean
}

export interface projectCardPropTypes extends Partial<projectType> {
	categories?: boolean
	className?: string
	activeTag?: string
}

export type projectMedia = {
	image: string
	caption: string
	id: string
	is_live_photo: boolean
	longitude: string
	latitude: string
	state: string
}
export type typeOfPost =
	| "REVIEW"
	| "MILESTONE_UPDATE"
	| "5"
	| "UPDATE"
	| "COMMENT"

export type projectReview = {
	body: string
	created: string
	downvotes: votesTypes
	images: projectMedia[]
	is_review: boolean
	modified: string
	owner: ownerType
	project: projectType
	public_id: string
	reviews_count: number
	sentiment: sentimentString
	sentiments: projectSentimentType
	title: string
	type_of_post: typeOfPost
	upvotes: votesTypes
	parent?: projectReview
}

export interface projectReviewNoRefPropType extends projectReview {
	projectId: string
	fromProject: boolean
	comment?: boolean
}

export interface ProjectMileStonePropType extends Partial<projectReview> {
	name?: string
	comments?: any[]
	votes?: { upvotes: votesTypes; downvotes: votesTypes }
	avgSentiment?: string
	accountType?: string
}

export type postModalPropTypes = {
	close: () => void
	post_id?: string
	project?: projectType
	project_id: string
	fromMDA?: boolean
	projectReview?: boolean
	update?: boolean
	review?: projectReview
	isReview?: boolean
}
