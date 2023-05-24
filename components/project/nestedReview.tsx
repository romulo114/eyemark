import {
	projectReview,
	sentimentString,
} from "@/@types/components/projects.types"
import { sentimentEmojis } from "@/constants/general/defaults"
import { avatarPlaceholder } from "@/public/assets/PNG"
import { authSelector, toggleModal } from "@/store/slices/auth.slice"
import moment from "moment"
import Image from "next/image"
import { FC, SyntheticEvent, useState } from "react"
import Voting from "../discover/voting"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import CreatePostModal from "./postModal"
import MediaExpandedModal from "../shared/mediaExpandedModal"
import styles from "@/styles/projectPage.module.scss"
import citizensStyles from "@/styles/appLayout.module.scss"
import Modal from "react-modal"
import projectAssets from "@/public/assets/SVG/project"
import { useRouter } from "next/router"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"

const NestedReview: FC<projectReview> = ({
	public_id,
	title,
	body,
	created,
	upvotes,
	downvotes,
	owner,
	images,
	parent,
	sentiment,
	reviews_count,
	project,
}) => {
	const dispatch = useAppDispatch()
	const { is_authenticated } = useAppSelector(authSelector)
	const { avatar, display_name, public_id: owner_id } = owner
	const [imageIndex, setImageIndex] = useState(0)
	const [modal, setModal] = useState(0)
	const { push } = useRouter()

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

	const closeModal = () => setModal(0)

	const openPost = () => push(`${generalRoutes.postInView}/${public_id}`)
	const userprofile = (e: SyntheticEvent<HTMLDivElement>) => {
		e.stopPropagation()
		push(`${citizensRoutes.profile}?user=${owner_id}`)
	}
	return (
		<div className="flex max-w-650 mx-auto">
			<div className="lg:w-1/12 w-2/12 px-2 flex flex-col items-center">
				<div className="border border-grey-stroke h-6"></div>
				<div
					className={`${styles["display-picture"]} flex-shrink-0 my-1.5`}
					onClick={userprofile}
				>
					<Image
						src={avatar || avatarPlaceholder}
						alt="Eyemark"
						className="h-full object-cover w-full"
						width={"100%"}
						height={"100%"}
						objectFit="cover"
					/>
				</div>
				<div className="border border-grey-stroke h-full"></div>
			</div>
			<div className="bg-white rounded-lg p-4 sm:p-6 mb-4 w-10/12 lg:w-11/12">
				<div className={styles["author-details-group"]}>
					<div className="flex items-center w-full">
						<div className="sm:w-7/12">
							<div className="inline-flex items-center cursor-pointer space-x-2">
								<h4
									className={`${styles["review-author-name"]} hover:underline `}
									onClick={userprofile}
								>
									{display_name}
								</h4>
								<p className="text-xs text-input-border flex whitespace-nowrap">
									{sentimentString[sentiment] &&
										`is
										  ${sentimentString[sentiment]}`}
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
				<div className="mt-3">
					<p className={styles["post-title"]}>{title}</p>
					<p className="mt-2 text-xs">{body}</p>
				</div>

				<div className="flex space-x-3 overflow-x-auto mt-3">
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

				<div className="flex justify-between items-center text-xs mt-4">
					<Voting
						{...{
							upvotes,
							downvotes,
							postId: public_id,
							projectId: project.public_id,
							title,
						}}
					/>
					<div
						className="flex items-center space-x-1 cursor-pointer"
						onClick={openPost}
					>
						<Image
							src={projectAssets["commentWithDots"]}
							alt="comment"
							className="h-4"
							width={16}
							height={16}
						/>
						<p
							className={`${styles["users-comments"]} hover:underline`}
						>
							{reviews_count === 1
								? reviews_count + " Comment"
								: reviews_count + " Comments"}
						</p>
					</div>
					<div
						className="flex items-center cursor-pointer"
						onClick={(e) => _handleModal(e, 2)}
					>
						<Image
							src={projectAssets["comment"]}
							alt="Eyemark"
							className="h-4 w-4"
							width={16}
							height={16}
						/>
						<p className="text-xs text-light-grey-2 medium ml-1">
							Reply
						</p>
					</div>
				</div>
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

export default NestedReview
