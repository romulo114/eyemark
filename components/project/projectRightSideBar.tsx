/** @format */

import React, { useEffect, useState } from "react"
import moment from "moment"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authSelector } from "@/store/slices/auth.slice"
import { projectSelector } from "@/store/slices/project.slice"
import {
	eyeMarkSelector,
	fetchEyeMarkedProjects,
} from "@/store/slices/eyeMark.slice"
import { getAverageSentiment, notCitizen } from "@/helpers/general.helpers"
import { sentimentEmojis } from "@/constants/general/defaults"
import { sentimentString } from "@/@types/components/projects.types"
import Image from "next/image"
import citizensAssets from "@/public/assets/SVG/citizens"
import { EyeMarkButton } from "../shared/buttons/eyeMarkButton"
import SearchInput from "../shared/search"
import { arrowForwardGrey } from "@/public/assets/SVG/general"
import { useRouter } from "next/router"
import { mdaRoutes } from "@/constants/AppRoutes/mda.routes"
import CreatePostModal from "./postModal"
import Modal from "react-modal"
import citizensStyles from "@/styles/appLayout.module.scss"

export default function ProjectRightSideBar() {
	const dispatch = useAppDispatch()
	const [modal, setModal] = useState<boolean>(false)
	const { push } = useRouter()
	const {
		is_authenticated,
		user: { account_type },
	} = useAppSelector(authSelector)
	const { project } = useAppSelector(projectSelector)
	const { eyeMarkedProjects } = useAppSelector(eyeMarkSelector)

	const _toggleModal = () => {
		setModal((prev) => !prev)
	}

	useEffect(() => {
		if (eyeMarkedProjects.length === 0 && is_authenticated)
			dispatch(fetchEyeMarkedProjects())
	}, [])

	const editProject = () =>
		push(`${mdaRoutes.editProject}/${project.public_id}?step=one`)

	return (
		<div
			className={`${
				!notCitizen(account_type) && "pt-6"
			} w-full border-l h-screen flex flex-col relative overflow-y-auto`}
		>
			<div>
				{notCitizen(account_type) && (
					<div className="h-16 px-6 items-center flex justify-end border-b border-grey-stroke">
						<button
							className="bg-accepted text-white rounded-full py-2 px-4 text-xs medium"
							onClick={_toggleModal}
						>
							Post Update
						</button>
					</div>
				)}
			</div>
			<div className="px-6">
				{!notCitizen(account_type) && <SearchInput />}
				<div className=" mt-12 flex flex-col items-center">
					<Image src={citizensAssets["Folder"]} className="h-32" />
					<div className="mt-4">
						{notCitizen(account_type) ? (
							account_type !== "CONTRACTOR" && (
								<button
									className="mt-5 py-2 px-6 border border-dark-grey rounded"
									onClick={editProject}
								>
									<p className="text-sm">Edit Project</p>
								</button>
							)
						) : (
							<EyeMarkButton
								projectId={project.public_id}
								projectName={project.name}
								className="px-4"
							/>
						)}
					</div>
				</div>
				<div className="mt-8 flex justify-between medium">
					<div>
						<p className="text-2-xs text-input-border uppercase">
							eyemarked
						</p>
						<p className="text-sm text-dark-grey text-center">
							{project?.eyemarked_count || 0}
						</p>
					</div>
					<div>
						<p className="text-2-xs text-input-border uppercase">
							REVIEWS
						</p>
						<p className="text-sm text-dark-grey text-center">
							{project?.reviews_count || 0}
						</p>
					</div>
					<div>
						<p className="text-2-xs text-input-border uppercase">
							AVG. SENTIMENT
						</p>
						<div className="flex items-center space-x-1">
							<Image
								src={
									getAverageSentiment(project?.sentiments) &&
									sentimentEmojis[
										getAverageSentiment(
											project?.sentiments
										).toLowerCase() as sentimentString
									]
								}
								height={16}
								width={16}
								className="h-4"
							/>
							<p className="text-sm text-dark-grey capitalize">
								{getAverageSentiment(project?.sentiments)}
							</p>
						</div>
					</div>
				</div>

				{notCitizen(account_type) && (
					<p className="text-xs text-input-border text-center mt-10">
						PROJECT CODE - {project?.code}
					</p>
				)}

				<hr className="mt-8" />

				<div
					className={`${!notCitizen(account_type) && "hidden"} mt-6`}
				>
					<div className="flex space-x-3">
						<Image src={arrowForwardGrey} className="" />
						<div>
							<p className="text-xs medium">
								{project?.sectors?.map((sector) => sector)}
							</p>
							<p className="mt-1 text-2-xs text-input-border">
								SECTORS
							</p>
						</div>
					</div>

					<div className="flex space-x-3 mt-3">
						<Image src={arrowForwardGrey} className="" />
						<div>
							<p className="text-xs medium">
								{project?.contract_type}
							</p>
							<p className="mt-1 text-2-xs text-input-border">
								CONTRACT TYPE
							</p>
						</div>
					</div>
					<hr className="my-6" />
				</div>

				<div
					className={`${
						notCitizen(account_type) && "hidden"
					}  pl-4 py-6 space-y-7`}
				>
					<div className="flex items-center space-x-3">
						<p className="text-accepted medium">•</p>
						<div>
							<p className="medium text-dark-grey text-sm uppercase">
								{project?.code}
							</p>
							<p className="text-input-border text-2-xs uppercase">
								PROJECT CODE
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<p className="text-accepted medium">•</p>
						<div>
							<p className="medium text-dark-grey text-sm uppercase">
								{project?.contract_type}
							</p>
							<p className="text-input-border text-2-xs uppercase">
								Contract type
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<p className="text-accepted medium">•</p>
						<div>
							<p className="medium text-dark-grey text-sm">
								{project?.sectors &&
									project?.sectors.map((sector, index) =>
										project?.sectors.length > 1 &&
										index !== project?.sectors.length - 1
											? sector + ", "
											: sector
									)}
							</p>
							<p className="text-input-border text-2-xs uppercase">
								Sector
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<p className="text-accepted medium">•</p>
						<div>
							<p className="medium text-dark-grey text-sm uppercase">
								{project?.plan}
							</p>
							<p className="text-input-border text-2-xs uppercase">
								Plan
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<p className="text-accepted medium">•</p>
						<div>
							<p className="medium text-dark-grey text-sm uppercase">
								{project?.department
									? project?.department
									: "-"}
							</p>
							<p className="text-input-border text-2-xs uppercase">
								department
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`px-6 pb-6 ${
					notCitizen(account_type) && "bottom-0 fixed w-[22%]"
				}`}
			>
				{project?.modified && (
					<p className="text-right medium text-input-border text-2-xs uppercase mb-2 ">
						Last MODIFIED:{" "}
						{moment(project?.modified).format("DD/MM/YYYY HH:mm")}
					</p>
				)}
				<hr />
				<p className="mt-3 text-2-xs text-light-grey-2">
					Eyemark © 2021. All rights reserved.
				</p>
			</div>
			<Modal
				isOpen={modal}
				onRequestClose={_toggleModal}
				ariaHideApp={false}
				className={`w-11/12 sm:w-[560px] ${citizensStyles["default-modal"]}`}
				overlayClassName={citizensStyles["modal-overlay"]}
			>
				<CreatePostModal
					close={_toggleModal}
					project_id={project.public_id}
					project={project}
					// projectReview
					update
				/>
			</Modal>
		</div>
	)
}
