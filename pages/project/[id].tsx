/** @format */

import ProjectPageHeader from "@/components/project/projectPageHeader"
import CitizensLayout from "@/components/layouts/appLayout"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	fetchProjectActivities,
	fetchProjectMedia,
	fetchProjectReviews,
	fetchSingleProject,
	projectSelector,
} from "@/store/slices/project.slice"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import styles from "@/styles/projectPage.module.scss"
import CustomNav from "@/components/shared/customNav"
import { projectNav } from "@/constants/general/project"
import ProjectOverview from "@/components/project/tabs/overview"
import ProjectMedia from "@/components/project/tabs/media"
import ProjectReviews from "@/components/project/tabs/reviews"
import ProjectActivities from "@/components/project/tabs/activity"
import ProjectRightSideBar from "@/components/project/projectRightSideBar"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import CreateReview from "@/components/project/createReview"
import CreatePostModal from "@/components/project/postModal"
import Modal from "react-modal"
import citizensStyles from "@/styles/appLayout.module.scss"
import { authSelector, toggleModal } from "@/store/slices/auth.slice"
import Head from "next/head"
import { ProjectDefault } from "@/public/assets/PNG"

const ProjectPage: NextPage = () => {
	const dispatch = useAppDispatch()
	const [activeTab, setActiveTab] = useState(projectNav[0]["value"])
	const [modal, setModal] = useState<boolean>(false)
	const { project } = useAppSelector(projectSelector)
	const { is_authenticated, user } = useAppSelector(authSelector)
	const scrollRef = useRef<HTMLDivElement>(null)
	const {
		query: { id },
	} = useRouter()

	useEffect(() => {
		if (id) {
			dispatch(fetchSingleProject(id as string))
			dispatch(fetchProjectMedia(id as string))
			dispatch(fetchProjectReviews(id as string))
			dispatch(fetchProjectActivities(id as string))
		}
	}, [id])

	const _toggleModal = () => {
		if (!is_authenticated)
			return dispatch(
				toggleModal({
					text: `Review "${project.name}"`,
					subtitle: `sign up to never miss a review`,
					show: true,
					modal_page: 0,
				})
			)
		setModal((prev) => !prev)
	}

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
	}, [activeTab])

	return (
		<CitizensLayout
			sidebar={<ProjectRightSideBar />}
			layoutCenterRef={scrollRef}
		>
			<Head>
				<title>Eyemark - Project Overview</title>

				<meta property="og:title" content={project?.name} />
				<meta
					property="og:description"
					content={
						project?.description
							? project.description.length > 100
								? project.description.substring(0, 100) + "..."
								: project.description
							: ""
					}
				/>
				<meta
					property="og:image"
					content={project?.image ? project?.image : ProjectDefault}
				/>
				<meta
					property="og:url"
					content={`${window.location.origin}/project/${project?.public_id}/overview`}
				/>
				<meta property="og:locale" content="en_US" />
				<meta
					name="og:description"
					content={
						project?.description
							? project.description.length > 100
								? project.description.substring(0, 100) + "..."
								: project.description
							: ""
					}
				/>

				<meta
					name="description"
					content={
						project?.description
							? project.description.length > 100
								? project.description.substring(0, 100) + "..."
								: project.description
							: ""
					}
				/>
				<meta
					name="keywords"
					content={`
            ${project?.name}, ${project?.ministry?.display_name}, ${project?.contractor}, Eyemark, Discover Projects, government project`}
				/>

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={project?.name} />
				<meta
					name="twitter:description"
					content={
						project?.description
							? project.description.length > 100
								? project.description.substring(0, 100) + "..."
								: project.description
							: ""
					}
				/>
				<meta
					name="twitter:image"
					content={project?.image ? project?.image : ProjectDefault}
				/>
			</Head>

			<div
				className={`${styles["project-container"]} `}
				id="project-cont"
			>
				<ProjectPageHeader />
				<div className="sticky top-12 z-30 bg-grey-white">
					<CustomNav
						data={projectNav}
						active={activeTab}
						onChange={setActiveTab}
						className="bg-grey-white"
					/>
				</div>
				<div className="mt-12  h-full">
					{activeTab === projectNav[0]["value"] && (
						<ProjectOverview
							seeMore={(index) =>
								setActiveTab(projectNav[index]["value"])
							}
						/>
					)}
					{activeTab === projectNav[1]["value"] && (
						<ProjectActivities
							back={() => setActiveTab(projectNav[0]["value"])}
						/>
					)}
					{activeTab === projectNav[2]["value"] && (
						<ProjectMedia createPost={_toggleModal} />
					)}
					{activeTab === projectNav[3]["value"] && <ProjectReviews />}
				</div>
			</div>
			{!modal && <CreateReview openModal={_toggleModal} />}
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
					projectReview
				/>
			</Modal>
		</CitizensLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { locale } = context

	return {
		props: {
			...(await serverSideTranslations(locale, [
				"leftSidebar",
				"rightSidebar",
				"discover",
				"project",
				"login",
			])),
		},
	}
}
export default ProjectPage
