/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from ".."
import { RegisterThunk } from "@/@types/app.types"
import authApi from "@/api/auth.api"
import Cookies from "js-cookie"
import { ownerType } from "@/@types/components/discover.types"
import { redirectToDashboard } from "@/helpers/general.helpers"

const initialState = {
	user: {} as ownerType,
	token: null,
	is_authenticated: false,
	error: null,
	loading: false,
	page: 0,
	registering: false,
	refresh_token: null,
	auth_modal: {
		show: false,
		text: "",
		modal_page: 0,
		subtitle: "",
	},
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = {} as ownerType
			state.token = null
			state.is_authenticated = false
			state.error = null
			state.loading = false
			state.registering = false
			state.page = 0
			localStorage.clear()
			Cookies.remove("AUTH")
			localStorage.removeItem("persist:eyemark")
		},
		setModalPage: (state, { payload }) => {
			state.auth_modal.modal_page = payload
		},
		setPage: (state, { payload }) => {
			state.page = payload
		},

		setAuth: (state) => {
			state.is_authenticated = true
			state.registering = false
			localStorage.removeItem("userType")
			const { auth_modal, ...stored } = state
			const store = JSON.stringify({ ...stored })
			Cookies.set("AUTH", store)
		},

		toggleModal: (state, { payload }) => {
			state.auth_modal = payload
		},
		setRegistering: (state, { payload }) => {
			state.registering = payload
			const { auth_modal, ...stored } = state
			const store = JSON.stringify({ ...stored })
			Cookies.set("AUTH", store)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.loading = true
		})
		builder.addCase(login.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(login.fulfilled, (state, { payload }) => {
			const { access_token, refresh_token, user } = payload
			state.loading = false
			state.user = user
			state.token = access_token
			state.refresh_token = refresh_token
			state.is_authenticated = true
		})
		builder.addCase(register.pending, (state) => {
			state.loading = true
		})
		builder.addCase(register.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(register.fulfilled, (state, { payload }) => {
			const { access_token, refresh_token, user } = payload
			state.loading = false
			state.user = user
			state.token = access_token
			state.refresh_token = refresh_token
			state.registering = true
			const { auth_modal, ...stored } = state
			const store = JSON.stringify({ ...stored })
			Cookies.set("AUTH", store)
		})

		builder.addCase(setAuthUser.pending, (state) => {
			state.loading = true
		})
		builder.addCase(setAuthUser.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(setAuthUser.fulfilled, (state, { payload }) => {
			state.loading = false
			state.user = payload

			const { auth_modal, ...stored } = state
			const store = JSON.stringify({ ...stored })
			Cookies.set("AUTH", store)
		})
		builder.addCase(refreshUserToken.pending, (state) => {
			state.loading = true
		})
		builder.addCase(refreshUserToken.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(refreshUserToken.fulfilled, (state, { payload }) => {
			const { access } = payload
			state.loading = false
			state.token = access

			const { auth_modal, ...stored } = state

			const store = JSON.stringify({ ...stored })
			Cookies.set("AUTH", store)
			localStorage.setItem("token", access)
			window.location.reload()
		})
	},
})

const login = createAsyncThunk(
	"login",
	async (
		payload: {
			formData: { email: string; password: string }
			auth_modal?: boolean
			router?: any
		},
		{ dispatch }
	) => {
		try {
			const { formData, auth_modal, router } = payload
			const { data } = await authApi.login(formData)
			const { access_token, refresh_token } = data
			localStorage.setItem("token", access_token)
			localStorage.setItem("refresh_token", refresh_token)
			data["token"] = access_token
			Cookies.set("AUTH", JSON.stringify(data))

			if (auth_modal) {
				dispatch(
					toggleModal({ show: false, action: "", modal_page: 0 })
				)
			} else {
				redirectToDashboard(data?.user?.account_type, router)
			}
			return data
		} catch (error: any) {
			throw error
		}
	}
)

const register = createAsyncThunk(
	"register",
	async (params: RegisterThunk, { dispatch }) => {
		try {
			const { payload, auth_modal, cb } = params
			const { data } = await authApi.signup(payload)
			const { access_token, refresh_token } = data
			localStorage.setItem("token", access_token)
			localStorage.setItem("refresh_token", refresh_token)

			if (auth_modal) {
				dispatch(setModalPage(2.5))
				dispatch(setAuth())
			} else {
				cb && cb()
			}

			return data
		} catch (error) {
			throw error
		}
	}
)

const setAuthUser = createAsyncThunk("setAuthUser", async () => {
	try {
		const { data } = await authApi.getAuthUser()
		return data
	} catch (error) {
		throw error
	}
})

const refreshUserToken = createAsyncThunk(
	"refreshUserToken",
	async ({}, { dispatch }) => {
		try {
			const refresh = localStorage.getItem("refresh_token")
			if (!refresh) throw new Error("no refresh token")
			const { data } = await authApi.refreshToken({
				refresh,
			})
			console.log(data)
			return data
		} catch (error) {
			dispatch(logout())
			throw error
		}
	}
)

export const authSelector = (state: RootState) => state.auth
export { login, register, setAuthUser, refreshUserToken }
export const {
	logout,
	setPage,
	setAuth,
	toggleModal,
	setModalPage,
	setRegistering,
} = authSlice.actions

export default authSlice.reducer
