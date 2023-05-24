/** @format */

import { FC } from "react"
import styles from "@/styles/discover.module.scss"
import ShowMore from "@/components/shared/showMore"
import InfoCard from "@/components/discover/infoCard"
import { useAppSelector } from "@/hooks/redux.hooks"
import { filterSelector } from "@/store/slices/filter.slice"
import { topPropTypes } from "@/@types/components/discover.types"
import DiscoverProjectCard from "../project/discoverProjectCard"

const Top: FC<topPropTypes> = ({
	citizens,
	mda,
	contractors,
	results,
	count,
	navigate,
	q
}) => {
	const { loading } = useAppSelector(filterSelector)

	const _handleShowMore = (value: string) => {
		typeof navigate === "function" && navigate(value)
	}

	return (
		<div className="py-8 px-0 lg:px-7 text-dark-grey relative flex-grow bg-gray-50">
			{results?.length > 0 && count >= 1 && (
				<div className="lg:mt-12 bg-white pt-6 sm:p-6 lg:rounded-lg relative border-b-4 lg:border-none border-grey-stroke" data-testid={`project-search_${q}`}>
					<p className="text-sm medium px-6 sm:p-0 ">
						Projects
						<span className="text-2-xs text-light-grey-5 ml-0.5 lg:hidden">
							({count})
						</span>
					</p>
					<div
						className={`${styles["top-projects-list"]} sm:px-0 px-6`}
						id="scroll-container1"
					>
						{results
							.slice(0, window.innerWidth > 769 ? 6 : 3)
							.map((project: any, index: number) => (
								<DiscoverProjectCard
									{...project}
									key={project.public_id + index}
									className="sm:w-6/12 xl:w-4/12"
								/>
							))}
					</div>
					{count > (window.innerWidth > 769 ? 6 : 3) && (
						<ShowMore
							state={false}
							show
							onClick={() => _handleShowMore("Projects")}
						/>
					)}
				</div>
			)}

			{mda.length > 0 && (
				<div className="lg:mt-12 bg-white pt-6 sm:pb-6 lg:rounded-lg border-b-4 lg:border-none border-grey-stroke">
					<p className="text-sm medium px-6">
						Ministries, Departments and Agencies (MDAs){" "}
						<span className="text-2-xs text-light-grey-5 ml-0.5 lg:hidden">
							({mda.length})
						</span>
					</p>
					<div className="mt-8 px-6">
						{mda.slice(0, 3).map((mda, index) => (
							<InfoCard
								key={mda?.public_id}
								{...{ info: mda, index, category: "mda" }}
							/>
						))}
					</div>
					<div className="sm:px-6">
						{mda.length > 3 && (
							<ShowMore
								state={false}
								show
								onClick={() => _handleShowMore("MDAs")}
							/>
						)}
					</div>
				</div>
			)}

			{contractors?.length > 0 && (
				<div className="lg:mt-12 bg-white pt-6 sm:pb-6 lg:rounded-lg  border-b-4 lg:border-none border-grey-stroke">
					<p className="text-sm medium px-6">
						Contractors{" "}
						<span className="text-2-xs text-light-grey-5 ml-0.5 lg:hidden">
							({contractors.length})
						</span>
					</p>
					<div className="mt-8 px-6">
						{contractors.slice(0, 3).map((contractor, index) => (
							<InfoCard
								key={contractor?.public_id}
								{...{
									info: contractor,
									index,
									category: "contractor",
								}}
							/>
						))}
					</div>
					<div className="sm:px-6">
						{contractors.length > 3 && (
							<ShowMore
								state={false}
								show
								onClick={() => _handleShowMore("Contractors")}
							/>
						)}
					</div>
				</div>
			)}

			{citizens.length > 0 && (
				<div className="lg:mt-12 bg-white pt-6 sm:pb-6 lg:rounded-lg border-b-4 lg:border-none border-grey-stroke">
					<p className="text-sm medium px-6">
						Citizens{" "}
						<span className="text-2-xs text-light-grey-5 ml-0.5 lg:hidden">
							({citizens.length})
						</span>
					</p>
					<div className="mt-8 px-6">
						{citizens.slice(0, 3).map((citizen, index) => (
							<InfoCard
								key={citizen?.public_id}
								{...{
									info: citizen,
									index,
									category: "citizen",
								}}
							/>
						))}
					</div>
					<div className="sm:px-6">
						{citizens.length > 3 && (
							<ShowMore
								state={false}
								show
								onClick={() => _handleShowMore("Citizens")}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Top
