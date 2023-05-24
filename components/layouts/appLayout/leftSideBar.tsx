/** @format */

import { textElementType } from "@/@types/components/general.types"
import { citizensNav } from "@/constants/general/citizens"
import { authSelector } from "@/store/slices/auth.slice"
import Image from "next/image"
import Link from "next/link"
import { FC, SyntheticEvent, useEffect, useRef, useState } from "react"
import TextPrimary from "../../shared/textPrimary"
import citizensAsset from "@/public/assets/SVG/citizens"
import SmallModal from "../../shared/smallModal"
import { avatarPlaceholder } from "@/public/assets/PNG"
import styles from "@/styles/leftSideBar.module.scss"
import { useRouter } from "next/router"
import { useAppSelector } from "@/hooks/redux.hooks"
import { mdaNav } from "@/constants/general/mda"
import { leftSidebarProps } from "@/@types/components/layout.types"
import {
	textLogo,
	whiteTextLogo,
	eyeMarkSvg,
} from "@/public/assets/SVG/general"
import { homeRoutes } from "@/constants/AppRoutes/general.routes"
import { settingsRoutes } from "@/constants/AppRoutes/settings.routes"
import { analyticsRoutes } from "@/constants/AppRoutes/mda.routes"
import { contractorsNav } from "@/constants/general/contractor"
import { mdaAccountType } from "@/constants/general/defaults"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"

const LeftSideBar: FC<leftSidebarProps> = ({ mda }) => {
	const { pathname } = useRouter()
	const { is_authenticated, user } = useAppSelector(authSelector)

	const [isOpen, setIsOpen] = useState<boolean>(
		!pathname.includes(citizensRoutes.dashboard)
	)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [adminNav, setAdminNav] = useState<
		{
			name: string
			route: string
			auth?: boolean
			icon: string
			children?: { name: string; route: string; admin?: boolean }[]
		}[]
	>([])

	const toggleOpen = () => setIsOpen((prev) => (mda ? true : !prev))

	const closeModal = () => {
		setShowModal(false)
	}

	const clickModal = (e: SyntheticEvent<HTMLDivElement>) => {
		setShowModal((prev) => !prev)

		e.stopPropagation()
	}

	useEffect(() => {
		if (mda && user && user.account_type) {
			user?.account_type === "CONTRACTOR" && setAdminNav(contractorsNav)

			mdaAccountType.includes(user?.account_type.toLowerCase()) &&
				setAdminNav(mdaNav)
		}
	}, [user, mda])

	return (
		<div
			className={`${styles["sidebar"]} overflow-hidden ${
				isOpen || mda ? "w-[20%]" : "w-1/12 px-3"
			} flex-shrink-0 ${mda ? "bg-dark-grey py-8 pl-8" : "bg-white p-8"} 
        `}
		>
			<div className="flex-grow">
				<div className={`${mda && "pr-8"}`}>
					<div
						className={`items-center flex space-x-2 ${
							isOpen || mda ? "justify-between" : "justify-center"
						} mt-2`}
					>
						<Link href={homeRoutes.home}>
							<a className="flex-shrink-0">
								<Image
									src={
										isOpen
											? mda
												? whiteTextLogo
												: textLogo
											: eyeMarkSvg
									}
									alt="Eyemark"
								/>
							</a>
						</Link>
						{!mda && (
							<button
								className="flex-shrink-0 focus:outline-none"
								onClick={toggleOpen}
							>
								<Image
									className={`h-3 ${
										!isOpen && "transform rotate-180"
									}`}
									src={citizensAsset["DoubleArrow"]}
									alt="arrows"
								/>
							</button>
						)}
					</div>

					{is_authenticated && (
						<div
							className={`py-10 px-3 flex flex-shrink-0 items-center  ${
								!isOpen
									? "justify-center sm:space-x-2"
									: "justify-between"
							}`}
						>
							<div className="flex space-x-1 items-center">
								<div className="flex-shrink-0 flex items-center">
									<Image
										height={40}
										width={40}
										objectFit="cover"
										className="shadow rounded-full"
										src={
											(user as any)?.avatar ||
											avatarPlaceholder
										}
									/>
								</div>
								<div
									className={`pl-2 text-dark-grey ${
										!isOpen && "hidden"
									} `}
								>
									<p
										className={`text-2-xs font-bold ${
											mda &&
											"text-white lg:hidden xl:block"
										}`}
									>
										{(user as any)?.display_name}
									</p>
									{!mda && (
										<p className="text-tiny font-light text-light-grey-3">
											@{(user as any)?.username}
										</p>
									)}
								</div>
							</div>
							<div
								className={`max-h-4 flex-shrink-0 relative `}
								onClick={clickModal}
							>
								<span
									className={`${styles["more-modal"]} cursor-pointer`}
								/>
								{showModal && (
									<SmallModal closeModal={closeModal} />
								)}
							</div>
						</div>
					)}

					{!mda && <hr />}
				</div>
				<div
					className={`flex flex-col ${
						isOpen ? "items-start" : "items-center"
					} py-4 text-med`}
				>
					{!mda
						? citizensNav
								.filter((value) =>
									value.auth
										? is_authenticated && value
										: value
								)
								.map(({ name, route, icon }) => (
									<Link
										key={name}
										href={
											name === "settings" &&
											typeof window !== "undefined" &&
											window?.innerWidth >= 640
												? settingsRoutes.account
												: route
										}
									>
										<div
											className={`${
												styles["left-nav"]
											} text-light-grey-2 cursor-pointer ${
												pathname.includes(route) &&
												styles["left-nav-active"]
											}`}
										>
											<Image
												className={styles["nav-icon"]}
												src={icon}
												alt="icon"
											/>
											{isOpen && (
												<TextPrimary
													elementType={
														textElementType.Span
													}
													translation="leftSidebar"
												>
													{name}
												</TextPrimary>
											)}
										</div>
									</Link>
								))
						: adminNav &&
						  adminNav.map(({ name, route, icon, children }) => (
								<div key={name} className="w-full">
									<Link
										href={
											name === "Settings" &&
											typeof window !== "undefined" &&
											window?.innerWidth >= 640
												? settingsRoutes.account
												: name === "Analytics"
												? analyticsRoutes.projects
												: route
										}
									>
										<div
											className={`${
												styles["mda-nav-items"]
											} w-full ${
												pathname.includes(route) &&
												styles["nav-active-mda"]
											}`}
										>
											<Image
												className={
													styles["mda-nav-icon"]
												}
												src={icon}
												alt="icon"
											/>
											<TextPrimary
												elementType={
													textElementType.Span
												}
												translation="leftSidebar"
											>
												{name}
											</TextPrimary>
										</div>
									</Link>
									{children && (
										<div className="ml-5 my-3">
											{children.map((child, index) => (
												<div
													key={child?.name + index}
													className="flex"
												>
													<div className="mx-4 w-1 border-r border-light-grey-2" />
													<Link href={child?.route}>
														<a
															className={`py-1 text-light-grey-2 hover:text-white transition duration-300 ease-in-out ${
																pathname.includes(
																	child?.route
																) &&
																styles[
																	"nav-active-analytics"
																]
															}`}
														>
															<span>
																{child?.name}
															</span>
														</a>
													</Link>
												</div>
											))}
										</div>
									)}
								</div>
						  ))}
				</div>
			</div>
			{!mda && (
				<a
					target="_blank"
					rel="noreferrer"
					href="https://forms.gle/CvUffCikLe7XhYWA7"
				>
					<button className="bg-dark-grey flex justify-center items-center rounded-xl w-full py-2 bold text-white text-xs">
						{isOpen && (
							<Image
								src={citizensAsset["Feedback"]}
								alt="feedback"
							/>
						)}
						<TextPrimary translation="leftSidebar" className="ml-1">
							{`${isOpen ? "Share" : ""} Feedback`}
						</TextPrimary>
					</button>
				</a>
			)}
		</div>
	)
}
export default LeftSideBar
