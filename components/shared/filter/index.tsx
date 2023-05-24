/** @format */

import { FC, useEffect, useState } from "react"
import * as generalAssets from "@/public/assets/SVG/general"
import Image from "next/image"
import styles from "@/styles/discover.module.scss"
import FilterTimeline from "./timeline"
import FilterStatus from "./status"
import FilterBudget from "./budget"
import FilterCost from "./costFilter"
import FilterLocation from "./location"
import {
	filterSelector,
	resetFilter,
	toggleLoading,
} from "@/store/slices/filter.slice"
import { fetchCategoryProjects } from "@/store/slices/categories.slice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import FilterMinistries from "./ministries"
import TextPrimary from "../textPrimary"
import { useSelector } from "react-redux"
import { authSelector } from "@/store/slices/auth.slice"
import { getMdaProjects } from "@/store/slices/mda.slice"
import { citizenAccountTypes } from "@/constants/general/defaults"
import { mdaAccountType } from "@/constants/general/defaults"
import { useRouter } from "next/router"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import {
	discoverSelector,
	fetchDiscoverProjects,
	fetchProjectsAround,
	showFromState,
} from "@/store/slices/discover.slice"
import { prices } from "@/constants/general/defaults"
import FilterSvg from "@/public/assets/reactSVG/general/filterSvg"

const Filter: FC<{ className?: string; dropContainerClassName?: string }> = ({
	className,
	dropContainerClassName,
}) => {
	const dispatch = useAppDispatch()
	const { user, is_authenticated } = useSelector(authSelector)
	const [showFilter, setShowFilter] = useState(false)
	const { pathname } = useRouter()
	const { from, ...filter } = useAppSelector(filterSelector)
	const [active, setActive] = useState(false)
	const {
		location,
		timePeriod,
		status,
		budget,
		cost,
		mdaContractors,
		activeTag,
	} = filter[from]
	const {
		location: userLocation,
		state,
		projectSource,
		distance,
	} = useAppSelector(discoverSelector)
	const { min, max } = prices
	const _toggleFilter = () => setShowFilter((prev) => !prev)

	const _clearFilter = () => {
		dispatch(resetFilter())
		_handleApply()
	}
	const _handleApply = () => {
		_toggleFilter()

		if (pathname.includes(citizensRoutes.dashboard)) {
			if (activeTag.length === 0) return
			if (activeTag !== "aroundMe")
				return dispatch(fetchDiscoverProjects())
			if (userLocation && projectSource === "location")
				return dispatch(
					fetchProjectsAround({
						location: userLocation,
						dist: `${distance}`,
					})
				)

			if (state && projectSource === "state")
				return dispatch(showFromState(state))
		}
		is_authenticated &&
		citizenAccountTypes.includes(user.account_type.toLowerCase())
			? dispatch(fetchCategoryProjects({ cb: toggleLoading }))
			: dispatch(getMdaProjects({ cb: toggleLoading }))
	}

	useEffect(() => {
		return () => {
			setShowFilter(false)
		}
	}, [])

	useEffect(() => {
		const { min_amt_budgeted, max_amt_budgeted } = budget
		const { min_total_cost, max_total_cost } = cost
		if (
			location.selectedZone.length > 0 ||
			location.selected.length > 0 ||
			timePeriod.selected.length > 0 ||
			status.length > 0 ||
			mdaContractors.length > 0 ||
			min_amt_budgeted > min ||
			max_amt_budgeted < max ||
			min_total_cost > min ||
			max_total_cost < max
		) {
			return setActive(true)
		}
		setActive(false)
	}, [location, timePeriod, status, budget, cost, mdaContractors])

	return (
		<div className={`${className} relative mr-4 flex-shrink-0 `}>
			<button
				className={`flex items-center space-x-2 py-2.5 px-3.5 lg:border ${
					active ? "border-accepted" : "border-grey-stroke"
				} rounded-lg`}
				onClick={_toggleFilter}
			>
				<FilterSvg active={window.innerWidth < 768 && active} />
				<TextPrimary
					translation="categories"
					className="text-sm hidden lg:block"
				>
					Filter
				</TextPrimary>
			</button>
			<div
				className={`${dropContainerClassName} max-h-[70vh]  overflow-hidden hide-scroll overflow-y-auto ${
					styles["search-filter-box"]
				} z-[120]  ${showFilter ? "block" : "hidden"}`}
			>
				<FilterTimeline />
				<FilterLocation />
				<FilterStatus />
				<FilterMinistries />
				<FilterBudget />
				<FilterCost />
				<div className="px-4 mt-8 flex justify-between">
					<button
						className="py-2 border border-grey-blue text-center rounded bg-white w-4/12"
						onClick={_clearFilter}
					>
						Reset
					</button>
					<button
						className="py-2 border border-accepted text-white text-center rounded bg-accepted w-7/12"
						onClick={_handleApply}
					>
						Apply
					</button>
				</div>
			</div>
		</div>
	)
}
export default Filter
