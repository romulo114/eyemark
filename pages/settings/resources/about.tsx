import AppLayout from "@/components/layouts/appLayout"
import SettingsLayout from "@/components/layouts/settingsLayout"
import TextPrimary from "@/components/shared/textPrimary"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import { arrowBack, greenTextLogo } from "@/public/assets/SVG/general"
import { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"

const About: NextPage = () => {
	const router = useRouter()

	const back = () => {
		router.back()
	}

	return (
		<AppLayout full>
			<SettingsLayout>
				<Head>
					<title>Eyemark - About Eyemark</title>
				</Head>

				<div className="h-full">
					<div className="flex items-center top-bar">
						<button
							className="cursor-pointer flex items-center"
							onClick={back}
						>
							<Image src={arrowBack} />
						</button>
						<TextPrimary className="text-dark-grey medium ml-5">
							About Eyemark
						</TextPrimary>
					</div>

					<div className="px-7 sm:px-16 pb-40 pt-10 lg:py-10 z-40 relative h-full overflow-y-auto">
						<Image src={greenTextLogo} alt="Eyemark" height={28} />
						<p className="mt-12 text-sm text-dark-grey">
							About Eyemark
							<br /> <br />
							At Eyemark, accessible from name.com, one of our
							main priorities is the privacy of our visitors. This
							Privacy Policy document contains types of
							information that is collected and recorded by
							Eyemark and how we use it.
							<br /> <br />
							If you have additional questions or require more
							information about our Privacy Policy, do not
							hesitate to contact us.
							<br /> <br />
							This Privacy Policy applies only to our online
							activities and is valid for visitors to our website
							with regards to the information that they shared
							and/or collect in Eyemark. This policy is not
							applicable to any information collected offline or
							via channels other than this website. Our Privacy
							Policy was created with the help of the Privacy
							Policy Generator.
							<br /> <br />
							Consent
							<br />
							By using our website, you hereby consent to our
							Privacy Policy and agree to its terms.
							<br /> <br />
							Information we collect <br />
							The personal information that you are asked to
							provide, and the reasons why you are asked to
							provide it, will be made clear to you at the point
							we ask you to provide your personal information.
							<br /> <br />
							If you contact us directly, we may receive
							additional information about you such as your name,
							email address, phone number, the contents of the
							message and/or attachments you may send us, and any
							other information you may choose to provide.
							<br /> <br />
							When you register for an Account, we may ask for
							your contact information, including items such as
							name, company name, address, email address, and
							telephone number.
						</p>
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

export default About
