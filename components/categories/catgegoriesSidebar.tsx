import categoriesData from "@/constants/general/categories"
import { shortenCurrency } from "@/helpers/general.helpers"
import { useAppSelector } from "@/hooks/redux.hooks"
import { arrowForwardGrey } from "@/public/assets/SVG/general"
import { categoriesSelector } from "@/store/slices/categories.slice"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"
import TextPrimary from "../shared/textPrimary"

const CategoriesSidebar: FC = () => {
	const router = useRouter()
	const { category, subcategory } = router.query

	const { subCategoryData } = useAppSelector(categoriesSelector)

	const subcategory_length = subCategoryData
		? Object.keys(subCategoryData).length
		: 0

	const index = {
		sectors: 0,
		states: 2,
		ministries: 1,
	}

	const categoryIndex = category ? index[category as keyof typeof index] : 0

	return (
		<div className="h-screen overflow-hidden p-5 border-l border-grey-stroke bg-white text-dark-grey">
			<div className="flex flex-col justify-between h-full overflow-y-auto">
				<div>
					<div className="mt-14 flex flex-col items-center">
						<Image
							height={112}
							width={112}
							objectFit="cover"
							src={
								subcategory && subcategory_length >= 1
									? subCategoryData.image
									: categoriesData[categoryIndex].icon
							}
							className="rounded-full"
							alt="category-icon"
						/>
					</div>

					<TextPrimary
						translation="categories"
						className="mt-8 text-xs text-center medium capitalize"
					>
						{subcategory && subcategory_length >= 1
							? subCategoryData?.title
							: categoriesData[categoryIndex].title}
					</TextPrimary>

					<TextPrimary
						translation="categories"
						className="text-2-xs text-sub-text mt-3 text-center"
					>
						{subcategory && subcategory_length >= 1
							? subCategoryData?.description
							: categoriesData[categoryIndex]?.description}
					</TextPrimary>

					<hr className="my-6" />

					{subcategory && (
						<div>
							<div className="mt-5">
								<TextPrimary
									translation="categories"
									className="text-sm medium"
								>
									Overview
								</TextPrimary>
								<TextPrimary
									translation="categories"
									className="mt-2 text-2-xs text-input-border"
								>
									ALLOCATED NATIONAL BUDGET
								</TextPrimary>
								<TextPrimary
									translation="categories"
									className="mt-3 medium"
								>
									{subCategoryData &&
										subCategoryData?.allocated_budget &&
										shortenCurrency(
											subCategoryData?.allocated_budget
										)}
								</TextPrimary>
								<TextPrimary
									translation="categories"
									className="text-2-xs"
								>
									BASED ON APPROVED 2021 BUDGET
								</TextPrimary>
							</div>

							<div className="mt-8 space-y-5">
								<div className="flex items-start space-x-3">
									<Image src={arrowForwardGrey} />
									<div>
										<TextPrimary
											translation="categories"
											className="text-3-xs text-input-border"
										>
											ACTIVE PROJECTS
										</TextPrimary>
										<TextPrimary
											translation="categories"
											className="mt-3 text-xs medium"
										>
											{subCategoryData &&
											subCategoryData?.active_projects
												? subCategoryData?.active_projects
												: "-"}
										</TextPrimary>
										<TextPrimary
											translation="categories"
											className="text-2-xs"
										>
											ACROSS 36 STATES & FCT
										</TextPrimary>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="mt-8">
					<hr />
					<p className="mt-3 text-2-xs text-light-grey-2">
						Eyemark © 2021. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	)
}

export default CategoriesSidebar
