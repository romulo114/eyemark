/** @format */

import { noProjectReviewContent } from "@/constants/general/noContent"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { projectSelector } from "@/store/slices/project.slice"
import { FC } from "react"
import NoContent from "../../shared/noContent"
import ProjectReviewNoReference from "../projectReviewNoReference"

const ProjectReviews: FC = () => {
	const dispatch = useAppDispatch()

	const { reviews, project } = useAppSelector(projectSelector)

	const createPost = () => {}
	return (
		<div
			className={`reviews-content px-4 flex-grow h-full ${
				reviews.length >= 1 &&
				"flex flex-col items-center justify-center"
			}`}
			data-testid="project-tab_reviews_content"
		>
			<div className="flex w-full flex-col">
				{reviews.map((review) => (
					<div key={review?.public_id} className="mb-6">
						<ProjectReviewNoReference
							{...review}
							projectId={project.public_id}
							fromProject
						/>
					</div>
				))}
			</div>

			{reviews.length === 0 && (
				<div className="flex items-center justify-center h-full">
					<NoContent
						onClick={createPost}
						{...noProjectReviewContent}
					/>
				</div>
			)}
		</div>
	)
}

export default ProjectReviews
