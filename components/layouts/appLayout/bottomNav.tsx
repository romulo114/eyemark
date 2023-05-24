/** @format */

import { citizensNav } from "@/constants/general/citizens"
import { useAppSelector } from "@/hooks/redux.hooks"
import { authSelector } from "@/store/slices/auth.slice"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useCallback, useEffect, useState } from "react"
import styles from "@/styles/appLayout.module.scss"
import Image from "next/image"
import TextPrimary from "../../shared/textPrimary"
import { bottomNavProps } from "@/@types/components/citizens.types"
import { mdaNav } from "@/constants/general/mda"
import mdaAssets from "@/public/assets/SVG/mda"
import { contractorsNav } from "@/constants/general/contractor"
import { mdaAccountType } from "@/constants/general/defaults"

const BottomNav: FC<bottomNavProps> = ({ mda }) => {
	const { is_authenticated, user } = useAppSelector(authSelector)

	const [showFolder, setShowFolder] = useState<boolean>(false)
	const [adminNav, setAdminNav] = useState<
		{
			name: string
			route: string
			auth?: boolean
			icon: string
			children?: { name: string; route: string; admin?: boolean }[]
		}[]
	>([])

	const toggleFolder = useCallback(
		() => setShowFolder((prev) => !prev),
		[showFolder]
	)
	const closeFolder = useCallback(() => setShowFolder(false), [showFolder])

	const { pathname } = useRouter()

	const isAdmin = is_authenticated && user.account_type === "ADMIN"

	useEffect(() => {
		if (mda && user && user.account_type) {
			user?.account_type === "CONTRACTOR" && setAdminNav(contractorsNav)

			mdaAccountType.includes(user?.account_type.toLowerCase()) &&
				setAdminNav(mdaNav)
		}
	}, [user, mda])

	return (
		<div
			className={`lg:hidden w-full justify-around bg-white flex items-center py-4 fixed bottom-0 inset-x-0 ${styles["bottom-nav"]}`}
		>
			{!mda
				? citizensNav
						.filter((value) =>
							value.auth ? is_authenticated && value : value
						)
						.map(({ name, route, icon }, id) => (
							<Link key={id} href={route}>
								<a
									className={`lg:hover:text-accepted transition duration-300 ease-in-out text-light-grey-2 flex flex-col justify-center ${
										pathname.includes(route) &&
										styles["bottom-nav-active"]
									}`}
								>
									<div
										className={`${styles["nav-icon"]} h-4 mx-auto`}
									>
										<Image src={icon} alt="Eyemark" />
									</div>
									<TextPrimary
										className="mt-1 text-2-xs"
										translation="leftSidebar"
									>
										{name}
									</TextPrimary>
								</a>
							</Link>
						))
				: adminNav &&
				  adminNav.map(({ name, route, icon, children }) => (
						<div key={name}>
							{name !== "Analytics" ? (
								<Link href={route}>
									<a
										className={`lg:hover:text-accepted transition duration-300 ease-in-out text-light-grey-2 flex flex-col justify-center ${
											pathname.includes(route) &&
											styles["bottom-nav-active"]
										}`}
										onClick={closeFolder}
									>
										<div
											className={`${styles["nav-icon"]} h-4 mx-auto`}
										>
											<Image src={icon} alt="Eyemark" />
										</div>
										<TextPrimary
											className="mt-1 text-2-xs"
											translation="leftSidebar"
										>
											{name}
										</TextPrimary>
									</a>
								</Link>
							) : (
								<button
									className={`lg:hover:text-accepted transition duration-300 ease-in-out text-light-grey-2 flex flex-col justify-center relative ${
										pathname.includes(route) &&
										styles["bottom-nav-active"]
									}`}
									onClick={toggleFolder}
								>
									<div
										className={`${styles["nav-icon"]} h-4 mx-auto`}
									>
										<Image
											src={mdaAssets["analytics"]}
											alt="Eyemark"
										/>
									</div>
									<TextPrimary
										className="mt-1 text-2-xs"
										translation="leftSidebar"
									>
										{name}
									</TextPrimary>

									{showFolder && (
										<div className="absolute bg-white bottom-16 -right-7 py-3 px-5 flex flex-col space-y-6 rounded-lg border shadow-lg">
											{children &&
												children
													.filter((value) =>
														value.admin
															? isAdmin && value
															: value
													)
													.map(({ name, route }) => (
														<Link
															href={route}
															key={name}
														>
															<a
																onClick={
																	closeFolder
																}
																className="lg:hover:text-accepted transition duration-300 ease-in-out text-light-grey-2 mt-1 text-center text-2-xs"
															>
																{name}
															</a>
														</Link>
													))}
										</div>
									)}
								</button>
							)}
						</div>
				  ))}
		</div>
	)
}
export default BottomNav
