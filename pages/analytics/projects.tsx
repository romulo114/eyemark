import AppLayout from "@/components/layouts/appLayout"
import TextPrimary from "@/components/shared/textPrimary"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { mdaSelector, setAnalytics } from "@/store/slices/mda.slice"
import { NextPage } from "next"
import Head from "next/head"
import { SyntheticEvent, useEffect, useState } from "react"
import {
	Chart,
	Series,
	CommonSeriesSettings,
	Legend,
	Tooltip,
	ArgumentAxis,
	Label,
} from "devextreme-react/chart"
import numeral from "numeral"

const Projects: NextPage = () => {
	const dispatch = useAppDispatch()
	const {
		analyticsData: { projects },
	} = useAppSelector(mdaSelector)

	const [projectSource, setprojectSource] = useState([])
	const [budgetSource, setbudgetSource] = useState([])

	const tooltip = (arg: { seriesName: string; valueText: string }) => {
		return {
			text: `${arg.seriesName} - ${arg.valueText}`,
		}
	}

	const budgetTooltip = (arg: {
		valueText: string
		argumentText: string
	}) => {
		return {
			text: `${arg.argumentText} - ${numeral(arg.valueText)
				.format("0.00a")
				.toUpperCase()}`,
		}
	}

	const changeProjectData = (event: SyntheticEvent<HTMLSelectElement>) => {
		const value = event.currentTarget.value
		setprojectSource(projects[value as keyof typeof projects])
	}

	const changeBudgetData = (event: SyntheticEvent<HTMLSelectElement>) => {
		const value = event.currentTarget.value
		setbudgetSource(projects[value as keyof typeof projects])
	}

	useEffect(() => {
		projects.States.length === 0 && dispatch(setAnalytics("projects"))
	}, [dispatch, projects.States.length])

	useEffect(() => {
		setprojectSource(projects["States"])
		setbudgetSource(projects["States"])
	}, [projects])

	return (
		<AppLayout full mda>
			<Head>
				<title>{`Eyemark - Analytics (Projects)`}</title>
			</Head>
			<div className="top-bar">
				<p className="text-dark-grey medium">Analytics (Projects)</p>
			</div>

			<div className="px-4 sm:px-8 py-8">
				<div className="flex justify-between mb-5">
					<div className="flex">
						<TextPrimary className="pl-3 pt-2 text-dark-grey medium">
							Projects
						</TextPrimary>
					</div>
				</div>

				<div className="hidden sm:flex justify-between mt-10">
					<div className="flex justify-between bg-white rounded-lg items-center space-x-4 w-[24%] py-4 px-4">
						<div className="h-2 w-2 bg-abandoned" />
						<TextPrimary className="text-xs text-black">
							ABANDONED
						</TextPrimary>
					</div>
					<div className="flex justify-between bg-white rounded-lg items-center space-x-4 w-[24%] py-4 px-4">
						<div className="h-2 w-2 bg-complete" />
						<TextPrimary className="text-xs text-black">
							COMPLETED
						</TextPrimary>
					</div>
					<div className="flex justify-between bg-white rounded-lg items-center space-x-4 w-[24%] py-4 px-4">
						<div className="h-2 w-2 bg-ongoing" />
						<TextPrimary className="text-xs text-black">
							ONGOING
						</TextPrimary>
					</div>
					<div className="flex justify-between bg-white rounded-lg items-center space-x-4 w-[24%] py-4 px-4">
						<div className="h-2 w-2 bg-onhold" />
						<TextPrimary className="text-xs text-black">
							ON-HOLD
						</TextPrimary>
					</div>
				</div>

				<>
					<div className="mt-10 flex justify-end">
						<select
							name=""
							defaultValue="States"
							id=""
							className="w-6/12 sm:w-4/12 h-10 select-input"
							onChange={changeProjectData}
						>
							<option value="States">States</option>
							<option value="Ministries">Ministries</option>
							<option value="SDGs">SDGs</option>
						</select>
					</div>
					<Chart
						className="mt-8"
						id="chart"
						title=""
						dataSource={projectSource}
					>
						<CommonSeriesSettings
							argumentField="name"
							type="stackedBar"
						/>
						<Series
							valueField="Abandoned"
							name="Abandoned"
							color="#C82C20"
						/>
						<Series
							valueField="Completed"
							name="Completed"
							color="#02903C"
						/>
						<Series
							valueField="Ongoing"
							name="Ongoing"
							color="#226AF5"
						/>
						<Series
							valueField="Onhold"
							name="On Hold"
							color="#ECD193"
						/>
						<ArgumentAxis>
							<Label
								rotationAngle={
									typeof window !== "undefined" &&
									window?.innerWidth >= 640
										? 40
										: 90
								}
								overlappingBehavior="rotate"
								textOverflow="ellipsis"
							/>
						</ArgumentAxis>
						<Legend
							verticalAlignment="bottom"
							horizontalAlignment="center"
							itemTextPosition="top"
							visible="false"
						/>
						<Tooltip
							enabled={true}
							location="edge"
							customizeTooltip={tooltip}
						/>
					</Chart>
				</>

				<div className="mb-3 mt-5">
					<p className="pl-3 pt-2 text-dark-grey medium">Budget</p>
					<hr />
				</div>

				<>
					<div className="mt-10 flex justify-end">
						<select
							defaultValue="States"
							className="w-6/12 sm:w-4/12 h-10 select-input"
							onChange={changeBudgetData}
						>
							<option value="States">States</option>
							<option value="Ministries">Ministries</option>
							<option value="SDGs">SDGs</option>
						</select>
					</div>
					<Chart
						id="chart"
						className="mt-8"
						dataSource={budgetSource}
					>
						<Series
							valueField="Budget"
							argumentField="name"
							name="Budget"
							type="bar"
							color="#ffaa66"
						/>
						<ArgumentAxis>
							<Label
								rotationAngle={
									typeof window !== "undefined" &&
									window?.innerWidth >= 640
										? 40
										: 90
								}
								overlappingBehavior="rotate"
								textOverflow="ellipsis"
							/>
						</ArgumentAxis>
						<Legend
							verticalAlignment="bottom"
							horizontalAlignment="center"
							itemTextPosition="top"
							visible="false"
						/>
						<Tooltip
							enabled={true}
							location="edge"
							customizeTooltip={budgetTooltip}
						/>
					</Chart>
				</>
			</div>
		</AppLayout>
	)
}

export default Projects
