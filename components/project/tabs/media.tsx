/** @format */

import { noProjectMediaContent } from "@/constants/general/noContent"
import { useAppSelector } from "@/hooks/redux.hooks"
import { projectSelector } from "@/store/slices/project.slice"
import Image from "next/image"
import { FC, SyntheticEvent, useState } from "react"
import NoContent from "../../shared/noContent"
import Modal from "react-modal"
import MediaExpandedModal from "../../shared/mediaExpandedModal"
import styles from "@/styles/projectPage.module.scss"
import TextPrimary from "../../shared/textPrimary"
import citizensStyles from "@/styles/appLayout.module.scss"

const ProjectMedia: FC<{ createPost: () => void }> = ({ createPost }) => {
	const [modalIsOpen, setIsOpen] = useState<boolean>(false)
	const [imageIndex, setImageIndex] = useState<number>(0)
	const {
		media,
		project: { name },
	} = useAppSelector(projectSelector)

	const _toggleModal = () => setIsOpen((prev) => !prev)

	const openImage = (e: SyntheticEvent<HTMLElement>, index: number) => {
		_toggleModal()
		setImageIndex(index)
		e.stopPropagation()
	}
	return (
		<div
			className="flex-grow flex flex-col h-full"
			data-testid="project-tab_media_content"
		>
			<div className={styles["media-navbar"]}>
				<div
					className={`${styles["media-nav"]} ${styles["media-nav-active"]}`}
				>
					<TextPrimary>All Pictures</TextPrimary>
					<div className={`${styles["active-icon"]}`} />
				</div>
			</div>

			<div className={` ${styles["gallery"]}`}>
				{typeof media[0] !== "string" &&
					media?.map(({ id, image }, index) => (
						<div
							key={id}
							className={`${styles["gallery__item"]} `}
							onClick={(e) => openImage(e, index)}
						>
							<div className={`${styles["image"]}`}>
								<Image
									src={image}
									alt={name}
									layout="fill"
									objectFit="cover"
								/>
							</div>
						</div>
					))}
			</div>
			{(media?.length === 0 || typeof media[0] === "string") && (
				<div className="flex items-center justify-center h-full">
					<NoContent
						onClick={createPost}
						{...noProjectMediaContent}
					/>
				</div>
			)}

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={_toggleModal}
				ariaHideApp={false}
				className={`sm:w-[90vw] w-screen  h-[99vh] ${citizensStyles["default-modal"]}`}
				overlayClassName={citizensStyles["modal-overlay"]}
			>
				<MediaExpandedModal
					close={_toggleModal}
					images={media}
					activeIndex={imageIndex}
				/>
			</Modal>
		</div>
	)
}

export default ProjectMedia
