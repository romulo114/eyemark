/** @format */
import styles from "@/styles/onboarding.module.scss"
import { useState } from "react"
import { useTranslation } from "next-i18next"
import { onboardingBackground } from "@/public/assets/PNG"
import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	authSelector,
	setAuth,
	setModalPage,
	toggleModal,
} from "@/store/slices/auth.slice"
import { onboardingSelector } from "@/store/slices/onboarding.slice"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { NextPage } from "next"
import { useRouter } from "next/router"
import OnBoardingLayout from "@/components/layouts/onboardingLayout"
import EyeMarkEye from "@/components/Auth/eyemarkEye"
import OnboardingButton from "@/components/shared/buttons/onboardingButton"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ButtonSkipForNow } from "@/components/shared/buttons"
import TextPrimary from "@/components/shared/textPrimary"
import Tab from "@/components/shared/followTab"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"

const Follow: NextPage = () => {
	const { t } = useTranslation()
	const router = useRouter()
	const dispatch = useAppDispatch()
	const {
		auth_modal: { show },
	} = useAppSelector(authSelector)

	const [sentTab, setSentTab] = useState(false)

	const { projectsEyeMarked } = useAppSelector(onboardingSelector)

	const moveToNext = () => {
		if (show) {
			dispatch(
				toggleModal({
					show: false,
					action: "",
					subtitle: "",
					modal_page: 0,
				})
			)
		} else {
			router.push(citizensRoutes.dashboard)
		}
		dispatch(setAuth())
	}

	const _handleBack = () =>
		show ? dispatch(setModalPage(5)) : router.push(authRoutes.interests)

	return (
		<OnBoardingLayout
			title={"Follow"}
			className={`${styles["onboarding-container2"]} overflow-hidden flex items-center justify-center ${styles["placeholder"]}`}
			id="create-account-flow"
			style={{ backgroundImage: `url(${onboardingBackground})` }}
		>
			<div
				className={`${
					show
						? "flex flex-col justify-between overflow-y-hidden h-500"
						: styles["auth-box5"]
				} relative`}
			>
				<div className={`${styles["auth-input-section"]} h-5/6`}>
					<div className="">
						<div className={styles["auth-header2"]}>
							<EyeMarkEye />
							<div className="sm:block">
								{!projectsEyeMarked && (
									<ButtonSkipForNow
										text="skip"
										onClick={moveToNext}
									/>
								)}
							</div>
						</div>
						<p className={`${styles["auth-step"]} mt-14`}>
							Step 6 of 6
						</p>
						<TextPrimary
							// children="Follow suggestions"
							className={styles["auth-title"]}
						>
							Follow suggestions
						</TextPrimary>
						<TextPrimary
							translation="onboarding"
							className={`${
								show
									? styles["modal-auth-subtitle"]
									: styles["auth-subtitle"]
							} text-auth-subtext`}
						>
							Here are a few recommended projects to Eyemark.
							Click on the checkbox beside a project to Eyemark
							it.
						</TextPrimary>
					</div>
					<div className="h-full sm:h-5/6">
						<Tab
							tabOpen={sentTab ? 2 : 1}
							sendTab={setSentTab}
							auth_modal={show}
						/>
					</div>
				</div>
				<div
					className={`${styles["auth-footer1"]} relative z-30 justify-between`}
				>
					<OnboardingButton
						back
						text={"Back"}
						onClick={_handleBack}
					/>
					{projectsEyeMarked && (
						<OnboardingButton
							text={show ? "Finish" : "Next"}
							onClick={moveToNext}
						/>
					)}
				</div>
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

export default Follow
