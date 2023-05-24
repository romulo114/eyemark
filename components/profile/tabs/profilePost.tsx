import { projectReview } from "@/@types/components/projects.types"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { noProfilePostContent } from "@/constants/general/noContent"
import { notCitizen } from "@/helpers/general.helpers"
import { useAppSelector } from "@/hooks/redux.hooks"
import { profileSelector } from "@/store/slices/profile.slice"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import ProjectReview from "../../project/projectReview"
import ProjectUpdate from "../../project/projectUpdate"
import UpdateReview from "../../project/updateReview"
import NoContent from "../../shared/noContent"
import Paginator from "../../shared/paginator"

const ProfilePosts: FC<{ thirdParty: boolean }> = ({ thirdParty }) => {
	const {
		posts,
		loading,
		user: { display_name, account_type },
	} = useAppSelector(profileSelector)
	const [selectedPage, setSelectedPage] = useState(0)
	const { push } = useRouter()

	const handlePageClick = async (data: any) => {
		setSelectedPage(data.selected)
	}

	const goHome = () => push(citizensRoutes.dashboard)

	const resolver = (feed: projectReview, i: number) => {
		const typeOfPost = feed?.type_of_post
		const parentTypeOfPost = feed?.parent?.type_of_post
		const parent = feed?.parent

		if (typeOfPost === "REVIEW" && parentTypeOfPost === "UPDATE") {
			return <UpdateReview key={i} {...feed} />
		} else if (typeOfPost === "REVIEW" && parentTypeOfPost === "REVIEW") {
			return <ProjectReview key={i} {...feed} />
		} else if (typeOfPost === "UPDATE") {
			return <ProjectUpdate key={i} review={feed} />
		} else if (typeOfPost === "REVIEW" && parent === null) {
			return <ProjectReview key={i} {...feed} />
		} else {
			return <></>
		}
	}

	return (
		<div
			className={`lg:px-14 sm:px-4 flex-grow pb-12 h-full ${
				posts?.results?.length < 1 &&
				"flex flex-col items-center justify-center py-10 lg:py-0"
			}`}
		>
			{posts?.count >= 1
				? posts?.results.map((feed, i) => {
						return resolver(feed, i)
				  })
				: !loading && (
						<NoContent
							onClick={goHome}
							{...noProfilePostContent(
								thirdParty ? display_name : undefined,
								thirdParty && notCitizen(account_type)
							)}
						/>
				  )}

			{posts.count > 1 && (
				<Paginator
					count={posts.count}
					click={handlePageClick}
					selected={selectedPage}
				/>
			)}
		</div>
	)
}

export default ProfilePosts
