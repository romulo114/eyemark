/** @format */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { RootState } from ".."
import { verifyInterface } from "@/@types/apiTypes/auth.types"
import {
	updateInterestsInterface,
	updateUserProfileInterface,
} from "@/@types/apiTypes/users.types"
import authApi from "@/api/auth.api"
import userApi from "@/api/users.api"
import Cookies from "js-cookie"

const initialState = {
	loading: false,
	projectsEyeMarked: 0,
	interests: null,
	selectedInterests: null,
	userType: null,
	suggestions: {} as any,
}

export const onboardingSlice = createSlice({
	name: "onboarding",
	initialState,
	reducers: {
		addProjectsEyeMarked: (state) => {
			state.projectsEyeMarked += 1
		},
		removeProjectsEyeMarked: (state) => {
			state.projectsEyeMarked -= 1
		},
		setUserType: (state, action) => {
			state.userType = action.payload
			localStorage.setItem("userType", action.payload)
			Cookies.set("userType", action.payload)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(_verifyOTP.pending, (state) => {
			state.loading = true
		})
		builder.addCase(_verifyOTP.fulfilled, (state) => {
			state.loading = false
		})
		builder.addCase(_verifyOTP.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(_resendOTP.pending, (state) => {
			state.loading = true
		})
		builder.addCase(_resendOTP.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(_resendOTP.fulfilled, (state) => {
			state.loading = false
		})
		builder.addCase(addInterest.pending, (state) => {
			state.loading = true
		})
		builder.addCase(addInterest.fulfilled, (state) => {
			state.loading = false
		})
		builder.addCase(addInterest.rejected, (state) => {
			state.loading = false
		})

		builder.addCase(getUserInterests.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getUserInterests.fulfilled, (state, { payload }) => {
			state.selectedInterests = payload
			state.loading = false
		})
		builder.addCase(getUserInterests.rejected, (state) => {
			state.loading = false
		})

		builder.addCase(getInterests.fulfilled, (state, { payload }) => {
			state.interests = payload
			state.loading = false
		})
		builder.addCase(getInterests.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getInterests.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(fetchSuggestions.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchSuggestions.fulfilled, (state, { payload }) => {
			state.suggestions = payload
			state.loading = false
		})
		builder.addCase(fetchSuggestions.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(updateUserDetails.pending, (state) => {
			state.loading = true
		})
		builder.addCase(updateUserDetails.fulfilled, (state) => {
			state.loading = false
		})
		builder.addCase(updateUserDetails.rejected, (state) => {
			state.loading = false
		})
	},
})

const _verifyOTP = createAsyncThunk(
	"verifyOTP",
	async (payload: verifyInterface) => {
		try {
			const { otp, cb } = payload
			const { data } = await authApi.verifyOtp({ otp })

			cb && cb()

			return data
		} catch (error) {
			throw error
		}
	}
)

const _resendOTP = createAsyncThunk("resendOTP", async (payload) => {
	try {
		const { data } = await authApi.resendOtp()
		toast.success("A new OTP code has been sent to your mail")
		return data
	} catch (error) {
		return error
	}
})

const updateUserDetails = createAsyncThunk(
	"update-user-details",
	async (payload: updateUserProfileInterface, { dispatch }) => {
		try {
			const { cb, settings, ...formData } = payload
			const { data } = await userApi.updateUserProfile(formData)
			cb && cb()

			settings && toast.success("Profile Updated")

			return data
		} catch (error) {
			throw error
		}
	}
)

const addInterest = createAsyncThunk(
	"addInterest",
	async (payload: {
		formData: updateInterestsInterface
		cb?: (data?: any) => void
		cb_data?: any
		settings?: boolean
	}) => {
		try {
			const { formData, cb, settings, cb_data } = payload
			await userApi.updateInterests(formData)

			cb && cb(cb_data)

			settings && toast.success("Interests updated")
		} catch (error) {}
	}
)

const getUserInterests = createAsyncThunk("showInterests", async (payload) => {
	try {
		const { data } = await userApi.getUserInterest()
		return data
	} catch (error) {}
})

const getInterests = createAsyncThunk("fetchInterest", async (payload) => {
	try {
		const { data } = await userApi.getInterests()
		return data.data
	} catch (error) {}
})

const fetchSuggestions = createAsyncThunk("suggestions", async () => {
	try {
		const { data } = await userApi.getSuggestions()
		return data
	} catch (error) {
		throw error
	}
})

export const onboardingSelector = (state: RootState) => state.onboarding
export const { setUserType, addProjectsEyeMarked, removeProjectsEyeMarked } =
	onboardingSlice.actions
export {
	_resendOTP,
	_verifyOTP,
	updateUserDetails,
	addInterest,
	getUserInterests,
	getInterests,
	fetchSuggestions,
}
export default onboardingSlice.reducer
