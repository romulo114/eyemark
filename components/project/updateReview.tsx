import React, { FC, SyntheticEvent, useState } from "react"
import moment from "moment"
import Modal from "react-modal"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authSelector, toggleModal } from "@/store/slices/auth.slice"
import Image from "next/image"
import ReferencedUpdate from "./referenceUptate"
import Voting from "../discover/voting"
import {
	projectReview,
	sentimentString,
} from "@/@types/components/projects.types"
import { avatarPlaceholder } from "@/public/assets/PNG"
import CreatePostModal from "./postModal"
import MediaExpandedModal from "../shared/mediaExpandedModal"
import projectAssets from "@/public/assets/SVG/project"
import { sentimentEmojis } from "@/constants/general/defaults"
import styles from "@/styles/projectPage.module.scss"
import citizensStyles from "@/styles/appLayout.module.scss"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { useRouter } from "next/router"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"

const UpdateReview: FC<projectReview> = ({
	public_id,
	title,
	body,
	created,
	upvotes,
	downvotes,
	owner,
	images,
	reviews_count,
	parent,
	sentiment,
	sentiments,
	project,
}) => {
	const dispatch = useAppDispatch()

	const { is_authenticated } = useAppSelector(authSelector)
	const { push } = useRouter()
	const { avatar, display_name, public_id: owner_id } = owner

	const [imageIndex, setImageIndex] = useState(0)
	const [modal, setModal] = useState(0)

	const _handleModal = (
		e: SyntheticEvent<HTMLDivElement>,
		modalIndex: number
	) => {
		e.stopPropagation()
		if (modalIndex === 1) return setModal(modalIndex)
		if (!is_authenticated) {
			return dispatch(
				toggleModal({
					action: `Comment on "${title}"`,
					subtitle: " a review",
					show: true,
					modal_page: 0,
				})
			)
		}
		setModal(modalIndex)
	}

	function openImage(e: SyntheticEvent<HTMLDivElement>, index: number) {
		e.stopPropagation()
		_handleModal(e, 1)
		setImageIndex(index)
	}

	function closeModal() {
		setModal(0)
	}

	const onclickPost = () => push(`${generalRoutes.postInView}/${public_id}`)

	const userprofile = (e: SyntheticEvent<HTMLDivElement>) => {
		e.stopPropagation()
		push(`${citizensRoutes.profile}?user=${owner_id}`)
	}

	return (
		<div
			className="bg-white sm:rounded-lg w-full pt-4 sm:pt-6 mb-2 sm:mb-10 text-dark-grey max-w-650 mx-auto"
			id="update-review"
			onClick={onclickPost}
		>
			<div className={`${styles["author-details-group"]} px-4 sm:px-6`}>
				<div className={styles["profile-and-date"]}>
					<div
						className={styles["display-picture"]}
						onClick={userprofile}
					>
						<Image
							src={avatar || avatarPlaceholder}
							alt=""
							className="rounded-full object-cover h-9 w-9"
							width={36}
							height={36}
							objectFit="cover"
						/>
					</div>
					<div>
						<div className="flex items-center space-x-2">
							<h4
								className={`${styles["author-name"]} hover:underline cursor-pointer`}
								onClick={userprofile}
							>
								{display_name}
							</h4>
							<p className="text-xs text-input-border flex whitespace-nowrap">
								{sentimentString[sentiment] &&
									"is " + sentimentString[sentiment]}
								{sentimentString[sentiment] && (
									<Image
										src={sentimentEmojis[sentiment]}
										className="ml-1 h-4"
										width={16}
										height={16}
									/>
								)}
							</p>
						</div>
						<div className={styles["update-detail"]}>
							<p className={styles["posted"]}>
								{moment(created).fromNow()}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-3 px-4 sm:px-6">
				<p className={styles["post-title"]}>{title}</p>
				<p className="mt-2 text-xs">{body}</p>
			</div>

			<div className="flex space-x-3 overflow-x-auto mt-3 px-4 sm:px-6">
				{images.map((image, index) => (
					<div
						key={index}
						onClick={(e) => openImage(e, index)}
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

			{parent && (
				<div className="px-4 sm:px-6">
					<div className="mt-4 rounded-lg border border-grey-stroke cursor-pointer">
						<ReferencedUpdate {...parent} />
					</div>
				</div>
			)}

			<div className="flex justify-between items-center text-xs mt-4 px-4 sm:px-6">
				<Voting
					{...{
						upvotes,
						downvotes,
						title,
						postId: public_id,
						projectId: project.public_id,
					}}
				/>
				<div
					className="flex items-center space-x-1"
					onClick={(e) => _handleModal(e, 2)}
				>
					<Image
						src={projectAssets["commentWithDots"]}
						alt="comment"
						className="h-4"
						width={16}
						height={16}
					/>
					<p
						className={`${styles["users-comments"]} hover:underline cursor-pointer`}
					>
						{reviews_count === 1
							? reviews_count + " Comment"
							: reviews_count + " Comments"}
					</p>
				</div>
			</div>

			<div
				className={`${
					reviews_count >= 1
						? "border-t border-EB mx-4 sm:mx-6 "
						: "bg-dark-grey"
				} flex justify-center items-center text-xs mt-4 py-4 cursor-pointer sm:rounded-b-lg`}
				onClick={(e) => _handleModal(e, 2)}
			>
				{reviews_count >= 1 ? (
					<>
						<Image
							src={projectAssets["commentWithDots"]}
							alt="comment"
							className="h-4 mr-1"
							width={16}
							height={16}
						/>
						<p className="text-sm text-light-grey-2 medium ml-1">
							Comment
						</p>
					</>
				) : (
					<p className="text-xs text-light-grey-5 medium">
						Be the first to leave a comment on this review
					</p>
				)}
			</div>

			<Modal
				isOpen={modal === 1}
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
				isOpen={modal === 2}
				onRequestClose={closeModal}
				ariaHideApp={false}
				className={`w-11/12 sm:w-[560px] ${citizensStyles["default-modal"]}`}
				overlayClassName={citizensStyles["modal-overlay"]}
			>
				<CreatePostModal
					close={closeModal}
					post_id={public_id}
					project_id={project?.public_id}
					project={project}
					isReview
				/>
			</Modal>
		</div>
	)
}

export default UpdateReview
