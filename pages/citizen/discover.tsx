/** @format */

import DiscoverSearch from "@/components/discover/search"
import VerticalOverviewCard from "@/components/discover/verticalOverviewCard"
import CitizensLayout from "@/components/layouts/appLayout"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import styles from "@/styles/discover.module.scss"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	discoverSelector,
	fetchDiscoverProjects,
	fetchDiscussedProjects,
	fetchNearingCompletion,
	fetchPopularReviews,
	fetchProjectsAround,
	fetchProjectTags,
	setDistance,
	setLocationFailed,
	showFromState,
	usingLocation,
	usingState,
} from "@/store/slices/discover.slice"
import Head from "next/head"
import { authSelector, toggleModal } from "@/store/slices/auth.slice"
import TextPrimary from "@/components/shared/textPrimary"
import TagsHeader from "@/components/discover/tagsHeader"
import {
	filterSelector,
	setActiveTag,
	setFrom,
} from "@/store/slices/filter.slice"
import DiscoverProjectCard from "@/components/project/discoverProjectCard"
import * as generalAssets from "@/public/assets/SVG/general"
import dynamic from "next/dynamic"
import Image from "next/image"
import Filter from "@/components/shared/filter"
import AllowLocation from "@/components/shared/map/allowLocation"
import Modal from "react-modal"
import citizensStyles from "@/styles/appLayout.module.scss"
import LocationSvg from "@/public/assets/reactSVG/discover/location"
import DownAngle from "@/public/assets/reactSVG/discover/downAngle"
import { distanceRange } from "@/constants/general/distance"
import NoContent from "@/components/shared/noContent"
import {
	discoverNoContent,
	discoverSearchNoContent,
} from "@/constants/general/noContent"
const ProjectsMap = dynamic(() => import("@/components/shared/map"), {
	ssr: false,
})

const Citizens: NextPage = () => {
	const dispatch = useAppDispatch()
	const [activeView, setActiveView] = useState<string>("grid")
	const {
		location,
		loading,
		discoverProjects,
		projectSource,
		state,
		distance: activeDistance,
		tags,
	} = useAppSelector(discoverSelector)
	const {
		discover: { activeTag },
		from,
	} = useAppSelector(filterSelector)
	const { is_authenticated } = useAppSelector(authSelector)
	const scrollRef = useRef<HTMLDivElement>(null)
	const [modal, setModal] = useState<boolean>(false)

	const init = () => {
		if (
			(activeTag.length === 0 || activeTag === "aroundMe") &&
			tags.length > 0 &&
			discoverProjects.count === 0
		) {
			dispatch(setActiveTag(tags[0]))
			return dispatch(fetchDiscoverProjects())
		}
	}
	useEffect(() => {
		init()
	}, [tags])

	useEffect(() => {
		dispatch(fetchProjectTags())
		dispatch(setFrom("discover"))
	}, [])

	const _toggleModal = (showState?: boolean) => {
		from !== "discover" && dispatch(setFrom("discover"))
		if (location && !showState)
			return dispatch(
				fetchProjectsAround({ location, dist: `${activeDistance}` })
			)

		if (state && !showState) return dispatch(showFromState(state))

		location && dispatch(usingState({}))
		setModal((prev) => !prev)
	}

	const _handleLogin = () => {
		dispatch(
			toggleModal({
				show: true,
				action: "",
				subtitle: "",
				modal_page: 1,
			})
		)
	}

	const _handleDistance = (distance: number) => {
		from !== "discover" && dispatch(setFrom("discover"))
		dispatch(fetchProjectsAround({ location, dist: `${distance}` }))
		dispatch(setDistance(distance))
	}

	const _handleLocation = () => {
		dispatch(setLocationFailed(false))
		dispatch(usingLocation())
		location ? _handleDistance(activeDistance) : setModal(true)
	}

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
	}, [activeTag])

	return (
		<CitizensLayout full layoutCenterRef={scrollRef}>
			<Head>
				<title>{`Eyemark  - Discover`}</title>
			</Head>
			<div className="sticky top-0 z-50">
				<div className="w-full bg-white flex lg:px-6 px-2 relative items-center justify-between">
					<div
						className={`${
							!is_authenticated && "md:w-11/12"
						} w-full`}
					>
						<DiscoverSearch />
					</div>
					<Filter
						className="md:hidden mr-0"
						dropContainerClassName="mr-8 md:mr-0 top-0"
					/>
					{!is_authenticated && (
						<div
							className={`md:flex bg-grey-white cursor-pointer  hidden items-center font-bold text-xs py-2 px-4 mr-2 flex-shrink-0 border-grey-stroke border rounded-full `}
							onClick={_handleLogin}
						>
							<TextPrimary>Login</TextPrimary>
						</div>
					)}
				</div>
				<TagsHeader
					{...{
						activeView,
						setActiveView,
						toggleLocation: () => _toggleModal(),
					}}
				/>
			</div>

			{discoverProjects.count > 0 ? (
				<>
					<div className="h-full  p-6">
						{activeView === "grid" && (
							<div className="flex flex-wrap p-0 pb-28 sm:pb-0" data-testid='discover-projects'>
								{discoverProjects?.results?.map(
									(project, index) => (
										<DiscoverProjectCard
											{...project}
											key={`${project.public_id}${index}`}
											activeTag={activeTag}
										/>
									)
								)}
							</div>
						)}
						{activeView === "map" && discoverProjects.count > 0 && (
							<ProjectsMap
								mapLocation={discoverProjects?.results}
								full
							/>
						)}
					</div>
					<div
						className={`${
							activeTag !== "aroundMe" && "hidden"
						} flex justify-center w-full cursor-pointer fixed lg:bottom-16  bottom-[10%] z-50 `}
					>
						<div className="bg-white flex space-x-2 h-10 flex-shrink-0 items-center rounded-full   px-4 text-sm duration-500">
							{location && projectSource === "location" ? (
								distanceRange.map(({ label, distance }) => (
									<div
										key={label}
										className={`${
											distance === activeDistance
												? "bg-accepted"
												: "bg-light-grey-5"
										} text-xs rounded-full px-2 py-1 font-bold flex-shrink-0 text-white`}
										onClick={() =>
											_handleDistance(distance)
										}
									>
										{label}
									</div>
								))
							) : (
								<LocationSvg onClick={_handleLocation} />
							)}
							<div className="h-full w-[1px] bg-EB" />
							<div
								className="flex items-center space-x-2"
								onClick={() => _toggleModal(true)}
							>
								<p className="text-light-grey-5 text-xs font-bold">
									{state?.length > 0 ? state : "Choose State"}
								</p>
								<DownAngle />
							</div>
						</div>
					</div>
				</>
			) : (
				!loading && (
					<div className="flex h-full  items-center justify-center mt-6">
						<NoContent {...discoverNoContent} />
					</div>
				)
			)}
			<Modal
				isOpen={modal}
				onRequestClose={() => setModal((prev) => !prev)}
				ariaHideApp={false}
				className={`w-11/12 sm:w-7/12 sm:h-7/12 h-1/3 ${citizensStyles["secondary-modal"]}`}
				overlayClassName={citizensStyles["modal-overlay"]}
			>
				<AllowLocation toggleLocation={() => _toggleModal(true)} />
			</Modal>
		</CitizensLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { req, locale } = context
	return protectRoute(req, {
		props: {
			...(await serverSideTranslations(locale, [
				"leftSidebar",
				"rightSidebar",
				"discover",
				"project",
				"login",
			])),
			// Will be passed to the page component as props
		},
	})
}

export default Citizens
