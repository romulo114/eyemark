/** @format */

import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { filterSelector, updateLocation } from "@/store/slices/filter.slice"
import { FC, SyntheticEvent } from "react"
import FilterWrapper from "./filterWrapper"
import styles from "@/styles/discover.module.scss"
import { geoZones } from "@/constants/general/defaults"
import { compoundStatesData } from "@/constants/general/states"

const FilterLocation: FC = () => {
	const dispatch = useAppDispatch()
	const { from, ...filter } = useAppSelector(filterSelector)
	const { selected, selectedZone } = filter[from].location

	const _handleZoneSelection = (value: string) =>
		dispatch(updateLocation({ selectedZone: value }))

	const _handleSelection = (e: SyntheticEvent<HTMLInputElement>) => {
		const { name } = e.currentTarget
		dispatch(updateLocation({ selected: name }))
	}

	return (
		<FilterWrapper
			title="Location"
			selectedCount={selected.length}
			selected={selected.length > 0}
			filterKey="location"
		>
			<div className="w-full flex justify-between mt-0 ">
				{geoZones.map((value) => (
					<div
						onClick={() => _handleZoneSelection(value)}
						key={value}
						className={`${styles["check-wrapper"]} mt-4 py-1 px-2 ${
							selectedZone === value
								? "bg-accepted text-white"
								: " bg-grey-blue text-light-grey"
						}`}
					>
						<p>{value}</p>
					</div>
				))}
			</div>
			<div className="h-5/6 overflow-y-hidden">
				<div className="h-full inline-flex flex-col flex-wrap overflow-y-hidden overflow-x-auto w-full">
					{compoundStatesData
						.filter(({ zone }) =>
							selectedZone.length > 0 ? zone === selectedZone : zone
						)
						.map(({ displayName }) => (
							<div
								key={displayName}
								className={`mt-4 space-x-5 pr-7 flex items-center
									`}
							>
								<input
									id="option-checkbox"
									name={displayName}
									type="checkbox"
									checked={selected.includes(displayName)}
									onChange={_handleSelection}
								/>
								<p className="text-2-xs text-black">{displayName}</p>
							</div>
						))}
				</div>
			</div>
		</FilterWrapper>
	)
}

export default FilterLocation
