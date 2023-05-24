/** @format */

import React, { FC } from "react"
import { useTranslation } from "next-i18next"
import styles from "@/styles/onboarding.module.scss"
import { onBoardingLayoutProps } from "@/@types/components/layout.types"
import Head from "next/head"
import { useAppSelector } from "@/hooks/redux.hooks"
import { authSelector } from "@/store/slices/auth.slice"
import Link from "next/link"
import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import TextPrimary from "../shared/textPrimary"

const OnBoardingLayout: FC<onBoardingLayoutProps> = ({
	children,
	title,
	className,
	style,
	id,
}) => {
	const { t } = useTranslation("login")
	const {
		auth_modal: { show },
	} = useAppSelector(authSelector)

	return show ? (
		<>{children}</>
	) : (
		<>
			<Head>
				<title>Eyemark - {t(`${title}`)}</title>
			</Head>
			<div
				className={
					className
						? className
						: `${styles["auth-body"]} overflow-hidden`
				}
				id={className || id ? id || "" : "profile-page"}
				style={style}
			>
				{children}
				{!className && (
					<div className={styles["auth-second-option"]}>
						<TextPrimary
							translation="login"
							className="mr-1 medium text-[#718195]"
							extra="?"
						>
							have_account
						</TextPrimary>

						<Link href={authRoutes.login}>
							<>
								<TextPrimary
									translation="login"
									className="medium cursor-pointer"
								>
									login
								</TextPrimary>
							</>
						</Link>
					</div>
				)}
			</div>
		</>
	)
}

export default OnBoardingLayout
