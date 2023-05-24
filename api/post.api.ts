/** @format */

import { postApiInterface } from "@/@types/apiTypes/post.types"
import { privateInstance, formDataInstance } from "./instance"

const postApi: postApiInterface = {
	upVote: async (postId) =>
		await privateInstance.post(`/projects/posts/${postId}/upvote/`),
	downVote: async (postId) =>
		await privateInstance.post(`/projects/posts/${postId}/downvote/`),
	getPost: async (postId) =>
		await privateInstance.get(`/projects/posts/${postId}/`),
	getPostChildren: async (postId) =>
		await privateInstance.get(`/projects/posts/${postId}/children/`),
	postReview: async (data) =>
		await formDataInstance.post(`/projects/posts/review/`, data),
	postComment: async (data) =>
		await formDataInstance.post(`/projects/posts/comment/`, data),
	postUpdate: async (data) =>
		await formDataInstance.post(`/projects/posts/project-update/`, data),
}

export default postApi
