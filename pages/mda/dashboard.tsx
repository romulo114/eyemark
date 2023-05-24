/** @format */

import { textElementType } from "@/@types/components/general.types"
import AppLayout from "@/components/layouts/appLayout"
import TextPrimary from "@/components/shared/textPrimary"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authSelector } from "@/store/slices/auth.slice"
import { getOverview, mdaSelector } from "@/store/slices/mda.slice"
import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import mdaAsset from "@/public/assets/SVG/mda"
import citizenAsset from "@/public/assets/SVG/citizens"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import { mdaRoutes } from "@/constants/AppRoutes/mda.routes"
import moment from "moment"
import { projectGroups, status_color } from "@/constants/general/defaults"
import { defaultContractor } from "@/public/assets/PNG"
import { statusCount } from "@/@types/app.types"
import ReactModal from "react-modal"
import styles from "@/styles/appLayout.module.scss"
import InviteContractor from "@/components/mda/inviteContractor"
import UpdateProjects from "@/components/mda/updateProjects"
import UploadAppropriation from "@/components/mda/uploadAppropriation"
import { useRouter } from "next/router"
import { generalRoutes, homeRoutes } from "@/constants/AppRoutes/general.routes"

const MDA: NextPage = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const { overviewData } = useAppSelector(mdaSelector)
	const { user, is_authenticated } = useAppSelector(authSelector)
	const { push } = useRouter()
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [modal, setModal] = useState<number>(0)

	const quickActions = [
		{ name: "Import Projects", icon: mdaAsset.importProjects, param: 1 },
		{
			name: "Invite Contractor",
			icon: mdaAsset.inviteContractor,
			param: 2,
		},
		{
			name: "Upload Yearly Appropriation",
			icon: mdaAsset.importProjects,
			param: 3,
			admin: true,
		},
	]

	const _handleProjectClick = (public_id: string) =>
		push(`${generalRoutes.project}/${public_id}`)

	const openModal = (param: number) => {
		setModal(param)
	}

	const closeModal = () => {
		setModal(0)
	}

	useEffect(() => {
		!is_authenticated && router.push(homeRoutes.home)

		!(overviewData.projects.count > 0) && dispatch(getOverview())
		setIsAdmin(user?.account_type === "ADMIN")
	}, [])

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

				<div className="flex sm:flex-nowrap lg:space-x-5 sm:space-x-2 flex-wrap mb-4">
					<div className="rounded-lg mt-3 sm:mt-0 p-4 overflow-hidden bg-FD sm:w-6/12 w-full">
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
									{overviewData &&
										overviewData.projects.count}
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
												overviewData.projects
													.status_count[
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

					<div className="rounded-lg mt-3 sm:mt-0 p-4 overflow-hidden bg-FD flex flex-col justify-between sm:w-6/12 w-full">
						<div className="flex items-center space-x-2">
							<Image
								src={mdaAsset["contractorIcon"]}
								height={12}
								width={12}
								alt="contractor"
							/>
							<TextPrimary
								translation="mda"
								className="uppercase text-2-xs medium truncate"
							>
								Contractor OVERVIEW
							</TextPrimary>
						</div>
						<p className="mt-4 sm:mt-0 text-2xl font-bold">
							{overviewData && overviewData.contractors.count}
						</p>
						<TextPrimary
							translation="mda"
							className="mt-4 sm:mt-0 text-2-xs uppercase text-input-border truncate"
						>
							No. of contractors on-board
						</TextPrimary>
					</div>
				</div>

				<div className="flex sm:flex-nowrap lg:space-x-5 sm:space-x-2 flex-wrap mb-4 overflow-hidden">
					<div className="rounded-lg mt-3 sm:mt-0 p-4 overflow-hidden bg-white lg:w-5/12 sm:w-6/12 w-full">
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
									Projects
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
															moment(
																end_date
															).format(
																"MMM YYYY"
															)}
													</p>
												</span>
											</div>
										</div>
									)
								)}
					</div>

					<div className="rounded-lg mt-3 sm:mt-0 p-4 bg-white sm:w-6/12 lg:w-4/12 w-full">
						<div className="flex justify-between">
							<div className="flex items-center space-x-2">
								<Image
									src={mdaAsset["contractorIcon"]}
									height={12}
									width={12}
									alt="contractor"
								/>
								<TextPrimary
									translation="mda"
									className="uppercase medium text-2-xs truncate"
								>
									Contractors
								</TextPrimary>
							</div>
							<Link href={mdaRoutes.contractors}>
								<a className="uppercase text-input-border mt-1 text-2-xs">
									See All
								</a>
							</Link>
						</div>
						<div className="overflow-hidden">
							{overviewData &&
								overviewData.contractors.data
									.slice(0, 5)
									.map(
										({ display_name, avatar, created }) => (
											<div
												key={display_name}
												className="flex w-full items-center mt-10 mb-5"
											>
												<img
													src={
														avatar
															? avatar
															: defaultContractor
													}
													alt="avatar"
													className="w-9 h-9 border border-grey-stroke rounded-full object-contain"
												/>
												<div className="flex-grow ml-3">
													<TextPrimary
														translation="mda"
														className="text-sm w-full medium truncate"
													>
														{display_name}
													</TextPrimary>
													<span className="flex items-center mt-1 space-x-3">
														<TextPrimary
															translation="mda"
															className="uppercase text-2-xs text-accepted"
														>
															Accepted
														</TextPrimary>
														<p className="capitalize text-input-border text-2-xs truncate flex-grow">
															Joined{" "}
															{moment(
																created
															).format(
																"MMM Do YYYY"
															)}
														</p>
													</span>
												</div>
											</div>
										)
									)}
						</div>
					</div>

					<div className="sm:w-3/12 w-full sm:hidden lg:block">
						<div className="rounded-lg mt-3 sm:mt-0 p-4 overflow-hidden bg-FD h-full">
							<div className="flex items-center space-x-2">
								<Image
									src={mdaAsset["quickActions"]}
									height={12}
									width={12}
									alt="quick-actions"
								/>
								<TextPrimary
									translation="mda"
									className="uppercase text-2-xs medium truncate"
								>
									Quick Actions
								</TextPrimary>
							</div>
							<div className="flex flex-col mt-4 h-5/6 ">
								{quickActions
									.filter((value) =>
										value.admin ? isAdmin && value : value
									)
									.map(({ name, icon, param }) => (
										<button
											key={name}
											className="mt-4 border border-light-grey-4 bg-white py-4 px-2 text-center flex flex-col items-center w-full rounded"
											onClick={() => openModal(param)}
										>
											<Image src={icon} alt="action" />
											<p className="capitalize mt-2 text-2-xs">
												{name}
											</p>
										</button>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<ReactModal
				isOpen={modal !== 0}
				onRequestClose={closeModal}
				className={`w-11/12 sm:w-[560px] ${styles["default-modal"]}`}
				overlayClassName={styles["modal-overlay"]}
				ariaHideApp={false}
			>
				{modal === 1 ? (
					<UpdateProjects close={closeModal} />
				) : modal === 2 ? (
					<InviteContractor close={closeModal} />
				) : (
					modal === 3 && <UploadAppropriation close={closeModal} />
				)}
			</ReactModal>
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

export default MDA
