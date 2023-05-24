import AppLayout from "@/components/layouts/appLayout"
import SettingsLayout from "@/components/layouts/settingsLayout"
import ButtonPrimary from "@/components/shared/buttons"
import TextInputPrimary from "@/components/shared/inputs"
import TextPrimary from "@/components/shared/textPrimary"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { arrowBack } from "@/public/assets/SVG/general"
import {
	settingsSelector,
	_changePassword,
} from "@/store/slices/settings.slice"
import { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { SyntheticEvent, useState } from "react"

const ChangePassword: NextPage = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const { loading } = useAppSelector(settingsSelector)

	const [passwords, setPasswords] = useState({
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	})

	const editPassword = (event: SyntheticEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value
		const name = event.currentTarget.name
		setPasswords({ ...passwords, [name]: value })
	}

	const changePassword = () => dispatch(_changePassword({ ...passwords }))

	const back = () => {
		router.back()
	}

	return (
		<AppLayout full>
			<SettingsLayout>
				<Head>
					<title>Eyemark - Change Password</title>
				</Head>

				<div className="flex flex-col h-full">
					<div className="flex items-center top-bar">
						<button
							className="cursor-pointer flex items-center"
							onClick={back}
						>
							<Image src={arrowBack} />
						</button>
						<TextPrimary className="text-dark-grey medium ml-5">
							Change Password
						</TextPrimary>
					</div>

					<div className="px-7 sm:px-16 pb-20 pt-10 lg:py-10 z-40 relative">
						<TextInputPrimary
							label="Current Password"
							name="currentPassword"
							testId="password"
							type="password"
							containerClassName="bg-white"
							onChange={editPassword}
						/>
						<TextInputPrimary
							label="New Password"
							name="newPassword"
							testId="password"
							type="password"
							containerClassName="bg-white"
							onChange={editPassword}
						/>
						<TextInputPrimary
							label="Confirm Password"
							name="confirmNewPassword"
							testId="password"
							type="password"
							containerClassName="bg-white"
							onChange={editPassword}
						/>

						<div className="flex items-center justify-end mt-10">
							<ButtonPrimary
								text={"Save"}
								className={`rounded-full px-8 mt-12 py-3 text-center ${
									!passwords.currentPassword ||
									!passwords.newPassword ||
									!passwords.confirmNewPassword ||
									loading
										? "bg-light-grey-6 cursor-not-allowed text-light-grey"
										: "bg-accepted text-white"
								}`}
								onClick={changePassword}
							/>
						</div>
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

export default ChangePassword
