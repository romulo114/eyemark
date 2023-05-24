/** @format */

import { SyntheticEvent } from "react"
import { NextPage } from "next"
import userTypeStyles from "@/styles/userType.module.scss"
import styles from "@/styles/onboarding.module.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authSelector, setModalPage } from "@/store/slices/auth.slice"
import OnboardingButton from "@/components/shared/buttons/onboardingButton"
import {
	onboardingSelector,
	setUserType,
} from "@/store/slices/onboarding.slice"
import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import EyeMarkEye from "@/components/Auth/eyemarkEye"
import { useRouter } from "next/router"
import OnBoardingLayout from "@/components/layouts/onboardingLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const UserType: NextPage = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const {
		auth_modal: { show },
	} = useAppSelector(authSelector)

	const { userType } = useAppSelector(onboardingSelector)

	const handleSubmit = () => {
		show && userType
			? dispatch(setModalPage(2))
			: userType && router.push(authRoutes.profile)
	}

	const _handleUserSelect = (value: SyntheticEvent<HTMLInputElement>) => {
		dispatch(setUserType(value.currentTarget.value))
	}

	return (
		<OnBoardingLayout title="User Type">
			<div
				className={`${
					show
						? "relative flex flex-col justify-between h-500"
						: styles["auth-box"]
				}`}
			>
				<div className={styles["auth-input-section"]}>
					<div className={styles["auth-header"]}>
						<EyeMarkEye />
					</div>
					<p className={styles["auth-step"]}>Step 0 of 6</p>
					<p className={styles["auth-title"]}>User Type</p>
					<p
						className={`${
							show
								? styles["modal-auth-subtitle"]
								: styles["auth-subtitle"]
						} text-auth-subtext`}
					>
						Choose the user type that best describes you.
					</p>

					<div className="flex space-x-2">
						<div className={userTypeStyles["input-wrapper"]}>
							<input
								type="radio"
								name="user-type"
								value="citizen"
								onChange={_handleUserSelect}
							/>
							<div className={userTypeStyles["text"]}>
								<span
									className={userTypeStyles["citizen-image"]}
								></span>
								<span>Citizen</span>
							</div>
						</div>

						<div className={userTypeStyles["input-wrapper"]}>
							<input
								type="radio"
								name="user-type"
								value="cso"
								onChange={_handleUserSelect}
							/>
							<div className={userTypeStyles["text"]}>
								<span
									className={userTypeStyles["cso-image"]}
								></span>
								<span>Civil Society Organisation (CSO)</span>
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles["auth-footer1"]} justify-end`}>
					<OnboardingButton text="Next" onClick={handleSubmit} />
				</div>
			</div>
		</OnBoardingLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { req, locale } = context

	return {
		props: {
			...(await serverSideTranslations(locale, ["login"])),
			// Will be passed to the page component as props
		},
	}
}

export default UserType
