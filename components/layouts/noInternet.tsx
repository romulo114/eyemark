import {
	cloud1,
	cloud2,
	cloud3,
	noInternet,
	textLogo,
} from "@/public/assets/SVG/general"
import Image from "next/image"
import { FC } from "react"

const NoInternet: FC = () => {
	return (
		<div className="h-screen max-h-screen bg-white py-8 px-10 relative">
			<Image src={textLogo} height={20} />

			<div className="absolute z-0 top-20 left-0 h-20 sm:h-36 xl:w-auto">
				<Image src={cloud1} height={"100%"} />
			</div>
			<div className="absolute z-0 top-0 left-1/3 h-20 sm:h-36">
				<Image src={cloud2} height={"100%"} />
			</div>
			<div className="absolute z-0 top-40 right-0 h-20 sm:h-36 hidden xl:block">
				<Image src={cloud3} height={"100%"} />
			</div>

			<div className="flex flex-col items-center mx-auto h-full mt-5 relative z-10">
				<Image src={noInternet} className="mx-auto sm:h-2/5" />
				<p className="mt-10 text-2xl medium">
					Uh oh! No internet connection
				</p>
				<ul className="text-sm sm:text-xl text-input-border mt-4 inline-block mx-auto">
					Try:
					<li className="pl-4">
						• Checking the network cable or router
					</li>
					<li className="pl-4">• Reseting the modem or router</li>
					<li className="pl-4">• Reconnecting to Wi-Fi</li>
				</ul>
				<button
					className="bg-grey-white text-accepted rounded-md px-4 py-1 mt-7"
					onClick={() => window.location.reload()}
				>
					Refresh
				</button>
			</div>
		</div>
	)
}

export default NoInternet
