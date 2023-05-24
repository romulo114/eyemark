/** @format */

import {
	loginMotif2,
	loginMotif1,
	loginLogoGreen,
} from "@/public/assets/SVG/login"
import LoginModal from "@/components/Auth/loginModal"
import { arrowForwardGreen } from "@/public/assets/SVG/general"
import Head from "next/head"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import Image from "next/image"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import TextPrimary from "@/components/shared/textPrimary"
import EyeMarkEye from "@/components/Auth/eyemarkEye"
import { useEffect } from "react"
import { useAppSelector } from "@/hooks/redux.hooks"
import { authSelector } from "@/store/slices/auth.slice"
import { redirectToDashboard } from "@/helpers/general.helpers"

const LoginForm = () => {
	const { t } = useTranslation("login")
	const router = useRouter()
	const { is_authenticated, user } = useAppSelector(authSelector)

	useEffect(() => {
		is_authenticated && redirectToDashboard(user?.account_type, router)
	}, [is_authenticated, user.account_type, router])

	return (
		<>
			<Head>
				<title>{`Eyemark  - ${t("Login")}`}</title>
			</Head>
			<div data-testid="login-form">
				<div
					className="bg-white sm:bg-grey-white h-screen lg:min-h-screen sm:overflow-y-hidden relative"
					id="login-page"
				>
					<div className="lg:w-11/12 xl:w-9/12 sm:w-9/12 w-full mx-auto h-full sm:h-5/6">
						<div className="sm:shadow-login md:rounded-lg bg-white w-full md:h-full h-full flex sm:mt-10 relative">
							<div className="lg:w-6/12 w-full px-5 sm:px-10 py-11 overflow-y-auto flex flex-col justify-center">
								<div>
									<div className="flex justify-between">
										<EyeMarkEye />
									</div>
									<LoginModal />
								</div>
							</div>

							<div className="lg:w-6/12 hidden lg:block relative border-l border-grey-white px-5 sm:px-10 py-11 overflow-y-auto">
								<div className="absolute top-0 right-0">
									<Image src={loginMotif1} alt="" />
								</div>
								<div className="absolute bottom-0 left-0">
									<Image src={loginMotif2} alt="" />
								</div>

								<div className="flex flex-col justify-between relative z-30 items-center h-full">
									<div className="text-2-xs text-center opacity-0 text-[#C9CACD] ">
										<Link href="/terms">
											<>
												<span className="underline text-accepted">
													Terms of Service
												</span>{" "}
												&{" "}
											</>
										</Link>
										<Link href="/privacy">
											<span className="underline text-accepted">
												Privacy Policy
											</span>
										</Link>
									</div>
									<Image
										src={loginLogoGreen}
										className="h-14 mx-auto"
										alt="login-logo"
									/>
									<div className="text-center">
										<TextPrimary
											translation="login"
											className="text-2-xs text-[#C9CACD]"
										>
											supervised_by
										</TextPrimary>

										<p className="mt-2 text-xs text-accepted">
											Federal Ministry of Finance, Budget
											& National Planning
										</p>
									</div>
									<a
										href="https://forms.gle/Z8BbmTS7JJXVEkwu7"
										target="_blank"
										rel="noreferrer"
									>
										<div className="px-4 py-3 bg-accepted-light bg-opacity-50 rounded-2xl flex space-x-4">
											<div>
												<TextPrimary
													translation="login"
													className="text-xs text-accepted"
												>
													cso_account
												</TextPrimary>
												<TextPrimary
													translation="login"
													className="mt-1 text-2-xs"
												>
													request
												</TextPrimary>
											</div>
											<button className="px-4 py-2  rounded-lg bg-white">
												<Image
													src={arrowForwardGreen}
													alt="login-logo"
												/>
											</button>
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
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

export default LoginForm
