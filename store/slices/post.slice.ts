/** @format */

import { projectReview } from "@/@types/components/projects.types"
import postApi from "@/api/post.api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { RootState } from ".."

const initialState = {
	postInView: {} as projectReview,
	loading: false,
	postInViewID: "",
	reviews: [] as projectReview[],
}

export const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPostID: (state, action) => {
			state.postInViewID = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getPost.pending, (state, action) => {
			state.loading = true
			state.postInView = initialState.postInView
		})
		builder.addCase(getPost.fulfilled, (state, action) => {
			state.postInView = action.payload
			state.loading = false
		})
		builder.addCase(getPost.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(upVotePost.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(upVotePost.fulfilled, (state, action) => {
			state.loading = false
		})
		builder.addCase(upVotePost.rejected, (state, action) => {
			state.loading = false
		})
		builder.addCase(downVotePost.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(downVotePost.fulfilled, (state, action) => {
			state.loading = false
		})
		builder.addCase(downVotePost.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(postUserReview.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(postUserReview.fulfilled, (state, action) => {
			state.loading = false
		})
		builder.addCase(postUserReview.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(postProjectUpdate.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(
			postProjectUpdate.fulfilled || postProjectUpdate.rejected,
			(state, action) => {
				state.loading = false
			}
		)

		builder.addCase(fetchPostReviews.pending, (state, action) => {
			state.loading = true
			state.reviews = initialState.reviews
		})
		builder.addCase(fetchPostReviews.fulfilled, (state, action) => {
			state.reviews = action.payload
			state.loading = false
		})
		builder.addCase(fetchPostReviews.rejected, (state, action) => {
			state.loading = false
		})

		builder.addCase(commentOnReview.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(commentOnReview.fulfilled, (state, action) => {
			state.loading = false
		})
		builder.addCase(commentOnReview.rejected, (state, action) => {
			state.loading = false
		})
	},
})

const getPost = createAsyncThunk("postInView", async (post_id: string) => {
	try {
		const { data } = await postApi.getPost(post_id)
		return data
	} catch (error) {
		throw error
	}
})

const fetchPostReviews = createAsyncThunk(
	"fetchPostReviews",
	async (post_id: string) => {
		try {
			const { data } = await postApi.getPostChildren(post_id)
			return data.data
		} catch (error) {
			throw error
		}
	}
)

const upVotePost = createAsyncThunk("upvote", async (postId: string) => {
	try {
		const { data } = await postApi.upVote(postId)
		return data
	} catch (error) {
		throw error
	}
})

const downVotePost = createAsyncThunk("downvote", async (postId: string) => {
	try {
		const { data } = await postApi.downVote(postId)
		return data
	} catch (error) {}
})

const postUserReview = createAsyncThunk(
	"postUserReview",
	async (payload: { formData: FormData; cb?: () => void }) => {
		try {
			const { cb, formData } = payload
			const { data } = await postApi.postReview(formData)
			toast.success("Review Posted")
			cb && cb()
			return data
		} catch (error) {
			throw error
		}
	}
)

const commentOnReview = createAsyncThunk(
	"commentOnReview",
	async (payload: { formData: FormData; cb?: () => void }) => {
		try {
			const { formData, cb } = payload
			const { data } = await postApi.postComment(formData)
			toast.success("Review Posted")

			cb && cb()

			return data
		} catch (error) {
			throw error
		}
	}
)

const postProjectUpdate = createAsyncThunk(
	"postProjectUpdate",
	async (payload: { formData: FormData; cb?: () => void }) => {
		try {
			const { formData, cb } = payload
			const { data } = await postApi.postUpdate(formData)
			toast.success("Update Posted")
			if (cb) {
				await cb()
			}
			return data
		} catch (error) {
			throw error
		}
	}
)

export const postsSelector = (state: RootState) => state.post

export {
	getPost,
	upVotePost,
	downVotePost,
	postUserReview,
	postProjectUpdate,
	fetchPostReviews,
	commentOnReview,
}
export const { addPostID } = postSlice.actions

export default postSlice.reducer
