import {
	convertSentiments,
	getAverageSentiment,
} from "@/helpers/general.helpers"
import { FC } from "react"
import styles from "@/styles/projectPage.module.scss"
import { useAppSelector } from "@/hooks/redux.hooks"
import { projectSelector } from "@/store/slices/project.slice"
import Image from "next/image"
import { sentimentEmojis } from "@/constants/general/defaults"
import { sentimentString } from "@/@types/components/projects.types"

const ProjectOverviewReview: FC<{ seeMore: (value: number) => void }> = ({
	seeMore,
}) => {
	const { project } = useAppSelector(projectSelector)
	const { reviews_count, sentiments } = project
	return (
		<div className="mt-4">
			<div className="px-6">
				<div className={styles["project-overview-card"]}>
					<div className="flex justify-between">
						<p className="medium">Project Reviews </p>

						<div
							className={styles["see-all"]}
							onClick={() => seeMore(3)}
							data-testid="project-review_view_all"
						>
							view all
						</div>
					</div>
					<div className="mt-8 flex flex-col lg:flex-row lg:items-center">
						<div className="lg:w-5/12">
							<p className="uppercase medium text-input-border text-xs">
								general sentiment
							</p>
							{getAverageSentiment(sentiments) && (
								<div className="mt-2 flex items-center space-x-2">
									<Image
										src={
											sentimentEmojis[
												getAverageSentiment(
													sentiments
												).toLowerCase() as sentimentString
											]
										}
										width={24}
										height={24}
										className="h-6"
										alt="sentiment"
									/>
									<p className="text-xl medium capitalize">
										{getAverageSentiment(sentiments)}
									</p>
								</div>
							)}
							<p className="mt-2 text-2-xs text-light-grey-2">
								{reviews_count
									? reviews_count + " Reviews"
									: "No reviews yet"}
							</p>
						</div>
						<div className="w-full lg:w-7/12 flex flex-col space-y-2 mt-3 lg:mt-0">
							{convertSentiments(sentiments)?.map(
								(single, index) => (
									<div
										key={`${single.emoji}  ${index}`}
										className="flex items-center space-x-2 w-full text-xs"
									>
										<div className="flex items-center w-7/12 sm:w-4/12 justify-between">
											<p className="capitalize">
												{single.sentiment}
											</p>
											<Image
												src={single.emoji}
												width="15%"
												height="15%"
												className="h-4"
												alt="sentiment"
											/>
										</div>
										<div className="relative rounded-full bg-input-border h-1 w-7/12">
											<div
												className={styles["filler"]}
												style={{
													width: `${
														(single.total /
															reviews_count) *
														100
													}%`,
												}}
											/>
										</div>
										<p className="text-light-grey-2 text-right">
											{single.total}
										</p>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectOverviewReview
