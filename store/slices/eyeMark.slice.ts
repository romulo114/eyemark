/** @format */

import { projectType } from "@/@types/components/projects.types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."
import projectApi from "../../api/project.api"
import userApi from "../../api/users.api"

const initialState = {
	eyeMarkedProjects: [] as projectType[],
	loading: false,
}

export const eyeMarkSlice = createSlice({
	name: "eyeMark",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchEyeMarkedProjects.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(
			fetchEyeMarkedProjects.fulfilled,
			(state, { payload }) => {
				state.eyeMarkedProjects = payload[0]?.projects || []
				state.loading = false
			}
		)
		builder.addCase(fetchEyeMarkedProjects.rejected, (state, action) => {
			state.loading = false
		})
		builder.addCase(eyeMarkProjects.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(eyeMarkProjects.fulfilled, (state, action) => {
			state.loading = false
		})
		builder.addCase(eyeMarkProjects.rejected, (state, action) => {
			state.loading = false
		})
	},
})

const fetchEyeMarkedProjects = createAsyncThunk("fetchEyeMarked", async () => {
	try {
		const response: any = await projectApi.getEyeMarkedProjects()
		return response.data
	} catch (error: any) {
		throw error
	}
})

const eyeMarkProjects = createAsyncThunk(
	"eyeMarkProjects",
	async (payload: any, { dispatch }) => {
		try {
			const response: any = await userApi.eyeMarkProjects(payload)

			dispatch(fetchEyeMarkedProjects())

			return response.data
		} catch (error: any) {
			throw error
		}
	}
)

export const eyeMarkSelector = (state: RootState) => state.eyeMark

export { fetchEyeMarkedProjects, eyeMarkProjects }

export default eyeMarkSlice.reducer
