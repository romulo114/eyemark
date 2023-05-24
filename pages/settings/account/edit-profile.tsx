import AppLayout from "@/components/layouts/appLayout"
import SettingsLayout from "@/components/layouts/settingsLayout"
import TextPrimary from "@/components/shared/textPrimary"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { defaultUser } from "@/public/assets/PNG"
import { arrowBack } from "@/public/assets/SVG/general"
import { upload } from "@/public/assets/SVG/settings"
import { authSelector, setAuthUser } from "@/store/slices/auth.slice"
import { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import statesJSON from "@/constants/general/states.json"
import { citizenAccountTypes } from "@/constants/general/defaults"
import ButtonPrimary from "@/components/shared/buttons"
import { updateUserDetails } from "@/store/slices/onboarding.slice"

const EditProfile: NextPage = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const avatarFile = useRef<HTMLInputElement>(null)

	const { user } = useAppSelector(authSelector)

	const [userProfile, setUserProfile] = useState<{
		avatar: string
		display_name: string
		username: string | undefined
		bio: string
		state_of_residence: string
		newAvatar: any
		email: string
	}>({
		avatar: user?.avatar,
		display_name: user?.display_name,
		username: user?.username,
		bio: user?.bio,
		state_of_residence: user?.state_of_residence,
		newAvatar: null,
		email: user?.email,
	})

	const editProfile = (key: string, e: any) => {
		setUserProfile({
			...userProfile,
			[key]: key === "newAvatar" ? e : e.currentTarget.value,
		})
	}

	const updateProfileData = () => {
		dispatch(setAuthUser())
	}

	const updateProfile = () => {
		const formData = new FormData()
		userProfile.newAvatar &&
			formData.append("avatar", userProfile.newAvatar)

		userProfile?.state_of_residence &&
			formData.append(
				"state_of_residence",
				userProfile?.state_of_residence
			)

		!citizenAccountTypes.includes(user.account_type.toLowerCase()) &&
			userProfile?.email &&
			formData.append("email", userProfile?.email)

		formData.append("display_name", userProfile?.display_name)

		formData.append("bio", userProfile?.bio)

		userProfile.username &&
			formData.append("username", userProfile?.username)

		dispatch(
			updateUserDetails({
				formData,
				cb: updateProfileData,
				settings: true,
			})
		)
	}

	const chooseFile = () => {
		avatarFile.current && avatarFile.current.click()
	}
	const back = () => {
		router.back()
	}

	return (
		<AppLayout full>
			<SettingsLayout>
				<Head>
					<title>Eyemark - Edit Profile</title>
				</Head>
				<div className="flex items-center top-bar">
					<button
						className="cursor-pointer flex items-center"
						onClick={back}
					>
						<Image src={arrowBack} />
					</button>
					<TextPrimary className="text-dark-grey medium ml-5">
						Edit Profile
					</TextPrimary>
				</div>

				<div className="lg:w-10/12 px-7 sm:px-16 pb-40 pt-10 lg:py-10 z-40 relative h-full overflow-y-auto">
					<div className="flex flex-col sm:flex-row items-center sm:space-x-10">
						<Image
							src={
								userProfile.newAvatar
									? URL.createObjectURL(userProfile.newAvatar)
									: user.avatar
									? user?.avatar
									: defaultUser
							}
							alt="display-picture"
							className="rounded-full"
							height={128}
							width={128}
							objectFit="cover"
						/>
						<div className="mt-5 sm:mt-0">
							<input
								type="file"
								id="file"
								ref={avatarFile}
								className="hidden"
								onChangeCapture={() =>
									editProfile(
										"newAvatar",
										avatarFile.current!.files![0]
									)
								}
							/>
							<button
								className="px-5 py-3 rounded bg-dark-grey flex items-center"
								onClick={chooseFile}
							>
								<span className="mr-3">
									<Image src={upload} alt="upload" />
								</span>{" "}
								<TextPrimary className="text-white text-sm">
									Choose File
								</TextPrimary>
							</button>
							<TextPrimary className="text-center sm:text-left mt-2 text-2-xs sm:text-xs text-light-grey">
								Maximum of 5 MB file size
							</TextPrimary>
						</div>
					</div>

					<div className="mt-10 space-y-7">
						<div>
							<label htmlFor="displayName">
								<TextPrimary className="text-xs text-light-grey mb-1 ml-1">
									Display Name
								</TextPrimary>
							</label>
							<div className="w-full relative">
								<input
									name="displayName"
									type="text"
									className="w-full px-2 sm:px-5 py-3 text-sm focus:outline-none border border-light-grey-7 placeholder-light-grey-7 rounded"
									placeholder="Ministry of Works and Housing"
									onChange={(value) =>
										editProfile("display_name", value)
									}
									value={userProfile.display_name}
								/>
								<div className="absolute flex-col flex h-full justify-center right-5 top-0">
									<div className="text-ongoing medium-italic bg-grey-blue text-[6px] rounded-sm px-1.5 py-0.5">
										VERIFIED
									</div>
								</div>
							</div>
						</div>

						<div className="flex space-x-4">
							<div className="w-1/2">
								<label htmlFor="username">
									<TextPrimary className="text-xs text-light-grey mb-1 ml-1">
										Username
									</TextPrimary>
								</label>
								<input
									name="username"
									type="text"
									className="w-full px-2 sm:px-5 py-3 text-sm focus:outline-none border border-light-grey-7 placeholder-light-grey-7 rounded"
									placeholder="Username"
									onChange={(value) =>
										editProfile("username", value)
									}
									value={userProfile.username}
								/>
							</div>

							{user.account_type &&
								citizenAccountTypes.includes(
									user.account_type.toLowerCase()
								) && (
									<div className="w-1/2">
										<label htmlFor="state">
											<TextPrimary className="text-xs text-light-grey mb-1 ml-1">
												State of Residence
											</TextPrimary>
										</label>
										<select
											name="state"
											className="w-full h-[46px] select-input"
											onChange={(value) =>
												editProfile(
													"state_of_residence",
													value
												)
											}
											value={
												userProfile.state_of_residence ||
												""
											}
										>
											<option disabled value="">
												State
											</option>
											{statesJSON.map((state) => (
												<option
													key={state.name}
													value={state.name}
												>
													{state.name}
												</option>
											))}
										</select>
									</div>
								)}

							{user.account_type &&
								!citizenAccountTypes.includes(
									user.account_type.toLowerCase()
								) && (
									<div className="w-1/2">
										<label htmlFor="email">
											<TextPrimary className="text-xs text-light-grey mb-1 ml-1">
												Email Address
											</TextPrimary>
										</label>
										<input
											name="email"
											type="email"
											className="w-full px-2 sm:px-5 py-3 text-sm focus:outline-none border border-light-grey-7 placeholder-light-grey-7 rounded"
											placeholder="Email"
											onChange={(value) =>
												editProfile("email", value)
											}
											value={userProfile.email}
										/>
									</div>
								)}
						</div>

						<div>
							<label htmlFor="bio">
								<TextPrimary className="text-xs text-light-grey mb-1 ml-1">
									Bio
								</TextPrimary>
							</label>
							<textarea
								name="bio"
								className="w-full h-44 border px-4 py-4 text-sm border-light-grey-7 rounded-lg focus:outline-none"
								placeholder="Your bio"
								onChange={(value) => editProfile("bio", value)}
								value={userProfile.bio}
							/>
						</div>
					</div>
					<div className="flex items-center justify-end">
						<ButtonPrimary text={"Save"} onClick={updateProfile} />
					</div>
				</div>
			</SettingsLayout>
		</AppLayout>
	)
	return <></>
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

export default EditProfile
