import Filter from "@/components/shared/filter"
import AppLayout from "@/components/layouts/appLayout"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { close1, searchIcon } from "@/public/assets/SVG/general"
import {
	filterSelector,
	resetFilter,
	setFrom,
	setQuery,
} from "@/store/slices/filter.slice"
import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { KeyboardEvent, SyntheticEvent, useEffect, useState } from "react"
import styles from "@/styles/nav.module.scss"
import { getMdaProjects, mdaSelector } from "@/store/slices/mda.slice"
import ProjectsTable from "@/components/mda/projectsTable"
import Paginator from "@/components/shared/paginator"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"

const Projects: NextPage = () => {
	const dispatch = useAppDispatch()
	const {
		mda: { query },
	} = useAppSelector(filterSelector)
	const { loading, projects } = useAppSelector(mdaSelector)

	const [selectedPage, setSelectedPage] = useState<number>(0)

	const _handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget
		dispatch(setQuery(value))
	}

	const search = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && query.length > 1) {
			dispatch(getMdaProjects({}))
			setSelectedPage(0)
		}
	}

	const clearSearch = () => {
		dispatch(setQuery(""))
		dispatch(getMdaProjects({}))
		setSelectedPage(0)
	}

	const handlePageClick = async (data: any) => {
		const selectedPage = data.selected + 1

		setSelectedPage(data.selected)

		dispatch(getMdaProjects({ page: selectedPage }))
	}

	useEffect(() => {
		dispatch(setFrom("mda"))
		dispatch(resetFilter())
		projects.count === 0 && dispatch(getMdaProjects({}))
	}, [])

	return (
		<AppLayout mda full>
			<Head>
				<title>{`Eyemark  - Projects`}</title>
			</Head>
			<div className="top-bar medium">
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
						className="focus:outline-none ml-2 border-none bg-transparent placeholder-light-grey-5 text-black font-medium text-xs medium w-full px-2"
						placeholder="Search Projects"
						onChange={_handleChange}
						onKeyDown={search}
						value={query}
					/>
				</div>
			</div>

			<div className="mt-10 px-4 sm:px-6 w-full flex justify-end">
				<Filter />
			</div>
			<div className={`mt-4 ${styles["nav-base"]}`} />

			<ProjectsTable page={selectedPage} />

			{!loading && (
				<Paginator
					click={handlePageClick}
					count={projects.count}
					selected={selectedPage}
				/>
			)}
		</AppLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { req, locale } = context
	return protectRoute(req, {
		props: {
			...(await serverSideTranslations(locale, ["leftSidebar"])),
			// Will be passed to the page component as props
		},
	})
}
export default Projects
