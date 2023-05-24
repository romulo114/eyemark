import mdaAssets from "@/public/assets/SVG/mda"

export type inviteContractorProps = {
	close?: () => void
}

export type updateResponse = {
	created_projects?: number
	rows_with_existing_project_data?: []
	rows_with_incomplete_compulsory_columns?: []
}

export type updateProjectProps = {
	close?: () => void
}

export type uploadAppropriationProps = {
	close?: () => void
}

export type projectsTableProps = {
	page: number
}

export interface quickActionsInterface {
	formData?: FormData
	cb?: () => void
}

export type editProjectImage = "one" | "two" | "three" | "four"
