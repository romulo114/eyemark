import { citizenAccountTypes } from "@/constants/general/defaults"
import { redirectToDashboard } from "@/helpers/general.helpers"
import { useAppSelector } from "@/hooks/redux.hooks"
import { image500, textLogo } from "@/public/assets/SVG/general"
import { authSelector } from "@/store/slices/auth.slice"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"

const Page500: FC = () => {
	const router = useRouter()
	const { is_authenticated, user } = useAppSelector(authSelector)

	const redirect = () => {
		!is_authenticated &&
		!citizenAccountTypes.includes(user?.account_type.toLowerCase())
			? router.push("/")
			: redirectToDashboard(user?.account_type, router)
	}

	return (
		<div className="h-screen bg-white py-8 px-10 relative">
			<Image
				src={textLogo}
				height={20}
				className="absolute left-10 top-8"
			/>

			<div className="flex flex-col flex-grow justify-center items-center mx-auto h-full mt-5">
				<div className="sm:h-3/5 mx-auto">
					<Image src={image500} height={"100%"} />
				</div>
				<p className="mt-10 text-2xl medium">
					Sorry! It’s not you, it’s us
				</p>
				<p className="text-sm sm:text-xl text-center text-input-border mt-3 sm:w-10/12 mx-auto">
					We are experiencing an internal server problem. Our team has
					been alerted of the issue and we are currently trying to fix
					the problem, please try again later.
				</p>
				<button
					className="bg-grey-white text-accepted rounded-md px-4 py-1 mt-6 hover:bg-accepted hover:text-white transition ease-in-out duration-300"
					onClick={redirect}
				>
					Reload
				</button>
			</div>
		</div>
	)
}

export default Page500
