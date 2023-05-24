/** @format */

import { projectType } from "@/@types/components/projects.types"
import { genQuery } from "@/helpers/categories.helpers"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."
import projectApi from "../../api/project.api"

const initialState = {
	categories: {},
	loading: false,
	projects: { results: [] as projectType[], count: 0 },
	subCategoryData: {} as any,
}

export const categories = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setSubCategoryData: (state, action) => {
			state.subCategoryData = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.categories = action.payload
			state.loading = false
		})
		builder.addCase(fetchCategories.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(fetchCategoryProjects.pending, (state, action) => {
			state.loading = true
			state.projects = initialState.projects
		})
		builder.addCase(fetchCategoryProjects.fulfilled, (state, action) => {
			state.projects = action.payload
			state.loading = false
		})
		builder.addCase(fetchCategoryProjects.rejected, (state, action) => {
			state.loading = false
		})
	},
})

const fetchCategories = createAsyncThunk("fetchCategories", async () => {
	try {
		const response = await projectApi.getCategories()
		return response.data
	} catch (error: any) {
		throw error
	}
})

const fetchCategoryProjects = createAsyncThunk(
	"fetchCategoryProjects",
	async (
		payload: { page?: number; cb?: (data: boolean) => any },
		{ dispatch }
	) => {
		const { page, cb } = payload
		try {
			cb && dispatch(cb(true))
			const data = genQuery()
			const response: any = await projectApi.getProjectsFromCategory(
				data,
				page
			)
			cb && dispatch(cb(false))
			return response.data
		} catch (error: any) {
			cb && dispatch(cb(false))
			throw error
		}
	}
)

export const categoriesSelector = (state: RootState) => state.categories

export { fetchCategories, fetchCategoryProjects }

export const { setSubCategoryData } = categories.actions

export default categories.reducer
