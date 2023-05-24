/** @format */

import { AxiosResponse } from "axios"

interface projectApiInterface {
	getCategories: () => Promise<AxiosResponse>
	getSingleProject: (id: string) => Promise<AxiosResponse>
	getProjectReviews: (id: string) => Promise<AxiosResponse>
	getProjectMedia: (id: string) => Promise<AxiosResponse>
	getProjectActivity: (id: string) => Promise<AxiosResponse>
	getProjectsFromCategory: (
		data: string,
		page?: number
	) => Promise<AxiosResponse>
	getEyeMarkedProjects: () => Promise<AxiosResponse>
	getMostDiscussed: () => Promise<AxiosResponse>
	getNearingCompletion: () => Promise<AxiosResponse>
	getPopularReviews: () => Promise<AxiosResponse>
	getProjectByState: (state: string) => Promise<AxiosResponse>
	getProjectByLocation: (
		point: string,
		dist?: string,
		query?: string
	) => Promise<AxiosResponse>
	getProjectTags: () => Promise<AxiosResponse>
}

export type { projectApiInterface }
