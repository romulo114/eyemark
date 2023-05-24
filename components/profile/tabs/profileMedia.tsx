import { useAppSelector } from "@/hooks/redux.hooks"
import { profileSelector } from "@/store/slices/profile.slice"
import { FC, SyntheticEvent, useState } from "react"
import MediaExpandedModal from "../../shared/mediaExpandedModal"
import Modal from "react-modal"
import NoContent from "../../shared/noContent"
import styles from "@/styles/projectPage.module.scss"
import { noProfileMediaContent } from "@/constants/general/noContent"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { useRouter } from "next/router"
import Image from "next/image"
import { authSelector } from "@/store/slices/auth.slice"
import { notCitizen } from "@/helpers/general.helpers"
import citizensStyles from "@/styles/appLayout.module.scss"

const ProfileMedia: FC<{ thirdParty: boolean }> = ({ thirdParty }) => {
	const {
		media,
		loading,
		user: { account_type },
		user,
	} = useAppSelector(profileSelector)
	const {
		user: { display_name },
	} = useAppSelector(authSelector)
	const [imageIndex, setImageIndex] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const { push } = useRouter()

	const _toggleModal = () => setShowModal((prev) => !prev)
	const openImage = (e: SyntheticEvent<HTMLDivElement>, index: number) => {
		e.stopPropagation()
		_toggleModal()
		setImageIndex(index)
	}
	const goHome = () => push(citizensRoutes.dashboard)
	return (
		<div
			className={`h-full flex-grow flex flex-col items-center justify-center ${
				media.length === 0 && "py-10 lg:py-0"
			}`}
		>
			{media.length > 0 ? (
				<div className="px-6 pb-9 flex flex-wrap h-full w-full">
					{media.map(({ id, image }, index) => (
						<div
							className={styles["gallery__item"]}
							key={id}
							onClick={(e) => openImage(e, index)}
						>
							<div className={styles["image"]}>
								<Image
									src={image}
									alt={
										thirdParty
											? user?.display_name
											: display_name
									}
									layout="fill"
									objectFit="cover"
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				!loading && (
					<NoContent
						onClick={goHome}
						{...noProfileMediaContent(
							thirdParty ? user.display_name : undefined,
							thirdParty && notCitizen(account_type)
						)}
					/>
				)
			)}

			<Modal
				isOpen={showModal}
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

export default ProfileMedia
