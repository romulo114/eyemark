import AppLayout from "@/components/layouts/appLayout"
import SettingsLayout from "@/components/layouts/settingsLayout"
import FAQ from "@/components/settings/faq"
import TextPrimary from "@/components/shared/textPrimary"
import { citizenAccountTypes } from "@/constants/general/defaults"
import { faqs } from "@/constants/general/faqs"
import { useAppSelector } from "@/hooks/redux.hooks"
import { arrowBack } from "@/public/assets/SVG/general"
import { authSelector } from "@/store/slices/auth.slice"
import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"

const FAQs: NextPage = () => {
	const router = useRouter()
	const { user } = useAppSelector(authSelector)

	const back = () => {
		router.back()
	}

	return (
		<AppLayout full>
			<SettingsLayout>
				<Head>
					<title>Eyemark - FAQs</title>
				</Head>
				<div className="flex items-center top-bar">
					<button
						className="cursor-pointer flex items-center"
						onClick={back}
					>
						<Image src={arrowBack} />
					</button>
					<TextPrimary className="text-dark-grey medium ml-5">
						FAQs
					</TextPrimary>
				</div>

				<div className="px-7 lg:px-16 pb-40 pt-10 lg:pb-32 z-40 relative overflow-y-scroll h-full">
					{faqs.map((value) => {
						return (
							<div
								key={value.title}
								className={`${
									!citizenAccountTypes.includes(
										user.account_type.toLowerCase()
									) && value.group !== "general"
										? "hidden"
										: ""
								}`}
							>
								<FAQ faq={value} />
							</div>
						)
					})}
				</div>
			</SettingsLayout>
		</AppLayout>
	)
}

export default FAQs
