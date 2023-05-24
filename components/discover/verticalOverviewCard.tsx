/** @format */

import { verticalOverviewPropTypes } from "@/@types/components/discover.types"
import { textElementType } from "@/@types/components/general.types"
import { FC, useEffect, useState } from "react"
import TextPrimary from "../shared/textPrimary"
import styles from "@/styles/discover.module.scss"
import ScrollWrapper from "../shared/scrollWrapper"
import PopularReviewCard from "./popularReviewsCard"
import dynamic from "next/dynamic"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	discoverSelector,
	fetchProjectsAround,
	setDistance,
	setLocationFailed,
	usingLocation,
	usingState,
} from "@/store/slices/discover.slice"
import Image from "next/image"
import * as generalAssets from "@/public/assets/SVG/general"
import { distanceRange, formatRange } from "@/constants/general/distance"
import ProjectCard from "../project/projectCard"
import ShowMore from "../shared/showMore"
import AllowLocation from "../shared/map/allowLocation"
const ProjectsMap = dynamic(() => import("../shared/map"), { ssr: false })

const VerticalOverviewCard: FC<verticalOverviewPropTypes> = ({
	title,
	subtitle,
	data,
	isMap,
	isReview,
}) => {
	const [viewMap, setViewMap] = useState<boolean>(false)
	const [showOptions, setShowOptions] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const { projectSource, location, distance, changingProjectSource, state } =
		useAppSelector(discoverSelector)

	const _handleRange = (dist: { label: string; distance: number }) => {
		dispatch(usingLocation())
		if (!location) return
		dispatch(setDistance(dist.distance))
		dispatch(fetchProjectsAround({ location, dist: `${dist.distance}` }))
		setShowOptions(false)
	}

	const _handleState = () => {
		dispatch(setLocationFailed(false))
		setShowOptions(false)
	}

	return (
		<div
			className={`w-100 mx-auto sm:px-6 pt-6 sm:pb-6 lg:mb-16 bg-white lg:rounded-lg relative overflow-hidden ${styles["discover_card"]} border-b-4 sm:border-none border-grey-stroke`}
		>
			<div className="flex justify-between items-center w-full mb-7 px-3 sm:px-0">
				<div className="flex justify-between ">
					<div className={styles["title"]}>
						<TextPrimary
							className="medium text-dark-grey"
							translation="discover"
							headingLevel={4}
							elementType={textElementType.heading}
						>
							{title}
						</TextPrimary>
						<TextPrimary
							translation="discover"
							elementType={textElementType.Paragraph}
						>
							{subtitle}
						</TextPrimary>
					</div>
				</div>
				{isMap && (
					<div className="flex space-x-2 items-center">
						<button
							className="focus:outline-none"
							onClick={() => setViewMap(false)}
						>
							<span
								className={`${
									viewMap
										? styles["carousel-icon"]
										: styles["active-carousel-icon"]
								}`}
							/>
						</button>
						<div className="block border border-r border-EB h-7" />
						<button
							className="focus:outline-none"
							onClick={() => setViewMap(true)}
						>
							<span
								className={`${
									viewMap
										? styles["active-map-icon"]
										: styles["map-icon"]
								}`}
							/>
						</button>
					</div>
				)}
			</div>

			{isMap && ((state && projectSource === "state") || location) && (
				<div className="flex justify-end my-3 mr-3 relative">
					<button
						className="uppercase medium text-xs flex items-center text-light-grey-6"
						onClick={() => setShowOptions((value) => !value)}
					>
						<p className="mr-1">
							{projectSource === "state"
								? `State (${
										state && !changingProjectSource
											? state
											: "Pick State"
								  })`
								: `Live Location (${formatRange[distance]})`}
						</p>
						<Image
							width={"7%"}
							height="7%"
							src={generalAssets["greyCaret"]}
							alt="caret"
						/>
					</button>

					<div
						className={`absolute rounded z-40 bg-white top-5 ${
							styles["project-source"]
						} ${showOptions ? "block" : "hidden"}`}
					>
						<div className="p-2 border-b border-grey-stroke">
							<button
								onClick={_handleState}
								className="uppercase w-full text-left medium text-2-xs text-light-grey-6"
							>
								choose State
							</button>
						</div>
						<div className="p-2">
							<TextPrimary
								translation="discover"
								className="uppercase medium text-2-xs text-light-grey-6"
							>
								Live Location
							</TextPrimary>
							<div className="flex mt-1 items-center space-x-2">
								{distanceRange.map((dist) => (
									<button
										key={dist?.label}
										className={`rounded-full text-2-xs text-white px-2.5 py-1.5 hover:text-accepted hover:bg-accepted-light transition duration-300 ease-in-out ${
											projectSource === "location" &&
											dist?.distance === distance
												? "bg-accepted"
												: "bg-light-grey-5"
										}`}
										onClick={() => _handleRange(dist)}
									>
										{dist?.label}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			{isMap && viewMap && <ProjectsMap />}

			{data &&
				!viewMap &&
				data?.length > 0 &&
				((isMap && !changingProjectSource) || !isMap ? (
					<ScrollWrapper>
						<div className="flex md:flex-row flex-col lg:justify-start justify-center">
							{data
								?.slice(
									0,
									window.innerWidth > 769 ? data?.length : 3
								)
								?.map((value: any, index: number) =>
									isReview ? (
										<PopularReviewCard
											{...value}
											key={`${value.public_id}${index}`}
										/>
									) : (
										<ProjectCard
											{...value}
											key={`${value.public_id}${index}`}
											className="mr-5"
										/>
									)
								)}
						</div>
						{data.length > (window.innerWidth > 769 ? 6 : 3) && (
							<ShowMore state={false} />
						)}
					</ScrollWrapper>
				) : (
					<AllowLocation />
				))}

			{!data?.length &&
				!viewMap &&
				(!isMap ? (
					<TextPrimary
						translation="discover"
						className="text-center text-xs text-brown mx-auto py-3"
					>
						No projects yet, come back later 😔
					</TextPrimary>
				) : (
					<AllowLocation />
				))}
		</div>
	)
}

export default VerticalOverviewCard
