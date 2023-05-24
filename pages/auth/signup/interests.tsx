/** @format */
/** eslint disable react-hooks/exhaustive-deps */
import styles from "@/styles/onboarding.module.scss"
import { useState, useEffect, FC } from "react"
import {
	onboardingSelector,
	addInterest,
	getUserInterests,
	getInterests,
} from "@/store/slices/onboarding.slice"
import { authSelector, setAuth, setModalPage } from "@/store/slices/auth.slice"
import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { onboardingBackground } from "@/public/assets/PNG"
import { ministry, sdg, location } from "@/public/assets/SVG/general"
import { NextPage } from "next"
import { useRouter } from "next/router"
import OnBoardingLayout from "@/components/layouts/onboardingLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import EyeMarkEye from "@/components/Auth/eyemarkEye"
import TextPrimary from "@/components/shared/textPrimary"
import OnboardingButton from "@/components/shared/buttons/onboardingButton"
import Tags from "@/components/shared/interestTags"
import { updateInterestsInterface } from "@/@types/apiTypes/users.types"
import { ButtonSkipForNow } from "@/components/shared/buttons"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import { interestsProps } from "@/@types/components/general.types"

const CreateInterest: NextPage<interestsProps> = ({
	settings,
	submitInterests,
}) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const { interests, selectedInterests } = useAppSelector(onboardingSelector)
	const [formData, setFormData] = useState<updateInterestsInterface>({
		locations: [],
		ministries: [],
		sectors: [],
		sdgs: [],
	})

	const {
		auth_modal: { show },
	} = useAppSelector(authSelector)

	const _handleBack = () =>
		show ? dispatch(setModalPage(4)) : router.push(authRoutes.upload)

	const _handleSubmit = () => {
		if (show) {
			dispatch(
				addInterest({
					formData,
				})
			)
			dispatch(setAuth())
			return dispatch(setModalPage(6))
		}
		if (settings) {
			return dispatch(
				addInterest({
					formData,
					settings,
				})
			)
		}
		dispatch(
			addInterest({
				formData,
				cb: router.push,
				cb_data: authRoutes.follow,
			})
		)
	}

	const _handleSelectedItem = (items: string[], key: string) =>
		setFormData((prev) => ({ ...prev, [key]: items }))

	const _handleSkip = () => {
		if (show) {
			dispatch(setAuth())
			return dispatch(setModalPage(6))
		}
		router.push(authRoutes.follow)
	}

	useEffect(() => {
		settings && dispatch(getUserInterests())
		dispatch(getInterests())
	}, [])

	useEffect(() => {
		settings && submitInterests !== 0 && _handleSubmit()
	}, [submitInterests])

	useEffect(() => {
		selectedInterests && setFormData(selectedInterests)
	}, [selectedInterests])

	return (
		<OnBoardingLayout
			title="Interests"
			className={`${
				!settings
					? styles["onboarding-container2"]
					: "bg-golden-brown-light"
			} flex items-center justify-center ${styles["placeholder"]}`}
			style={{
				backgroundImage: `${
					!settings && `url(${onboardingBackground})`
				}`,
			}}
		>
			<div
				className={`${
					show
						? "relative overflow-y-hidden flex flex-col justify-between h-500 bg-white"
						: settings
						? "h-11/12 relative overflow-y-hidden flex flex-col justify-between bg-white rounded-lg"
						: styles["auth-box4"]
				}`}
			>
				<div
					className={`${
						settings
							? " pl-5 sm:pl-10 pt-11 h-full"
							: styles["auth-input-section2"]
					}`}
				>
					<div className="">
						{!settings && (
							<div
								className={`${styles["auth-header2"]} pr-5 sm:pr-10`}
							>
								<EyeMarkEye />
								<div className="sm:block ">
									{formData?.locations?.length === 0 &&
										formData?.ministries?.length === 0 &&
										formData?.sdgs?.length === 0 &&
										formData?.sectors?.length === 0 && (
											<ButtonSkipForNow
												text="skip"
												onClick={_handleSkip}
											/>
										)}
								</div>
							</div>
						)}
						{!settings && (
							<p className={styles["auth-step"]}>Step 5 of 6</p>
						)}
						<TextPrimary
							className={`${styles["auth-title"]} pr-5 sm:pr-10`}
							translation="login"
						>
							{settings ? "Select Interests" : "interest"}
						</TextPrimary>
						<TextPrimary
							className={`${
								show || settings
									? styles["modal-auth-subtitle"]
									: styles["auth-subtitle"]
							} pr-5 sm:pr-10`}
							translation="login"
						>
							interest_subtext
						</TextPrimary>
					</div>
					<div
						className={`w-full ${styles["tags-container"]} overflow-y-auto overflow-x-hidden h-4/5 pb-14 lg:pb-8`}
					>
						{Object.keys(interests || {}).map((value, index) => (
							<Tags
								key={index}
								img={
									value === "locations"
										? location
										: value === "ministries"
										? ministry
										: sdg
								}
								data={
									interests ? (interests as any)[value] : []
								}
								title={value || ""}
								setSelectedItems={_handleSelectedItem}
								settings={settings}
								scrollNumber={index + 1}
								totalSelected={0}
							/>
						))}
					</div>
				</div>
				{!settings && (
					<div
						className={`${styles["auth-footer1"]}  justify-between relative z-30`}
					>
						<OnboardingButton
							back
							text="back"
							onClick={_handleBack}
						/>

						{(formData?.locations?.length !== 0 ||
							formData?.ministries?.length !== 0 ||
							formData?.sdgs?.length !== 0 ||
							formData?.sectors?.length !== 0) && (
							<OnboardingButton
								text={"next"}
								onClick={_handleSubmit}
							/>
						)}
					</div>
				)}
			</div>
		</OnBoardingLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { req, locale } = context

	return protectRoute(req, {
		props: {
			...(await serverSideTranslations(locale, ["login"])),
			// Will be passed to the page component as props
		},
	})
}

export default CreateInterest
