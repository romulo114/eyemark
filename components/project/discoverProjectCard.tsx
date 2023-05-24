/** @format */

import { projectCardPropTypes } from "@/@types/components/projects.types"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"
import { useRouter } from "next/router"
import { FC, SyntheticEvent, useState } from "react"
import styles from "@/styles/project.module.scss"
import { generateStateString, shortenCurrency } from "@/helpers/general.helpers"
import Image from "next/image"
import { projectStatus, status_color } from "@/constants/general/defaults"
import { ProjectDefault } from "@/public/assets/PNG"
import TextPrimary from "../shared/textPrimary"
import ThreeDotsSvg from "@/public/assets/reactSVG/discover/threeDots"
import { EyeMarkButton } from "../shared/buttons/eyeMarkButton"

const DiscoverProjectCard: FC<projectCardPropTypes> = ({
	geolocations,
	status,
	image,
	name,
	public_id,
	total_project_cost,
	className,
	activeTag
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
			className={`${
				className || "3xl:w-2/12 xl:w-3/12 md:w-4/12 sm:w-6/12"
			} flex-shrink-0 mb-6  w-full cursor-pointer sm:pr-6 overflow-hidden`}
			onMouseEnter={_handleHover}
			onMouseLeave={_handleHover}
			onClick={_handleClick}
			data-testid={`project-individual_${activeTag?.replace(/\s/g, '')}`}
		>
			<div className="w-full aspect-[294/280]  rounded-2xl">
				<div className="relative h-full">
					{status && projectStatus[status] && (
						<div
							className={`absolute medium transform ${
								hover && "lg:-translate-x-16 "
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
							objectFit="cover"
							alt="Eyemark"
							className="w-full h-full object-cover relative rounded-2xl"
						/>
					</div>
					<div
						className={`${styles["project-overlay"]} absolute z-0 inset-0 w-full h-full rounded-2xl`}
					/>
				</div>
			</div>

			<div className="mt-2">
				<div className="flex w-full justify-between items-center">
					<h1
						className={`medium text-dark-grey w-11/12 h-10
						 ${styles["project-title"]}`}
					>
						{name}
					</h1>
					<ThreeDotsSvg className="hidden" />
				</div>
				<div className="flex justify-between items-center sm:mt-4 mt-5">
					<div className="">
						<TextPrimary
							translation="project"
							className="uppercase text-2-xs text-input-border"
						>
							Total Project Cost
						</TextPrimary>
						<p className="uppercase text-sm text-dark-grey medium mt-1">
							{shortenCurrency(total_project_cost!)}
						</p>
					</div>
					<div className="">
						<TextPrimary
							translation="project"
							className="uppercase text-2-xs text-input-border"
						>
							STATE
						</TextPrimary>
						<p className="uppercase text-sm text-dark-grey medium truncate mt-1" data-testid={`${generateStateString(geolocations!, true)}`}>
							{generateStateString(geolocations!, true)}
						</p>
					</div>
					<EyeMarkButton
						buttonType="new"
						projectId={public_id!}
						projectName={name!}
					/>
				</div>
			</div>
		</div>
	)
}

export default DiscoverProjectCard
