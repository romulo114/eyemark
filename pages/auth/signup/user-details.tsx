/** @format */

import { useState, SyntheticEvent, FC, KeyboardEvent } from "react"
import { useTranslation } from "next-i18next"
import styles from "@/styles/onboarding.module.scss"
import {
	updateUserDetails,
	onboardingSelector,
} from "@/store/slices/onboarding.slice"

import { setAuth, setModalPage, authSelector } from "@/store/slices/auth.slice"

import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import Loader from "@/components/shared/loader"
import { NextPage } from "next"
import { useRouter } from "next/router"
import OnboardingButton from "@/components/shared/buttons/onboardingButton"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import OnBoardingLayout from "@/components/layouts/onboardingLayout"
import EyeMarkEye from "@/components/Auth/eyemarkEye"
import TextInputPrimary from "@/components/shared/inputs"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"

const UserDetails: NextPage = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const {
		auth_modal: { show },
	} = useAppSelector(authSelector)

	const { userType } = useAppSelector(onboardingSelector)

	const [formData, setFormData] = useState<{
		display_name: string
		company_name: string
		rc_number: string
		contact_no: string
	}>({
		display_name: "",
		company_name: "",
		rc_number: "",
		contact_no: "",
	})

	const moveToNext = () => {
		if (show) {
			dispatch(setAuth())
			dispatch(setModalPage(4))
			return
		}
		router.push(authRoutes.upload)
	}

	const handleSubmit = () => {
		const { display_name, ...rest } = formData
		if (userType !== "cso")
			return dispatch(updateUserDetails({ display_name, cb: moveToNext }))

		dispatch(updateUserDetails({ ...rest, cb: moveToNext }))
	}

	const enterSubmit = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSubmit()
		}
	}

	const _handleInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
		const { value, name } = event.currentTarget
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<OnBoardingLayout
			title={"Names"}
			className={`${styles["auth-body"]} overflow-hidden`}
		>
			<div
				className={`${
					show
						? "relative flex flex-col justify-between h-full"
						: styles["auth-box"]
				}`}
			>
				<div className={styles["auth-input-section"]}>
					<div className={styles["auth-header"]}>
						<EyeMarkEye />
					</div>
					<p className={styles["auth-step"]}>Step 3 of 6</p>
					<p className={styles["auth-title"]}>
						{userType !== "cso"
							? "Choose how you are recognised"
							: "Company Details"}
					</p>
					<p
						className={`${
							show
								? styles["modal-auth-subtitle"]
								: styles["auth-subtitle"]
						} text-auth-subtext `}
					>
						{userType !== "cso"
							? `Choose carefully! Your display name is what users will see on your
						reviews`
							: `Thank you for showing interest in eyemark, to verify you are
						actually a CSO, kindly input your company name and RC number 
						below.`}
					</p>
					{userType !== "cso" ? (
						<TextInputPrimary
							onChange={_handleInputChange}
							name="display_name"
							onKeyDown={enterSubmit}
							label="Display Name"
						/>
					) : (
						<>
							<TextInputPrimary
								onChange={_handleInputChange}
								name="company_name"
								onKeyDown={enterSubmit}
								label="Company Name"
								containerClassName="mt-5"
							/>
							<TextInputPrimary
								onChange={_handleInputChange}
								name="rc_number"
								onKeyDown={enterSubmit}
								label="RC Number"
								containerClassName="mt-5"
							/>
							<TextInputPrimary
								onChange={_handleInputChange}
								name="contact_no"
								onKeyDown={enterSubmit}
								label="Contact's Phone Number"
								containerClassName="mt-5"
							/>
						</>
					)}
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

	return protectRoute(req, {
		props: {
			...(await serverSideTranslations(locale, ["login"])),
			// Will be passed to the page component as props
		},
	})
}
export default UserDetails
