import AppLayout from "@/components/layouts/appLayout"
import SettingsLayout from "@/components/layouts/settingsLayout"
import ButtonPrimary from "@/components/shared/buttons"
import TextPrimary from "@/components/shared/textPrimary"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import CreateInterest from "@/pages/auth/signup/interests"
import { arrowBack } from "@/public/assets/SVG/general"
import { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

const EditInterests: NextPage = () => {
	const router = useRouter()

	const [interests, setInterests] = useState<number>(0)

	const back = () => {
		router.back()
	}

	return (
		<AppLayout full>
			<SettingsLayout>
				<Head>
					<title>Eyemark - Edit Interests</title>
				</Head>
				<div className="flex items-center top-bar">
					<button
						className="cursor-pointer flex items-center"
						onClick={back}
					>
						<Image src={arrowBack} />
					</button>
					<TextPrimary className="text-dark-grey medium ml-5">
						Edit Interests
					</TextPrimary>
				</div>

				<div className="px-7 lg:px-16 pb-40 pt-10 lg:pb-20 z-40 relative overflow-x-hidden overflow-y-auto h-full w-screen sm:w-full">
					<CreateInterest settings submitInterests={interests} />

					<div className="flex items-center justify-end">
						<ButtonPrimary
							text={"Confirm"}
							onClick={() => setInterests((prev) => prev + 1)}
						/>
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

export default EditInterests
