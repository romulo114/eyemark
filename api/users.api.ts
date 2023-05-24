/** @format */

import { usersApiInterface } from "@/@types/apiTypes/users.types"
import { privateInstance as instance, formDataInstance } from "./instance"

const userApi: usersApiInterface = {
	updateUserProfile: async (data) =>
		data?.formData
			? await formDataInstance.patch(
					"/users/me/update/",
					data.formData as FormData
			  )
			: await instance.patch("/users/me/update/", data),
	getInterests: async () => await instance.get("/users/interest-options/"),
	updateInterests: async (data) =>
		await instance.post("/users/interests/", data),
	getSuggestions: async () => await instance.get("/users/suggestions/"),
	eyeMarkProjects: async (data) =>
		await instance.post("/projects/eyemark/", data),
	getUserMedia: async () => await instance.get("/users/me/media/"),
	getUserFeed: async (display_name) =>
		await instance.get(`/users/profiles/${display_name}/feeds/`),
	search: async (query) =>
		await instance.get(`/users/search/?query=${query}`),
	changePassword: async (data) =>
		await instance.post("/auth/password/change/", data),
	getUserInterest: async () => await instance.get("/users/interests/"),
	getMda: async (query) =>
		await instance.get(`/users/mda-search/?query=${query}`),
	getProfileMedia: async (id) =>
		await instance.get(`/users/profiles/${id}/media/`),
	getProfileProjects: async (query, page = 1) =>
		await instance.get(`/projects/?page=${page}&is_published=true${query}`),
	getProfileEyeMarks: async (user) =>
		await instance.get(`/users/eyemarks/${user}/`),
	getUserDetails: async (username) =>
		await instance.get(`/users/profiles/${username}/`),
}

export default userApi
