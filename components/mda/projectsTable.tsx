import { projectsTableProps } from "@/@types/components/mda.types"
import { useAppSelector } from "@/hooks/redux.hooks"
import { mdaSelector } from "@/store/slices/mda.slice"
import citizenAsset from "@/public/assets/SVG/citizens"

import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { verified } from "@/public/assets/SVG/general"
import { shortenCurrency } from "@/helpers/general.helpers"
import moment from "moment"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"
import { status_classes } from "@/constants/general/defaults"
import { statusType } from "@/@types/app.types"

const ProjectsTable: FC<projectsTableProps> = ({ page }) => {
	const { loading, projects } = useAppSelector(mdaSelector)

	const tableHead = [
		{ name: "#", classname: "w-12 lg:pr-2" },
		{ name: "Name", classname: "w-11/12 sm:w-5/12 lg:w-4/12" },
		{ name: "Published", classname: "w-1/12 text-center sm:pr-2 truncate" },
		{
			name: "Code",
			classname: "w-4/12 sm:w-2/12 lg:w-1/12 text-center sm:pr-2",
		},
		{
			name: "Total Appropriation",
			classname: "w-3/12 sm:w-2/12 lg:w-1/12 text-center sm:pr-2",
		},
		{
			name: "Start Date",
			classname: "w-3/12 sm:w-2/12 lg:w-1/12 text-center sm:pr-2",
		},
		{
			name: "End Date",
			classname: "w-3/12 sm:w-2/12 lg:w-1/12 text-center sm:pr-2",
		},
		{ name: "Status", classname: "w-4/12 lg:w-2/12 text-center" },
	]

	return (
		<div className="pb-3 w-full overflow-x-auto lg:overflow-x-clip overflow relative">
			<div className="w-full flex justify-between items-center border-b border-light-grey-4">
				<div className="w-full py-4 flex justify-between items-center px-8">
					{tableHead.map(({ classname, name }) => (
						<div
							key={name}
							title={name}
							className={`${classname} flex-shrink-0 medium text-xs`}
						>
							{name}
						</div>
					))}
				</div>
			</div>
			<div className="text-xs">
				{!loading &&
					projects.results.map((project, index) => (
						<Link
							href={`${generalRoutes.project}/${project?.public_id}`}
							target="_blank"
							key={project?.public_id}
						>
							<a
								className={`flex items-center justify-between px-8 border-b border-light-grey-4 py-4 hover:bg-white transition duration-300 ease-in-out
								}`}
							>
								<div className="w-12 flex-shrink-0 lg:mr-2">
									<p>{index + 1 + page * 50}</p>
								</div>
								<div className="w-11/12 sm:w-5/12 lg:w-4/12 flex-shrink-0">
									<div className="flex items-center flex-shrink-0">
										<div className="flex-shrink-0">
											<Image
												src={citizenAsset["Folder"]}
												alt="folder"
												height={32}
												width={32}
											/>
										</div>
										<p
											title={project?.name}
											className="ml-2"
										>
											{project?.name &&
												`${project?.name?.slice(
													0,
													80
												)} ${
													project?.name?.length > 80
														? "..."
														: ""
												}`}
										</p>
									</div>
								</div>
								<div className="w-1/12 flex-shrink-0 text-center sm:mr-2">
									{project?.is_published && (
										<Image
											src={verified}
											className="mx-auto"
										/>
									)}
								</div>
								<div className="w-4/12 sm:w-2/12 lg:w-1/12 flex-shrink-0 sm:mr-2">
									<p className="truncate uppercase text-center">
										{project?.code}
									</p>
								</div>
								<div className="w-3/12 sm:w-2/12 lg:w-1/12 flex-shrink-0 sm:mr-2 text-center">
									<p className="text-center uppercase">
										{shortenCurrency(
											project?.total_appropriation
										)}
									</p>
								</div>
								<div className="w-3/12 sm:w-2/12 lg:w-1/12 flex-shrink-0 sm:mr-2 text-center">
									<p className="text-center">
										{moment(project?.start_date).format(
											"MMM YYYY"
										) === "Invalid date"
											? "-"
											: moment(
													project?.start_date
											  ).format("MMM YYYY")}
									</p>
								</div>
								<div className="w-3/12 sm:w-2/12 lg:w-1/12 flex-shrink-0 sm:mr-2 text-center">
									<p className="text-center">
										{moment(project?.end_date).format(
											"MMM YYYY"
										) === "Invalid date"
											? "-"
											: moment(project?.end_date).format(
													"MMM YYYY"
											  )}
									</p>
								</div>
								<div className="w-4/12 lg:w-2/12 flex justify-start flex-shrink-0">
									<span
										className={`bg-opacity-10 border-opacity-30 w-9/12 sm:w-6/12 lg:w-8/12 mx-auto py-1 rounded-full flex items-center justify-center text-center ${
											status_classes[
												project?.status as statusType
											]
										}`}
									>
										{project?.status}
									</span>
								</div>
							</a>
						</Link>
					))}
			</div>
		</div>
	)
}

export default ProjectsTable
