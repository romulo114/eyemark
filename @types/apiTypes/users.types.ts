/** @format */

import { AxiosResponse } from "axios"

interface usersApiInterface {
	updateUserProfile: (
		data: updateUserProfileInterface,
		file?: boolean
	) => Promise<AxiosResponse>
	getInterests: () => Promise<AxiosResponse>
	updateInterests: (data: updateInterestsInterface) => Promise<AxiosResponse>
	getSuggestions: () => Promise<AxiosResponse>
	eyeMarkProjects: (data: any) => Promise<AxiosResponse>
	getUserMedia: () => Promise<AxiosResponse>
	getUserFeed: (display_name: string) => Promise<AxiosResponse>
	search: (query: string | string[]) => Promise<AxiosResponse>
	changePassword: (data: changePasswordInterface) => Promise<AxiosResponse>
	getUserInterest: () => Promise<AxiosResponse>
	getMda: (query: string) => Promise<AxiosResponse>
	getProfileMedia: (id: string) => Promise<AxiosResponse>
	getProfileProjects: (query: string, page?: number) => Promise<AxiosResponse>
	getProfileEyeMarks: (user: string) => Promise<AxiosResponse>
	getUserDetails: (username: string) => Promise<AxiosResponse>
}

interface updateUserProfileInterface {
	display_name?: string
	first_name?: string
	last_name?: string
	bio?: string
	rc_number?: string
	contact_no?: string
	formData?: FormData
	state_of_residence?: string
	newAvatar?: File
	avatar?: string
	email?: string
	username?: string
	cb?: () => void
	settings?: boolean
}

interface updateInterestsInterface {
	locations?: []
	sdgs?: []
	sectors?: []
	ministries?: []
}

interface changePasswordInterface {
	old_password: string
	new_password1: string
	new_password2: string
}

export type {
	usersApiInterface,
	updateUserProfileInterface,
	updateInterestsInterface,
	changePasswordInterface,
}
