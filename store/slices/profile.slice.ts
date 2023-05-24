import { ownerType } from "@/@types/components/discover.types"
import { projectMedia, projectType } from "@/@types/components/projects.types"
import projectApi from "@/api/project.api"
import userApi from "@/api/users.api"
import { notCitizen } from "@/helpers/general.helpers"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."

const initialState = {
	posts: { results: [], count: 0 },
	media: [] as projectMedia[],
	eyemarked: [] as projectType[],
	followers: [],
	survey: [],
	user: {} as ownerType,
	projects: { results: [], count: 0 },
	loading: false,
}

export const initialUserProfileState = initialState

export const userProfileSlice = createSlice({
	name: "userProfile",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUserPosts.pending, (state, action) => {
			state.loading = true
			state.posts = { results: [], count: 0 }
		})
		builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
			state.loading = false
			state.posts = action.payload
		})
		builder.addCase(fetchUserPosts.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(fetchUserMedia.pending, (state, action) => {
			state.loading = true
			state.media = []
		})
		builder.addCase(fetchUserMedia.fulfilled, (state, action) => {
			state.loading = false
			state.media = action.payload
		})
		builder.addCase(fetchUserMedia.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(fetchUserEyemarked.pending, (state, action) => {
			state.loading = true
			state.eyemarked = []
			state.projects = { results: [], count: 0 }
		})
		builder.addCase(fetchUserEyemarked.fulfilled, (state, action) => {
			state.loading = false
			state.eyemarked = action.payload
		})
		builder.addCase(fetchUserEyemarked.rejected, (state, action) => {
			state.loading = false
		})
		builder.addCase(fetchProjects.pending, (state, action) => {
			state.loading = true
			state.projects = { results: [], count: 0 }
			state.eyemarked = []
		})
		builder.addCase(fetchProjects.fulfilled, (state, action) => {
			state.loading = false
			state.projects = action.payload
		})
		builder.addCase(fetchProjects.rejected, (state, action) => {
			state.loading = false
		})
		builder.addCase(fetchUserDetails.pending, (state, action) => {
			state.loading = true
			state.user = {} as ownerType
		})
		builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
			state.loading = false
			state.user = action.payload
		})
		builder.addCase(fetchUserDetails.rejected, (state, action) => {
			state.loading = false
		})
	},
})

const fetchUserPosts = createAsyncThunk(
	"userPosts",
	async (payload: string) => {
		const { data } = await userApi.getUserFeed(payload)
		return data
	}
)

const fetchUserMedia = createAsyncThunk(
	"userMedia",
	async (payload?: string) => {
		const { data } = payload
			? await userApi.getProfileMedia(payload)
			: await userApi.getUserMedia()
		return data
	}
)

const fetchUserEyemarked = createAsyncThunk(
	"eyemarked",
	async (payload: string) => {
		const { data } = await userApi.getProfileEyeMarks(payload)
		return data?.length ? data[0]?.projects : []
	}
)

const fetchProjects = createAsyncThunk(
	"projects",
	async (payload: {
		username: string
		account_type: string
		page?: number
	}) => {
		const { username, account_type, page } = payload
		const query = `&${
			account_type === "CONTRACTOR" ? "contractor" : "ministry"
		}=${username}`
		const { data } = await projectApi.getProjectsFromCategory(query, page)
		return data
	}
)

const fetchUserDetails = createAsyncThunk(
	"user-details",
	async (payload: string, { dispatch }) => {
		const { data } = await userApi.getUserDetails(
			payload.split(" ").join("+")
		)
		const { account_type, public_id, username } = data
		dispatch(fetchUserMedia(public_id))
		notCitizen(account_type)
			? dispatch(fetchProjects({ account_type, username }))
			: dispatch(fetchUserEyemarked(username))
		dispatch(fetchUserPosts(username))
		return data
	}
)

export const profileSelector = (state: RootState) => state.profile

export {
	fetchUserPosts,
	fetchUserMedia,
	fetchUserEyemarked,
	fetchProjects,
	fetchUserDetails,
}
export default userProfileSlice.reducer
