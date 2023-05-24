import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import projectAssets from "@/public/assets/SVG/project"
import {
	createProjectSelector,
	updateProject,
} from "@/store/slices/createProject"
import Modal from "react-modal"
import statesJSON from "@/constants/general/states.json"
import lgaJSON from "@/constants/general/lga.json"
import Image from "next/image"
import { FC, useState } from "react"
import mdaAssets from "@/public/assets/SVG/mda"
import styles from "@/styles/editProject.module.scss"
import citizensStyles from "@/styles/appLayout.module.scss"

const Location: FC = () => {
	const dispatch = useAppDispatch()
	const {
		project: { geolocations },
	} = useAppSelector(createProjectSelector)
	const [modalIsOpen, setIsOpen] = useState(false)
	const [locationBody, setLocationBody] = useState({
		longitude: 0,
		latitude: 0,
		index: 0,
	})
	const [new_coordinates, setNewCoordinates] = useState<any>({})
	const [new_state, setNewState] = useState("")
	const [new_lga, setNewLga] = useState("")

	/* Add/Remove Location Set Data */
	const setNewLongLat = () => {
		if (locationBody?.index === geolocations.length) {
			setNewCoordinates({
				longitude: locationBody?.longitude,
				latitude: locationBody?.latitude,
			})
			return
		}
		onChangeGeo(locationBody?.index, "coordinates", {
			longitude: locationBody?.longitude,
			latitude: locationBody?.latitude,
		})
		clearLongLat()
	}

	const addNewLocationSet = () => {
		let locations: any[] = [...geolocations]
		locations[geolocations.length] = {
			coordinates: new_coordinates,
			state: new_state,
			lga: new_lga,
		}
		_addProjectInfo("geolocations", locations)
		clearNewLocation()
	}

	const removeNewLocationSet = (index: number) => {
		let locations = [...geolocations]
		locations.splice(index, 1)
		_addProjectInfo("geolocations", locations)
	}
	/* Add/Remove Location Set Data */

	/* Clear/Reset Location Data */
	const clearNewLocation = () => {
		setNewCoordinates({})
		setNewState("")
		setNewLga("")
	}

	const clearLongLat = () => {
		setLocationBody({ longitude: 0, latitude: 0, index: 0 })
	}
	/* Clear/Reset Location Data */

	/* Modal Methods */

	function openModal(i: number) {
		setLocationBody({
			...locationBody,
			longitude: geolocations[i]?.coordinates?.longitude,
			latitude: geolocations[i]?.coordinates?.latitude,
			index: i,
		})
		setIsOpen(true)
	}

	function closeModal() {
		setIsOpen(false)
	}
	/* Modal Methods */

	const onChangeGeo = (index: number, geo_var: string, value: any) => {
		let locations = [...geolocations]
		let single_location = { ...locations[index] }

		single_location[geo_var] = value
		if (geo_var === "state") {
			//reset the lga and coordinates when you change the state
			single_location["lga"] = ""
		}
		locations[index] = single_location
		_addProjectInfo("geolocations", locations)
	}

	const _addProjectInfo = (name: string, value: any) =>
		dispatch(updateProject({ name, value }))

	return (
		<div className="flex-grow flex flex-col justify-between">
			<div>
				<div className="flex mt-10 items-center space-x-4">
					<div className={styles["location-count-cont"]}>
						<p className={styles["location-no"]}>
							{geolocations?.length}
						</p>
						<p className={`${styles["location-title-text"]} mt-5`}>
							ADDED LOCATION(S)
						</p>
					</div>
					<div className="">
						<p className={styles["p-location"]}>
							Project Location(s)
						</p>
						<p className={`${styles["b-location"]} pt-1`}>
							Please provide beneficiary locations(s) for this
							project
						</p>
					</div>
				</div>
				<div className={`${styles["form-control-l"]} mt-8 relative`}>
					<div className="flex flex-wrap sm:flex-nowrap justify-between sm:space-x-4 lg:space-x-6">
						<div className="relative flex items-center w-4/12">
							<div className="absolute left-3">
								<Image
									src={mdaAssets["pointer"]}
									alt="pointer"
								/>
							</div>
							<input
								value={
									new_coordinates?.longitude &&
									new_coordinates?.longitude
										? new_coordinates?.longitude +
										  "," +
										  new_coordinates?.latitude
										: ""
								}
								onChange={() => {}}
								onClick={() => openModal(geolocations?.length)}
								className={`w-full ${styles["text-input-withicon"]} pl-10 pr-3`}
								placeholder="Long, Lat"
							/>
						</div>
						<div className="relative flex items-center w-4/12">
							<div className="absolute left-3">
								<Image
									src={mdaAssets["GPZIcon"]}
									alt="pointer"
								/>
							</div>
							<select
								name="states"
								id="states"
								className={`w-full ${styles["select-input-withicon"]} pl-14 pr-3`}
								onChange={(e) => setNewState(e.target.value)}
								value={new_state}
							>
								<option disabled value="">
									State
								</option>
								{statesJSON.map((state) => (
									<option
										key={state?.name}
										value={state?.name}
									>
										{state.name}
									</option>
								))}{" "}
							</select>
						</div>
						<div className="w-3/12">
							<select
								name="lgas"
								id="lgas"
								className={`w-full ${styles["select-input"]}`}
								value={new_lga}
								onChange={(e) => setNewLga(e.target.value)}
							>
								<option disabled value="">
									Local Government Area
								</option>
								{(lgaJSON as any)[new_state]?.map(
									(lga: string) => (
										<option key={lga} value={lga}>
											{lga}
										</option>
									)
								)}
							</select>
						</div>
						<div className="w-1/12">
							<button
								className={styles["rmIcon"]}
								onClick={() => addNewLocationSet()}
							>
								<Image
									className="max-h-6"
									src={mdaAssets["add"]}
								/>
							</button>
						</div>
					</div>
				</div>
				<div className="mt-12">
					<p className="text-right text-sm my-4">
						Click the plus button to add a state
					</p>
					<hr className="mb-10" />
					{geolocations?.map((location, i) => (
						<div
							className={`${styles["form-control-l"]} mt-6 relative`}
							key={i}
						>
							<div className="flex flex-wrap sm:flex-nowrap justify-between sm:space-x-4 lg:space-x-6">
								<div className="relative flex items-center w-4/12">
									<div className="absolute left-3">
										<Image
											src={mdaAssets["pointer"]}
											alt="pointer"
										/>
									</div>
									<input
										value={
											location?.coordinates?.longitude &&
											location?.coordinates?.longitude
												? location?.coordinates
														?.longitude +
												  ", " +
												  location?.coordinates
														?.latitude
												: ""
										}
										className={`w-full ${styles["text-input-withicon"]} pl-10 pr-3`}
										placeholder="Long, Lat"
										onChange={(e) =>
											onChangeGeo(
												i,
												"location",
												e.target.value
											)
										}
										onClick={() => openModal(i)}
									/>
								</div>
								<div className="relative flex items-center w-4/12">
									<div className="absolute left-3">
										<Image
											src={mdaAssets["GPZIcon"]}
											alt="pointer"
										/>
									</div>
									<select
										name="states"
										id="states"
										defaultValue=""
										className={`w-full ${styles["select-input-withicon"]} pl-14 pr-3`}
										onChange={(e) =>
											onChangeGeo(
												i,
												"state",
												e.target.value
											)
										}
										value={location?.state}
									>
										<option disabled value="">
											State
										</option>
										{statesJSON.map((state) => (
											<option
												key={state?.name}
												value={state?.name}
											>
												{state.name}
											</option>
										))}{" "}
									</select>
								</div>
								<div className="w-3/12">
									<select
										name="lgas"
										id="lgas"
										defaultValue=""
										className={`w-full ${styles["select-input"]}`}
										value={location?.lga}
										onChange={(e) =>
											onChangeGeo(
												i,
												"lga",
												e.target.value
											)
										}
									>
										<option disabled value="">
											Local Government Area
										</option>
										{(lgaJSON as any)[location?.state]?.map(
											(lga: string) => (
												<option key={lga} value={lga}>
													{lga}
												</option>
											)
										)}
									</select>
								</div>
								<div className="w-1/12">
									<button
										className={styles["rmIcon"]}
										onClick={() => removeNewLocationSet(i)}
									>
										<Image
											className=""
											src={projectAssets["removeIcon"]}
										/>
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				className={`w-11/12 sm:w-[560px] ${citizensStyles["default-modal"]}`}
				overlayClassName={citizensStyles["modal-overlay"]}
				ariaHideApp={false}
			>
				<div className="bg-cream py-7 px-12 medium">
					<p>Add Location</p>
					<p className="mt-2 text-sm">
						Please provide the longitude and latitude of the
						location
					</p>

					<div className="pb-20">
						<div className="mt-10 flex space-x-4">
							<input
								className={`w-6/12 ${styles["text-input"]}`}
								placeholder="Longitude"
								type="number"
								value={locationBody?.longitude}
								onChange={(e) =>
									setLocationBody({
										...locationBody,
										longitude: parseFloat(e.target.value),
									})
								}
							/>
							<input
								className={`w-6/12 ${styles["text-input"]}`}
								placeholder="Latitude"
								type="number"
								value={locationBody?.latitude}
								onChange={(e) =>
									setLocationBody({
										...locationBody,
										latitude: parseFloat(e.target.value),
									})
								}
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-end py-6 px-7 bg-brown">
					<button
						className="text-white bg-pending rounded-full px-5 py-2 medium text-sm"
						disabled={
							!locationBody.latitude || !locationBody.longitude
						}
						onClick={() => {
							setNewLongLat()
							closeModal()
						}}
					>
						Add Location(s)
					</button>
				</div>
			</Modal>
		</div>
	)
}

export default Location
