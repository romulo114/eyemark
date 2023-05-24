/** @format */

import { subcategoryCardPropTypes } from "@/@types/components/categories.types"
import { textElementType } from "@/@types/components/general.types"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"
import { shortenCurrency, toTitleCase } from "@/helpers/general.helpers"
import styles from "@/styles/categories.module.scss"
import { defaultMda } from "@/public/assets/PNG"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"
import TextPrimary from "../shared/textPrimary"
import { useAppDispatch } from "@/hooks/redux.hooks"
import { setSubCategoryData } from "@/store/slices/categories.slice"

const SubcategoryCard: FC<subcategoryCardPropTypes> = ({ subcategory }) => {
	const router = useRouter()
	const { category } = router.query

	const dispatch = useAppDispatch()

	const {
		image,
		title,
		allocated_budget: budget,
		active_projects: projects,
		username,
	} = subcategory

	const toCategoryProjects = () => {
		dispatch(setSubCategoryData(subcategory))
		router.push(
			`${generalRoutes.CategoriesProjects}/?category=${category}&subcategory=${
				category === "ministries" ? username : title.toLowerCase()
			}`
		)
	}

	return (
		<div
			className={`w-11/12 sm:w-10/12 lg:w-5/12 xl:w-6/12 xl:max-w-96 mt-6 h-[300px] lg:h-[260px]`}
		>
			<div
				className="rounded-lg overflow-hidden lg:mr-3 flex-shrink-0 mb-9 cursor-pointer h-full"
				onClick={toCategoryProjects}
			>
				<div className="relative h-7/12">
					<div className={`w-full h-full ${image && "alt-image"}`}>
						{(image || category === "ministries") && (
							<Image
								src={image || defaultMda}
								layout="fill"
								alt="Eyemark"
								className={`w-full h-full ${
									category === "ministries" ? "object-contain" : "object-cover"
								}`}
							/>
						)}
					</div>

					<div
						className={`${styles["category-overlay"]} absolute z-10 inset-0 w-full h-full`}
					></div>
				</div>
				<div className="h-5/12 p-4 flex flex-col justify-between bg-white">
					<div>
						<TextPrimary
							elementType={textElementType.heading}
							headingLevel={1}
							translation="categories"
							className={`medium text-sm text-dark-grey ${styles["subcategory-title"]}`}
						>
							{toTitleCase(title)}
						</TextPrimary>
					</div>
					<div className="flex justify-between items-center">
						<div>
							<TextPrimary
								translation="categories"
								className="uppercase text-2-xs text-input-border"
							>
								ALLOCATED BUDGET
							</TextPrimary>
							<p className="uppercase text-xs text-dark-grey medium">
								{shortenCurrency(budget)}
							</p>
						</div>
						<div>
							<TextPrimary
								translation="categories"
								className="uppercase text-2-xs text-input-border"
							>
								ACTIVE PROJECTS
							</TextPrimary>
							<p className="uppercase text-xs text-dark-grey medium">
								{projects}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SubcategoryCard
