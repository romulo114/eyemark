import AppLayout from "@/components/layouts/appLayout"
import SettingsLayout from "@/components/layouts/settingsLayout"
import TextPrimary from "@/components/shared/textPrimary"
import { resourceRoutes } from "@/constants/AppRoutes/settings.routes"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import { darkCaret } from "@/public/assets/SVG/general"
import { blackLogo, faqs, videoResources } from "@/public/assets/SVG/settings"
import { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

const Resources: NextPage = () => {
	const resourceMenu = [
		{
			name: "FAQs",
			route: resourceRoutes.faqs,
			icon: faqs,
			description: "FAQ stands for “Frequently Asked Questions.”",
		},
		{
			name: "About Eyemark",
			route: resourceRoutes.about,
			icon: blackLogo,
			description: "Learn about Eyemark",
		},
	]

	return (
		<AppLayout full>
			<SettingsLayout>
				<Head>
					<title>Eyemark - Additional Resources</title>
				</Head>
				<div>
					<div className="top-bar">
						<TextPrimary className="ml-10 sm:ml-0 text-dark-grey medium">
							Additional Resources
						</TextPrimary>
					</div>
					<div className="mt-10">
						{resourceMenu.map((menu) => {
							return (
								<Link key={menu.name} href={`${menu.route}`}>
									<a
										className={`py-4 px-10 lg:pr-44 sm:pl-20 hover:bg-white transition duration-300 ease-in-out items-center justify-between flex`}
									>
										<div className="flex items-center">
											<Image src={menu.icon} width={24} />
											<div className="text ml-2.5">
												<p className="text-sm text-black leading-6">
													{menu.name}
												</p>
												<p className="text-xs text-light-grey-2 leading-6">
													{menu.description}
												</p>
											</div>
										</div>
										<div className="right flex items-center">
											<Image
												src={darkCaret}
												className="transform -rotate-90"
											/>
										</div>
									</a>
								</Link>
							)
						})}
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

export default Resources
