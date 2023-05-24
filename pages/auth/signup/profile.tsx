/** @format */

import { FC, SyntheticEvent, useState } from "react"
import styles from "@/styles/onboarding.module.scss"
import { toast } from "react-toastify"
import { authSelector, register, setModalPage } from "@/store/slices/auth.slice"
import { signupInterface } from "@/@types/apiTypes/auth.types"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import { useRouter } from "next/router"
import EyeMarkEye from "@/components/Auth/eyemarkEye"
import { NextPage } from "next"
import TextPrimary from "@/components/shared/textPrimary"
import TextInputPrimary from "@/components/shared/inputs"
import OnBoardingLayout from "@/components/layouts/onboardingLayout"
import Link from "next/link"
import OnboardingButton from "@/components/shared/buttons/onboardingButton"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"

const ProfilePage: NextPage = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const {
		auth_modal: { show },
	} = useAppSelector(authSelector)

	const [payload, setPayload] = useState<signupInterface>({
		email: "",
		password: "",
	})

	const { error } = useAppSelector(authSelector)

	const onGetInputValue = (event: SyntheticEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value
		const name = event.currentTarget.name
		setPayload({ ...payload, [name]: value })
	}

	const onRegisterUser = () => {
		if (!payload.email || !payload.password) {
			return toast.error("Please input email, password and code")
		}
		if (show) {
			return dispatch(register({ payload, auth_modal: show }))
		}
		dispatch(
			register({ payload, cb: () => router.push(authRoutes.verify_code) })
		)
	}

	return (
		<OnBoardingLayout title="create_account">
			<div
				className={`${
					show
						? "h-500 relative flex flex-col justify-between"
						: styles["auth-box"]
				}`}
			>
				<div className={styles["auth-input-section"]}>
					<div
						className={
							show
								? "flex justify-between"
								: styles["auth-header"]
						}
					>
						<EyeMarkEye />
					</div>
					<p className={styles["auth-step"]}>Step 1 of 6</p>
					<TextPrimary
						translation="login"
						className={styles["auth-title"]}
					>
						create_account
					</TextPrimary>
					<TextPrimary
						translation="login"
						className={`${
							show
								? styles["modal-auth-subtitle"]
								: styles["auth-subtitle"]
						} text-auth-subtext`}
					>
						signup_subtext
					</TextPrimary>

					<form action="">
						<TextInputPrimary
							label="Email"
							name="email"
							testId="email"
							type="email"
							error={error}
							onChange={onGetInputValue}
						/>
						<TextInputPrimary
							label="Password"
							name="password"
							testId="password"
							type="password"
							error={error}
							onChange={onGetInputValue}
						/>
						<p className={`text-2-xs mt-3 text-light-grey-6`}>
							By signing up, you are agreeing to{" "}
							<Link
								href="/terms"
								className="medium text-accepted underline"
							>
								Eyemark&apos;s Terms & Conditions
							</Link>
						</p>
					</form>

					{!show && (
						<div className={styles["mobile-auth-second-option"]}>
							<TextPrimary
								className="mr-1 medium text-[#718195]"
								translation="login"
								extra="?"
							>
								have_account
							</TextPrimary>
							<Link href={authRoutes.login}>
								<>
									<TextPrimary
										className="medium cursor-pointer"
										translation="login"
									>
										login
									</TextPrimary>
								</>
							</Link>
						</div>
					)}
				</div>

				<div className={`${styles["auth-footer1"]} justify-between`}>
					<OnboardingButton
						text={show ? "Cancel" : "back"}
						back
						translation="login"
						onClick={() =>
							show
								? dispatch(setModalPage(1.5))
								: router.push(authRoutes.createAccount)
						}
					/>
					<OnboardingButton
						text="next"
						translation="login"
						onClick={onRegisterUser}
					/>
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

export default ProfilePage
