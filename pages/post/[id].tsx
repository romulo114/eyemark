import { projectReview } from "@/@types/components/projects.types"
import AppLayout from "@/components/layouts/appLayout"
import NestedReview from "@/components/project/nestedReview"
import ProjectReview from "@/components/project/projectReview"
import ProjectUpdate from "@/components/project/projectUpdate"
import UpdateReview from "@/components/project/updateReview"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { arrowBack } from "@/public/assets/SVG/general"
import {
	fetchPostReviews,
	getPost,
	postsSelector,
} from "@/store/slices/post.slice"
import { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"

const PostInView: NextPage = () => {
	const dispatch = useAppDispatch()
	const { postInView, reviews } = useAppSelector(postsSelector)
	const {
		query: { id },
		back,
	} = useRouter()

	useEffect(() => {
		if (id) {
			dispatch(getPost(id as string))
			dispatch(fetchPostReviews(id as string))
		}
	}, [id])

	const resolver = (feed: projectReview) => {
		const typeOfPost = feed?.type_of_post
		const parentTypeOfPost = feed?.parent?.type_of_post
		const parent = feed?.parent
		const id = feed?.public_id

		if (typeOfPost === "REVIEW" && parentTypeOfPost === "UPDATE") {
			return <UpdateReview key={id} {...feed} />
		} else if (typeOfPost === "REVIEW" && parentTypeOfPost === "REVIEW") {
			return <ProjectReview key={id} {...feed} />
		} else if (typeOfPost === "UPDATE") {
			return <ProjectUpdate key={id} review={feed} fromActivity />
		} else if (typeOfPost === "REVIEW" && parent === null) {
			return <ProjectReview key={id} {...feed} />
		} else if (typeOfPost === "COMMENT") {
			return <UpdateReview key={id} {...feed} />
		} else {
			return <></>
		}
	}
	return (
		<AppLayout>
			<Head>
				<title>{`Eyemark  - Post In View`}</title>
			</Head>
			<div className="top-bar mb-12">
				<button className="absolute top-7 left-6" onClick={back}>
					<Image src={arrowBack} alt="back" />
				</button>

				<p className="text-center">Post in view</p>
			</div>
			{resolver(postInView)}
			<div className="pr-2 sm:pr-0">
				{reviews?.map((review, id) => (
					<NestedReview key={id} {...review} />
				))}
			</div>
		</AppLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { locale } = context

	return {
		props: {
			...(await serverSideTranslations(locale, [
				"leftSidebar",
				"rightSidebar",
				"discover",
				"project",
				"login",
			])),
		},
	}
}

export default PostInView
