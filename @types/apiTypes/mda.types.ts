/** @format */

import { AxiosResponse } from "axios"
import { quickActionsInterface } from "../components/mda.types"
import { projectType } from "../components/projects.types"

interface mdaApiInterface {
	getMdaDashboard: () => Promise<AxiosResponse>
	inviteContractor: (payload: {
		name: string
		email: string
	}) => Promise<AxiosResponse>
	bulkUpdateProjects: (
		formData: quickActionsInterface
	) => Promise<AxiosResponse>
	uploadAppropriation: (
		formData: quickActionsInterface
	) => Promise<AxiosResponse>
	getProjects: (page?: number, data?: string) => Promise<AxiosResponse>
	getProjectsAnalytics: () => Promise<AxiosResponse>
	getUserAnalytics: () => Promise<AxiosResponse>
	getContractorAnalytics: () => Promise<AxiosResponse>
	getLGAS: (state: string) => Promise<AxiosResponse>
	getStates: () => Promise<AxiosResponse>
	createProject: (project: projectType) => Promise<AxiosResponse>
	updateProject: (
		id: string,
		project: Partial<projectType>
	) => Promise<AxiosResponse>
	publishProject: (id: string) => Promise<AxiosResponse>
}

export type { mdaApiInterface }
