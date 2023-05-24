/** @format */

import React, { FC, SyntheticEvent } from "react"
import citizensAssets from "@/public/assets/SVG/citizens"
import * as generalAssets from "@/public/assets/SVG/general"
import styles from "@/styles/projectInfo.module.scss"
import moment from "moment"
import { projectStatus, status_color } from "@/constants/general/defaults"
import TextPrimary from "../shared/textPrimary"
import Image from "next/image"
import { textElementType } from "@/@types/components/general.types"
import { projectInfoPropType } from "@/@types/components/projects.types"
import {
	getAverageSentiment,
	shortenCurrency,
	notCitizen,
	getDateDifference,
	generateStateString,
} from "@/helpers/general.helpers"
import { EyeMarkButton } from "../shared/buttons/eyeMarkButton"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"
import { useRouter } from "next/router"

const ProjectInfo: FC<projectInfoPropType> = ({
	name,
	geolocations,
	status,
	total_project_cost,
	sentiments,
	start_date,
	end_date,
	public_id,
	thisProject,
	fromPost,
	fromMap,
	MDAUpdate,
}) => {
	const { push } = useRouter()
	const handleProjectClick = (e: SyntheticEvent<HTMLDivElement>) => {
		e.stopPropagation()

		push(`${generalRoutes.project}/${public_id}`)
	}

	return (
		<div
			className={`
			 bg-white rounded-lg p-4 lg:p-6 cursor-pointer w-full
				${fromPost && "hover:bg-grey-white p-4 transition duration-300 ease-in-out"}
			`}
			onClick={handleProjectClick}
		>
			<div className="lg:hidden items-center justify-end space-x-1 flex">
				<p className={styles["project-tag-text"]}>Project</p>
				<Image
					width="20%"
					height="20%"
					src={generalAssets["eyeMarkBlack"]}
					alt="eyemark"
					className="h-2"
				/>
			</div>

			<div className="flex justify-between items-start w-full">
				<div className="flex items-center w-full sm:space-x-4 lg:w-9/12 ">
					<div className="lg:w-[10%] w-[20%]">
						<Image
							width={32}
							height={32}
							src={citizensAssets["Folder"]}
							alt="project"
							className="hidden sm:block"
						/>
					</div>
					<div className="overflow-hidden w-[90%]">
						<h4
							title={name}
							className="text-xs w-11/12 whitespace-nowrap truncate font-bold"
						>
							{name}
						</h4>
						<div className={styles["project-detail"]}>
							<div className={styles["began"]}>
								{moment(start_date).fromNow() !==
									"Invalid date" &&
									`Started ${moment(start_date).fromNow()}`}
							</div>
							<div className={styles["location"]}>•</div>

							<div
								className={`${styles["location"]} uppercase max-w-4/12 truncate`}
							>
								{generateStateString(geolocations)}
							</div>
							<div className={styles["location"]}>•</div>
							<div className="flex items-center">
								<TextPrimary
									className={styles["status-tag"]}
									translation="project"
									elementType={textElementType.Span}
								>
									status
								</TextPrimary>
								<p
									className={`pl-1 ${styles["status"]} ${status_color[status]}`}
								>
									{status ? projectStatus[status] : "-"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="lg:flex items-center hidden">
					<p className={`${styles["project-tag-text"]} pr-1`}>
						Project
					</p>
					<Image
						width="10%"
						height="10%"
						src={generalAssets["eyeMarkBlack"]}
						alt="eyemark"
					/>
				</div>
			</div>

			<div className="flex items-center justify-between mt-8">
				<div className="flex xl:space-x-5 sm:space-x-5 space-x-3">
					<div className={styles["insight-group"]}>
						<TextPrimary
							className={`${
								fromPost ? "text-[10px]" : "text-[8px]"
							} ${styles["insight-title"]}`}
							translation="project"
						>
							contract_amount
						</TextPrimary>
						<h5
							className={`${
								fromPost
									? "leading-[17px] mt-2 text-sm"
									: "leading-[12px] text-[10px] mt-1"
							} ${styles["insight"]}`}
						>
							{shortenCurrency(total_project_cost)}
						</h5>
					</div>
					<div
						className={`${styles["insight-group"]} hidden ${
							!fromMap && "lg:block"
						}`}
					>
						<TextPrimary
							className={`${
								fromPost ? "text-[10px]" : "text-[8px]"
							} ${styles["insight-title"]}`}
							translation="project"
						>
							timeline
						</TextPrimary>
						<h5
							className={`${
								fromPost
									? "leading-[17px] mt-2 text-sm"
									: "leading-[12px] text-[10px] mt-1"
							} ${styles["insight"]}`}
						>
							{end_date
								? getDateDifference(end_date, start_date)
								: "Unavailable"}
						</h5>
					</div>
					<div
						className={`${styles["insight-group"]} ${
							!fromPost && "hidden"
						}`}
					>
						<TextPrimary
							className={`${
								fromPost ? "text-[10px]" : "text-[8px]"
							} ${styles["insight-title"]}`}
							translation="project"
						>
							avg_sentiment
						</TextPrimary>

						<h5
							className={`${`${
								fromPost
									? "leading-[17px] mt-2 text-sm"
									: "leading-[12px] text-[10px] mt-1"
							} ${styles["insight"]}`} capitalize`}
						>
							{getAverageSentiment(sentiments)}
						</h5>
					</div>
				</div>
				<div
					className={
						fromPost ? "lg:w-3/12 w-4/12" : "lg:w-4/12 w-[30%]"
					}
				>
					{(!MDAUpdate || !notCitizen() || fromPost) && (
						<EyeMarkButton
							projectName={name}
							projectId={public_id}
							className="w-full sm:text-xs"
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectInfo
