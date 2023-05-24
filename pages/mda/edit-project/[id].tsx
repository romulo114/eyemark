import AppLayout from "@/components/layouts/appLayout"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	fetchSingleProject,
	projectSelector,
} from "@/store/slices/project.slice"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from "@/styles/editProject.module.scss"
import mdaAssets from "@/public/assets/SVG/mda"
import { editProjectBreadCrumb } from "@/constants/general/mda"
import { mdaRoutes } from "@/constants/AppRoutes/mda.routes"
import Image from "next/image"
import { editProjectImage } from "@/@types/components/mda.types"
import Information from "@/components/mda/edit-project/information"
import {
	createProjectSelector,
	setProject,
	_updateProject,
} from "@/store/slices/createProject"
import Location from "@/components/mda/edit-project/location"
import { setFrom } from "@/store/slices/filter.slice"
import ContractorPage from "@/components/mda/edit-project/contractor"
import BudgetPage from "@/components/mda/edit-project/budget"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"

const EditProject: NextPage = () => {
	const dispatch = useAppDispatch()
	const { push } = useRouter()
	const {
		query: { id, step: currentStep },
	} = useRouter()
	const {
		project: { public_id, name },
		project: project_edits,
	} = useAppSelector(createProjectSelector)

	const { project } = useAppSelector(projectSelector)

	useEffect(() => {
		dispatch(setProject(project))
		dispatch(setFrom("mda"))
	}, [project])

	useEffect(() => {
		id && dispatch(fetchSingleProject(id as string))
	}, [id])

	const resolve = () => {
		switch (currentStep) {
			case "one":
				return <Information />
			case "two":
				return <Location />
			case "three":
				return <ContractorPage />
			case "four":
				return <BudgetPage />
			default:
				return <></>
		}
	}

	const _handleNext = () => {
		let stepIndex = 0
		editProjectBreadCrumb.forEach(({ step }, index) => {
			currentStep === step && (stepIndex = index + 1)
		})
		push(
			`${mdaRoutes.editProject}/${public_id}?step=${editProjectBreadCrumb[stepIndex].step}`
		)
	}

	const _handleBack = () => {
		let stepIndex = 0
		editProjectBreadCrumb.forEach(({ step }, index) => {
			currentStep === step && (stepIndex = index - 1)
		})
		push(
			`${mdaRoutes.editProject}/${public_id}?step=${editProjectBreadCrumb[stepIndex].step}`
		)
	}

	const updateProject = () =>
		dispatch(
			_updateProject({
				projectId: public_id,
				project_edits,
			})
		)

	return (
		<AppLayout full>
			<div
				className={`${styles["projects-container"]} min-h-screen flex flex-col`}
			>
				<div
					className={`${styles["navigation1"]} flex items-center justify-between`}
				>
					<Link
						href={`${generalRoutes.project}/${public_id}`}
						className="truncate"
					>
						<p className={`${styles["nav-text"]} truncate`}>
							{name || "Edit Project"}
						</p>
					</Link>
					<div className="flex justify-between space-x-5">
						<div className="">
							<button
								className="px-8 py-1 rounded border border-input-border bg-white "
								onClick={updateProject}
							>
								Save
							</button>
						</div>
					</div>
				</div>
				<div className={`${styles["content"]} flex flex-col`}>
					<div
						className={`flex ${styles["project-sec-header"]} space-x-4`}
					>
						{currentStep && currentStep !== "four" && (
							<Image
								src={
									mdaAssets[
										currentStep as editProjectImage
									] || mdaAssets["one"]
								}
								alt={`step-${currentStep}`}
							/>
						)}

						<div>
							<p
								className={`${styles["project-sec-title"]} mb-2`}
							>
								Project Information
							</p>
							<p className={styles["project-sec"]}>
								{editProjectBreadCrumb.map(
									({ value, step }) => (
										<span
											key={step}
											className={`hover:text-black cursor-pointer ani ${
												step === currentStep &&
												"text-black"
											}`}
											onClick={() =>
												push(
													`${mdaRoutes.editProject}/${public_id}?step=${step}`
												)
											}
										>
											{value}{" "}
											{step !==
												editProjectBreadCrumb[
													editProjectBreadCrumb.length -
														1
												]["step"] && "/ "}
										</span>
									)
								)}
							</p>
						</div>
					</div>
					{resolve()}
					<div className="mt-14">
						<hr className="" />
						<div
							className={`flex ${
								currentStep === "one"
									? "justify-end"
									: "justify-between"
							} my-3`}
						>
							{currentStep !== "one" && (
								<div
									className={`${styles["previous-project"]} cursor-pointer`}
									onClick={_handleBack}
								>
									<p className={styles["previous-text"]}>
										Back
									</p>
								</div>
							)}
							{currentStep !== "four" && (
								<div
									className={`${styles["next-project"]} py-4 cursor-pointer`}
									onClick={_handleNext}
								>
									<p className={styles["next-text"]}>Next</p>
								</div>
							)}
						</div>
						<hr className="mt-3" />
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

export default EditProject
