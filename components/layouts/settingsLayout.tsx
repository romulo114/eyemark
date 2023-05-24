import { settingsLayoutProps } from "@/@types/components/layout.types"
import { homeRoutes } from "@/constants/AppRoutes/general.routes"
import { settingsRoutes } from "@/constants/AppRoutes/settings.routes"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { arrowBack, darkCaret } from "@/public/assets/SVG/general"
import { authSelector, logout } from "@/store/slices/auth.slice"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"
import TextPrimary from "../shared/textPrimary"

const SettingsLayout: FC<settingsLayoutProps> = ({ children }) => {
	const dispatch = useAppDispatch()
	const { is_authenticated } = useAppSelector(authSelector)

	const router = useRouter()
	const { pathname } = router

	const settingsNav = [
		{ name: "Account", route: settingsRoutes.account },
		{ name: "Privacy & safety", route: settingsRoutes.privacy },
		{ name: "Additional Resources", route: settingsRoutes.resources },
	]

	const _logout = () => {
		dispatch(logout())
		router.push(homeRoutes.home)
	}

	const back = () => {
		router.push(settingsRoutes.home)
	}

	useEffect(() => {
		!is_authenticated && router.push("/")
	}, [])

	const backSlashes = pathname.match(new RegExp("/", "g"))!.length

	return (
		<div className="h-screen flex">
			<div
				className={`w-full sm:w-4/12 h-full sm:border-r overflow-hidden border-grey-stroke bg-FD ${
					!pathname.includes("/settings/")
						? "block"
						: "hidden sm:block"
				}`}
			>
				<div className="flex relative items-center p-5 bg-white">
					<TextPrimary className="text-dark-grey medium">
						Settings
					</TextPrimary>
				</div>
				<div className="mt-8">
					{settingsNav.map((setting) => {
						return (
							<Link key={setting.name} href={`${setting.route}`}>
								<a
									className={`p-5 flex items-center justify-between text-dark-grey hover:bg-grey-white transition duration-300 ease-in-out text-sm ${
										pathname.includes(setting.route) &&
										"sm:bg-EB medium"
									}`}
								>
									<TextPrimary>{setting.name}</TextPrimary>
									<Image
										src={darkCaret}
										className="transform -rotate-90"
									/>
								</a>
							</Link>
						)
					})}
					<button
						onClick={_logout}
						className="lg:hidden w-full text-abandoned p-5 flex items-center justify-between text-sm"
					>
						<TextPrimary>Logout</TextPrimary>
						<Image
							src={darkCaret}
							className="transform -rotate-90"
						/>
					</button>
				</div>
				<div className="absolute bottom-28 w-full flex justify-center sm:justify-start sm:left-14 lg:hidden">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://forms.gle/CvUffCikLe7XhYWA7"
					>
						<button className="bg-sub-text rounded w-full py-2 px-6 bold text-white text-xs">
							<span className="text-accepted">!</span> Give
							Feedback
						</button>
					</a>
				</div>
			</div>
			<div
				className={`h-full w-full sm:w-8/12 ${
					pathname.includes("/settings/")
						? "block"
						: "hidden sm:block"
				}`}
			>
				<button
					onClick={back}
					className={`absolute z-50 top-7 left-6 sm:hidden ${
						backSlashes > 2 && "hidden"
					}`}
				>
					<Image src={arrowBack} />
				</button>
				{children}
			</div>
		</div>
	)
}

export default SettingsLayout
