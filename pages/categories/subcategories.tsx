/** @format */

import CategoriesSidebar from "@/components/categories/catgegoriesSidebar"
import SubcategoryCard from "@/components/categories/subcategoryCard"
import CitizensLayout from "@/components/layouts/appLayout"
import TextPrimary from "@/components/shared/textPrimary"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"
import { toTitleCase } from "@/helpers/general.helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { searchIcon } from "@/public/assets/SVG/general"
import {
	categoriesSelector,
	fetchCategories,
} from "@/store/slices/categories.slice"
import { NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { SyntheticEvent, useEffect, useState } from "react"

const SubCategories: NextPage = () => {
	const { t } = useTranslation("categories")

	const router = useRouter()
	const { category } = router.query

	const dispatch = useAppDispatch()
	const { loading, categories } = useAppSelector(categoriesSelector)

	const subcategory =
		categories !== null && category
			? categories[category as keyof typeof categories]
			: {}

	const [subcategories, setSubcategories] = useState(
		Object.keys(subcategory || {}) || []
	)

	const toCategories = () => {
		router.push(generalRoutes.categoriesOverview)
	}

	const search = (event: SyntheticEvent<HTMLInputElement>) => {
		const query = event.currentTarget.value

		setSubcategories(
			Object.keys(subcategory || {}).filter((subcat) =>
				subcat?.toLowerCase()?.includes(query.toLowerCase())
			) || []
		)
	}

	useEffect(() => {
		setSubcategories(Object.keys(subcategory || {}))
	}, [categories])

	useEffect(() => {
		if (Object.keys(categories).length === 0) dispatch(fetchCategories())
	}, [])

	if (!loading || Object.keys(categories).length !== 0)
		return (
			<CitizensLayout sidebar={<CategoriesSidebar />}>
				<Head>
					<title>{`Eyemark  - ${t("Categories")}`}</title>
				</Head>
				<div className="top-bar medium">
					<div className="space-x-2 text-sm flex items-center">
						<TextPrimary
							translation="categories"
							className="text-light-grey hover:text-accepted transition ease-in-out duration-300 cursor-pointer"
							onClick={toCategories}
						>
							Categories
						</TextPrimary>

						<p className="text-light-grey">&gt;</p>

						<TextPrimary
							translation="categories"
							className="text-light-grey hover:text-accepted transition ease-in-out duration-300 cursor-pointer"
						>
							{toTitleCase(category as string)}
						</TextPrimary>
					</div>
				</div>

				<div className="items-center flex px-5 sm:px-8 py-3 border-b border-grey-stroke">
					<Image
						src={searchIcon}
						height={15}
						width={15}
						className="search-image"
					/>
					<input
						type="text"
						className="focus:outline-none ml-2 border-none bg-transparent text-light-grey-5 font-medium text-xs medium w-full px-2 py-3"
						placeholder="Search..."
						onChange={search}
					/>
				</div>

				<div
					className={`py-3 pb-20 lg:pb-8 px-4 lg:px-8 sm:py-8 inline-flex flex-wrap justify-center bg-grey-white`}
				>
					{categories &&
						subcategories.map((key) => (
							<SubcategoryCard
								key={key}
								subcategory={
									subcategory[key as keyof typeof subcategory]
								}
							/>
						))}
				</div>
			</CitizensLayout>
		)

	return <></>
}

export default SubCategories

export async function getServerSideProps(context: any) {
	const { req, locale } = context

	return {
		props: {
			...(await serverSideTranslations(locale, [
				"categories",
				"leftSidebar",
				"rightSidebar",
			])),
			// Will be passed to the page component as props
		},
	}
}
