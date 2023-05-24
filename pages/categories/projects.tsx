/** @format */

import { projectCardPropTypes } from "@/@types/components/projects.types"
import CategoriesSidebar from "@/components/categories/catgegoriesSidebar"
import ProjectCard from "@/components/project/projectCard"
import Filter from "@/components/shared/filter"
import CitizensLayout from "@/components/layouts/appLayout"
import Paginator from "@/components/shared/paginator"
import TextPrimary from "@/components/shared/textPrimary"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"
import { toTitleCase } from "@/helpers/general.helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { close1, searchIcon } from "@/public/assets/SVG/general"
import {
	categoriesSelector,
	fetchCategories,
	fetchCategoryProjects,
} from "@/store/slices/categories.slice"
import {
	filterSelector,
	resetFilter,
	setFrom,
	setQuery,
} from "@/store/slices/filter.slice"
import { NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { KeyboardEvent, SyntheticEvent, useEffect, useState } from "react"
import DiscoverProjectCard from "@/components/project/discoverProjectCard"

const CategoryProjects: NextPage = () => {
	const { t } = useTranslation("categories")

	const dispatch = useAppDispatch()
	const { loading, categories, projects } = useAppSelector(categoriesSelector)
	const {
		categories: { query },
	} = useAppSelector(filterSelector)

	const { loading: filterLoader } = useAppSelector(filterSelector)

	const router = useRouter()
	const { category, subcategory } = router.query

	const toCategories = () => {
		router.push(generalRoutes.categoriesOverview)
	}

	const toSubCategory = () => {
		router.push(`${generalRoutes.subcategory}/?category=${category}`)
	}

	const [selectedPage, setSelectedPage] = useState(0)

	const handlePageClick = async (data: any) => {
		const selectedPage = data.selected + 1

		setSelectedPage(data.selected)

		dispatch(fetchCategoryProjects({ page: selectedPage }))
	}

	const _handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
		const query = event.currentTarget.value
		dispatch(setQuery(query))
	}

	const search = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && query.length > 1) {
			dispatch(fetchCategoryProjects({}))
			setSelectedPage(0)
		}
	}

	const clearSearch = () => {
		dispatch(setQuery(""))
		dispatch(fetchCategoryProjects({}))
		setSelectedPage(0)
	}

	useEffect(() => {
		dispatch(setFrom("categories"))
		dispatch(resetFilter())

		if (Object.keys(categories).length === 0) dispatch(fetchCategories())

		dispatch(fetchCategoryProjects({}))

		return () => {
			dispatch(setQuery(""))
		}
	}, [])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}, [projects])

	useEffect(() => {
		filterLoader && setSelectedPage(0)
	}, [filterLoader])

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
						onClick={toSubCategory}
					>
						{toTitleCase(category as string)}
					</TextPrimary>

					<p className="text-light-grey">&gt;</p>

					<TextPrimary
						translation="categories"
						className="text-light-grey hover:text-accepted transition ease-in-out duration-300 cursor-pointer"
					>
						{toTitleCase(subcategory as string)}
					</TextPrimary>
				</div>
			</div>

			<div className="items-center justify-between flex px-5 sm:px-8 py-3 border-b border-grey-stroke">
				<div className="flex items-center">
					{query.length >= 1 ? (
						<button
							onClick={clearSearch}
							className="flex items-center"
						>
							<Image
								src={close1}
								height={15}
								width={15}
								alt="search"
							/>
						</button>
					) : (
						<Image
							src={searchIcon}
							height={15}
							width={15}
							alt="search"
						/>
					)}
					<input
						type="text"
						className="focus:outline-none ml-2 border-none bg-transparent text-light-grey-5 font-medium text-xs medium w-full px-2 py-3"
						placeholder="Search..."
						onChange={_handleChange}
						onKeyDown={search}
						value={query}
					/>
				</div>
				<Filter />
			</div>

			<div className="py-3 sm:py-5 pb-20 lg:pb-8  flex-grow">
				{Object.keys(projects).length !== 0 && (
					<div className="w-full flex flex-wrap items-center sm:justify-start justify-center px-6">
						{projects["results"].map(
							(project: projectCardPropTypes, index: number) => (
								<DiscoverProjectCard
									key={project?.public_id! + index}
									{...project}
									className="sm:w-6/12 xl:w-4/12"
								/>
							)
						)}
					</div>
				)}

				{!loading && (
					<Paginator
						click={handlePageClick}
						count={projects.count}
						selected={selectedPage}
					/>
				)}
			</div>
		</CitizensLayout>
	)
}

export default CategoryProjects

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
