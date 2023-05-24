/** @format */

import { AxiosResponse } from "axios"

interface authApiInterface {
	login: (data: loginInterface) => Promise<AxiosResponse>
	signup: (data: signupInterface) => Promise<AxiosResponse>
	getAuthUser: () => Promise<AxiosResponse>
	verifyOtp: (data: Omit<verifyInterface, "cb">) => Promise<AxiosResponse>
	resendOtp: () => Promise<AxiosResponse>
	refreshToken: (data: { refresh: string }) => Promise<AxiosResponse>
}

interface loginInterface {
	email: string
	password: string
}

interface signupInterface {
	email: string
	password: string
	verification_code?: number | null
}

interface verifyInterface {
	otp: string
	cb?: () => void
}

export type {
	authApiInterface,
	loginInterface,
	signupInterface,
	verifyInterface,
}
