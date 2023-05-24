/** @format */

import React, { FC, SyntheticEvent, useState } from "react"
import styles from "@/styles/tab.module.scss"
import { ProjectToEyeMarkPropTypes } from "@/@types/components/projects.types"
import { projectStatus, status_color } from "@/constants/general/defaults"
import { EyeMarkButton } from "../shared/buttons/eyeMarkButton"

const ProjectToEyeMark: FC<ProjectToEyeMarkPropTypes> = ({
	name,
	state,
	status,
	id,
	...props
}) => {
	const [hover, setHover] = useState(false)
	const _handleHover = () => setHover((prev) => !prev)

	const _handleViewProject = (e: SyntheticEvent<HTMLDivElement>) => {
		e.stopPropagation()
		//add url to view project page
	}
	return (
		<div
			className="flex items-center py-3 px-6 my-1 space-x-3 group hover:bg-grey-white duration-300 ease-in-out rounded-2xl cursor-pointer overflow-hidden"
			onClick={_handleViewProject}
			onMouseEnter={_handleHover}
			onMouseLeave={_handleHover}
		>
			<EyeMarkButton
				buttonType="rounded"
				{...{ projectId: id, projectName: name, hover }}
			/>

			<div className="flex w-10/12">
				<div className="overflow-hidden">
					<p title={name} className="text-sm medium">
						{name.length > 100 ? name.slice(0, 100) + "..." : name}
					</p>
					<div
						className={`flex mt-1 ${styles["sub-text-1"]} whitespace-nowrap truncate`}
					>
						{state ? (
							<p className="truncate max-w-5/12">
								{state.join(", ")}
							</p>
						) : null}
						<span className="mx-1">•</span>
						<span
							className={`${styles["text-status"]} text-center mx-1`}
						>
							<p className={styles["text-status-text"]}>STATUS</p>
						</span>
						<span
							className={`${styles["text-status-2"]}  ${status_color[status]}`}
						>
							{projectStatus[status]}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectToEyeMark
