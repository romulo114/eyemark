/** @format */

import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { avatarPlaceholder } from "@/public/assets/PNG"
import { authSelector, toggleModal } from "@/store/slices/auth.slice"
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import styles from "@/styles/discover.module.scss"
import { ownerType, votingPropTypes } from "@/@types/components/discover.types"
import { checkCurrentVoteStatus } from "@/helpers/general.helpers"
import citizensAssets from "@/public/assets/SVG/citizens"
import TextPrimary from "../shared/textPrimary"
import { downVotePost, upVotePost } from "@/store/slices/post.slice"

const Voting: FC<votingPropTypes> = ({
	upvotes,
	downvotes,
	postId,
	projectId,
	title,
}) => {
	const dispatch = useAppDispatch()
	const { is_authenticated, user } = useAppSelector(authSelector)
	const [votes, setVotes] = useState({
		upvotes,
		downvotes,
	})

	const _handleUpVote = () => {
		if (!is_authenticated) {
			return dispatch(
				toggleModal({
					show: true,
					text: `Upvote "${title}"`,
					subtitle: " a review",
					modal_page: 0,
				})
			)
		}
		dispatch(upVotePost(postId))
		_handleVote("upvotes")
	}

	const _handleDownVote = () => {
		if (!is_authenticated) {
			return dispatch(
				toggleModal({
					show: true,
					text: `Downvote "${title}"`,
					subtitle: " a review",
					modal_page: 0,
				})
			)
		}
		dispatch(downVotePost(postId))
		_handleVote("downvotes")
	}

	const _handleVote = (key: "upvotes" | "downvotes") => {
		setVotes((prev) => {
			const reverseKey = key === "upvotes" ? "downvotes" : "upvotes"
			const data = prev[reverseKey].votes.filter(
				(vote) => vote.user.public_id !== user.public_id
			)
			return {
				...prev,
				[reverseKey]: { votes: data, count: data.length },
			}
		})
		if (
			checkCurrentVoteStatus(votes[key]?.votes, (user as any)?.public_id)
		) {
			return setVotes((prev) => {
				const data = prev[key].votes.filter(
					(vote) => vote.user.public_id !== user.public_id
				)
				return {
					...prev,
					[key]: { votes: data, count: data.length },
				}
			})
		}
		setVotes((prev) => {
			return {
				...prev,
				[key]: {
					votes: [...prev[key].votes, { user }],
					count: prev[key].count + 1,
				},
			}
		})
	}

	return (
		<div className="flex space-x-2 sm:space-x-6">
			<div className="flex space-x-1 items-center">
				<button
					onClick={_handleUpVote}
					className="focus:outline-none hover:bg-complete-light rounded-full p-2 transition ease-in-out duration-300"
				>
					<Image
						width="15%"
						height="15%"
						src={
							checkCurrentVoteStatus(
								votes?.upvotes?.votes,
								(user as any)?.public_id
							)
								? citizensAssets["Upvoted"]
								: citizensAssets["UpVote"]
						}
						alt="upvote"
					/>
				</button>
				<div className="flex items-center">
					{votes?.upvotes?.votes
						?.slice(
							0,
							window.innerWidth >= 500
								? 3
								: window.innerWidth > 320
								? 2
								: 1
						)
						?.map((vote, index: number) => (
							<div
								key={index}
								className={`${styles["feedback-avatars"]}  ${
									index > 0 && "-ml-2.5"
								}`}
							>
								<Image
									src={
										vote?.user?.avatar || avatarPlaceholder
									}
									objectFit="cover"
									alt="avatar"
									width="20%"
									height="20%"
								/>
							</div>
						))}
				</div>
				<p className="text-input-border">{votes.upvotes.count}</p>
			</div>
			<div className="flex space-x-1 items-center">
				<button
					onClick={_handleDownVote}
					className="focus:outline-none hover:bg-abandoned-light rounded-full p-2 transition ease-in-out duration-300"
				>
					<Image
						width="15%"
						height="15%"
						src={
							checkCurrentVoteStatus(
								votes?.downvotes?.votes,
								(user as any)?.public_id
							)
								? citizensAssets["Downvoted"]
								: citizensAssets["DownVote"]
						}
						alt="downvote"
					/>
				</button>
				<div className="flex items-center">
					{votes?.downvotes?.votes
						?.slice(
							0,
							window.innerWidth >= 500
								? 3
								: window.innerWidth > 320
								? 2
								: 1
						)
						?.map((vote, index: number) => (
							<div
								key={index}
								className={`${styles["feedback-avatars"]}  ${
									index > 0 && "-ml-2.5"
								}`}
							>
								<Image
									src={
										vote?.user?.avatar || avatarPlaceholder
									}
									objectFit="cover"
									alt="avatar"
									width="20%"
									height="20%"
								/>
							</div>
						))}
				</div>
				<p className="text-input-border">{votes?.downvotes?.count}</p>
			</div>
		</div>
	)
}

export default Voting
