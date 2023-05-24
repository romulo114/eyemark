/** @format */
import { useRouter } from 'next/router'

import InfoCard from "@/components/discover/infoCard"
import DiscoverSearch from "@/components/discover/search"
import Top from "@/components/discover/Top"
import CustomNav from "@/components/shared/customNav"
import CitizensLayout from "@/components/layouts/appLayout"
import { genUsersArr } from "@/helpers/discover.helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { categoriesSelector } from "@/store/slices/categories.slice"
import {
	filterSelector,
	resetFilter,
	setFrom,
} from "@/store/slices/filter.slice"
import { NextPage } from "next"
import { useEffect, useRef, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import NoContent from "@/components/shared/noContent"
import { discoverSearchNoContent } from "@/constants/general/noContent"
import Head from "next/head"
import DiscoverProjectCard from "@/components/project/discoverProjectCard"
import styles from "@/styles/discover.module.scss"

const SearchPage: NextPage = () => {
	const dispatch = useAppDispatch()
	const {
		search: { searchResults },
	} = useAppSelector(filterSelector)

	const {
		projects: { results, count },
	} = useAppSelector(categoriesSelector)

	const { citizens, mda, contractors, headerArr } = genUsersArr(
		(searchResults as any)?.users?.data || [],
		count !== 0
	)

	const [activeTab, setActiveTab] = useState<string>("Top")
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollRef?.current?.scrollTo({ top: 0, behavior: "smooth" })
	}, [activeTab])

	useEffect(() => {
		activeTab !== "Top" && setActiveTab("Top")
	}, [results])

	useEffect(() => {
		dispatch(resetFilter())
		dispatch(setFrom("search"))
	}, [])

	const router = useRouter()
	const {q} = router.query

	return (
		<CitizensLayout layoutCenterRef={scrollRef}>
			<Head>
				<title>{`Eyemark  - Search`}</title>
			</Head>
			<DiscoverSearch />
			<CustomNav
				data={headerArr}
				active={activeTab}
				onChange={setActiveTab}
			/>

			{count === 0 && (searchResults as any)?.users?.count === 0 && (
				<div className="flex-grow flex flex-col items-center justify-center mt-6">
					<NoContent {...discoverSearchNoContent} />
				</div>
			)}

			{activeTab === "Top" && (
				<Top
					{...{
						citizens,
						mda,
						contractors,
						results,
						count,
						navigate: setActiveTab,
						q
					}}
				/>
			)}
			<div
				className={`${styles["top-projects-list"]} sm:px-0 px-6`}
				id="scroll-container1"
			>
				{activeTab === "Projects" &&
					results?.map((project: any, index: number) => (
						<DiscoverProjectCard
							{...project}
							key={project.public_id + index}
							className="sm:w-6/12 xl:w-4/12"
							data-testid={`project-search_${q}`}
						/>
					))}
			</div>
			<div className="mb-6 py-3 px-6">
				{activeTab === "MDAs" &&
					mda?.map((value, index) => (
						<InfoCard
							key={value?.public_id}
							{...{ info: value, index, category: "mda" }}
						/>
					))}

				{activeTab === "Contractors" &&
					contractors?.map((value, index) => (
						<InfoCard
							key={value?.public_id}
							{...{ info: value, index, category: "contractor" }}
						/>
					))}

				{activeTab === "Citizens" &&
					citizens?.map((value, index) => (
						<InfoCard
							key={value?.public_id}
							{...{ info: value, index, category: "citizen" }}
						/>
					))}
			</div>
		</CitizensLayout>
	)
}

export async function getServerSideProps(context: any) {
	const {
		locale,
		req: { url },
	} = context
	const urlArr = url.split("=")
	let urlParam = ""
	urlArr.length > 1 && (urlParam = urlArr[1])

	const returnObject: any = {
		props: {
			...(await serverSideTranslations(locale, [
				"leftSidebar",
				"rightSidebar",
				"discover",
				"project",
				"login",
			])),
		},
	}

	urlParam.length === 0 &&
		(returnObject.redirect = {
			destination: citizensRoutes.dashboard,
			permanent: false,
		})

	return returnObject
}

export default SearchPage
