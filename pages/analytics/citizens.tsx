import AppLayout from "@/components/layouts/appLayout"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { mdaSelector, setAnalytics } from "@/store/slices/mda.slice"
import { NextPage } from "next"
import Head from "next/head"
import { SyntheticEvent, useEffect, useState } from "react"
import {
	Chart,
	Legend,
	Series,
	Label,
	Font,
	Connector,
	CommonSeriesSettings,
	ArgumentAxis,
	Tooltip,
} from "devextreme-react/chart"
import PieChart from "devextreme-react/pie-chart"
import numeral from "numeral"
import TextPrimary from "@/components/shared/textPrimary"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const CitizenAnalytics: NextPage = ({}) => {
	const dispatch = useAppDispatch()
	const {
		analyticsData: { users },
	} = useAppSelector(mdaSelector)

	const { Total, Registration, Gender } = users

	const [userInterests, setUserInterests] = useState([])

	const tableHead = [
		{ name: "#", classname: "w-1/12" },
		{ name: "Location", classname: "w-4/12" },
		{ name: "1 - 18", classname: "w-1/12 text-center" },
		{ name: "18 - 24", classname: "w-1/12 text-center" },
		{ name: "24 - 32", classname: "w-1/12 text-center" },
		{ name: "32 - 48", classname: "w-1/12 text-center" },
		{ name: "48 - 60", classname: "w-1/12 text-center" },
		{ name: "60 - 84", classname: "w-1/12 text-center" },
	]

	const genderText = (arg: { argument: string; valueText: string }) => {
		return `${arg.argument}: ${numeral(arg.valueText).format("a")}`
	}

	const verificationText = (arg: {
		argument: string
		percentText: string
	}) => {
		return `${arg.argument}: ${arg.percentText}`
	}

	const interestsText = (arg: { argument: string; percentText: string }) => {
		return `${arg.argument}: ${arg.percentText}`
	}

	const changeInterestData = (event: SyntheticEvent<HTMLSelectElement>) => {
		setUserInterests(
			users["User Interests"][
				event.currentTarget
					.value as keyof typeof users["User Interests"]
			]
		)
	}

	useEffect(() => {
		users.Total === 0 && dispatch(setAnalytics("users"))
	}, [dispatch, users.Total])

	useEffect(() => {
		setUserInterests(users["User Interests"]["States"])
	}, [users])

	return (
		<AppLayout full mda>
			<Head>
				<title>{`Eyemark - Analytics (Citizens)`}</title>
			</Head>
			<div className="top-bar">
				<p className="text-dark-grey medium">Analytics (Citizens)</p>
			</div>
			<div className="px-4 sm:px-8 py-8">
				<div className="flex justify-between mb-5">
					<div className="flex">
						<p className="pl-3 pt-2 text-dark-grey medium">
							Citizens
						</p>
					</div>
				</div>
				<div className="mb-3 mt-5">
					<p className="pl-3 pt-2 text-dark-grey medium">Users</p>
					<hr />
				</div>

				<div>
					<p className="pl-3 my-7 text-dark-grey medium text-xl">
						{Total} Users
					</p>

					<Chart palette="Harmony Light" dataSource={Registration}>
						<CommonSeriesSettings
							argumentField="month"
							type="splinearea"
						/>
						<Series
							valueField="count"
							name="User Count"
							color="#FF5547"
						></Series>
						<ArgumentAxis valueMarginsEnabled={false} />
						<Legend
							verticalAlignment="bottom"
							horizontalAlignment="center"
						/>
					</Chart>

					<PieChart
						className="mt-20"
						id="pie"
						palette="Soft Blue"
						dataSource={Gender}
					>
						<Legend
							orientation="horizontal"
							itemTextPosition="right"
							horizontalAlignment="center"
							verticalAlignment="bottom"
							columnCount={4}
						/>
						<Series argumentField="gender" valueField="number">
							<Label
								visible={true}
								position="columns"
								customizeText={genderText}
							>
								<Font size={14} />
								<Connector visible={true} width={0.3} />
							</Label>
						</Series>
					</PieChart>

					<PieChart
						className="mt-20"
						id="pie"
						palette="Green Mist"
						dataSource={users["Verification Status"]}
					>
						<Legend
							orientation="horizontal"
							itemTextPosition="right"
							horizontalAlignment="center"
							verticalAlignment="bottom"
							columnCount={4}
						/>
						<Series argumentField="status" valueField="number">
							<Label
								visible={true}
								position="columns"
								customizeText={verificationText}
							>
								<Font size={14} />
								<Connector visible={true} width={0.3} />
							</Label>
						</Series>
					</PieChart>

					<div className="mt-28">
						<div className="mb-3">
							<p className="pl-3 pt-2 text-dark-grey medium">
								User Interests
							</p>
							<hr />
						</div>
						<div className="mt-10 flex justify-end">
							<select
								defaultValue="States"
								className="w-6/12 sm:w-4/12 h-10 select-input"
								onChange={changeInterestData}
							>
								<option value="States">States</option>
								<option value="Ministries">Ministries</option>
								<option value="SDGs">SDGs</option>
								<option value="Sectors">Sectors</option>
							</select>
						</div>
						<Chart
							id="user-chart"
							className="mt-8"
							dataSource={userInterests}
						>
							<Series
								valueField="count"
								argumentField="name"
								name="Interest"
								type="bar"
								color="#E4AA24"
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
								customizeTooltip={interestsText}
							/>
						</Chart>
					</div>

					<div className="mb-3 mt-16">
						<TextPrimary className="pl-3 pt-2 text-dark-grey medium">
							The populace for each age range
						</TextPrimary>
						<hr />

						{users["Age range"] && (
							<div className="nav-content ph">
								<table className="w-full table-auto mt-5">
									<thead>
										<tr className="flex justify-between items-center text-sm">
											{tableHead.map((header) => (
												<td
													key={header.name}
													className={`flex-shrink-0 medium ${header.classname}`}
												>
													{header.name}
												</td>
											))}
										</tr>
									</thead>
									<tbody>
										<tr className="mt-4 flex justify-between items-center text-sm">
											<td className="w-1/12 flex-shrink-0">
												<p> 1</p>
											</td>
											<td className="w-4/12 flex-shrink-0">
												<p>Total</p>
											</td>
											<td className="w-1/12 flex-shrink-0 text-center">
												<p>
													{
														users["Age range"][
															"Total"
														]["Below 18"]
													}
												</p>
											</td>
											<td className="w-1/12 flex-shrink-0 text-center">
												<p>
													{
														users["Age range"][
															"Total"
														]["18-24"]
													}
												</p>
											</td>
											<td className="w-1/12 flex-shrink-0 text-center">
												<p>
													{
														users["Age range"][
															"Total"
														]["24-32"]
													}
												</p>
											</td>
											<td className="w-1/12 flex-shrink-0 text-center">
												<p>
													{
														users["Age range"][
															"Total"
														]["32-48"]
													}
												</p>
											</td>
											<td className="w-1/12 flex-shrink-0 text-center">
												<p>
													{
														users["Age range"][
															"Total"
														]["48-60"]
													}
												</p>
											</td>
											<td className="w-1/12 flex-shrink-0 text-center">
												<p>
													{
														users["Age range"][
															"Total"
														]["above 60"]
													}
												</p>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>
		</AppLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { req, locale } = context
	return protectRoute(req, {
		props: {
			...(await serverSideTranslations(locale, ["leftSidebar"])),
			// Will be passed to the page component as props
		},
	})
}

export default CitizenAnalytics
