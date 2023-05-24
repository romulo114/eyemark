/** @format */

import { FC, useEffect } from "react"
import tabStyles from "@/styles/tab.module.scss"
import { tabType } from "@/@types/components/general.types"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	fetchSuggestions,
	onboardingSelector,
} from "@/store/slices/onboarding.slice"
import ProjectTab from "../project/projectTab"

const Tab: FC<tabType> = ({ tabOpen, sendTab, auth_modal }) => {
	const { suggestions: suggestionList } = useAppSelector(onboardingSelector)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchSuggestions())
	}, [])

	return (
		<>
			<div className="flex flex-wrap h-full overflow-hidden">
				<div className="w-full h-full">
					<ul
						className="flex border-b mb-0 list-none flex-wrap pt-3 flex-row"
						role="tablist"
					>
						<li className="-mb-px mr-2 last:mr-0 flex-auto">
							<a
								className={
									"text-sm medium py-3 block leading-normal pl-3 " +
									(tabOpen === 1
										? tabStyles["tabs-active"]
										: tabStyles["tabs-default"])
								}
								onClick={(e) => {
									sendTab(false)
									e.preventDefault()
								}}
								data-toggle="tab"
								href="#link1"
								role="tablist"
							>
								<i className=""></i> Projects
							</a>
						</li>
					</ul>
					<div className="relative flex flex-col break-words bg-white w-full pb-16 sm:pb-8 h-full">
						<div className="sm:px-4 pt-5 pb-10 flex-auto my-5 overflow-y-scroll h-full">
							<div
								className={`${tabStyles["tab-content"]} ${
									tabStyles["tab-space"]
								} ${auth_modal && "pb-14 lg:pb-8"}`}
							>
								<div className={tabOpen === 1 ? "block" : "hidden"} id="link1">
									{(suggestionList as any)?.projects?.map((suggestion: any) => (
										<ProjectTab suggestion={suggestion} key={suggestion.id} />
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Tab
