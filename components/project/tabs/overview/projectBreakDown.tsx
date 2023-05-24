import { FC } from "react"
import projectAssets from "@/public/assets/SVG/project"
import styles from "@/styles/projectPage.module.scss"
import { projectStatus } from "@/constants/general/defaults"
import "react-circular-progressbar/dist/styles.css"
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar"
import Image from "next/image"
import { useAppSelector } from "@/hooks/redux.hooks"
import { projectSelector } from "@/store/slices/project.slice"
import { getDateDifference, shortenCurrency } from "@/helpers/general.helpers"
import moment from "moment"
import AppropriationCard from "../../appropriationCard"

const ProjectBreakDown: FC = () => {
	const { project } = useAppSelector(projectSelector)
	const {
		total_amount_utilized,
		start_date,
		end_date,
		status,
		total_appropriation,
		total_project_cost,
		child_projects,
		views,
		percentage_completed,
		yearly_appropriation,
	} = project
	return (
		<div className={styles["project-info-cards"]}>
			<div className="flex flex-col lg:flex-row w-full lg:space-x-2">
				<div className="bg-white rounded-lg p-4 mb-2 flex justify-between items-center w-full lg:w-6/12">
					<div className="flex flex-col justify-between w-5/12">
						<div>
							<p className="text-2xl capitalize medium">
								{projectStatus[status]}
							</p>
							<p className={styles["project-info-card-title"]}>
								PROJECT STATUS
							</p>
						</div>
					</div>
					<div className="w-6/12 flex flex-col justify-center">
						<CircularProgressbarWithChildren
							styles={buildStyles({
								pathColor: `#61B684`,
							})}
							value={percentage_completed || 0}
							strokeWidth={6}
						>
							<p
								className=""
								data-testid="project-percentage_completed"
							>
								{percentage_completed || 0}%
							</p>
							<p className="text-2-xs text-input-border uppercase">
								completed
							</p>
						</CircularProgressbarWithChildren>
					</div>
				</div>
				<div className="w-full lg:w-6/12 mb-2">
					<div className="flex space-x-2 h-1/2">
						<div className="w-6/12">
							<div
								className={`${styles["project-info-card"]} h-full`}
							>
								<Image
									src={projectAssets["ProjectCost"]}
									alt="Eyemark"
									className="mb-6"
								/>
								<div>
									<p
										className={`${styles["project-info-card-content"]} uppercase`}
										data-testid="project-total_project_cost"
									>
										{shortenCurrency(total_project_cost)}
									</p>
									<p
										className={
											styles["project-info-card-title"]
										}
									>
										TOTAL PROJECT COST
									</p>
								</div>
							</div>
						</div>
						<div className="w-6/12">
							<div
								className={`${styles["project-info-card"]} h-full`}
							>
								<Image
									src={projectAssets["Timeline"]}
									alt="Eyemark"
									className="mb-6"
								/>
								<div>
									<p
										className={
											styles["project-info-card-content"]
										}
										data-testid="project-timeline"
									>
										{end_date && start_date
											? getDateDifference(
													end_date,
													start_date
											  )
											: "-"}
									</p>
									<p
										className={
											styles["project-info-card-title"]
										}
									>
										PROJECT TIMELINE
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex space-x-2 h-1/2 pt-2">
						<div className="w-6/12">
							<div
								className={`${styles["project-info-card"]} h-full`}
							>
								<Image
									src={projectAssets["StartDate"]}
									alt="Eyemark"
									className="mb-6"
								/>
								<div>
									<p
										className={`${styles["project-info-card-content"]} `}
										data-testid="project-start_date"
									>
										{start_date
											? moment(start_date).format(
													"Do MMM YYYY"
											  )
											: "-"}
									</p>
									<p
										className={
											styles["project-info-card-title"]
										}
									>
										START DATE
									</p>
								</div>
							</div>
						</div>
						<div className="w-6/12">
							<div
								className={`${styles["project-info-card"]} h-full`}
							>
								<Image
									src={projectAssets["EndDate"]}
									alt="Eyemark"
									className="mb-6"
								/>
								<div>
									<p
										className={`${styles["project-info-card-content"]} `}
										data-testid="project-end_date"
									>
										{end_date
											? moment(end_date).format(
													"Do MMM YYYY"
											  )
											: "-"}
									</p>
									<p
										className={
											styles["project-info-card-title"]
										}
									>
										END DATE
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row w-full lg:space-x-2">
				<div className="flex mb-2 w-full lg:w-6/12 space-x-2">
					<div className="w-6/12">
						<div
							className={`${styles["project-info-card"]} relative`}
						>
							<div className="mb-6 flex justify-between items-center w-full">
								<Image
									src={projectAssets["Appropriated"]}
									alt="appropriated"
								/>
								<AppropriationCard
									appropriation={yearly_appropriation}
									total={total_appropriation}
								/>
							</div>
							<div>
								<p
									className={`${styles["project-info-card-content"]} uppercase`}
									data-testid="project-total_appropriated"
								>
									{shortenCurrency(total_appropriation)}
								</p>
								<p
									className={
										styles["project-info-card-title"]
									}
								>
									TOTAL APPROPRIATED
								</p>
							</div>
						</div>
					</div>
					<div className="w-6/12">
						<div className={styles["project-info-card"]}>
							<Image
								src={projectAssets["AmountSpent"]}
								alt="spent"
								className="mb-6"
							/>
							<div>
								<p
									className={`${styles["project-info-card-content"]} uppercase`}
									data-testid="project-amount_spent_so_far"
								>
									{shortenCurrency(total_amount_utilized)}
								</p>
								<p
									className={
										styles["project-info-card-title"]
									}
								>
									AMOUNT SPENT SO FAR
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex mb-2 w-full lg:w-6/12 space-x-2">
					<div className="w-6/12">
						<div className={styles["project-info-card"]}>
							<Image
								src={projectAssets["ChildrenProject"]}
								alt="children"
								className="mb-6"
							/>
							<div>
								<p
									className={
										styles["project-info-card-content"]
									}
									data-testid="project-shildren_project"
								>
									{child_projects?.length &&
									child_projects[0]?.name
										? child_projects?.length &&
										  child_projects[0]?.name
										: "None"}
								</p>
								<p
									className={
										styles["project-info-card-title"]
									}
								>
									CHILDREN PROJECT
								</p>
							</div>
						</div>
					</div>
					<div className="w-6/12">
						<div className={styles["project-info-card"]}>
							<Image
								src={projectAssets["PageViews"]}
								alt="page-views"
								className="mb-6"
							/>
							<div>
								<p
									className={
										styles["project-info-card-content"]
									}
									data-testid="project-page_views"
								>
									{views}
								</p>
								<p
									className={
										styles["project-info-card-title"]
									}
								>
									PAGE VIEWS
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectBreakDown
