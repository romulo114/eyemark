/** @format */

import { FC } from "react"
import TextPrimary from "../shared/textPrimary"
import ProjectInfo from "../discover/projectInfo"
import { ProjectMileStonePropType } from "@/@types/components/projects.types"
import Image from "next/image"
import style from "@/styles/projectPage.module.scss"
import projectAssets from "@/public/assets/SVG/project"
import * as generalAssets from "@/public/assets/SVG/general"

const MilestoneUpdate: FC<ProjectMileStonePropType> = ({
	name,
	title,
	created,
	body,
	project,
	sentiments,
	comments,
	votes,
	avgSentiment,
	accountType,
}) => {
	const upvotes = votes?.upvotes
	const downvotes = votes?.downvotes

	return (
		<div className="flex mb-5 sm:mb-10">
			<div className={style["milestone-card"]}>
				<div className="author-details-group">
					<div className={style["profile-and-date"]}>
						<div className="w-1/2">
							<Image src={generalAssets["mdaLogo"]} alt="" />
						</div>
						<div className="sm:w-7/12">
							<h4 className={style["author-name"]}>{name}</h4>
							<div className={style["update-detail"]}>
								<TextPrimary className={style["posted"]}>
									{created!}
								</TextPrimary>
							</div>
						</div>
					</div>
					<div className="items-center space-x-1 hidden sm:flex">
						<TextPrimary className="project-tag-text">
							{accountType!}
						</TextPrimary>
						<TextPrimary className="project-tag-text">
							💼
						</TextPrimary>
						<Image
							src={generalAssets["eyeMarkBlack"]}
							alt=""
							className="h-2 hidden"
						/>
					</div>
				</div>
				<div className="mt-3">
					<TextPrimary className="post-title">{title!}</TextPrimary>
					<TextPrimary className="mt-2 text-xs">{body!}</TextPrimary>
				</div>
				<div>
					<div className="mt-4 rounded-lg border border-grey-stroke">
						<ProjectInfo {...project!} />
					</div>
					<TextPrimary className="view-project">
						View Project
					</TextPrimary>
				</div>

				<div className="flex justify-between text-xs mt-4">
					<div className="xl:flex xl:w-5/12 lg:w-4/12 space-x-1 items-center hidden average-reaction">
						<TextPrimary className="text-complete">
							{
								(upvotes?.count &&
									downvotes?.count &&
									upvotes?.count + downvotes?.count)!
							}
						</TextPrimary>
						<div className="flex items-center">
							{upvotes?.votes?.map((vote, index) => (
								<Image
									key={vote?.user?.public_id}
									src={vote?.user?.avatar}
									width="100%"
									height="100%"
									alt=""
									className={
										index > 0
											? "feedback-avatars -ml-1.5"
											: "feedback-avatars"
									}
								/>
							))}
						</div>
						<TextPrimary className="text-light-grey-2 medium">
							{avgSentiment!}
						</TextPrimary>
					</div>
					<div className="citizens-reaction">
						<TextPrimary className="text-input-border">
							😁 {sentiments?.excited!}
						</TextPrimary>
						<TextPrimary className="text-golden-brown">
							😠 {sentiments?.angry!}
						</TextPrimary>
						<TextPrimary className="text-abandoned">
							🙂 {sentiments?.hopeful!}
						</TextPrimary>
					</div>
					<div className="flex lg:w-4/12 lg:justify-end space-x-2">
						<div className="flex items-center space-x-1">
							<Image
								src={projectAssets["commentWithDots"]}
								alt="comment"
								className="h-4"
							/>
							<TextPrimary className="users-comments">
								{comments!}
							</TextPrimary>
						</div>
						<Image
							src={projectAssets["more"]}
							alt=""
							className="h-4 mb-1"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MilestoneUpdate
