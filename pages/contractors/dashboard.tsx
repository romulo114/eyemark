import { statusCount } from "@/@types/app.types"
import { textElementType } from "@/@types/components/general.types"
import AppLayout from "@/components/layouts/appLayout"
import TextPrimary from "@/components/shared/textPrimary"
import { generalRoutes, homeRoutes } from "@/constants/AppRoutes/general.routes"
import { projectGroups, status_color } from "@/constants/general/defaults"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authSelector } from "@/store/slices/auth.slice"
import { getOverview, mdaSelector } from "@/store/slices/mda.slice"
import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import mdaAsset from "@/public/assets/SVG/mda"
import citizenAsset from "@/public/assets/SVG/citizens"
import { mdaRoutes } from "@/constants/AppRoutes/mda.routes"
import Link from "next/link"
import moment from "moment"

const Contractors: NextPage = () => {
	const router = useRouter()

	const dispatch = useAppDispatch()
	const { user, is_authenticated } = useAppSelector(authSelector)
	const { overviewData } = useAppSelector(mdaSelector)

	const _handleProjectClick = (public_id: string) => {
		router.push(`${generalRoutes.project}/${public_id}`)
	}

	useEffect(() => {
		!is_authenticated && router.push(homeRoutes.home)

		!(overviewData.projects.count > 0) && dispatch(getOverview())
	}, [is_authenticated, overviewData.projects.count, dispatch])

	return (
		<AppLayout mda full>
			<Head>
				<title>{`Eyemark - Overview`}</title>
			</Head>
			<div className="top-bar">
				<p className="text-dark-grey medium">Overview</p>
			</div>

			<div className="mt-10 px-3 sm:px-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between my-5">
					<p className="text-dark-grey truncate text-sm medium">
						👋🏾{" "}
						<TextPrimary
							className="medium"
							elementType={textElementType.Span}
						>
							Welcome back
						</TextPrimary>
						, {user && user?.display_name}
					</p>
				</div>

				<div className="rounded-lg mt-3 p-4 overflow-hidden bg-FD w-full">
					<div className="flex justify-between items-start space-x-1">
						<div className="flex items-center space-x-2">
							<Image
								src={mdaAsset["projectIcon"]}
								height={12}
								width={12}
								alt="project"
							/>
							<TextPrimary
								translation="mda"
								className="uppercase text-2-xs medium truncate"
							>
								Project OVERVIEW
							</TextPrimary>
						</div>
						<div>
							<p className="text-2xl font-bold">
								{overviewData && overviewData.projects.count}
							</p>
							<TextPrimary
								translation="mda"
								className="text-2-xs uppercase text-input-border truncate"
							>
								No. of projects allocated
							</TextPrimary>
						</div>
					</div>
					<hr className="border-b border-light-grey-4 mt-3" />
					<div className="flex justify-between mt-4">
						{projectGroups
							.filter(
								({ value }) =>
									overviewData &&
									overviewData.projects.status_count[
										value as statusCount
									]
							)
							.map(({ name, value, color }) => (
								<div key={name} className="w-2/12">
									<p className="text-xl font-bold">
										{overviewData &&
											overviewData.projects.status_count[
												value as statusCount
											]}
									</p>
									<TextPrimary
										translation="mda"
										className={`${color} uppercase truncate medium text-2-xs`}
									>
										{name}
									</TextPrimary>
								</div>
							))}
					</div>
				</div>

				<div className="rounded-lg mt-3 p-4 overflow-hidden bg-white w-full">
					<div className="flex justify-between">
						<div className="flex items-center space-x-2">
							<Image
								src={mdaAsset["projectIcon"]}
								height={12}
								width={12}
								alt="project"
							/>
							<TextPrimary
								translation="mda"
								className="uppercase medium text-2-xs truncate"
							>
								MOST RECENT PROJECTS
							</TextPrimary>
						</div>
						<Link href={generalRoutes.projects}>
							<a className="uppercase text-input-border mt-1 text-2-xs">
								See All
							</a>
						</Link>
					</div>
					{overviewData &&
						overviewData.projects.data
							.slice(0, 5)
							.map(
								({
									public_id,
									name,
									status,
									start_date,
									end_date,
								}) => (
									<div
										key={public_id}
										onClick={() =>
											_handleProjectClick(public_id)
										}
										className="flex items-center mt-10 mb-5 space-x-4 cursor-pointer"
									>
										<div>
											<Image
												src={citizenAsset["Folder"]}
												width={40}
												height={40}
												alt="project"
											/>
										</div>
										<div className="w-10/12">
											<p className="text-sm medium truncate">
												{name}
											</p>
											<span className="flex items-center mt-1 space-x-3">
												<p
													className={`uppercase text-2-xs ${
														status_color[
															status as keyof typeof status_color
														]
													}`}
												>
													{status}
												</p>
												<p className="capitalize text-input-border truncate text-2-xs">
													{start_date &&
														moment(
															start_date
														).format(
															"MMM YYYY"
														)}{" "}
													-{" "}
													{end_date &&
														moment(end_date).format(
															"MMM YYYY"
														)}
												</p>
											</span>
										</div>
									</div>
								)
							)}
				</div>
			</div>
		</AppLayout>
	)
}

export default Contractors
