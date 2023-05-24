import { projectType } from "@/@types/components/projects.types"
import { projectStatus, status_color } from "@/constants/general/defaults"
import { generateStateString } from "@/helpers/general.helpers"
import citizenAssets from "@/public/assets/SVG/citizens"
import React, { FC } from "react"
import styles from "@/styles/projectInfo.module.scss"
import Image from "next/image"
import { EyeMarkButton } from "../shared/buttons/eyeMarkButton"
import { useRouter } from "next/router"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"

const EyeMarkedProject: FC<projectType> = ({
	name,
	status,
	geolocations,
	public_id,
}) => {
	const { push } = useRouter()
	const handleProjectClick = () =>
		push(`${generalRoutes.project}/${public_id}`)

	return (
		<div
			className="text-dark-grey py-5 px-4 w-full border-b border-light-grey-4 hover:bg-white duration-300 ease-in-out cursor-pointer"
			onClick={handleProjectClick}
		>
			<div className="flex justify-between">
				<div className="flex items-center space-x-3 sm:space-x-5 lg:w-8/12 w-9/12 overflow-hidden">
					<div className="lg:w-[10%] w-[20%]">
						<Image
							src={citizenAssets["Folder"]}
							className="w-8 h-8"
							width={32}
							height={32}
						/>
					</div>
					<div className="lg:w-[90%] w-[80%]">
						<p
							title={name}
							className="medium text-xs truncate w-10/12"
						>
							{name}
						</p>
						<div className="flex items-center space-x-2 mt-1 text-2-xs text-light-grey-6 truncate">
							<p className="truncate max-w-8/12">
								{generateStateString(geolocations)}
							</p>
							<div className="py-0.5 px-0.5 bg-EB flex items-center justify-center">
								<p className={styles["status-tag"]}>STATUS</p>
							</div>
							<span
								className={`text-3-xs medium uppercase 
									${status_color[status]}`}
							>
								{projectStatus[status]}
							</span>
						</div>
					</div>
				</div>
				<div className="pl-2 lg:w-2/12 w-3/12">
					<EyeMarkButton projectId={public_id} projectName={name} />
				</div>
			</div>
		</div>
	)
}

export default EyeMarkedProject
