import * as generalAssets from "@/public/assets/SVG/general"
import React, { FC, useState } from "react"
import Image from "next/image"

const SeeAllStates: FC<{ locations: any[] }> = ({ locations }) => {
	const [showInfo, setShowInfo] = useState(false)
	const _toggleView = () => setShowInfo((prev) => !prev)

	return (
		<div className="relative group-seeall" data-testid="project-geo_location_see_all">
			<button
				onClick={() => window.innerWidth <= 500 && _toggleView()}
				onMouseEnter={_toggleView}
				onMouseLeave={_toggleView}
				className="flex items-center space-x-1 cursor-pointer focus:outline-none"
			>
				<p className="text-dark-grey medium mr-1">See All</p>
				<Image src={generalAssets["mapTrifold"]} className="" alt="" />
			</button>

			<div
				className={`w-40 lg:w-52 p-4 right-2 top-5 absolute rounded-lg bg-white z-40 ${
					showInfo ? "block" : "hidden"
				}`}
				style={{ boxShadow: "0px 9px 45px rgba(61, 132, 172, 0.2)" }}
			>
				<div className="lg:hidden absolute top-4 right-4 h-4">
					<Image
						src={generalAssets["closeMap"]}
						onClick={_toggleView}
						width={16}
						height={16}
						alt=""
					/>
				</div>
				<p className="text-sm medium text-accepted mb-5">All States</p>
				{locations?.map((location, index) => (
					<div
						className="flex items-center space-x-3"
						key={location.state + index}
					>
						<p className="text-accepted medium">•</p>
						<p className="medium text-dark-grey text-sm mb-1">{`${
							location?.lga ? location.lga + ", " : ""
						} ${location?.state}`}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default SeeAllStates
