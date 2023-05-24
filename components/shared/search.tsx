/** @format */

import { generalRoutes } from "@/constants/AppRoutes/general.routes"
import { useAppDispatch } from "@/hooks/redux.hooks"
import { searchIcon } from "@/public/assets/SVG/general"
import { filterSelector, setFrom, setQuery } from "@/store/slices/filter.slice"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { KeyboardEvent, SyntheticEvent, useEffect } from "react"
import { useSelector } from "react-redux"

export default function SearchInput() {
	const { t } = useTranslation("rightSidebar")
	const dispatch = useAppDispatch()
	const router = useRouter()
	const {
		discover: { query },
	} = useSelector(filterSelector)

	const _handleSearch = () => {
		query.trim().length > 0 &&
			router.push(`${generalRoutes.search}?q=${query}`)
	}
	const _handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget
		dispatch(setQuery(value))
	}

	const enterSearch = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			_handleSearch()
		}
	}

	useEffect(() => {
		dispatch(setFrom("search"))
		dispatch(setQuery(""))
	}, [])

	return (
		<div className="text-tiny px-5 rounded-full bg-gray-200 items-center flex flex-row justify-between">
			<Image src={searchIcon} className="search-image" alt="" />
			<input
				type="text"
				className="border-transparent outline-none text-light-grey search-input flex-grow px-2 py-3 bg-gray-200"
				placeholder={t("search_placeholder")}
				onChange={_handleChange}
				onKeyDown={enterSearch}
				value={query}
			/>
		</div>
	)
}
