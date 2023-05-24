/** @format */

import React, {
	FC,
	KeyboardEvent,
	MouseEvent,
	SyntheticEvent,
	useState,
} from "react"
import Modal from "react-modal"
import { css } from "emotion"
import Eyemark from "@/public/assets/GreenGIF.gif"
import { FaTwitter, FaFacebook, FaEnvelope, FaLinkedin } from "react-icons/fa"
import { ShareButtonCircle, ShareBlockStandard } from "react-custom-share"
import { toast } from "react-toastify"
import { sharePropTypes } from "@/@types/components/general.types"
import Image from "next/image"
import {
	CloseModal,
	ShareProject,
	WhiteShare,
} from "@/public/assets/SVG/general"

const Share: FC<sharePropTypes> = ({ url, title, image, body, white }) => {
	const [modalIsOpen, setIsOpen] = useState(false)

	function openModal(e: SyntheticEvent<HTMLDivElement>) {
		e.stopPropagation()
		setIsOpen(true)
	}

	function closeModal(
		e: SyntheticEvent<HTMLImageElement> | MouseEvent | KeyboardEvent
	) {
		e.stopPropagation()
		setIsOpen(false)
	}

	const share = (e: SyntheticEvent<HTMLDivElement>) => {
		if (navigator.share) {
			navigator
				.share({
					title: `${title}`,
					url: `${url}`,
				})
				.then(() => {
					toast.success("Shared successfully!")
				})
				.catch((e) => {
					toast.success("Something went wrong, please try again")
				})
		} else {
			openModal(e)
		}
	}

	const copyText = () => {
		navigator.clipboard.writeText(`${window.location.origin}${url}`)
		toast.success("Copied to clipboard")
	}

	const shareBlockProps = {
		url: `${window.location.origin}${url}`,
		button: ShareButtonCircle,
		buttons: [
			{ network: "Twitter", icon: FaTwitter, media: image },
			{ network: "Facebook", icon: FaFacebook, media: image },
			{ network: "Email", icon: FaEnvelope, media: image },
			{ network: "Linkedin", icon: FaLinkedin, media: image },
		],
		text: `${title} `,
		longtext: `${body}`,
	}

	return (
		<div
			className={`flex items-center justify-center ${
				white ? "h-full w-full" : ""
			}`}
			onClick={(e) => share(e)}
			data-testid="project-share_icon"
		>
			<Image
				src={white ? WhiteShare : ShareProject}
				className="h-4 mb-1 cursor-pointer"
			/>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				ariaHideApp={false}
				className={`${
					window.screen.width <= 500 ? "w-11/12" : "w-5/12 max-w-650"
				} share-modal medium`}
				overlayClassName="share-overlay"
			>
				<div>
					<div className="mt-3 mb-12 flex justify-between items-center">
						<div className="flex items-center space-x-3 w-4/12">
							<Image
								src={Eyemark}
								className="h-5"
								width={28}
								height={18.8}
							/>
						</div>
						<p className="text-dark-grey text-center text-sm sm:text-xl medium w-4/12">
							Share with a friend
						</p>
						<div className="w-4/12 flex justify-end">
							<Image
								onClick={closeModal}
								src={CloseModal}
								className="cursor-pointer h-6 "
							/>
						</div>
					</div>

					<ShareBlockStandard
						className={css`
							margin: 0;
						`}
						{...shareBlockProps}
					/>

					<div className="mt-12">
						<p className="medium">Copy the link:</p>
						<div className="mt-4 flex justify-between border rounded-full border-EB">
							<textarea
								id="share-link"
								disabled
								rows={1}
								cols={250}
								className="copy-textarea truncate text-light-grey-2 medium py-2 pl-4 bg-transparent text-sm w-10/12 resize-none hover:text-dark-grey"
								value={`${window.location.origin}${url}`}
							/>
							<button
								className="text-white bg-accepted px-8 rounded-full text-sm cursor-pointer medium"
								onClick={copyText}
							>
								Copy
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default Share
