/** @format */

import { distanceNumbers, statesKey } from "@/@types/components/general.types"
import { projectType } from "@/@types/components/projects.types"
import projectApi from "@/api/project.api"
import { genQuery } from "@/helpers/categories.helpers"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."
import { setActiveTag } from "./filter.slice"

const initialState = {
	discussedProjects: [],
	nearingCompletion: [],
	popularReviews: [],
	projectsAround: { results: [] as projectType[], count: 0 },
	loading: false,
	mapLoading: false,
	projectSource: "location",
	distance: 10000 as distanceNumbers,
	state: "" as statesKey,
	changingProjectSource: false,
	navOpen: false,
	location: null as any,
	locationFailed: false,
	tags: [] as string[],
	discoverProjects: { results: [] as projectType[], count: 0 },
}

export const initialDiscoverState = initialState

export const discoverSlice = createSlice({
	name: "discover",
	initialState,
	reducers: {
		allowMap: (state) => {
			state.mapLoading = true
		},
		stopMapLoading: (state) => {
			state.mapLoading = false
		},
		usingLocation: (state) => {
			state.projectSource = "location"
		},
		usingState: (state, { payload }) => {
			state.changingProjectSource = true
			state.projectSource = "state"
			typeof payload === "string" && (state.state = payload as statesKey)
		},
		setDistance: (state, action) => {
			state.distance = action.payload
		},
		toggleNav: (state) => {
			state.navOpen = !state.navOpen
		},
		setLocation: (state, { payload }) => {
			state.location = payload
		},
		setLocationFailed: (state, { payload }) => {
			state.locationFailed = payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDiscussedProjects.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(fetchDiscussedProjects.fulfilled, (state, action) => {
			state.discussedProjects = action.payload
			state.loading = false
		})
		builder.addCase(fetchDiscussedProjects.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(fetchNearingCompletion.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(fetchNearingCompletion.fulfilled, (state, action) => {
			state.nearingCompletion = action.payload
			state.loading = false
		})
		builder.addCase(fetchNearingCompletion.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(fetchPopularReviews.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(fetchPopularReviews.fulfilled, (state, action) => {
			state.popularReviews = action.payload
			state.loading = false
		})
		builder.addCase(fetchPopularReviews.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(fetchProjectsAround.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(fetchProjectsAround.fulfilled, (state, action) => {
			state.projectsAround = action.payload
			state.discoverProjects = action.payload
			state.loading = false
			state.mapLoading = false
			state.changingProjectSource = false
			state.projectSource = "location"
		})
		builder.addCase(fetchProjectsAround.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(showFromState.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(showFromState.fulfilled, (state, action) => {
			state.projectSource = "state"
			state.projectsAround = action.payload
			state.discoverProjects = action.payload
			state.locationFailed = false
			state.loading = false
			state.mapLoading = false
			state.changingProjectSource = false
		})
		builder.addCase(showFromState.rejected, (state, action) => {
			state.loading = false
		})
		builder.addCase(fetchProjectTags.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchProjectTags.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(fetchProjectTags.fulfilled, (state, { payload }) => {
			state.loading = false
			state.tags = payload
		})
		builder.addCase(fetchDiscoverProjects.pending, (state) => {
			state.loading = true
		})
		builder.addCase(
			fetchDiscoverProjects.fulfilled,
			(state, { payload }) => {
				state.loading = false
				state.discoverProjects = payload
			}
		)
		builder.addCase(fetchDiscoverProjects.rejected, (state) => {
			state.loading = false
		})
	},
})

const fetchProjectsAround = createAsyncThunk(
	"fetchProjectsAround",
	async (
		payload: {
			location: { lng: number; lat: number }
			dist?: string
		},
		{ dispatch }
	) => {
		try {
			const query = genQuery(true)
			const {
				location: { lat, lng },
				dist,
			} = payload
			const point = `${lng},${lat}`
			const { data } = await projectApi.getProjectByLocation(
				point,
				dist,
				query
			)
			dispatch(setActiveTag("aroundMe"))
			return data
		} catch (error) {}
	}
)

const showFromState = createAsyncThunk(
	"showFromState",
	async (payload: string, { dispatch }) => {
		try {
			const query = genQuery(true)
			const { data } = await projectApi.getProjectsFromCategory(
				`&state=${payload}${query}`
			)
			dispatch(setActiveTag("aroundMe"))
			return data
		} catch (error) {}
	}
)

const fetchDiscussedProjects = createAsyncThunk(
	"fetchDiscussedProjects",
	async () => {
		try {
			const { data } = await projectApi.getMostDiscussed()
			return data
		} catch (error) {}
	}
)

const fetchNearingCompletion = createAsyncThunk(
	"fetchNearingCompletion",
	async () => {
		try {
			const { data } = await projectApi.getNearingCompletion()
			return data
		} catch (error) {}
	}
)

const fetchPopularReviews = createAsyncThunk(
	"fetchPopularReviews",
	async () => {
		try {
			const { data } = await projectApi.getPopularReviews()
			return data
		} catch (error) {}
	}
)
const fetchProjectTags = createAsyncThunk("fetchProjectTags", async () => {
	try {
		const { data } = await projectApi.getProjectTags()
		return data
	} catch (error) {
		throw error
	}
})

const fetchDiscoverProjects = createAsyncThunk(
	"fetchDiscoverProjects",
	async () => {
		try {
			const query = genQuery()
			const { data } = await projectApi.getProjectsFromCategory(query, 1)
			return data
		} catch (error) {
			throw error
		}
	}
)

export const discoverSelector = (state: RootState) => state.discover

export const {
	allowMap,
	stopMapLoading,
	usingLocation,
	usingState,
	setDistance,
	setLocation,
	toggleNav,
	setLocationFailed,
} = discoverSlice.actions
export {
	fetchNearingCompletion,
	fetchPopularReviews,
	fetchDiscussedProjects,
	fetchProjectsAround,
	showFromState,
	fetchProjectTags,
	fetchDiscoverProjects,
}
export default discoverSlice.reducer
