/** @format */

import axios from "axios"
import { _handleError } from "@/helpers/api.helpers"

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const publicInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
})

const privateInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
})

// delete this instance if private instance works for file upload
const formDataInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Accept: "*/*",
		"Content-Type":
			"multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
	},
})

const serverSideInstance = axios.create({
	baseURL: "/api",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
})

//request interceptors
privateInstance.interceptors.request.use((config: any) => {
	const token = localStorage.getItem("token")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

formDataInstance.interceptors.request.use((config: any) => {
	const token = localStorage.getItem("token")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

//response interceptors
publicInstance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		_handleError(error)
		throw error
	}
)

privateInstance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		_handleError(error)
		throw error
	}
)

formDataInstance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		_handleError(error)
		throw error
	}
)

export { publicInstance, privateInstance, formDataInstance }
