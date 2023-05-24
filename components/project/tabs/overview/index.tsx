/** @format */

import { useAppSelector } from "@/hooks/redux.hooks"
import { defaultContractor, defaultMda } from "@/public/assets/PNG"
import { projectSelector } from "@/store/slices/project.slice"
import Image from "next/image"
import { FC } from "react"
import styles from "@/styles/projectPage.module.scss"
import TextPrimary from "@/components/shared/textPrimary"
import ProjectUpdate from "../../projectUpdate"
import { generateStateString } from "@/helpers/general.helpers"
import { SDGImages, SDG_backgrounds } from "@/constants/general/defaults"
import { sentimentString } from "@/@types/components/projects.types"
import "react-circular-progressbar/dist/styles.css"
import {
	sdgBackgroundType,
	sdgImagesType,
} from "@/@types/components/general.types"
import dynamic from "next/dynamic"
import ProjectBreakDown from "./projectBreakDown"
import ProjectOverviewReview from "./projectReview"
import SeeAllStates from "../../seeAll"

const ProjectsMap = dynamic(() => import("@/components/shared/map"), {
	ssr: false,
})

const ProjectOverview: FC<{ seeMore: (index: number) => void }> = ({
	seeMore,
}) => {
	const { project, activities } = useAppSelector(projectSelector)
	const {
		sectors,
		name,
		description,
		owner,
		ministry,
		geolocations,
		code,
		sdgs,
		department,
		contractors,
	} = project

	return (
		<div className="flex-shrink-0">
			<TextPrimary
				className={`px-6 pb-24 hidden sm:block ${styles["project-name"]}`}
				data-testid="project-name"
			>
				{name || ""}
			</TextPrimary>
			<div className="flex items-start flex-wrap lg:flex-nowrap justify-between mb-7 px-6 mt-5">
				<div className="w-full lg:w-9/12">
					<div className="">
						<TextPrimary className="text-2-xs text-light-grey-2">
							{owner?.account_type || ""}
						</TextPrimary>
						<div className="mt-1">
							<TextPrimary className="text-2-xs uppercase text-input-border">
								SUPERVISING MDA
							</TextPrimary>
							{!!ministry && (
								<div
									className="flex items-center space-x-2 flex-shrink-0 mt-1 cursor-pointer"
									// onClick={() => (notCitizen ? null : toMinistries())}
								>
									<div className="h-6 w-6 sm:h-10 sm:w-10 rounded-full object-cover">
										<Image
											src={ministry?.avatar || defaultMda}
											height="100%"
											width="100%"
											alt={name}
											className="h-6 w-6 sm:h-10 sm:w-10 rounded-full object-cover"
										/>
									</div>
									<TextPrimary
										className="text-sm lg:text-lg medium"
										data-testid="project-display_name"
									>
										{ministry?.display_name}
									</TextPrimary>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="w-full sm:w-7/12 lg:w-3/12 flex-shrink-0 mt-4 lg:mt-0">
					<div className={styles["project-location-card"]}>
						<div className="flex items-center text-xs space-x-1">
							<p className="text-dark-grey medium">
								{geolocations?.length >= 2 ? (
									<span className="">
										<span className="capitalize">
											{geolocations[0]?.state}
										</span>
										<span className="text-light-grey-2">
											{` & ${
												geolocations?.length - 1
											} more`}
										</span>
									</span>
								) : (
									generateStateString(geolocations)
								)}
							</p>
						</div>
						<div className="flex items-center justify-between mt-4 text-2-xs">
							<TextPrimary className="uppercase medium text-input-border">
								STATES
							</TextPrimary>
							{geolocations?.length >= 2 && (
								<SeeAllStates locations={geolocations} />
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="lg:hidden px-6 mb-5">
				<div className="flex items-center space-x-3 py-5 border-b border-grey-stroke">
					<p className="text-accepted">•</p>
					<div>
						<p className="text-xs uppercase">{code}</p>
						<p className="text-input-border text-2-xs uppercase">
							project CODE
						</p>
					</div>
				</div>

				<div className="flex items-center space-x-3 py-5 border-b border-grey-stroke">
					<p className="text-accepted">•</p>
					<div>
						<p className="text-xs">
							{sectors &&
								sectors.map((sector, index) =>
									sectors.length > 1 &&
									index !== sectors.length - 1
										? sector + ", "
										: sector
								)}
						</p>
						<p className="text-input-border text-2-xs uppercase">
							SECTOR
						</p>
					</div>
				</div>

				<div className="flex items-center space-x-3 py-5">
					<p className="text-accepted">•</p>
					<div>
						<p className="text-xs">{department || "-"}</p>
						<p className="text-input-border text-2-xs uppercase">
							DEPARTMENT
						</p>
					</div>
				</div>
			</div>

			<ProjectBreakDown />

			<div className="px-6 text-dark-grey">
				<div className={styles["project-overview-card"]}>
					<h2 className="medium">Project Description</h2>
					<p className="text-input-border text-sm">
						Below explains what this project is all about.
					</p>
					<div className="mt-6 text-sm">
						<span
							className=""
							data-testid="project-description"
						>
							{description}
						</span>
					</div>
				</div>
			</div>

			<div className="mt-4 px-6">
				<div className={styles["project-overview-card"]}>
					<p className="medium">Contractors</p>
					<p className="text-input-border text-sm">
						Below are the contractors working on this project.
					</p>

					<div
						className="mt-6 flex items-center flex-wrap space-x-5 overflow-x-auto"
						data-testid="project-contractors"
					>
						{contractors?.map((contractor) => (
							<div
								key={contractor.display_name}
								className="bg-grey-white space-x-3 px-3 py-2 flex items-center rounded"
								// onClick={(e) => userprofile(e, contractor)}
							>
								<Image
									src={
										contractor?.avatar || defaultContractor
									}
									width={32}
									height={32}
									className="h-8"
									alt="contractor-avatar"
								/>
								<p className="text-sm medium">
									{contractor?.display_name}
								</p>{" "}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="mt-4 px-6">
				<div className={styles["project-overview-card"]}>
					<p className="medium">
						Sustainable Development Goals{" "}
						<span className="text-2-xs text-light-grey-5">
							({sdgs?.length})
						</span>
					</p>
					<p className="text-input-border text-sm">
						Below are the Sustainable Development Goals this project
						targets.
					</p>
					<div
						className="mt-3 flex flex-wrap items-center"
						data-testid="project-sustainable_development_goals"
					>
						{sdgs?.map((sdg, index) => (
							<div
								key={sdg + index}
								className={`
									${styles["project-sdg-cards"]}
									${
										SDG_backgrounds[
											sdg.toLowerCase() as sdgBackgroundType
										]
											? styles[
													SDG_backgrounds[
														sdg.toLowerCase() as sdgBackgroundType
													]
											  ]
											: styles["clean-energy"]
									}
								`}
							>
								<Image
									src={
										SDGImages[
											sdg.toLowerCase() as sdgImagesType
										]
									}
									className="h-4"
									alt="sdg"
								/>
								<p className="truncate">{sdg.toUpperCase()}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{geolocations?.length > 0 && (
				<div>
					<div className="mt-4 px-6">
						<div className={styles["project-overview-card"]}>
							<p className="medium mb-4">
								Project Location{" "}
								<span className="text-2-xs text-light-grey-5">
									{geolocations?.length}
								</span>
							</p>
							{geolocations && (
								<ProjectsMap mapLocation={[project]} />
							)}
						</div>
					</div>
				</div>
			)}

			<ProjectOverviewReview seeMore={seeMore} />

			{typeof activities[0] !== "string" && (
				<div className="pt-8 w-full">
					<div className="flex justify-between px-6">
						<p className="medium">
							Project Updates{" "}
							<span className="text-2-xs text-light-grey-5">
								({activities?.length})
							</span>
						</p>
						<div
							className={styles["see-all"]}
							onClick={() => seeMore(1)}
							data-testid="project-see_all"
						>
							see all
						</div>
					</div>

					<div className={styles["project-update-list"]}>
						{activities?.map((activity) => (
							<div
								key={activity.public_id}
								className="flex-shrink-0 w-full lg:w-9/12"
							>
								<ProjectUpdate review={activity} fromOverview />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
export default ProjectOverview
