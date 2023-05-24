/** @format */

import { FC, SyntheticEvent, useEffect, useRef, useState } from "react"
import {
	commentOnReview,
	postProjectUpdate,
	postUserReview,
} from "@/store/slices/post.slice"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authSelector } from "@/store/slices/auth.slice"
import moment from "moment"
import {
	Angry,
	avatarPlaceholder,
	Excited,
	Hopeful,
	Impressed,
	Suggestion,
	Unimpressed,
} from "@/public/assets/PNG"
import TextPrimary from "../shared/textPrimary"
import ProjectInfo from "../discover/projectInfo"
import Image from "next/image"
import projectAssets from "@/public/assets/SVG/project"
import { AddImage } from "@/public/assets/SVG/onboarding"
import * as generalAssets from "@/public/assets/SVG/general"
import styles from "@/styles/postModal.module.scss"
import projectStyles from "@/styles/projectPage.module.scss"
import {
	postModalPropTypes,
	projectType,
} from "@/@types/components/projects.types"
import ReferencedUpdate from "./referenceUptate"

const CreatePostModal: FC<postModalPropTypes> = ({
	close,
	post_id,
	project_id,
	project,
	fromMDA = false,
	projectReview = false,
	update = false,
	review,
	isReview,
}) => {
	const inputFile = useRef<HTMLInputElement>(null)
	const dispatch = useAppDispatch()

	const { user } = useAppSelector(authSelector)

	const [page, setPage] = useState(fromMDA || isReview ? 2 : 1)
	const [initialSentiment, setInitialSentiment] = useState(-1)
	const [requiredContent, setRequiredContent] = useState(false)

	const [formData, setFormData] = useState({
		project_id: project_id,
		post_id: post_id,
		sentiment: "",
		title: "",
		body: "",
		images: [],
		type_of_post: 0,
	})

	const onGetInputValue = (
		name: string,
		event?: SyntheticEvent<HTMLInputElement> | File
	) => {
		name &&
			event &&
			setFormData({
				...formData,
				[name]: formData.images.concat(event as never),
			})
	}

	const _handleTextChange = (
		e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { value, name } = e.currentTarget
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const postCurrentReview = (e: SyntheticEvent<HTMLButtonElement>) => {
		if (!requiredContent) return
		const form = new FormData()
		Object.keys(formData).forEach((value) => {
			if (typeof (formData as any)[value] !== "string") {
				const { images } = formData
				for (const data of images) {
					form.append("image", data)
				}
				return
			}
			form.append(value, (formData as any)[value])
		})
		if (isReview) {
			dispatch(commentOnReview({ formData: form, cb: close }))
		} else if (fromMDA) {
			dispatch(postProjectUpdate({ formData: form, cb: close }))
		} else {
			dispatch(postUserReview({ formData: form, cb: close }))
		}
	}

	const addImage = () => {
		if (formData.images.length === 4) {
			toast.error("You can only upload a maximum of 4 files")
		} else {
			inputFile.current?.click()
		}
	}

	useEffect(() => {
		const { title, body } = formData
		setRequiredContent(body.length > 0 && (isReview || title.length > 0))
	}, [isReview, formData])

	const removeFile = (index: number) => {
		setFormData((prev) => {
			prev.images.splice(index, 1)
			return { ...formData }
		})
	}

	const _handleChange = (
		e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
		sentiment: any
	) => {
		_handleTextChange(e)
		setInitialSentiment(sentiment.value)
		setPage(2)
	}

	const _handleRadioChange = (e: SyntheticEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget
		setFormData({
			...formData,
			type_of_post: 7,
			sentiment: value,
		})
		setInitialSentiment(5)
		setPage(2)
	}

	const sentiments = [
		{
			name: "Impressed",
			icon: Impressed,
			value: 4,
			class: "impressed",
		},
		{
			name: "Excited",
			icon: Excited,
			value: 3,
			class: "excited",
		},
		{
			name: "Hopeful",
			icon: Hopeful,
			value: 2,
			class: "hopeful",
		},
		{
			name: "Unimpressed",
			icon: Unimpressed,
			value: 1,
			class: "unimpressed",
		},
		{
			name: "Angry",
			icon: Angry,
			value: 0,
			class: "angry",
		},
	]

	return (
		<>
			<div
				className={`flex flex-col justify-between h-full relative overflow-y-auto ${
					window.innerHeight < 645 && "max-h-500"
				}`}
			>
				<div className="bg-white px-3 sm:px-4 py-7 medium relative">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-3">
							<Image
								src={user?.avatar || avatarPlaceholder}
								alt="avatar"
								width="40%"
								height="40%"
								className="object-cover rounded-full h-8 w-8 flex-shrink-0"
							/>
							<h4 className="text-xs medium truncate mr-3 py-2">
								{user?.display_name}
							</h4>
						</div>
						<Image
							onClick={close}
							src={generalAssets["closeMap"]}
							width="20%"
							height="20%"
							className="cursor-pointer h-6"
						/>
					</div>

					{!fromMDA && (
						<div
							className={`flex mt-3 justify-between ${
								page === 1 ? "flex-col" : "flex-row"
							}`}
						>
							<p
								className={`text-center medium text-sm text-light-grey-6 ${
									page === 1 ? "block" : "hidden"
								}`}
							>
								How do you feel about this{" "}
								{update ? "update" : "project"}?
							</p>
							<div
								className={`flex justify-center space-x-2 sm:space-x-4 ${
									page === 1 && "flex-wrap sm:flex-nowrap"
								}`}
							>
								{sentiments.map((sentiment, index) => (
									<div
										key={sentiment.value}
										className={`${
											styles["sentiment-radio"]
										} ${page === 1 ? "mt-5" : "mt-0"}`}
									>
										<input
											id={`${sentiment.value}`}
											type="radio"
											name="sentiment2"
											checked={
												initialSentiment ===
												sentiment.value
											}
											value={sentiment.value}
											onChange={(e) =>
												_handleChange(e, sentiment)
											}
										/>
										<label
											className={`${
												styles["inner-radio"]
											} ${styles[sentiment.class]}`}
											htmlFor={`${sentiment.value}`}
										>
											<div className="h-4">
												<Image
													src={sentiment.icon}
													width={16}
													height={16}
													className="h-4"
												/>
											</div>
											<p
												className={`ml-1 sm:ml-2 text-[10px] ${
													page === 1
														? "block"
														: initialSentiment ===
														  sentiment.value
														? "block"
														: "hidden"
												}`}
											>
												{sentiment.name}
											</p>
										</label>
									</div>
								))}
							</div>

							<p
								className={`mt-5 text-center medium text-sm text-light-grey-6 ${
									page === 1 ? "block" : "hidden"
								}`}
							>
								or
							</p>

							<div
								className={`flex justify-center ${
									page === 1 ? "mt-5" : "mt-0"
								}`}
							>
								<div className={styles["sentiment-radio"]}>
									<input
										id="5"
										type="radio"
										name="sentiment2"
										value={5}
										checked={initialSentiment === 5}
										onChange={_handleRadioChange}
									/>
									<label
										className={`${styles["inner-radio"]} ${[
											"suggestion",
										]}`}
										htmlFor="5"
									>
										<Image
											src={Suggestion}
											width={16}
											height={16}
											className="h-4 "
										/>
										<p
											className={`ml-1 sm:ml-2 medium ${
												page === 1
													? "block"
													: initialSentiment === 5
													? "block"
													: "hidden"
											}`}
										>
											Suggestion
										</p>
									</label>
								</div>
							</div>
						</div>
					)}

					<div className={`${page === 1 ? "hidden" : "block"}`}>
						<div className="relative flex mt-5">
							{!isReview && (
								<>
									<p className="text-3-xs text-input-border absolute left-3 top-2">
										Title
									</p>
									<p className="text-3-xs text-accepted absolute right-3 top-2">
										Required
									</p>
									<input
										name="title"
										className={`${projectStyles["text-input"]} focus:border-accepted w-full`}
										onChange={_handleTextChange}
										value={formData.title}
									/>
								</>
							)}
						</div>
						<textarea
							name="body"
							className={`w-full mt-3 h-32 ${projectStyles["text-area"]} focus:border-accepted`}
							placeholder="Write something, anything..."
							onChange={_handleTextChange}
							value={formData.body}
						/>
						<div className="mt-3 overflow-hidden">
							<button
								className="flex space-x-2 cursor-pointer"
								onClick={addImage}
							>
								<Image
									src={AddImage}
									width="15%"
									height="15%"
								/>
								<p className="text-xs medium text-dark-grey">
									Add image
								</p>
							</button>
							<div className="flex py-3 overflow-x-auto overflow-y-hidden">
								{formData.images.length > 0 &&
									formData.images.map((image, index) => (
										<div
											className="relative flex-shrink-0 h-16 w-16 mx-4 rounded-lg"
											key={index}
										>
											<div className="h-full w-full object-cover rounded-lg">
												<Image
													src={URL.createObjectURL(
														image
													)}
													objectFit="cover"
													layout="fill"
												/>
											</div>
											<button
												className="h-5 absolute -bottom-3 -right-3"
												onClick={() =>
													removeFile(index)
												}
											>
												<Image
													src={
														projectAssets[
															"removeImage"
														]
													}
												/>
											</button>
										</div>
									))}
							</div>
							<input
								type="file"
								id="upload"
								name="images"
								ref={inputFile}
								className="hidden"
								onChangeCapture={() => {
									onGetInputValue(
										"images",
										inputFile.current?.files![0]
									)
								}}
							/>
						</div>

						<div className="mt-5 rounded-lg border border-input-border">
							{project ? (
								<ProjectInfo {...project} fromPost MDAUpdate />
							) : (
								<ReferencedUpdate {...review!} />
							)}
						</div>
					</div>
				</div>

				<div
					className={`px-8 py-3 text-sm flex space-x-3 justify-end bg-dark-grey ${
						page === 1 ? "hidden" : "block"
					}`}
				>
					<button
						className="py-2 px-5 bg-transparent rounded-full text-white medium"
						onClick={close}
					>
						<TextPrimary translation="settings">
							Discard
						</TextPrimary>
					</button>
					<button
						className={`py-2 px-5 rounded-full medium 
							${
								requiredContent
									? "bg-accepted text-white"
									: "text-light-grey bg-input-border cursor-not-allowed"
							}
						`}
						onClick={postCurrentReview}
					>
						<TextPrimary translation="settings">Post</TextPrimary>
					</button>
				</div>
			</div>
		</>
	)
}

export default CreatePostModal
