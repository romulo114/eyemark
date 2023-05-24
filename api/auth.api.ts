/** @format */

import { authApiInterface } from "@/@types/apiTypes/auth.types"
import { privateInstance, publicInstance as instance } from "./instance"

const authApi: authApiInterface = {
	login: async (data) => await instance.post("/auth/login/", data),
	signup: async (data) => await instance.post("/users/register/", data),
	getAuthUser: async () => await privateInstance.get("/auth/user/"),
	verifyOtp: async (data) =>
		await privateInstance.post("/users/verify/", data),
	resendOtp: async () => await privateInstance.get("/users/verify/"),
	refreshToken: async (data) =>
		await instance.post(`/auth/token/refresh/`, data),
}

export default authApi
