/** @format */

import { AxiosResponse } from "axios"

interface postApiInterface {
	upVote: (postId: string) => Promise<AxiosResponse>
	downVote: (postId: string) => Promise<AxiosResponse>
	getPost: (postId: string) => Promise<AxiosResponse>
	getPostChildren: (postId: string) => Promise<AxiosResponse>
	postReview: (data: FormData) => Promise<AxiosResponse>
	postComment: (data: FormData) => Promise<AxiosResponse>
	postUpdate: (data: FormData) => Promise<AxiosResponse>
}

export type { postApiInterface }
