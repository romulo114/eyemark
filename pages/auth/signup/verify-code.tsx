/** @format */

import { SyntheticEvent, useState } from "react"
import styles from "@/styles/onboarding.module.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	onboardingSelector,
	_resendOTP,
	_verifyOTP,
} from "@/store/slices/onboarding.slice"
import { useTranslation } from "react-i18next"
import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import { authSelector, setAuth, setModalPage } from "@/store/slices/auth.slice"
import { toast } from "react-toastify"
import { NextPage } from "next"
import { useRouter } from "next/router"
import OnBoardingLayout from "@/components/layouts/onboardingLayout"
import EyeMarkEye from "@/components/Auth/eyemarkEye"
import TextPrimary from "@/components/shared/textPrimary"
import TextInputPrimary from "@/components/shared/inputs"
import OnboardingButton from "@/components/shared/buttons/onboardingButton"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { textElementType } from "@/@types/components/general.types"
import { ButtonSkipForNow } from "@/components/shared/buttons"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"

const VerifyCode: NextPage = () => {
	const { t } = useTranslation()
	const router = useRouter()
	const dispatch = useAppDispatch()
	const {
		auth_modal: { show },
	} = useAppSelector(authSelector)
	const { loading } = useAppSelector(onboardingSelector)

	const [otp, setOTP] = useState("")
	const [error, setError] = useState(false)

	const moveToNextPage = () => {
		if (show) {
			dispatch(setAuth())
			return dispatch(setModalPage(3))
		}
		return router.push(authRoutes.user_details)
	}

	const onGetInputValue = (event: SyntheticEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value
		setOTP(value)
	}

	const _handleBack = () =>
		show ? dispatch(setModalPage(2)) : router.push(authRoutes.profile)

	const verifyOTP = () => {
		if (!otp) {
			toast.error("Please enter the OTP sent to you.")
			setError(true)
			return
		}
		dispatch(_verifyOTP({ otp, cb: moveToNextPage }))
	}

	const _handleResend = () => dispatch(_resendOTP())
	return (
		<OnBoardingLayout title="verify_header" className={styles["auth-body"]}>
			<div
				className={`${
					show
						? "relative h-500 flex flex-col justify-between"
						: styles["auth-box"]
				}`}
			>
				<div className={styles["auth-input-section"]}>
					<div className={styles["auth-header2"]}>
						<EyeMarkEye />
						<div className="sm:block">
							{!otp && (
								<ButtonSkipForNow
									text="Skip for now"
									onClick={moveToNextPage}
								/>
							)}
						</div>
					</div>
					<p className={styles["auth-step"]}>Step 2 of 6</p>
					<TextPrimary
						className={styles["auth-title"]}
						translation="login"
					>
						verify
					</TextPrimary>
					<TextPrimary
						className={`${styles["auth-subtitle"]} text-auth-subtext`}
						translation="login"
					>
						verify_subtext
					</TextPrimary>
					<TextInputPrimary
						label="Verification Code"
						name="otp"
						type="number"
						onChange={onGetInputValue}
						error={error}
					/>

					{!loading ? (
						<div className="mt-2 text-xs flex mx-auto cursor-pointer text-light-grey-2">
							<TextPrimary translation="login">
								{"didn't_receive_a_token"}
							</TextPrimary>
							<TextPrimary
								elementType={textElementType.Span}
								className="medium ml-1"
								translation="login"
								onClick={_handleResend}
							>
								resend
							</TextPrimary>
						</div>
					) : (
						<div className="mt-2 text-xs mx-auto cursor-pointer text-light-grey-2">
							<TextPrimary translation="login">
								resending
							</TextPrimary>
						</div>
					)}
				</div>
				<div className={`${styles["auth-footer1"]} justify-between`}>
					<OnboardingButton back text="back" onClick={_handleBack} />

					<OnboardingButton text="Next" onClick={verifyOTP} />
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

export default VerifyCode
