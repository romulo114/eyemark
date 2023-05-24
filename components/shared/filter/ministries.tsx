/** @format */

import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	filterSelector,
	mdaSearch,
	updateMdaContractors,
} from "@/store/slices/filter.slice"
import { FC, SyntheticEvent, useEffect, useRef, useState } from "react"
import FilterWrapper from "./filterWrapper"
import * as generalAssets from "@/public/assets/SVG/general"
import Image from "next/image"
import { accountIcon } from "@/constants/general/defaults"
import TextPrimary from "../textPrimary"
import { AccountIconType } from "@/@types/components/general.types"
import { ownerType } from "@/@types/components/discover.types"

const FilterMinistries: FC = () => {
	const dispatch = useAppDispatch()
	const timer = useRef<number>()
	const [query, setQuery] = useState<string>("")
	const { from, loading, ...filter } = useAppSelector(filterSelector)
	const { mdaContractors, mda } = filter[from]

	const _handleSearch = (e: SyntheticEvent<HTMLInputElement>) =>
		setQuery(e.currentTarget.value)

	const _handleClearSearch = () => setQuery("")

	const _handleSelect = (data: ownerType) => {
		let temp: ownerType[] = [...mdaContractors]
		const found = temp.find((value) => value.public_id === data.public_id)

		if (found) {
			temp = temp.filter((value) => value.public_id !== data.public_id)
		} else {
			temp.push(data)
		}
		_handleClearSearch()
		dispatch(updateMdaContractors(temp))
	}

	useEffect(() => {
		timer.current && clearTimeout(timer.current)

		timer.current = window.setTimeout(
			() => query.length > 0 && dispatch(mdaSearch(query)),
			500
		)
		return () => {
			clearTimeout(timer.current)
		}
	}, [query])

	return (
		<FilterWrapper
			title="Ministries & Contractors"
			selectedCount={mdaContractors.length}
			selected={mdaContractors.length > 0}
			filterKey="mdaContractors"
		>
			<>
				<div className="mt-3 relative flex justify-between items-center">
					<div className="relative w-full flex items-center">
						<input
							id="search-filters"
							type="text"
							value={query}
							placeholder={"Search..."}
							className="focus:outline-none text-xs py-1 px-4 w-full"
							onChange={_handleSearch}
						/>
						{query.length > 0 && (
							<button
								className="absolute right-3 mt-2"
								onClick={_handleClearSearch}
							>
								<Image
									src={generalAssets["cancelIcon"]}
									alt="cancel"
								/>
							</button>
						)}
					</div>
					<div
						className={`rounded-b-lg z-20 border h-32 w-full bg-white border-brown absolute top-7 overflow-x-auto 
                    ${query.length > 0 && !loading ? "block" : "hidden"}
                    `}
					>
						{mda?.length > 0 ? (
							mda.map((result: ownerType, index: number) => (
								<div
									key={index}
									onClick={() => _handleSelect(result)}
									className="px-3 py-3 text-sm flex justify-between border-b border-grey-blue hover:bg-grey-white transition duration-300 ease-in-out cursor-pointer"
								>
									<div>
										{result.display_name || result.username}
									</div>
									<div>
										<p className="project-tag-text">
											{
												accountIcon[
													result.account_type as AccountIconType
												]
											}
										</p>
									</div>
								</div>
							))
						) : (
							<TextPrimary
								translation="categories"
								className="text-xs text-center mt-3"
							>
								No results found
							</TextPrimary>
						)}
					</div>
				</div>
				<div className="mt-3">
					<div className="flex flex-wrap">
						{!loading &&
							mdaContractors?.map((result, index) => (
								<div
									key={index}
									className="flex items-center justify-between max-w-40 space-x-2 px-2 py-1 mb-3 mr-5 text-2-xs bg-accepted text-white"
								>
									<p className="w-11/12 truncate">
										{result.display_name}
									</p>
									<button
										onClick={() => _handleSelect(result)}
									>
										<Image
											src={generalAssets["filterAdd"]}
											className="transform rotate-45"
											alt="add"
										/>
									</button>
								</div>
							))}
					</div>
				</div>
			</>
		</FilterWrapper>
	)
}
export default FilterMinistries
