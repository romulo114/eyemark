/** @format */

import { shortenCurrency } from "@/helpers/general.helpers"
import projectAssets from "@/public/assets/SVG/project"
import * as generalAssets from "@/public/assets/SVG/general"
import Image from "next/image"
import { FC, useState } from "react"

const AppropriationCard: FC<{ total: number | string; appropriation: any }> = ({
	total,
	appropriation,
}) => {
	const [showInfo, setShowInfo] = useState(false)
	const [hover, setHover] = useState<boolean>(false)
	const toggleView = () => {
		setShowInfo((value) => !value)
	}

	const _toggleHover = () => setHover((prev) => !prev)

	return (
		<div className="relative group-appro">
			<div
				className=""
				onMouseEnter={_toggleHover}
				onMouseLeave={_toggleHover}
				data-testid="project-appropriated_more_info"
			>
				<button className="" onClick={toggleView}>
					<Image src={projectAssets["MoreInfo"]} />
				</button>
			</div>

			<div
				className={`w-52 lg:w-72 p-4 ${
					hover && "lg:block"
				} absolute rounded-lg bg-white -left-20 sm:left-0 ${
					showInfo ? "block lg:hidden" : "hidden"
				}`}
				style={{ boxShadow: "0px 9px 45px rgba(61, 132, 172, 0.2)" }}
				data-testid="project-appropriated_more_info_dropdown"
			>
				<div className="lg:hidden absolute top-4 right-4 h-4">
					<Image src={generalAssets["closeMap"]} onClick={toggleView} />
				</div>

				<p className="text-sm medium text-accepted ">Appropriation Breakdown</p>
				<p className="text-xs text-light-grey-2 mt-2 medium">Total</p>
				<p className="mt-0.5 pb-2 border-b border-light-grey-4 medium">
					{total ? shortenCurrency(total) : "-"}
				</p>
				<div className="mt-2">
					{appropriation &&
						Object.keys(appropriation).map(function (key) {
							return (
								<div className="flex justify-between" key={key}>
									<p className="medium text-light-grey-2 text-xs">{key}</p>
									<p className="medium text-dark-grey text-sm">
										{shortenCurrency(appropriation[key])}
									</p>
								</div>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default AppropriationCard
