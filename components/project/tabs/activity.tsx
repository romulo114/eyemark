/** @format */

import { noActivityContent } from "@/constants/general/noContent"
import { getAverageSentiment } from "@/helpers/general.helpers"
import { useAppSelector } from "@/hooks/redux.hooks"
import { projectSelector } from "@/store/slices/project.slice"
import moment from "moment"
import { FC } from "react"
import NoContent from "../../shared/noContent"
import MilestoneUpdate from "../mileStoneUpdate"
import ProjectUpdate from "../projectUpdate"

export const ProjectActivities: FC<{ back?: () => void }> = ({ back }) => {
	const { activities } = useAppSelector(projectSelector)
	return (
		<div
			className={`px-3 pb-8  h-full`}
			data-testid="project-tab_activity_content"
		>
			{typeof activities[0] !== "string" && (
				<div className="flex flex-shrink  items-center w-full flex-col ">
					{activities.map((activity) => (
						<div
							key={activity?.public_id}
							className="flex sm:space-x-3 w-full"
						>
							{activity?.type_of_post === "5" ||
							activity?.type_of_post === "MILESTONE_UPDATE" ? (
								<MilestoneUpdate
									created={moment(
										activity?.created
									).fromNow()}
									title={activity?.title}
									body={activity?.body}
									project={activity?.project}
									name={activity?.owner?.display_name}
									avgSentiment={getAverageSentiment(
										activity?.sentiments
									)}
									accountType={activity?.owner?.account_type}
									sentiments={activity?.sentiments}
								/>
							) : (
								<ProjectUpdate review={activity} fromActivity />
							)}
						</div>
					))}
				</div>
			)}
			{(activities.length === 0 || typeof activities[0] === "string") && (
				<div className="flex items-center justify-center h-full">
					<NoContent {...noActivityContent} onClick={back} />
				</div>
			)}
		</div>
	)
}

export default ProjectActivities
