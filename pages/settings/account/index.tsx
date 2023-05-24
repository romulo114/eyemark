import AppLayout from "@/components/layouts/appLayout"
import SettingsLayout from "@/components/layouts/settingsLayout"
import TextPrimary from "@/components/shared/textPrimary"
import { AccountRoutes } from "@/constants/AppRoutes/settings.routes"
import { citizenAccountTypes } from "@/constants/general/defaults"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import { useAppSelector } from "@/hooks/redux.hooks"
import { darkCaret } from "@/public/assets/SVG/general"
import {
	changePassword,
	editInterests,
	editProfile,
} from "@/public/assets/SVG/settings"
import { authSelector } from "@/store/slices/auth.slice"
import { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

const Account: NextPage = () => {
	const { user } = useAppSelector(authSelector)

	const accountMenu = [
		{
			name: "Edit profile",
			route: AccountRoutes.editProfile,
			icon: editProfile,
			description: "Make changes to your profile.",
		},
		{
			name: "Change Password",
			route: AccountRoutes.changePassword,
			icon: changePassword,
			description: "Update or change your password.",
		},
		{
			name: "Edit Interests",
			route: AccountRoutes.editInterests,
			icon: editInterests,
			description: "Make changes to your interests",
		},
	]

	return (
		<AppLayout full>
			<SettingsLayout>
				<Head>
					<title>Eyemark - Account</title>
				</Head>
				<div>
					<div className="top-bar">
						<TextPrimary className="ml-10 sm:ml-0 text-dark-grey medium">
							Account
						</TextPrimary>
					</div>
					<div className="mt-10">
						{accountMenu
							.filter((menu) =>
								menu.name === "Edit Interests" &&
								user.account_type
									? citizenAccountTypes.includes(
											user.account_type.toLowerCase()
									  ) && menu
									: menu
							)
							.map((menu) => {
								return (
									<Link
										key={menu.name}
										href={`${menu.route}`}
									>
										<a
											className={`py-4 px-10 lg:pr-44 sm:pl-20 hover:bg-white transition duration-300 ease-in-out items-center justify-between flex`}
										>
											<div className="flex items-center">
												<Image src={menu.icon} />
												<div className="text ml-2.5">
													<p className="text-sm text-black leading-6">
														{menu.name}
													</p>
													<p className="text-xs text-light-grey-2 leading-6">
														{menu.description}
													</p>
												</div>
											</div>
											<div className="right flex items-center">
												<Image
													src={darkCaret}
													className="transform -rotate-90"
												/>
											</div>
										</a>
									</Link>
								)
							})}
					</div>
				</div>
			</SettingsLayout>
		</AppLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { req, locale } = context
	return protectRoute(req, {
		props: {
			...(await serverSideTranslations(locale, [
				"leftSidebar",
				"rightSidebar",
				"discover",
				"project",
				"login",
			])),
			// Will be passed to the page component as props
		},
	})
}

export default Account
