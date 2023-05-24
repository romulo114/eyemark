/** @format */

import {
	projectMedia,
	projectReview,
	projectType,
} from "@/@types/components/projects.types"
import projectApi from "@/api/project.api"
import userApi from "@/api/users.api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."

const initialState = {
	loading: false,
	project: {} as projectType,
	reviews: [] as projectReview[],
	activities: [] as projectReview[],
	media: [] as projectMedia[],
	surveys: [],
}

export const initialProjectState = initialState

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		update_project: (state, { payload }) => {
			state.project = payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSingleProject.pending, (state) => {
			state.loading = true
			state.project = {} as projectType
		})
		builder.addCase(fetchSingleProject.fulfilled, (state, action) => {
			state.project = action.payload
			state.loading = false
		})
		builder.addCase(fetchSingleProject.rejected, (state) => {
			state.loading = false
		})

		builder.addCase(fetchProjectReviews.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchProjectReviews.fulfilled, (state, action) => {
			state.reviews = action.payload
			state.loading = false
		})
		builder.addCase(fetchProjectReviews.rejected, (state) => {
			state.loading = false
		})

		builder.addCase(fetchProjectActivities.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchProjectActivities.fulfilled, (state, action) => {
			state.activities = action.payload
			state.loading = false
		})
		builder.addCase(fetchProjectActivities.rejected, (state) => {
			state.loading = false
		})

		builder.addCase(fetchProjectMedia.pending, (state) => {
			state.loading = true
			state.media = []
		})
		builder.addCase(fetchProjectMedia.fulfilled, (state, action) => {
			typeof action.payload !== "string" && (state.media = action.payload)
			state.loading = false
		})
		builder.addCase(fetchProjectMedia.rejected, (state) => {
			state.loading = false
		})
	},
})

const fetchSingleProject = createAsyncThunk(
	"singleProject",
	async (id: string) => {
		const { data } = await projectApi.getSingleProject(id)
		return data
	}
)

const fetchProjectReviews = createAsyncThunk(
	"projectReviews",
	async (id: string) => {
		const { data } = await projectApi.getProjectReviews(id)
		return data
	}
)

const fetchProjectActivities = createAsyncThunk(
	"projectActivities",
	async (id: string) => {
		const { data } = await projectApi.getProjectActivity(id)
		return data
	}
)

const fetchProjectMedia = createAsyncThunk(
	"projectMedia",
	async (id: string) => {
		const { data } = await projectApi.getProjectMedia(id)
		return data
	}
)

export const projectSelector = (state: RootState) => state.project

export {
	fetchSingleProject,
	fetchProjectActivities,
	fetchProjectReviews,
	fetchProjectMedia,
}
export const { update_project } = projectSlice.actions
export default projectSlice.reducer
