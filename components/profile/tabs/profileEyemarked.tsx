import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { useState, FC } from "react"
import { searchIcon } from "@/public/assets/SVG/general"
import Image from "next/image"
import NoContent from "../../shared/noContent"
import {
	discoverSearchNoContent,
	noProfileEyeMarkedContent,
} from "@/constants/general/noContent"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { useRouter } from "next/router"
import { fetchProjects, profileSelector } from "@/store/slices/profile.slice"
import { notCitizen } from "@/helpers/general.helpers"
import ProjectCard from "@/components/project/projectCard"
import Paginator from "@/components/shared/paginator"
import DiscoverProjectCard from "@/components/project/discoverProjectCard"

const ProfileEyeMarked: FC<{ thirdParty: boolean }> = ({ thirdParty }) => {
	const {
		eyemarked,
		loading,
		user: { username, display_name, account_type },
		projects: { results, count },
	} = useAppSelector(profileSelector)
	const dispatch = useAppDispatch()

	const [query, setQuery] = useState<string>("")
	const [selectedPage, setSelectedPage] = useState(0)
	const { push } = useRouter()

	const goHome = () => push(citizensRoutes.dashboard)

	const handlePageClick = (data: any) => {
		setSelectedPage(data.selected)
		const page = data.selected + 1
		dispatch(fetchProjects({ username, account_type, page }))
	}

	return (
		<>
			<div className="flex-grow flex flex-col h-full">
				{!loading && (eyemarked.length > 0 || count > 0) && (
					<div className="relative flex items-center w-full mb-5 px-5">
						<div className="absolute left-10 lg:left-10">
							<Image src={searchIcon} />
						</div>
						<input
							type="text"
							className="py-4 text-sm focus:outline-none border border-input-border placeholder-input-border rounded-lg pl-10 pr-3 w-full"
							placeholder={
								thirdParty && notCitizen(account_type)
									? "Search Projects"
									: "Search eyemarked"
							}
							onChange={(e) => setQuery(e.currentTarget.value)}
						/>
					</div>
				)}

				<div
					className={`${
						eyemarked.length === 0 && count === 0 && "hidden"
					} flex-grow px-5 flex flex-wrap items-center sm:justify-start justify-center pb-10 lg:pb-0`}
				>
					{[...eyemarked, ...results]
						?.filter((project) =>
							project?.name
								?.toLowerCase()
								.includes(query.toLowerCase())
						)
						.map((project) => (
							<DiscoverProjectCard
								key={project.public_id}
								className="sm:w-1/2 md:w-4/12"
								{...project}
							/>
						))}
				</div>
				<div
					className={` h-full flex-grow px-5 flex flex-wrap items-center justify-center ${
						eyemarked.length === 0 && count === 0 && "py-10 sm:py-0"
					}
					`}
				>
					{!loading && eyemarked.length === 0 && count === 0 && (
						<NoContent
							onClick={goHome}
							{...noProfileEyeMarkedContent(
								thirdParty ? display_name : undefined,
								thirdParty && notCitizen(account_type)
							)}
						/>
					)}

					{!loading &&
						query.length > 0 &&
						eyemarked.length === 0 &&
						count == 0 && (
							<NoContent {...discoverSearchNoContent} />
						)}
				</div>
				{!loading && (
					<Paginator
						click={handlePageClick}
						count={count}
						selected={selectedPage}
					/>
				)}
			</div>
		</>
	)
}

export default ProfileEyeMarked
