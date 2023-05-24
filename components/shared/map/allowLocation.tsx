/** @format */

import * as generalAssets from "@/public/assets/SVG/general"
import { MapOverlay } from "@/public/assets/PNG"
import React, { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	allowMap,
	discoverSelector,
	fetchProjectsAround,
	setLocation,
	setLocationFailed,
	showFromState,
	stopMapLoading,
	usingLocation,
	usingState,
} from "@/store/slices/discover.slice"
import statesJSON from "@/constants/general/states.json"
import styles from "@/styles/discover.module.scss"
import Image from "next/image"
import { allowLocationPropTypes } from "@/@types/components/discover.types"
import { locationOptions } from "@/constants/general/distance"
import { toast } from "react-toastify"
import { statesKey, textElementType } from "@/@types/components/general.types"
import TextPrimary from "../textPrimary"

const AllowLocation: FC<allowLocationPropTypes> = ({ map, toggleLocation }) => {
	const dispatch = useAppDispatch()

	const [selectedState, setSelectedState] = useState<string | null>(null)
	const { projectSource, locationFailed, distance, projectsAround, state } =
		useAppSelector(discoverSelector)

	function success(pos: any) {
		var coords = pos.coords

		let temp = { lat: coords.latitude, lng: coords.longitude }

		dispatch(setLocation(temp))

		dispatch(
			fetchProjectsAround({
				location: { lng: coords.longitude, lat: coords.latitude },
				dist: `${distance}`,
			})
		)
		toggleLocation && toggleLocation()
		dispatch(usingLocation())
		dispatch(setLocationFailed(false))
		dispatch(stopMapLoading())
	}

	function errors(err: any) {
		if (err.code === 1) {
			alert(err.message)
		} else if (err.code === 2 || err.code === 3) {
			toast(
				<div className="flex items-center">
					<div className="mr-3">
						<Image
							src={generalAssets["noLocation"]}
							className=" h-4"
							alt="no location"
							width={16}
							height={16}
						/>
					</div>
					{err.code === 2
						? "Position unavailable"
						: "Live location not available"}
				</div>
			)
		} else {
			toast.error(`${err.message}`)
		}

		if (state && !projectsAround) {
			dispatch(showFromState(state))
			dispatch(usingState(state))
		} else {
			dispatch(setLocationFailed(true))
		}

		dispatch(stopMapLoading())
	}

	const getStateProject = () => {
		if (selectedState) {
			dispatch(showFromState(selectedState))
			toggleLocation && toggleLocation()
			dispatch(usingState(selectedState))
		}
	}

	const handleLocation = () => {
		map && dispatch(allowMap())

		if (navigator.geolocation) {
			if (navigator.permissions && navigator.permissions.query) {
				navigator.permissions
					.query({ name: "geolocation" })
					.then(function (result) {
						if (
							result.state === "granted" ||
							result.state === "prompt"
						) {
							navigator.geolocation.getCurrentPosition(
								success,
								errors,
								locationOptions
							)
						} else if (result.state === "denied") {
							toast.error(
								"Location access has been denied. Please grant access in your settings"
							)
							dispatch(stopMapLoading())
						}
					})
			} else {
				navigator.geolocation.getCurrentPosition(
					success,
					errors,
					locationOptions
				)
			}
		} else {
			toast.error("Sorry, Location is not available!")
		}
	}

	return (
		<div>
			{projectSource === "location" && !locationFailed ? (
				<div className={styles["map_placeholder"]}>
					<div className="absolute z-30 w-full h-full flex justify-center items-center">
						<div
							className={`${styles["location_message"]} rounded-2xl bg-white flex flex-col items-center justify-center text-center py-8 px-6 sm:max-w-[280px] overflow-hidden relative`}
						>
							<div className=" hidden sm:block">
								<Image
									width={130}
									height={130}
									src={generalAssets["LocationIcon"]}
									alt="location"
								/>
							</div>
							<div className="sm:mt-4">
								<TextPrimary
									translation="discover"
									elementType={textElementType.heading}
									headingLevel={4}
									className="medium text-black"
								>
									Location
								</TextPrimary>
								<TextPrimary
									translation="discover"
									className="text-2-xs sm:text-xs pb-3 sm:pb-0 text-light-grey-6 mb-4 xl:mb-8"
								>
									Please enable location access so we can
									provide you with accurate results of the
									nearest projects around you.
								</TextPrimary>
								<button
									className={`absolute sm:bg-accepted sm:static inset-x-0 bottom-0 rounded-full ${styles["map-button"]} w-full py-4 sm:py-3 text-accepted sm:text-white`}
									onClick={handleLocation}
									data-testid="location-allow_btn"
								>
									Allow
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				(projectSource === "state" || locationFailed || location) && (
					<div className={styles["map_placeholder"]}>
						<div className="absolute z-30 w-full flex justify-center items-center px-3 inset-y-3 sm:inset-y-7 lg:inset-y-12" data-testid="location-set_modal">
							<div
								className={`${styles["location_message"]} rounded-2xl flex flex-col lg:flex-row bg-white text-center py-4 sm:py-8 px-6 w-10/12 xl:w-9/12 sm:space-x-5 max-w-60 overflow-hidden h-full relative`}
							>
								<div className="flex flex-col items-center justify-center lg:w-1/2 h-full">
									<div className=" hidden sm:block">
										<Image
											width={130}
											height={130}
											src={generalAssets["LocationIcon"]}
											alt="location"
										/>
									</div>
									<div className="mt-4">
										<TextPrimary
											translation="discover"
											elementType={
												textElementType.heading
											}
											headingLevel={4}
											className="medium text-black"
										>
											{locationFailed &&
											state.length === 0
												? "Current Location"
												: "Pick Location"}
										</TextPrimary>
										<TextPrimary
											translation="discover"
											className="text-2-xs sm:text-xs text-light-grey-6 mb-4 xl:mb-8"
										>
											{locationFailed &&
											state.length === 0
												? "We are having trouble getting your current location. Kindly select the state you are currently in."
												: "Pick a state to discover their projects"}
										</TextPrimary>

										<select
											className={`lg:hidden ${styles["discover-select-input"]} mb-5`}
											onChange={(e) => {
												setSelectedState(e.target.value)
											}}
											defaultValue={""}
											data-testid="location-select"
										>
											<option disabled value="">
												State
											</option>
											{statesJSON.map((state, index) => (
												<option
													key={state.name}
													value={state.name}
												>
													{state.name}
												</option>
											))}
										</select>

										<button
											className={`absolute sm:static inset-x-0 bottom-0 ${
												styles["map-button"]
											} sm:text-white w-full py-4 sm:py-3 rounded-full ${
												selectedState
													? "text-accepted sm:bg-accepted"
													: "text-light-grey-5 sm:bg-light-grey-5 cursor-not-allowed"
											}`}
											onClick={getStateProject}
											data-testid="choose-state_btn"
										>
											Submit
										</button>
									</div>
								</div>
								<div className="rounded-lg border border-grey-stroke overflow-y-scroll h-full lg:w-1/2 hidden lg:block">
									{statesJSON.map((state, index) => (
										<div key={state.name}>
											<button
												className={`text-left capitalize w-full p-4 text-sm hover:bg-accepted-light focus:accepted-light focus:outline-none ${
													selectedState ===
													state?.name
														? "bg-accepted-light"
														: "bg-white"
												}`}
												onClick={() => {
													setSelectedState(
														state?.name
													)
												}}
											>
												{state.name}
											</button>
											<div className="w-11/12 mx-auto border-b border-grey-stroke" />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)
			)}
		</div>
	)
}

export default AllowLocation
