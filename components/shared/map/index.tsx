/** @format */

import React, {
	SyntheticEvent,
	useState,
	MouseEvent,
	KeyboardEvent,
	FC,
} from "react"
import Modal from "react-modal"
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import statesCoordinates from "@/constants/general/state_coordinates.json"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import * as generalAssets from "@/public/assets/SVG/general"
import { discoverSelector } from "@/store/slices/discover.slice"
import Image from "next/image"
import { statesKey } from "@/@types/components/general.types"
import { toast } from "react-toastify"
import AllowLocation from "./allowLocation"
import ProjectInfo from "@/components/discover/projectInfo"
import TextPrimary from "../textPrimary"

const ProjectsMap: FC<{ mapLocation?: any[]; full?: boolean }> = ({
	mapLocation,
	full,
}) => {
	const {
		projectsAround,
		projectSource,
		location,
		changingProjectSource,
		state,
	} = useAppSelector(discoverSelector)

	const [modalIsOpen, setIsOpen] = useState(false)

	const marker = new L.Icon({
		iconUrl: "/assets/SVG/general/projectMarker.svg",
		iconRetinaUrl: "/assets/SVG/general/projectMarker.svg",
		iconSize: [42, 42],
	})

	const openModal = (e: SyntheticEvent<HTMLButtonElement>) => {
		setIsOpen(true)
		if (e.stopPropagation) e.stopPropagation()
	}

	const closeModal = (
		e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
	) => {
		setIsOpen(false)
		if (e.stopPropagation) e.stopPropagation()
	}

	if (!mapLocation && projectsAround && projectsAround?.count === 0)
		return (
			<TextPrimary
				translation="discover"
				className="text-center text-xs text-brown mx-auto py-12"
			>
				No projects yet, come back later 😔
			</TextPrimary>
		)

	if ((!location || changingProjectSource) && !mapLocation)
		return <AllowLocation map />

	return (
		<figure
			className={`sm:rounded-lg overflow-hidden  ${
				full ? "h-full" : "h-72"
			}`}
		>
			<button className="hidden" onClick={openModal}>
				<Image
					width="40%"
					height="40%"
					src={generalAssets["expand"]}
					alt="expand"
				/>
			</button>
			<div className="rounded-lg overflow-hidden relative h-full z-10">
				<MapContainer
					style={{ height: "100%", width: "100%" }}
					center={
						mapLocation
							? [
									mapLocation[0]?.geolocations[0]?.coordinates
										?.latitude || 6.5244,
									mapLocation[0]?.geolocations[0]?.coordinates
										?.longitude || 3.3792,
							  ]
							: projectSource === "state" &&
							  projectsAround &&
							  projectsAround?.count !== 0
							? [
									statesCoordinates[state]?.coordinates?.lat,
									statesCoordinates[state]?.coordinates?.lng,
							  ]
							: projectsAround && [location?.lat, location?.lng]
					}
					zoom={11}
					scrollWheelZoom={false}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					{[
						...(mapLocation ||
							(projectsAround && projectsAround?.results)),
					]
						?.filter(
							(project: any) =>
								project?.geolocations[0]?.coordinates
									?.latitude &&
								project?.geolocations[0]?.coordinates?.longitude
						)
						?.map((project: any, index: number) => {
							const { latitude, longitude } =
								project?.geolocations[0]?.coordinates
							return (
								<Marker
									key={project.public_id + index}
									icon={marker}
									position={[latitude, longitude]}
								>
									<Popup>
										<ProjectInfo {...project} fromMap />
									</Popup>
								</Marker>
							)
						})}
				</MapContainer>
			</div>
		</figure>
	)
}

export default ProjectsMap
