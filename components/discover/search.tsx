/** @format */

import React, {
	FC,
	SyntheticEvent,
	KeyboardEvent,
	useEffect,
	useState,
} from "react"
import citizensAssets from "@/public/assets/SVG/citizens"
import * as generalAssets from "@/public/assets/SVG/general"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { useRouter } from "next/router"
import Image from "next/image"
import {
	filterSelector,
	setQuery,
	toggleSearch,
	setRecent,
	search,
	setFrom,
} from "@/store/slices/filter.slice"
import styles from "@/styles/discover.module.scss"
import Filter from "../shared/filter"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"
import { fetchCategoryProjects } from "@/store/slices/categories.slice"

const DiscoverSearch: FC = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const {
		searchActive,
		from,
		search: { query, recent },
	} = useAppSelector(filterSelector)

	const {
		query: { q },
	} = useRouter()

	const [showRecent, setShowRecent] = useState(false)

	const _closeSearch = () => {
		dispatch(toggleSearch(false))
		dispatch(setQuery(""))
		setShowRecent(false)
		dispatch(setFrom("discover"))
		router.push(citizensRoutes.dashboard)
	}

	const _handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
		from !== "search" && dispatch(setFrom("search"))
		dispatch(setQuery(e.currentTarget.value))
	}

	const _handleSearch = (
		value?: string | SyntheticEvent<HTMLButtonElement>
	) => {
		from !== "search" && dispatch(setFrom("search"))
		const searchQuery: string = typeof value === "string" ? value : query

		if (searchQuery.trim().length === 0) return

		dispatch(setQuery(searchQuery))
		dispatch(setRecent(searchQuery))
		dispatch(toggleSearch(true))
		setShowRecent(false)
		dispatch(fetchCategoryProjects({}))
		dispatch(search(searchQuery))
		router.push(`${generalRoutes.search}?q=${searchQuery}`)
	}

	const _handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && query.length > 0) _handleSearch()
	}

	useEffect(() => {
		dispatch(setQuery(q || ""))
		if (q) {
			!searchActive && dispatch(toggleSearch(true))
			dispatch(search(q))
			dispatch(fetchCategoryProjects({}))
		}
		!q && searchActive && dispatch(toggleSearch(false))
	}, [q])

	return (
		<div className="py-4 px-4 sm:px-8 bg-white w-full">
			<div className="flex items-center">
				<div className="w-full flex justify-between items-center relative">
					<div
						className={`text-tiny px-5 rounded-full bg-gray-200 items-center flex flex-row justify-between relative  
							${searchActive ? "lg:w-9/12 w-8/12" : "w-full"}`}
					>
						<input
							type="text"
							className="border-transparent outline-none text-light-grey search-input flex-grow px-2 py-3 bg-gray-200 w-full"
							id="search"
							placeholder="Search Eyemark"
							onChange={_handleChange}
							value={query}
							onKeyDown={_handleEnter}
							onFocus={() => setShowRecent(true)}
							onBlur={() => setShowRecent(false)}
							autoComplete="off"
						/>
						<button
							className={`bg-accepted rounded-r-full px-5 h-full items-center absolute right-0 top-0 ${
								searchActive ? "hidden" : "flex"
							}`}
							onClick={_handleSearch}
						>
							<Image
								src={citizensAssets["WhiteSearch"]}
								alt="search"
							/>
						</button>
					</div>

					<div
						className={`lg:w-9/12 w-8/12 ${
							styles["recent-searches"]
						} ${
							showRecent && recent.length >= 1
								? "block"
								: "hidden"
						}`}
					>
						<p className="text-light-grey-2 text-xs">
							Recent Search
						</p>
						<div className="mt-3">
							{recent.map((search, index) => (
								<div
									className="flex items-center space-x-2 py-2 cursor-pointer"
									key={search + index}
								>
									<Image
										src={generalAssets["recentSearches"]}
										width="20%"
										height="20%"
										className="h-3"
										alt="recent-searches"
									/>
									<p
										className="text-light-grey-2 text-xs"
										onClick={() => {
											_handleSearch(search)
										}}
										onMouseDown={(event) =>
											event.preventDefault()
										}
									>
										{search}
									</p>
								</div>
							))}
						</div>
					</div>

					<div
						className={`flex flex-grow justify-center items-center ${
							searchActive ? "block" : "hidden"
						}`}
					>
						<Filter />
						<p
							className="text-sm medium cursor-pointer"
							onClick={_closeSearch}
						>
							Cancel
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DiscoverSearch
