/** @format */

import { PopularReviewPropTypes } from "@/@types/components/discover.types"
import {
	projectSentimentType,
	sentimentString,
} from "@/@types/components/projects.types"
import { sentimentEmojis, status_color } from "@/constants/general/defaults"
import { avatarPlaceholder, PopularReviews } from "@/public/assets/PNG"
import Image from "next/image"
import { FC, useState } from "react"
import moment from "moment"
import citizensAsset from "@/public/assets/SVG/citizens"
import {
	generateStateString,
	getAverageSentiment,
	getDateDifference,
	shortenCurrency,
} from "@/helpers/general.helpers"
import { statusType } from "@/@types/app.types"
import styles from "@/styles/popularReviews.module.scss"
import Voting from "./voting"
import TextPrimary from "../shared/textPrimary"
import { useRouter } from "next/router"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"

const PopularReviewCard: FC<PopularReviewPropTypes> = ({
	body,
	public_id,
	owner,
	sentiment,
	created,
	images,
	title,
	upvotes,
	downvotes,
	project,
}) => {
	const { avatar, display_name } = owner
	const {
		start_date,
		end_date,
		status,
		geolocations,
		name,
		total_project_cost,
		sentiments,
	} = project
	let viewProject = false
	const [hover, setHover] = useState<boolean>(false)
	const { push } = useRouter()

	const _handleHover = () => setHover((prev) => !prev)

	const openPost = () => push(`${generalRoutes.postInView}/${public_id}`)

	return (
		<>
			<div
				className="rounded-lg overflow-hidden border-2 border-grey-white lg:mr-5 flex-shrink-0 group-popular lg:h-80 mt-6 lg:mt-0 hidden lg:block"
				style={{
					width:
						window.innerWidth > 500
							? "450px"
							: window.innerWidth > 320
							? "350px"
							: "310px",
				}}
				onMouseEnter={_handleHover}
				onMouseLeave={_handleHover}
			>
				<div className="relative h-32 lg:h-5/12">
					<button
						className="lg:hidden absolute top-12 flex items-center space-x-2 right-0 z-20 bg-accepted-light rounded-l-lg py-1 px-2"
						// onClick={toggleView}
					>
						<Image
							src={citizensAsset["PopularReviewSwitch"]}
							alt="switch"
							className="h-2 w-2 flex-shrink-0"
						/>
						<p className="flip">flip</p>
					</button>

					<div
						className={`${
							hover && "hidden"
						} w-full h-full transition duration-300 ease-in-out ${
							viewProject ? "hidden lg:block" : "block"
						}`}
					>
						{images.length ? (
							<Image
								src={images[0]?.image}
								layout="fill"
								alt="review-image"
								className=" w-full h-full object-cover"
							/>
						) : (
							<Image
								src={
									images?.length
										? images[0]?.image
										: PopularReviews
								}
								alt="review-image"
								layout="fill"
								className="w-full h-full object-cover"
							/>
						)}
					</div>

					<div
						className={`${
							hover && "lg:hidden"
						} space-x-3 items-center absolute z-20 top-5 right-5 left-5 ${
							viewProject ? "hidden lg:flex" : "flex"
						}`}
					>
						<div className="display-picture flex-shrink-0">
							<Image
								src={avatar || avatarPlaceholder}
								alt="avatar"
								width="30%"
								height="30%"
								className="rounded-full object-cover h-9 w-9"
							/>
						</div>
						<div className="flex-grow">
							<div className="flex items-center space-x-2 w-full">
								<h4
									className={`font-bold text-white text-sm whitespace-nowrap ${
										hover && "underline"
									} cursor-pointer`}
								>
									{display_name}
								</h4>
								<p className="text-xs text-input-border flex items-center truncate">
									<span className="truncate mr-1">
										{sentimentString[sentiment] &&
											`is  ${sentimentString[sentiment]}`}
									</span>
									{sentimentString[sentiment] ? (
										<Image
											src={sentimentEmojis[sentiment]}
											className="ml-1 h-4"
											width="15%"
											height="15%"
											alt="sentiment"
										/>
									) : (
										""
									)}
								</p>
							</div>
							<p className="text-light-grey-6 text-xs">
								{moment(created).fromNow()}
							</p>
						</div>
					</div>

					<div
						className={`${
							styles["review-project-bg"]
						} flex-col justify-between ${
							hover && "lg:flex"
						} absolute inset-0 w-full h-full p-5 ${
							viewProject ? "flex" : "hidden"
						}`}
					>
						<div className="flex justify-between items-center relative z-30">
							<div className="flex items-center w-11/12 sm:space-x-4 sm:w-10/12">
								<div className="hidden sm:block h-8">
									<Image
										src={citizensAsset["Folder"]}
										alt="folder"
										height={32}
										width={32}
									/>
								</div>

								<div className="overflow-hidden">
									<h4
										title={name}
										className="text-xs whitespace-nowrap text-white truncate font-bold"
									>
										{name}
									</h4>
									<div className={styles["project-detail"]}>
										<div className="text-3-xs text-light-grey-5">
											{moment(start_date).fromNow() !==
												"Invalid date" &&
												`Started  ${moment(
													start_date
												).fromNow()}`}
										</div>
										<div className="text-3-xs text-light-grey-5">
											•
										</div>
										<div className="text-3-xs text-light-grey-5 uppercase max-w-4/12 truncate">
											{generateStateString(geolocations)}
										</div>
										<div className="text-3-xs text-light-grey-5">
											•
										</div>
										<div className="flex items-center">
											<span
												className={
													styles["review-status-tag"]
												}
											>
												status
											</span>
											<p
												className={`pl-1 ${styles["status"]} ${status_color[status]}`}
											>
												{status
													? statusType[status]
													: "-"}
											</p>
										</div>
									</div>
								</div>
							</div>

							<TextPrimary
								translation="discover"
								className="hidden sm:block uppercase text-2-xs text-lightGreen"
							>
								Project
							</TextPrimary>
						</div>

						<div className="flex justify-between items-center relative z-30">
							<div>
								<TextPrimary
									translation="discover"
									className="uppercase text-2-xs text-lightGreen medium"
								>
									CONTR. Amount
								</TextPrimary>
								<p className="uppercase text-sm text-white medium">
									{shortenCurrency(total_project_cost)}
								</p>
							</div>
							<div>
								<TextPrimary
									translation="discover"
									className="uppercase text-2-xs text-lightGreen medium"
								>
									Timeline
								</TextPrimary>
								<p className="text-sm text-white medium">
									{end_date && start_date
										? getDateDifference(
												end_date,
												start_date
										  )
										: "Unavailable"}
								</p>
							</div>
							<div>
								<TextPrimary
									translation="discover"
									className="uppercase text-2-xs text-lightGreen medium"
								>
									AVG. SENTIMENT
								</TextPrimary>
								<p className="text-sm text-white medium capitalize">
									{getAverageSentiment(sentiments)}
								</p>
							</div>
						</div>
					</div>
					<div
						className={`${styles["review-overlay"]} absolute z-10 inset-0 w-full h-full`}
					/>
				</div>

				<div className="p-6 flex flex-col justify-between h-7/12">
					<div>
						<h1 className="font-bold text-input-border">{title}</h1>
						<p className="mt-1.5 text-xs text-dark-grey review-body">
							{body}
						</p>
					</div>

					<div className="flex justify-between items-center text-xs mt-3 lg:mt-0">
						<Voting
							{...{
								upvotes,
								downvotes,
								postId: public_id,
								projectId: project.public_id,
								title,
							}}
						/>
						<TextPrimary
							translation="discover"
							onClick={() => openPost()}
							className="text-accepted text-2-xs uppercase cursor-pointer medium"
						>
							View Full Review
						</TextPrimary>
					</div>
				</div>
			</div>

			<div
				className="p-4 sm:rounded-lg overflow-hidden sm:border-2 sm:border-grey-white lg:mr-5 flex-shrink-0 group-popular flex lg:hidden  flex-col justify-between lg:h-110 border-b-4 border-grey-stroke sm:mt-5 lg:mt-0"
				style={{ width: window.innerWidth > 500 ? "450px" : "100%" }}
				onClick={() => openPost()}
			>
				<div>
					<div className="space-x-3 items-center flex">
						<div
							className={`${styles["display-picture"]} flex-shrink-0`}
						>
							<Image
								src={avatar || avatarPlaceholder}
								alt="avatar"
								width={"30%"}
								height={"30%"}
								className={`rounded-full ${styles["object-cover"]}`}
							/>
						</div>
						<div className="flex-grow">
							<div className="flex items-center space-x-2 w-full">
								<h4
									className={`font-bold text-dark-grey text-sm whitespace-nowrap ${
										hover && "underline"
									} cursor-pointer`}
								>
									{display_name}
								</h4>
								<p className="text-xs text-input-border flex truncate">
									<span className="truncate mr-5">
										{sentimentString[sentiment] &&
											`is ${sentimentString[sentiment]}`}
									</span>
									{sentimentString[sentiment] && (
										<Image
											src={sentimentEmojis[sentiment]}
											className="ml-1 h-4"
											width={"15%"}
											height={"15%"}
											alt="sentiment"
										/>
									)}
								</p>
							</div>
							<p className="text-light-grey-6 text-xs">
								{moment(created).fromNow()}
							</p>
						</div>
					</div>
					<div className="mt-4 flex flex-col justify-between">
						<div>
							<h1 className="font-bold text-sm text-input-border">
								{title}
							</h1>
							<p
								className={`mt-1.5 text-xs text-dark-grey ${styles["review-body"]}`}
							>
								{body}
							</p>
						</div>
					</div>
				</div>
				<div>
					<div
						className={`space-x-3 overflow-x-auto mt-3 ${
							viewProject ? "hidden" : "flex"
						}`}
					>
						{images.map(({ image }, index) => (
							<div
								key={index}
								// onClick={e => openimage(index, e)}
								className={
									styles["image-container"] +
									(images.length === 1
										? "w-full"
										: images.length === 2
										? "w-6/12"
										: "w-5/12")
								}
							>
								<Image
									src={image}
									alt="post-image"
									className={styles["post-image"]}
									width={"20%"}
									height={"50%"}
								/>
							</div>
						))}
					</div>
					<div
						className={`flex-col w-full mt-3 h-full p-5 border border-grey-stroke rounded-lg ${
							viewProject ? "flex" : "hidden"
						}`}
					>
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-2">
								<Image
									src={citizensAsset["Folder"]}
									alt="project"
									className="h-8"
									width={"20%"}
									height={"50%"}
								/>
								<div className="overflow-hidden">
									<h4
										title={name}
										className="text-sm text-dark-grey clamp-name font-bold"
									>
										{name}
									</h4>
									<div className={styles["project-detail"]}>
										<div className="text-3-xs text-light-grey-5">
											{moment(start_date).fromNow() !==
												"Invalid date" &&
												`Started   ${moment(
													start_date
												).fromNow()}
											`}
										</div>
										<div className="text-3-xs text-light-grey-5">
											•
										</div>
										<div className="text-3-xs text-light-grey-5 uppercase max-w-4/12 truncate">
											{generateStateString(geolocations)}
										</div>
										<div className="text-3-xs text-light-grey-5">
											•
										</div>
										<div className="flex items-center">
											<span
												className={
													styles["review-status-tag"]
												}
											>
												status
											</span>
											<p
												className={`pl-1 ${styles["status"]} ${status_color[status]}
											`}
											>
												{status
													? statusType[status]
													: "-"}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center mt-8">
							<div>
								<TextPrimary
									translation="discover"
									className="uppercase text-2-xs text-input-border medium"
								>
									CONTR. Amount
								</TextPrimary>
								<p className="uppercase text-sm text-black medium">
									{shortenCurrency(total_project_cost)}
								</p>
							</div>
							<div>
								<TextPrimary
									translation="discover"
									className="uppercase text-2-xs text-input-border medium"
								>
									Timeline
								</TextPrimary>
								<p className="text-sm text-black medium">
									{end_date && start_date
										? getDateDifference(
												end_date,
												start_date
										  )
										: "Unavailable"}
								</p>
							</div>
							<div>
								<TextPrimary
									translation="discover"
									className="uppercase text-2-xs text-input-border medium"
								>
									AVG. SENTIMENT
								</TextPrimary>
								<p className="text-sm text-black medium">
									{getAverageSentiment(sentiments)}
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-between items-center text-xs mt-3 lg:mt-0">
						<Voting
							{...{
								upvotes,
								downvotes,
								postId: public_id,
								projectId: project.public_id,
								title,
							}}
						/>
						<p
							// onClick={(e) => toggleView(e)}
							className="text-accepted text-2-xs uppercase cursor-pointer medium"
						>
							{viewProject ? "hide" : "Show"} Context
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default PopularReviewCard
