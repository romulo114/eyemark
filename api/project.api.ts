/** @format */

import { projectApiInterface } from "@/@types/apiTypes/project.types"
import { privateInstance as instance } from "./instance"

const projectApi: projectApiInterface = {
	getCategories: async () => await instance.get("/projects/categories/all/"),
	getSingleProject: async (id) => await instance.get(`/projects/${id}/`),
	getProjectsFromCategory: async (data, page = 1) =>
		await instance.get(`/projects/?page=${page}&is_published=true${data}`),
	getEyeMarkedProjects: async () => await instance.get("/users/me/eyemarks/"),
	getProjectMedia: async (id) => await instance.get(`/projects/${id}/media/`),
	getProjectActivity: async (id) =>
		await instance.get(`/projects/${id}/updates/`),
	getProjectReviews: async (id) =>
		await instance.get(`/projects/${id}/reviews/`),
	getMostDiscussed: async () =>
		await instance.get("/projects/list-most-discussed/"),
	getNearingCompletion: async () =>
		await instance.get("/projects/list-nearing-completion/"),
	getPopularReviews: async () =>
		await instance.get("/projects/posts/list-popular-reviews/"),
	getProjectByState: async (state) =>
		await instance.get(
			`/projects/?page=1&is_published=true&state=${state}`
		),
	getProjectByLocation: async (point, dist = "10000", query) =>
		await instance.get(
			`/projects/?dist=${dist}&point=${point}&format=json${query}`
		),
	getProjectTags: async () => await instance.get(`/projects/project-tags/`),
}

export default projectApi
