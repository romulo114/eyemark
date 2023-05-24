/** @format */

import React, { FC } from "react"

import { authSelector, logout } from "@/store/slices/auth.slice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { smallModalPropTypes } from "@/@types/components/layout.types"
import { useRouter } from "next/router"
import { homeRoutes } from "@/constants/AppRoutes/general.routes"
import { AccountRoutes } from "@/constants/AppRoutes/settings.routes"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"

const SmallModal: FC<smallModalPropTypes> = ({ closeModal, mda }) => {
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(authSelector)

	const { pathname, push } = useRouter()

	const logOut = () => {
		user.account_type !== "CITIZEN" &&
			user.account_type !== "CSO" &&
			push(homeRoutes.home)

		dispatch(logout())
		;(pathname.includes("settings") ||
			pathname.includes("profile") ||
			pathname.includes("eyemarked")) &&
			push(citizensRoutes.dashboard)
	}

	const goToEditProfile = () => {
		closeModal()
		push(AccountRoutes.editProfile)
	}

	return (
		<div
			className={`${
				mda ? "bg-dark-grey border border-grey-stroke" : "bg-white"
			} w-48 sm:w-28 flex-shrink-0 z-50 rounded-md overflow-x-visible fixed py-2 right-3 top-36 place-self-end shadow-lg text-xs`}
		>
			<span>
				<ul className={`space-y-2 ${mda && "text-white"}`}>
					<li
						className="px-4 cursor-pointer"
						onClick={goToEditProfile}
					>
						Edit Profile
					</li>
					<hr />
					<li
						className="px-4 text-abandoned cursor-pointer"
						onClick={logOut}
					>
						Logout
					</li>
				</ul>
			</span>
		</div>
	)
}

export default SmallModal
