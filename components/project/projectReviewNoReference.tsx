/** @format */

import {
	projectReviewNoRefPropType,
	sentimentString,
} from "@/@types/components/projects.types"
import { sentimentEmojis } from "@/constants/general/defaults"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { avatarPlaceholder } from "@/public/assets/PNG"
import { authSelector, toggleModal } from "@/store/slices/auth.slice"
import Image from "next/image"
import { FC, SyntheticEvent, useEffect, useState } from "react"
import Voting from "../discover/voting"
import MediaExpandedModal from "../shared/mediaExpandedModal"
import Modal from "react-modal"
import projectAssets from "@/public/assets/SVG/project"
import project from "@/public/assets/SVG/project"
import styles from "@/styles/projectPage.module.scss"
import TextPrimary from "../shared/textPrimary"
import citizensStyles from "@/styles/appLayout.module.scss"
import CreatePostModal from "./postModal"
import moment from "moment"
import { useRouter } from "next/router"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"

const ProjectReviewNoReference: FC<projectReviewNoRefPropType> = ({
	title,
	sentiment,
	projectId,
	images,
	owner,
	fromProject = false,
	reviews_count,
	comment,
	body,
	created,
	public_id,
	downvotes,
	upvotes,
	project,
	...review
}) => {
	const dispatch = useAppDispatch()

	const [modalState, setModalState] = useState(0)
	const [imageIndex, setImageIndex] = useState(0)

	const { is_authenticated } = useAppSelector(authSelector)
	const { avatar, display_name, public_id: owner_id } = owner
	const { push } = useRouter()

	const closeModal = () => setModalState(0)
	const userProfile = (e: SyntheticEvent<HTMLDivElement>) => {
		e.stopPropagation()
		push(`${citizensRoutes.profile}?user=${owner_id}`)
	}
	const openImage = (index: number, e: SyntheticEvent<HTMLDivElement>) => {
		e.stopPropagation()
		setImageIndex(index)
		setModalState(1)
	}

	const onClickPost = () => {
		push(`${generalRoutes.postInView}/${public_id}`)
	}
	useEffect(() => {
		if (!is_authenticated && modalState === 2) {
			setModalState(0)
			dispatch(
				toggleModal({
					text: `Comment on "${title}"`,
					subtitle: " a review",
					show: true,
					modal_page: 0,
				})
			)
		}
	}, [modalState])
	return (
		<div
			className={`bg-white rounded-lg p-4 sm:p-6 max-w-650 w-full mx-auto ${
				comment && "mb-2 sm:mb-10"
			}`}
			onClick={onClickPost}
		>
			<div>
				<div className="author-details-group">
					<div className={styles["profile-and-date"]}>
						<div
							className={`${styles["display-picture"]} flex-shrink-0`}
							onClick={userProfile}
						>
							<Image
								width="30%"
								height="30%"
								src={avatar || avatarPlaceholder}
								alt=""
								className="rounded-full object-cover h-9 w-9"
							/>
						</div>
						<div className="w-11/12 sm:w-10/12">
							<div className="flex items-center space-x-2">
								<h4
									className={`${styles["review-author-name"]} hover:underline cursor-pointer`}
									onClick={userProfile}
								>
									{display_name}
								</h4>
								<div className="flex items-center">
									<TextPrimary className="text-xs text-input-border flex whitespace-nowrap">
										{sentimentString[
											sentiment as sentimentString
										] &&
											`is ${
												sentimentString[
													sentiment as sentimentString
												]
											}`}
									</TextPrimary>
									{sentimentString[
										sentiment as sentimentString
									] && (
										<div className="ml-1 h-4">
											<Image
												src={
													sentimentEmojis[
														sentiment as sentimentString
													]
												}
												width="15%"
												height="15%"
											/>
										</div>
									)}
								</div>
							</div>
							<div className={styles["update-detail"]}>
								<TextPrimary className={styles["posted"]}>
									{moment(created).fromNow()}
								</TextPrimary>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-3">
					<TextPrimary className={styles["post-title"]}>
						{title}
					</TextPrimary>
					<TextPrimary className="mt-2 text-xs">{body}</TextPrimary>
				</div>
				<div className="flex space-x-3 overflow-x-auto mt-3 ">
					{images?.map((image: any, index: number) => (
						<div
							key={index}
							onClick={(e) => openImage(index, e)}
							className={`${styles["image-container"]}
								${images.length === 1 ? "w-full" : images.length === 2 ? "w-6/12" : "w-5/12"}`}
						>
							<div className={styles["post-image"]}>
								<Image src={image?.image} layout="fill" />
							</div>
						</div>
					))}
				</div>
			</div>

			<div>
				{fromProject || parent === null ? null : (
					<TextPrimary className={styles["view-project"]}>
						view Referenced Post
					</TextPrimary>
				)}

				<div className="flex justify-between items-center text-xs mt-7">
					<Voting
						{...{
							title,
							projectId,
							postId: public_id,
							downvotes,
							upvotes,
						}}
					/>
					<div
						className="flex items-center space-x-1 cursor-pointer"
						onClick={() => setModalState(2)}
					>
						<Image
							src={projectAssets["commentWithDots"]}
							alt="comment"
							className="h-4"
						/>
						<TextPrimary
							className={`${styles["users-comments"]} hover:underline cursor-pointer`}
						>
							{reviews_count === 1
								? `${reviews_count || 0} Comment`
								: `${reviews_count || 0} Comments`}
						</TextPrimary>
					</div>

					<div
						className="flex items-center space-x-1 cursor-pointer"
						onClick={() => setModalState(2)}
					>
						<Image
							src={projectAssets["comment"]}
							alt="comment"
							className="h-4"
						/>
						<TextPrimary
							className={`${styles["users-comments"]} hover:underline cursor-pointer`}
						>
							Reply
						</TextPrimary>
					</div>
				</div>
			</div>

			<Modal
				isOpen={modalState === 1}
				onRequestClose={closeModal}
				ariaHideApp={false}
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
					post_id={public_id}
					project_id={project?.public_id}
					review={{
						title,
						sentiment,
						images,
						owner,
						reviews_count,
						body,
						created,
						public_id,
						downvotes,
						upvotes,
						project,
						...review,
					}}
				/>
			</Modal>
		</div>
	)
}

export default ProjectReviewNoReference
