/** @format */

import { FC, useState } from "react"
import Image from "next/image"
import { useAppSelector } from "@/hooks/redux.hooks"
import { projectSelector } from "@/store/slices/project.slice"
import { notCitizen } from "@/helpers/general.helpers"
import Share from "../shared/share"
import { ProjectDefault } from "@/public/assets/PNG"
import projectAssets from "@/public/assets/SVG/project"

const CreateReview: FC<{ openModal: () => void }> = ({ openModal }) => {
	const [opened, setOpened] = useState(false)
	const { project } = useAppSelector(projectSelector)
	const [hover, setHover] = useState<boolean>(false)

	const toggleView = () => {
		window.innerWidth <= 768 && setOpened((value) => !value)
	}

	return notCitizen() ? (
		<></>
	) : (
		<div
			className="group-projectreview write-post"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			data-testid="project-more_icon_wrapper"
		>
			<button
				className={`bottom-24 lg:bottom-8 mr-8 menu-buttons flex ${
					hover && "lg:w-8 lg:h-8"
				}  ani ${opened ? "w-8 lg:w-16 h-8 lg:h-16" : " h-16 w-16"}`}
				onClick={toggleView}
				data-testid="project-more_icon"
			>
				<div className="absolute h-24 w-20 group-projectreview" />
				<div
					className={`${hover && "lg:hidden"} ${
						opened && "w-4 lg:auto"
					} flex items-center justify-center`}
				>
					<Image
						src={
							opened
								? projectAssets["WhiteClose"]
								: projectAssets["WriteReview"]
						}
						className={`${hover && "lg:hidden"} ${
							opened && "w-4 lg:auto"
						}`}
						alt="Write Review"
					/>
				</div>
				<div
					className={`hidden  items-center justify-center ${
						hover && "lg:w-4 lg:flex"
					} ${opened && "w-4 lg:auto"}`}
				>
					<Image
						src={projectAssets["WhiteClose"]}
						className={`hidden ${hover && "lg:w-4 lg:block"} ${
							opened && "w-4 lg:auto"
						}`}
						alt="White Close"
					/>
				</div>
			</button>
			<button
				className={`bottom-28 lg:bottom-10 mr-20 menu-buttons w-12 h-12 ${
					hover && "lg:flex"
				} ani ${opened ? "flex" : "hidden"}`}
				onClick={openModal}
				data-testid="project-review_icon"
			>
				<Image
					src={projectAssets["Pen"]}
					className="w-6"
					alt="Pen"
					/>
			</button>
			<button
				className={`bottom-36 lg:bottom-20 mr-8 menu-buttons w-12 h-12 ${
					hover && "lg:flex"
				} ani ${opened ? "flex" : "hidden"}`}
				data-testid="project-share_icon_wrapper"
			>
				<Share
					url={`/project/${project?.public_id}`}
					title={project?.name}
					image={project?.image || ProjectDefault}
					body={project?.description}
					white
				/>
			</button>
		</div>
	)
}

export default CreateReview
