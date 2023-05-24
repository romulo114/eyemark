/** @format */

import * as pngAssets from "@/public/assets/PNG"
import * as generalAssets from "@/public/assets/SVG/general"
import { FC, SyntheticEvent } from "react"
import Image from "next/image"
import { infoCardPropTypes } from "@/@types/components/discover.types"
import styles from "@/styles/discover.module.scss"
import TextPrimary from "../shared/textPrimary"
import { useRouter } from "next/router"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"

const InfoCard: FC<infoCardPropTypes> = ({ info, category, index }) => {
	const {
		display_name,
		username,
		avatar,
		eyemarked_count,
		reviews_count,
		total_no_of_projects,
	} = info

	const { push } = useRouter()

	const _handleViewProfile = (
		e: SyntheticEvent<
			HTMLDivElement | HTMLButtonElement | HTMLParagraphElement
		>
	) => {
		if (e.stopPropagation) e.stopPropagation()
		push(`${citizensRoutes.profile}?user=${username}`)
	}

	return (
		<div className="flex items-center justify-between">
			<div
				className={`flex items-center py-4 lg:py-3 px-3 border-b border-light-grey-4 ${
					index === 0 && "border-t"
				}  ${
					category === "contractor"
						? " w-11/12 xl:w-9/12"
						: " w-11/12 xl:w-10/12 "
				}`}
			>
				<div className="flex justify-between items-center w-full">
					<div
						className={`flex items-center ${
							category === "contractor"
								? "w-10/12 lg:w-7/12 xl:w-6/12"
								: "w-full lg:w-8/12"
						}`}
					>
						<div
							className={`${styles["discover-picture"]} mr-3`}
							onClick={_handleViewProfile}
						>
							<Image
								width="100%"
								height="100%"
								src={
									avatar
										? avatar
										: category === "citizen"
										? pngAssets["avatarPlaceholder"]
										: category === "mda"
										? pngAssets["defaultMda"]
										: pngAssets["defaultContractor"]
								}
								className="h-9 w-9 rounded-full"
								alt="avatar"
							/>
						</div>
						<p
							className="w-3/12 text-xs medium hover:underline cursor-pointer mr-2 md:mr-0 truncate flex-grow"
							onClick={_handleViewProfile}
						>
							{display_name}
							{category === "citizen" ? (
								<span className="lg:hidden font-light text-gray-400 uppercase text-3-xs">
									<br />
									{reviews_count} reviews • {eyemarked_count}{" "}
									eyemarked
								</span>
							) : (
								<span className="lg:hidden font-light text-gray-400 uppercase text-3-xs">
									<br />
									{total_no_of_projects} projects •{" "}
									{reviews_count} updates
								</span>
							)}
						</p>
					</div>

					<div className="flex items-center">
						<div className="mr-5 hidden lg:block">
							<TextPrimary
								translation="discover"
								className="mb-2 text-gray-400 uppercase text-2-xs"
							>
								{category === "citizen" ? "Reviews" : "Updates"}
							</TextPrimary>
							<p className="text-sm medium">{reviews_count}</p>
						</div>
						<div className="mr-5 hidden lg:block">
							<TextPrimary
								translation="discover"
								className="mb-2 text-gray-400 uppercase text-2-xs"
							>
								{category === "citizen"
									? "Eyemarked"
									: "Projects"}
							</TextPrimary>
							<p className="text-sm medium">
								{category === "citizen"
									? eyemarked_count
									: total_no_of_projects}
							</p>
						</div>
					</div>

					{category === "hide_claim_account" && (
						<div className="w-2/12">
							<button
								className="flex items-center text-accepted text-xs uppercase space-x-1 ml-5 whitespace-nowrap"
								onClick={_handleViewProfile}
							>
								<span className="hidden xl:block medium">
									View Profile
								</span>{" "}
								<Image
									src={generalAssets["viewProfile"]}
									className="h-4 w-4"
									alt="view-profile"
								/>
							</button>
						</div>
					)}
				</div>
			</div>
			<div className="w-1/12 xl:w-2/12">
				{category !== "hide_claim_account" ? (
					<button
						className="flex items-center text-accepted text-xs uppercase space-x-1 pl-2"
						onClick={_handleViewProfile}
					>
						<span className="hidden xl:block medium">
							View Profile
						</span>{" "}
						<Image
							src={generalAssets["viewProfile"]}
							className="h-4 w-4"
							alt="view-profile"
						/>
					</button>
				) : (
					<button className="border-l border-light-grey-4 flex items-center text-accepted text-xs uppercase space-x-1 pl-2 whitespace-nowrap">
						<span className="hidden xl:block medium">
							Claim Account
						</span>{" "}
						<Image
							src={generalAssets["claimAccount"]}
							className="h-4 w-4"
							alt="claim-account"
						/>
					</button>
				)}
			</div>
		</div>
	)
}

export default InfoCard
