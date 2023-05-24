/** @format */

import Head from "next/head"
import type { NextPage } from "next"
import { useTranslation } from "next-i18next"
import TextPrimary from "@/components/shared/textPrimary"
import categoriesData from "@/constants/general/categories"
import OverviewCard from "@/components/categories/overviewCard"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { useEffect } from "react"
import {
	categoriesSelector,
	fetchCategories,
} from "@/store/slices/categories.slice"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import CitizensLayout from "@/components/layouts/appLayout"

const CategoriesOverview: NextPage = () => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation("categories")

	const { categories } = useAppSelector(categoriesSelector)

	useEffect(() => {
		if (Object.keys(categories).length === 0) dispatch(fetchCategories())
	}, [])

	return (
		<CitizensLayout>
			<Head>
				<title>{`Eyemark  - ${t("Categories")}`}</title>
			</Head>
			<div className="top-bar medium">
				<TextPrimary
					translation="categories"
					className="text-dark-grey"
				>
					Categories
				</TextPrimary>
			</div>
			<div className="px-3  sm:px-8 pt-8 pb-10 bg-grey-white">
				{categoriesData?.map((category, index) => {
					return <OverviewCard key={index} {...category} />
				})}
			</div>
		</CitizensLayout>
	)
}

export default CategoriesOverview

export async function getServerSideProps(context: any) {
	const { req, locale } = context

	return {
		props: {
			...(await serverSideTranslations(locale, [
				"categories",
				"leftSidebar",
				"rightSidebar",
				"login",
			])),
			// Will be passed to the page component as props
		},
	}
}
