import TextPrimary from "@/components/shared/textPrimary"
import { citizenAccountTypes } from "@/constants/general/defaults"
import { redirectToDashboard } from "@/helpers/general.helpers"
import { useAppSelector } from "@/hooks/redux.hooks"
import { image404, textLogo } from "@/public/assets/SVG/general"
import { authSelector } from "@/store/slices/auth.slice"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import {citizensRoutes} from "@/constants/AppRoutes/citizens.routes"

function Page404({}) {
	const router = useRouter()
	const { is_authenticated, user } = useAppSelector(authSelector)

	const redirect = () => {
		!is_authenticated
			? router.push(citizensRoutes.dashboard)
			: redirectToDashboard(user?.account_type, router)
	}

	return (
		<>
			<Head>
				<title>{`Eyemark - 404`}</title>
			</Head>
			<div className="h-screen max-h-screen overflow-hidden bg-white py-8 px-10">
				<div className="absolute left-10 top-8">
					<Image src={textLogo} height={28} alt="logo" />
				</div>

				<div className="flex flex-col flex-grow justify-center items-center mx-auto h-full mt-5">
					<div className="mx-auto sm:h-3/5 flex">
						<Image src={image404} alt="illustration" />
					</div>
					<TextPrimary
						translation="home"
						className="mt-10 text-2xl medium"
					>
						Opps! Page not found
					</TextPrimary>
					<TextPrimary
						translation="home"
						className="text-sm sm:text-xl text-center text-input-border mt-3 sm:w-10/12 mx-auto"
					>
						We’ve searched everywhere but couldn’t find what you’re
						looking for. The page might have been removed, had it’s
						name changed or is temporarily unavailable.
					</TextPrimary>
					<button
						className="bg-grey-white text-accepted rounded-md px-4 py-1 mt-6 hover:bg-accepted hover:text-white transition ease-in-out duration-300"
						onClick={redirect}
					>
						Back To Dashboard
					</button>
				</div>
			</div>
		</>
	)
}

export default Page404
