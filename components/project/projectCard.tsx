/** @format */

import { projectCardPropTypes } from "@/@types/components/projects.types"
import { projectStatus, status_color } from "@/constants/general/defaults"
import { ProjectDefault } from "@/public/assets/PNG"
import { FC, SyntheticEvent, useState } from "react"
import styles from "@/styles/project.module.scss"
import { generateStateString, shortenCurrency } from "@/helpers/general.helpers"
import Image from "next/image"
import { EyeMarkButton } from "../shared/buttons/eyeMarkButton"
import TextPrimary from "../shared/textPrimary"
import { useRouter } from "next/router"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"

const ProjectCard: FC<projectCardPropTypes> = ({
	geolocations,
	status,
	image,
	name,
	public_id,
	total_appropriation,
	categories,
	className,
}) => {
	const router = useRouter()
	const [hover, setHover] = useState<boolean>(false)
	const _handleHover = () => setHover((prev) => !prev)
	const _handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
		e.stopPropagation()
		router.push(`${generalRoutes.project}/${public_id}`)
	}
	return (
		<div
			className={`${className} overflow-hidden flex-shrink-0 group-project cursor-pointer h-[310px] ${
				categories
					? "sm:mt-6 lg:mr-5 sm:rounded-lg border-b-4 border-grey-stroke sm:border-b-2 sm:border-2 sm:border-grey-white"
					: "rounded-lg border-2 border-grey-white"
			} ${window.innerWidth > 500 ? "w-[370px]" : "w-full"}`}
			onMouseEnter={_handleHover}
			onMouseLeave={_handleHover}
			onClick={_handleClick}
		>
			<div className="relative h-7/12">
				{status && projectStatus[status] && (
					<div
						className={`absolute medium transform ${
							hover && "lg:-translate-x-20"
						} transition duration-300 ease-in-out bg-white text-2-xs rounded-r-full bottom-4 px-3 py-1 left-0 uppercase z-10 ${
							status_color[status]
						}`}
					>
						{projectStatus[status]}
					</div>
				)}

				<div className={`w-full h-full`}>
					<Image
						src={image || ProjectDefault}
						layout="fill"
						alt="Eyemark"
						className="w-full h-full object-cover relative"
					/>
				</div>

				<div
					className={`${styles["project-overlay"]} absolute z-0 inset-0 w-full h-full`}
				/>
			</div>

			<div className="h-5/12 p-4 flex flex-col justify-between bg-white">
				<div>
					<h1
						className={`medium text-dark-grey ${styles["project-title"]}`}
					>
						{name}
					</h1>
				</div>

				<div className="flex justify-between items-center">
					<div className="w-4/12 pr-1">
						<TextPrimary
							translation="project"
							className="uppercase text-2-xs text-input-border truncate"
						>
							Total Appropriated
						</TextPrimary>
						<p className="uppercase text-sm text-dark-grey medium">
							{shortenCurrency(total_appropriation!)}
						</p>
					</div>
					<div className="w-4/12 pr-1">
						<TextPrimary
							translation="project"
							className="uppercase text-2-xs text-input-border"
						>
							STATE
						</TextPrimary>
						<p className="uppercase text-sm text-dark-grey medium truncate">
							{generateStateString(geolocations!)}
						</p>
					</div>
					<div className="w-4/12 ml-2">
						<EyeMarkButton
							projectId={public_id!}
							projectName={name!}
							className=""
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
