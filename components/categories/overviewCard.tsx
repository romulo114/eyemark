/** @format */

import { overviewCardPropTypes } from "@/@types/components/categories.types"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"
import TextPrimary from "../shared/textPrimary"

const OverviewCard: FC<overviewCardPropTypes> = ({
	icon,
	title,
	description,
	images,
	link,
}) => {
	const router = useRouter()

	const toSubCategory = () => {
		router.push(`${generalRoutes.subcategory}/?category=${link}`)
	}

	return (
		<div
			onClick={toSubCategory}
			className="bg-white rounded-lg mb-9 cursor-pointer overflow-hidden mx-auto flex-shrink-0 flex flex-col sm:flex-row items-center justify-between p-4 min-h-[232px]"
		>
			<div className="w-11/12 lg:w-7/12 sm:w-8/12">
				<div className="flex items-center mb-8 lg:mb-14">
					<Image src={icon} className="h-10" alt="eyemark" />
					<TextPrimary translation="categories" className="medium ml-4">
						{title}
					</TextPrimary>
				</div>
				<TextPrimary
					translation="categories"
					className="text-dark-grey text-xs"
				>
					{description}
				</TextPrimary>
			</div>
			<div className="w-11/12 sm:w-3/12 mt-7 sm:mt-0 flex justify-center items-start flex-wrap h-full">
				{images.map((image: string, index: number) => (
					<div className="pr-1 sm:w-1/2 h-1/2" key={index}>
						<Image src={image} height={120} width={120} alt="Eyemark" />
					</div>
				))}
			</div>
		</div>
	)
}

export default OverviewCard
