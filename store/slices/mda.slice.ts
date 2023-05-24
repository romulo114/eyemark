/** @format */

import { ownerType } from "@/@types/components/discover.types"
import {
	quickActionsInterface,
	updateResponse,
} from "@/@types/components/mda.types"
import { projectType } from "@/@types/components/projects.types"
import mdaApi from "@/api/mda.api"
import { genQuery } from "@/helpers/categories.helpers"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { RootState } from ".."

const initialState = {
	overviewData: {
		projects: {
			count: 0,
			status_count: {
				ongoing: 0,
				completed: 0,
				not_started: 0,
				on_hold: 0,
				abandoned: 0,
			},
			data: [] as projectType[],
		},
		contractors: { count: 0, data: [] as ownerType[] },
	},
	updateResponse: {} as updateResponse,
	loading: false,
	projects: {
		count: 0,
		next: "",
		previous: "",
		results: [] as projectType[],
	},
	analyticsData: {
		projects: {
			States: [],
			SDGs: [],
			Ministries: [],
		},
		users: {
			Total: 0,
			Registration: [],
			Gender: [],
			"Verification Status": [],
			"User Interests": {
				States: [],
				SDGs: [],
				Ministries: [],
				Sectors: [],
			},
			"Age range": {
				Total: {
					"Below 18": 0,
					"18-24": 0,
					"24-32": 0,
					"32-48": 0,
					"48-60": 0,
					"above 60": 0,
				},
			},
		},
		contractors: null,
	},
}

export const mdaSlice = createSlice({
	name: "mda",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getOverview.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(getOverview.fulfilled, (state, action) => {
			state.overviewData = action?.payload
			state.loading = false
		})
		builder.addCase(getOverview.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(inviteAContractor.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(inviteAContractor.fulfilled, (state, action) => {
			state.loading = false
		})
		builder.addCase(inviteAContractor.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(updateProjects.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(updateProjects.fulfilled, (state, action) => {
			state.updateResponse = action.payload as updateResponse
			state.loading = false
		})
		builder.addCase(updateProjects.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(uploadYearlyAppropriation.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(
			uploadYearlyAppropriation.fulfilled,
			(state, action) => {
				state.loading = false
			}
		)
		builder.addCase(uploadYearlyAppropriation.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(getMdaProjects.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(getMdaProjects.fulfilled, (state, action) => {
			state.projects = action.payload.data
			state.loading = false
		})
		builder.addCase(getMdaProjects.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(setAnalytics.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(setAnalytics.fulfilled, (state, { payload }) => {
			const { data, type } = payload as { data: any; type: string }
			state.loading = false
			state.analyticsData = { ...state.analyticsData, [type]: data }
		})
		builder.addCase(setAnalytics.rejected, (state, action) => {
			state.loading = false
		})
	},
})

const getOverview = createAsyncThunk("getOverview", async () => {
	try {
		const response: any = await mdaApi.getMdaDashboard()
		return response.data
	} catch (error: any) {
		throw error
	}
})

const inviteAContractor = createAsyncThunk(
	"inviteAContractor",
	async (params: {
		payload: { name: string; email: string }
		cb?: () => void
	}) => {
		try {
			const { payload, cb } = params
			const response = await mdaApi.inviteContractor(payload)

			toast.success("Contractor Invited successfully")
			cb && cb()
			return response
		} catch (error) {
			return error
		}
	}
)

const updateProjects = createAsyncThunk(
	"updateProjects",
	async (params: quickActionsInterface) => {
		try {
			const { cb, ...formData } = params
			const response = await mdaApi.bulkUpdateProjects(formData)
			cb && cb()
			toast.success("Projects updated successfully")
			return response
		} catch (error: any) {
			return error
		}
	}
)

const uploadYearlyAppropriation = createAsyncThunk(
	"uploadYearlyAppropriation",
	async (params: quickActionsInterface) => {
		try {
			const { cb, ...formData } = params
			const response = await mdaApi.uploadAppropriation(formData)
			cb && cb()
			toast.success("Uploaded Successfully")
			return response
		} catch (error: any) {
			return error
		}
	}
)

const getMdaProjects = createAsyncThunk(
	"getMdaProjects",
	async (
		payload: { page?: number; cb?: (data: boolean) => any },
		{ dispatch }
	) => {
		const { page, cb } = payload
		try {
			cb && dispatch(cb(false))
			const data = genQuery()
			const response = await mdaApi.getProjects(page, data)
			cb && dispatch(cb(false))
			return response
		} catch (error: any) {
			return error
		}
	}
)

const setAnalytics = createAsyncThunk(
	"setAnalytics",
	async (payload: string) => {
		try {
			let data, response: any
			switch (payload) {
				case "projects":
					response = await mdaApi.getProjectsAnalytics()
					data = response.data.Projects
					break
				case "contractors":
					response = await mdaApi.getContractorAnalytics()
					data = response
					break
				case "users":
					response = await mdaApi.getUserAnalytics()
					data = response.data
					break
				default:
					break
			}
			return { data, type: payload }
		} catch (error) {
			return error
		}
	}
)

export const mdaSelector = (state: RootState) => state.mda

export {
	getOverview,
	inviteAContractor,
	updateProjects,
	uploadYearlyAppropriation,
	getMdaProjects,
	setAnalytics,
}

export default mdaSlice.reducer
