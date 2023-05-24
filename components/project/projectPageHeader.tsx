/** @format */

import { useAppSelector } from "@/hooks/redux.hooks"
import { projectSelector } from "@/store/slices/project.slice"
import { useRouter } from "next/router"
import { FC } from "react"
import Image from "next/image"
import { arrowBack } from "@/public/assets/SVG/general"
import projectAssets from "@/public/assets/SVG/project"
import styles from "@/styles/projectPage.module.scss"
import Share from "../shared/share"
import { ProjectDefault } from "@/public/assets/PNG"
import { getAverageSentiment } from "@/helpers/general.helpers"
import { EyeMarkButton } from "../shared/buttons/eyeMarkButton"
import citizensAssets from "@/public/assets/SVG/citizens"

const ProjectPageHeader: FC = () => {
	const router = useRouter()
	const { project } = useAppSelector(projectSelector)
	const { name } = project

	const _handleBack = () => {
		router.back()
	}
	return (
		<>
			<div
				className={`${styles["header-section"]}  bg-grey-white top-bar`}
			>
				<div className="hidden lg:block mr-5 cursor-pointer ">
					<Image src={arrowBack} onClick={_handleBack} alt="back" />
				</div>
				<div className="lg:hidden mr-5 cursor-pointer h-4">
					<Image
						src={projectAssets["backCaret"]}
						onClick={_handleBack}
						alt="back"
					/>
				</div>
				<p className={styles["header-text"]}>{name}</p>
				<Share
					url={`/project/${project?.public_id}`}
					title={project?.name}
					image={project?.image ? project?.image : ProjectDefault}
					body={project?.description}
				/>
			</div>
			<div className="sm:hidden px-6">
				<div className="mt-12 flex flex-col items-center">
					<div className="w-full flex justify-between">
						<Image
							src={citizensAssets["Folder"]}
							width="60%"
							height="60%"
							alt="folder"
						/>
						<p className="medium w-9/12">{project?.name || ""}</p>
					</div>

					<div className="mt-6 w-full flex justify-between medium">
						<div>
							<p className="text-sm text-dark-grey">
								{project?.eyemarked_count
									? project?.eyemarked_count
									: "-"}
							</p>
							<p className="mt-1 text-3-xs text-input-border uppercase">
								eyemarked
							</p>
						</div>
						<div>
							<p className="text-sm text-dark-grey">
								{project?.reviews_count || "-"}
							</p>
							<p className="mt-1 text-3-xs text-input-border uppercase">
								REVIEWS
							</p>
						</div>
						<div>
							<p className="text-sm text-dark-grey capitalize">
								{getAverageSentiment(project?.sentiments) ||
									"-"}
							</p>
							<p className="mt-1 text-3-xs text-input-border uppercase">
								AVG. SENTIMENT
							</p>
						</div>
					</div>

					<p className="text-sub-text text-2-xs mt-5 text-center">
						{project && project.description
							? project?.description.slice(0, 150) + "..."
							: ""}
					</p>

					<div className="mt-4 w-4/12">
						<EyeMarkButton
							projectId={project.public_id}
							projectName={project.name}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProjectPageHeader
