/** @format */

import React, {
	useState,
	useRef,
	useEffect,
	FC,
	SyntheticEvent,
	LegacyRef,
} from "react"
import { Add, ReplacePicture } from "@/public/assets/SVG/onboarding"
import styles from "@/styles/onboarding.module.scss"
import { arrowBack } from "@/public/assets/SVG/general"
import { useTranslation } from "react-i18next"
import ReactCrop, { Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import {
	updateUserDetails,
	onboardingSelector,
} from "@/store/slices/onboarding.slice"

import { authSelector, setAuth, setModalPage } from "@/store/slices/auth.slice"
import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { onboardingBackground } from "@/public/assets/PNG"
import { canvasType } from "@/@types/app.types"
import { NextPage } from "next"
import { useRouter } from "next/router"
import NextImage from "next/image"
import OnboardingButton from "@/components/shared/buttons/onboardingButton"
import OnBoardingLayout from "@/components/layouts/onboardingLayout"
import EyeMarkEye from "@/components/Auth/eyemarkEye"
import TextPrimary from "@/components/shared/textPrimary"
import { ButtonSkipForNow } from "@/components/shared/buttons"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"

const UploadProfilePicture: NextPage = () => {
	const { t } = useTranslation()

	const router = useRouter()
	const dispatch = useAppDispatch()

	const {
		auth_modal: { show },
	} = useAppSelector(authSelector)

	const { loading } = useAppSelector(onboardingSelector)
	const [upload, setUpload] = useState<boolean>(false)
	const [file, setFile] = useState<Blob>()
	const [imgSrc, setImgSrc] = useState<string>()
	const canvasRef = useRef<canvasType>(null)
	const [crop, setCrop] = useState<Crop | any>({
		unit: "px",
		width: 200,
		height: 200,
		aspect: 1 / 1,
	})

	const moveToNext = () => {
		if (show) {
			dispatch(setAuth())
			dispatch(setModalPage(5))
			return
		}
		router.push(authRoutes.interests)
	}

	const addProfilePhoto = () => {
		if (file) {
			const formData = new FormData()
			formData.append("avatar", file)
			dispatch(updateUserDetails({ formData, cb: moveToNext }))
		}
	}

	const reset = () => {
		setImgSrc(undefined)
		setUpload(false)
	}

	const _handleFileSelect = (e: SyntheticEvent<HTMLInputElement>) => {
		if (e.currentTarget.files && e.currentTarget.files.length > 0) {
			const reader = new FileReader()
			reader.addEventListener("load", () =>
				setImgSrc(reader.result as string)
			)
			reader.readAsDataURL(e.currentTarget.files[0])
			setUpload(true)
		}
	}

	const _handleCrop = () => {
		const canvas = canvasRef?.current
		if (!crop || !canvas) {
			return
		}
		const base64Canvas = canvas.toDataURL("image/jpeg")
		setImgSrc(base64Canvas)

		canvas.toBlob((blob: Blob | null) => {
			if (blob) {
				let file = new File([blob], "fileName.jpg", {
					type: "image/jpeg",
				})
				setFile(file)
			}
		}, "image/jpeg")
		setUpload(false)
	}

	useEffect(() => {
		if (!crop || !canvasRef?.current || !imgSrc) {
			return
		}

		const image = new Image()
		image.src = imgSrc
		const canvas = canvasRef?.current
		const scaleX = image.naturalWidth / image.width
		const scaleY = image.naturalHeight / image.height
		const ctx: any = canvas.getContext("2d")
		const pixelRatio = window.devicePixelRatio
		canvas.width = crop.width * pixelRatio
		canvas.height = crop.height * pixelRatio
		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
		ctx.imageSmoothingQuality = "high"
		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		)
		//eslint-disable-next-line
	}, [crop])

	return (
		<OnBoardingLayout
			title="Upload Profile Picture"
			className={`${styles["onboarding-container"]} overflow-hidden  md:flex items-center justify-center ${styles["placeholder"]}`}
			style={{ backgroundImage: `url(${onboardingBackground})` }}
		>
			<div
				className={`${
					show
						? "relative h-500"
						: "sm:shadow-login sm:rounded-lg overflow-hidden bg-white lg:w-7/12 xl:w-5/12 sm:w-9/12 w-full h-full sm:h-5/6 relative"
				}`}
			>
				{!upload ? (
					<div className="flex flex-col justify-between h-full">
						<div className="px-5 sm:px-10 py-11 h-5/6">
							<div className={styles["auth-header2"]}>
								<EyeMarkEye />
								<div>
									<ButtonSkipForNow
										text="skip"
										onClick={moveToNext}
									/>
								</div>
							</div>
							<p className={styles["auth-step"]}>Step 4 of 6</p>
							<TextPrimary
								className={styles["auth-title"]}
								translation="login"
							>
								pic
							</TextPrimary>

							<TextPrimary
								className={`${
									show
										? styles["modal-auth-subtitle"]
										: styles["auth-subtitle"]
								} text-auth-subtext `}
								translation="login"
							>
								pic_subtext
							</TextPrimary>

							<div
								className={`flex w-full mt-12 items-center justify-center ${
									show ? "pb-10 lg:pb-16" : ""
								}`}
							>
								<label htmlFor="upload">
									<div
										className={`${styles["upload-container"]} flex items-center justify-center`}
									>
										{imgSrc && (
											<NextImage
												width="100%"
												height="100%"
												objectFit="cover"
												src={imgSrc}
												layout="fill"
												alt="profile"
												className="cursor-pointer inset-0"
											/>
										)}

										{imgSrc ? (
											<div
												className={`cursor-pointer ${styles["add-image"]}`}
												onClick={reset}
											>
												<NextImage
													src={ReplacePicture}
													alt="replace"
												/>
											</div>
										) : (
											<div
												className={`cursor-pointer ${styles["add-image"]}`}
											>
												<NextImage
													src={Add}
													alt="add"
												/>
											</div>
										)}

										<input
											type="file"
											id="upload"
											name="upload"
											style={{ display: "none" }}
											accept="image/*"
											onChange={_handleFileSelect}
										/>
									</div>
								</label>
							</div>
						</div>
						<div
							className={`${styles["auth-footer"]} md:static fixed bottom-0 justify-end`}
						>
							<OnboardingButton
								text="next"
								onClick={addProfilePhoto}
							/>
						</div>
					</div>
				) : (
					<div className="px-5 sm:px-10 py-11">
						<div className="flex items-center justify-between mb-5 ">
							<div className="flex items-center">
								<div onClick={reset}>
									<NextImage
										src={arrowBack}
										className="cursor-pointer"
									/>
								</div>
								<TextPrimary
									className="medium ml-2 mb-1.5 "
									translation="login"
								>
									edit_pic
								</TextPrimary>
							</div>
							<OnboardingButton
								text="apply"
								onClick={_handleCrop}
							/>
						</div>
						<div className="flex mt-8 justify-center">
							<ReactCrop
								aspect={1}
								crop={crop}
								onChange={(crop, percentCrop) => setCrop(crop)}
								keepSelection
								circularCrop
								style={{ borderRadius: "8px", height: "80%" }}
							>
								<img
									src={imgSrc}
									alt="crop"
									style={{
										objectFit: "cover",
										objectPosition: "center",
										width: "100%",
										height: "80%",
									}}
								/>
							</ReactCrop>
							<canvas
								ref={canvasRef as LegacyRef<HTMLCanvasElement>}
								width="250"
								height="200"
								style={{
									objectFit: "cover",
									display: "none",
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</OnBoardingLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { req, locale } = context

	return protectRoute(req, {
		props: {
			...(await serverSideTranslations(locale, ["login"])),
			// Will be passed to the page component as props
		},
	})
}

export default UploadProfilePicture
