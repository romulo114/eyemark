/** @format */

import { mdaApiInterface } from "@/@types/apiTypes/mda.types"
import axios from "axios"
import { formDataInstance, privateInstance } from "./instance"

const mdaApi: mdaApiInterface = {
	getMdaDashboard: async () =>
		await privateInstance.get(`/users/mda-dashboard/`),
	inviteContractor: async (payload) =>
		await privateInstance.post(`/users/contractor/`, payload),

	bulkUpdateProjects: async (payload) =>
		await formDataInstance.patch(
			"/projects/bulk_update/",
			payload.formData as FormData
		),

	uploadAppropriation: async (payload) =>
		await formDataInstance.post(
			"/projects/upload/",
			payload.formData as FormData
		),

	getProjects: async (page = 1, slug) =>
		await privateInstance.get(`/users/mda-projects/?page=${page}${slug}`),

	getProjectsAnalytics: async () =>
		await privateInstance.get(`/projects/analysis/`),

	getUserAnalytics: async () => await privateInstance.get(`/users/analysis/`),

	getContractorAnalytics: async () =>
		await privateInstance.get(`/users/analytics/contractors/`),
	getLGAS: async (state) =>
		await axios.get(
			`http://locationsng-api.herokuapp.com/api/v1/states/${{
				state,
			}}/lgas/`
		),
	getStates: async () =>
		await axios.get(`http://locationsng-api.herokuapp.com/api/v1/states/`),
	createProject: async (project) =>
		await privateInstance.post(`/projects/`, project),
	updateProject: async (id, project) =>
		await privateInstance.patch(`/projects/${id}/`, project),
	publishProject: async (id) =>
		await privateInstance.post(`/projects/${id}/publish/`),
}

export default mdaApi
