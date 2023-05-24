import Image from "next/image"
import { FC, useRef, useState } from "react"
import GridView from "@/public/assets/reactSVG/discover/gridView"
import MapView from "@/public/assets/reactSVG/discover/mapView"
import AroundYou from "@/public/assets/reactSVG/discover/aroundYou"
import DownAngle from "@/public/assets/reactSVG/discover/downAngle"
import Filter from "../shared/filter"
import LeftScrollSvg from "@/public/assets/reactSVG/discover/leftScroll"
import RightScrollSvg from "@/public/assets/reactSVG/discover/rightScroll"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	discoverSelector,
	fetchDiscoverProjects,
} from "@/store/slices/discover.slice"
import {
	filterSelector,
	setActiveTag,
	setFrom,
} from "@/store/slices/filter.slice"
import {
	tagHeaderPropTypes,
	tagsAssetsType,
} from "@/@types/components/discover.types"
import styles from "@/styles/discover.module.scss"
import { tagsAssets } from "@/constants/general/discover"
import MajorRoadsSvg from "@/public/assets/reactSVG/general/tags/majorRoads"

const TagsHeader: FC<tagHeaderPropTypes> = ({
	activeView,
	setActiveView,
	toggleLocation,
}) => {
	const container = useRef<HTMLDivElement>(null)
	const dispatch = useAppDispatch()
	const { tags } = useAppSelector(discoverSelector)
	const {
		discover: { activeTag },
		from,
	} = useAppSelector(filterSelector)

	const [showDropDown, setShowDropDown] = useState<boolean>(false)

	const _handleLeftScroll = () => {
		container.current?.scrollBy({
			left: window.screen.width <= 500 ? -200 : -350,
			top: 0,
			behavior: "smooth",
		})
	}
	const _handleRightScroll = () => {
		container.current?.scrollBy({
			left: window.screen.width <= 500 ? 200 : 350,
			top: 0,
			behavior: "smooth",
		})
	}
	const _handleTagSelect = (tag: string) => {
		from !== "discover" && dispatch(setFrom("discover"))
		dispatch(setActiveTag(tag))
		dispatch(fetchDiscoverProjects())
	}

	const _handleViewChange = (view: string, drop?: boolean) => {
		view !== "list" && setActiveView(view)
		drop && _toggleDropDown()
	}

	const viewItems = [
		{ view: "grid", Icon: GridView },
		{ view: "map", Icon: MapView },
	]
	const _toggleDropDown = () => setShowDropDown((prev) => !prev)

	return (
		<div className="bg-white relative h-20 z-30 border-t border-EB md:px-6 px-3 py-4 flex justify-between items-center w-full" data-testid={`project-view_${activeView}`}>
			<LeftScrollSvg
				onClick={_handleLeftScroll}
				className="absolute cursor-pointer hidden md:block left-0"
			/>
			<div className="flex relative items-center space-x-2 h-full mr-2 md:ml-4 flex-shrink-0 " data-testid="set-project_view">
				{viewItems.map(({ Icon, view }) => (
					<Icon
						key={view}
						onClick={() =>
							_handleViewChange(view, activeView === view)
						}
						data-testid={view === 'map' ? "set-view_map" : "set-view_grid"}
						active={activeView === view}
						className={`lg:block cursor-pointer flex-shrink-0 ${
							activeView === view ? "block" : "hidden"
						}`}
					/>
				))}
				<DownAngle
					className="md:hidden flex-shrink-0"
					onClick={_toggleDropDown}
				/>

				<div
					className={`${
						activeTag === "aroundMe" &&
						"text-accepted bg-accepted-light"
					} md:flex bg-grey-white cursor-pointer w-fit hidden items-center font-bold text-xs p-2 flex-shrink-0 border-grey-stroke border rounded-full `}
					onClick={toggleLocation}
					data-testid="around-you_pill"
				>
					<AroundYou
						active={activeTag === "aroundMe"}
						className="mr-1.5"
					/>
					Around You!
				</div>

				{showDropDown && (
					<div className={`${styles["tag-header-view"]}  sm:hidden`}>
						{viewItems.map(({ Icon, view }) => (
							<Icon
								key={view}
								onClick={() => _handleViewChange(view, true)}
								active={activeView === view}
								className={` ${
									activeView === view && "hidden"
								}`}
							/>
						))}
					</div>
				)}

				<div className="h-full bg-grey-stroke w-[1px]" />
			</div>
			<div
				className="flex w-full space-x-2 h-full items-center overflow-x-auto hide-scroll pr-4"
				ref={container}
			>
				<div
					className={`${
						activeTag === "aroundMe" &&
						"text-accepted bg-accepted-light"
					} flex bg-grey-white cursor-pointer md:hidden w-fit items-center font-bold text-xs p-2 flex-shrink-0 border-grey-stroke border rounded-full `}
					onClick={toggleLocation}
				>
					<AroundYou
						active={activeTag === "aroundMe"}
						className="mr-1.5"
					/>
					Around You!
				</div>
				{tags?.map((tag: string) => {
					const Icon =
						tagsAssets[tag as tagsAssetsType] || MajorRoadsSvg
					return (
						<div
							key={tag}
							className={`flex w-fit  items-center text-xs p-2 flex-shrink-0 cursor-pointer rounded-full border border-grey-stroke bg-grey-white ${
								tag === activeTag && "text-white bg-accepted"
							}`}
							onClick={() => _handleTagSelect(tag)}
							data-testid={`tag-${tag.replace(/\s/g, '')}`}
						>
							<Icon
								active={tag === activeTag}
								className="mr-1.5"
							/>
							<p>{tag}</p>
						</div>
					)
				})}
			</div>
			<Filter className=" hidden md:block" />
			<RightScrollSvg
				onClick={_handleRightScroll}
				className="absolute cursor-pointer right-0 hidden md:block"
			/>
		</div>
	)
}

export default TagsHeader
