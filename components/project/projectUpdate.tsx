/** @format */

import moment from "moment"
import Modal from "react-modal"
import { FC, SyntheticEvent, useState } from "react"
import TextPrimary from "../shared/textPrimary"
import {
	projectReview,
	projectType,
	sentimentString,
} from "@/@types/components/projects.types"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { useRouter } from "next/router"
import { authSelector, toggleModal } from "@/store/slices/auth.slice"
import styles from "@/styles/projectPage.module.scss"
import projectAssets from "@/public/assets/SVG/project"
import * as generalAssets from "@/public/assets/SVG/general"
import {
	Angry,
	avatarPlaceholder,
	Excited,
	Hopeful,
	Impressed,
	ProjectDefault,
	Unimpressed,
} from "@/public/assets/PNG"
import { addPostID } from "@/store/slices/post.slice"
import { update_project } from "@/store/slices/project.slice"
import Image from "next/image"
import { accountIcon, sentimentEmojis } from "@/constants/general/defaults"
import { getAverageSentiment, notCitizen } from "@/helpers/general.helpers"
import ProjectInfo from "../discover/projectInfo"
import CreatePostModal from "./postModal"
import MediaExpandedModal from "../shared/mediaExpandedModal"
import Share from "../shared/share"
import citizensStyles from "@/styles/appLayout.module.scss"
import { AccountIconType } from "@/@types/components/general.types"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"

const ProjectUpdate: FC<{
	review: projectReview
	fromActivity?: boolean
	fromOverview?: boolean
}> = ({ review, fromActivity, fromOverview }) => {
	const dispatch = useAppDispatch()

	const { pathname, push } = useRouter()

	const {
		owner,
		created,
		title,
		public_id: post_id,
		body,
		project: subProject,
		upvotes,
		images,
		reviews_count,
	} = review

	const { display_name, account_type, avatar, public_id: owner_id } = owner

	const { is_authenticated, user } = useAppSelector(authSelector)

	const { angry, excited, impressed, hopeful, unimpressed, suggestion } =
		review?.sentiments

	const {
		name,
		total_project_cost,
		start_date,
		end_date,
		status,
		sentiments,
		project_type,
		public_id,
		geolocations,
	} = subProject

	const sentimentDisplay = [
		{ emoji: Impressed, number: impressed, fontColor: "text-accepted" },
		{ emoji: Excited, number: excited, fontColor: "text-excited" },
		{ emoji: Hopeful, number: hopeful, fontColor: "text-light-grey-2" },
		{
			emoji: Unimpressed,
			number: unimpressed,
			fontColor: "text-light-grey-5",
		},
		{ emoji: Angry, number: angry, fontColor: "text-abandoned" },
	]

	const [modalState, setModalState] = useState<number>(0)
	const [imageIndex, setImageIndex] = useState<number>(0)

	const _toggleModal = (index: number) => {
		if (!is_authenticated) {
			if (index === 3)
				return dispatch(
					toggleModal({
						text: `View "${title} Sentiments"`,
						subtitle: " an update",
						show: true,
						modal_page: 0,
					})
				)
			if (index === 2)
				return dispatch(
					toggleModal({
						text: `Review "${title}"`,
						subtitle: " a review",
						show: true,
						modal_page: 0,
					})
				)
		}
		setModalState(index)
	}

	function openImage(index: number, event: SyntheticEvent<HTMLDivElement>) {
		event.stopPropagation()
		_toggleModal(1)
		setImageIndex(index)
	}

	function closeModal() {
		_toggleModal(0)
	}

	const onClickPost = () => {
		push(`${generalRoutes.postInView}/${post_id}`)
	}

	const navigateToProfile = (e: SyntheticEvent<HTMLDivElement>) => {
		e.stopPropagation()
		push(`${citizensRoutes.profile}?user=${owner_id}`)
	}

	const handleProjectClick = (project: projectType) => {
		dispatch(update_project(project))
	}

	return (
		<div
			className={`bg-white sm:rounded-lg pt-4 sm:pt-6 mb-2 sm:mb-10 text-dark-grey max-w-650 mx-auto
        ${fromActivity && "w-full"} `}
			id="project-update"
			onClick={onClickPost}
		>
			<div className={`${styles["author-details-group"]} px-4 sm:px-6`}>
				<div className={styles["profile-and-date"]}>
					<div className={styles["display-picture"]}>
						<div
							className="rounded-full object-cover h-9 w-9"
							onClick={navigateToProfile}
						>
							<Image
								src={avatar || avatarPlaceholder}
								width="100%"
								height="100%"
								alt=""
							/>
						</div>
					</div>
					<div className="sm:w-7/12 overflow-x-hidden">
						<h4
							className={`${styles["author-name"]} hover:underline cursor-pointer`}
							onClick={navigateToProfile}
						>
							{display_name}
						</h4>
						<div className={styles["update-detail"]}>
							<TextPrimary className={styles["posted"]}>
								{moment(created).fromNow()}
							</TextPrimary>
						</div>
					</div>
				</div>
				<div className="flex items-center space-x-1">
					<TextPrimary className={styles["project-tag-text"]}>
						{account_type}
					</TextPrimary>
					<TextPrimary className={styles["project-tag-text"]}>
						{accountIcon[account_type as AccountIconType] || ""}
					</TextPrimary>
					<div className="h-2 hidden">
						<Image
							src={generalAssets["eyeMarkBlack"]}
							alt=""
							width="100%"
							height="100%"
						/>
					</div>
				</div>
			</div>
			<div className="mt-3 px-4 sm:px-6">
				<TextPrimary className={styles["post-title"]}>
					{title}
				</TextPrimary>
				<TextPrimary className="mt-2 text-xs">{body}</TextPrimary>
			</div>
			<div className="flex space-x-3 overflow-x-auto mt-3 px-4 sm:px-6 hide-scroll">
				{images.map((image, index) => (
					<div
						key={index}
						onClick={(e) => openImage(index, e)}
						className={`${styles["image-container"]}
							${images.length === 1 ? "w-full" : images.length === 2 ? "w-6/12" : "w-5/12"}
						`}
					>
						<Image
							src={image?.image}
							alt="post-image"
							layout="fill"
							className={styles["post-image"]}
						/>
					</div>
				))}
			</div>
			{!(fromOverview || fromActivity) && (
				<div className="px-4 sm:px-6">
					<div className="mt-4 rounded-lg border border-grey-stroke">
						<ProjectInfo {...subProject} />
					</div>
					<TextPrimary
						className={`${styles["view-project"]}`}
						onClick={(e) => {
							e.stopPropagation()
							handleProjectClick(subProject)
						}}
					>
						View Project
					</TextPrimary>
				</div>
			)}
			<div
				className={`flex justify-between text-xs mt-4 px-4 sm:px-6 ${
					notCitizen() && "mb-4"
				}`}
			>
				<div
					className={`space-x-1 items-center hidden ${
						styles["average-reaction"]
					}
						${
							getAverageSentiment(review?.sentiments) !== "_"
								? "lg:flex lg:w-4/12"
								: "lg:hidden"
						}`}
				>
					<div className="flex items-center">
						{upvotes?.votes.map((vote, index) => (
							<div
								key={index}
								className={`${styles["feedback-avatars"]} ${
									index === 0 && "-ml-1.5"
								}`}
							>
								<Image
									key={index}
									src={vote?.user?.avatar}
									width="100%"
									height="100%"
									alt=""
								/>
							</div>
						))}
					</div>

					<div
						className="text-light-grey-2 medium flex items-center cursor-pointer"
						onClick={() => _toggleModal(3)}
					>
						<p>
							{(getAverageSentiment(review?.sentiments) &&
								review?.sentiments[
									getAverageSentiment(
										review?.sentiments
									) as sentimentString
								]) +
								(review?.sentiments[
									getAverageSentiment(
										review?.sentiments
									) as sentimentString
								] > 1
									? " people are "
									: " person is ") +
								getAverageSentiment(review?.sentiments)}
						</p>
						<div className="ml-1 h-3">
							<Image
								src={
									sentimentEmojis[
										getAverageSentiment(
											review?.sentiments
										) as sentimentString
									]
								}
								width={12}
								height={12}
							/>
						</div>
					</div>
				</div>
				<div
					className={`flex lg:w-4/12 space-x-3 items-center cursor-pointer ${
						getAverageSentiment(review?.sentiments) !== "_"
							? "lg:justify-center"
							: "lg:justify-start"
					}`}
					onClick={() => _toggleModal(3)}
				>
					{sentimentDisplay
						.sort((a, b) => b.number - a.number)
						.map((eachSentiment, index) => (
							<div
								key={index}
								className="flex items-center space-x-0.5"
							>
								<Image
									src={eachSentiment.emoji}
									height="15%"
									width="15%"
								/>

								<TextPrimary
									className={eachSentiment.fontColor}
								>
									{eachSentiment.number}
								</TextPrimary>
							</div>
						))}
				</div>
				<div className="flex lg:w-4/12 lg:justify-end space-x-3">
					<div className="flex items-center space-x-1">
						<Image
							src={projectAssets["commentWithDots"]}
							alt="comment"
							className="h-4"
						/>
						<TextPrimary
							className={`${styles["users-comments"]} hover:underline`}
						>
							{reviews_count === 1
								? reviews_count + " Comment"
								: reviews_count + " Comments"}
						</TextPrimary>
					</div>
					<Share
						url={`/citizen/dashboard/feed/${post_id}`}
						title={title}
						image={
							images.length >= 1
								? images[0].image
								: ProjectDefault
						}
						body={body}
					/>
				</div>
			</div>
			{
				<div
					className={`${
						reviews_count >= 1
							? "border-t border-EB mx-4 sm:mx-6 "
							: "bg-dark-grey"
					} flex justify-center items-center text-xs mt-4 py-4 cursor-pointer sm:rounded-b-lg`}
					onClick={() => _toggleModal(2)}
				>
					{reviews_count > 0 ? (
						<>
							<Image
								src={projectAssets["commentWithDots"]}
								alt="comment"
								className="h-4"
								width={16}
								height={16}
							/>
							<TextPrimary className="ml-1 text-sm text-light-grey-2 medium">
								Comment
							</TextPrimary>
						</>
					) : (
						<TextPrimary className="text-xs text-light-grey-5 medium">
							Be the first to review this
						</TextPrimary>
					)}
				</div>
			}
			<Modal
				isOpen={modalState === 1}
				onRequestClose={closeModal}
				ariaHideApp={false}
				className={`sm:w-[90vw] w-screen  h-[99vh] ${citizensStyles["default-modal"]}`}
				overlayClassName={citizensStyles["modal-overlay"]}
			>
				<MediaExpandedModal
					close={closeModal}
					images={images}
					activeIndex={imageIndex}
				/>
			</Modal>
			<Modal
				isOpen={modalState === 2}
				onRequestClose={closeModal}
				ariaHideApp={false}
				className={`w-11/12 sm:w-[560px] ${citizensStyles["default-modal"]}`}
				overlayClassName={citizensStyles["modal-overlay"]}
			>
				<CreatePostModal
					close={closeModal}
					post_id={post_id}
					project_id={public_id}
					review={review}
					update
				/>
			</Modal>
			<Modal
				isOpen={modalState === 3}
				onRequestClose={closeModal}
				ariaHideApp={false}
				className={`${
					window.screen.width <= 500 ? "w-11/12" : "w-5/12 max-w-650"
				} ${styles["sentiment-modal"]}`}
				overlayClassName={styles["sentiment-overlay"]}
			>
				{/* <ExpandedSentiments
					close={closeModal}
					post_id={post_id}
					sentiments={review?.sentiments}
				/> */}
			</Modal>
		</div>
	)
}

export default ProjectUpdate
