/** @format */

import { projectReview } from "@/@types/components/projects.types"
import { accountIcon } from "@/constants/general/defaults"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { avatarPlaceholder } from "@/public/assets/PNG"
import { authSelector } from "@/store/slices/auth.slice"
import { addPostID } from "@/store/slices/post.slice"
import moment from "moment"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"
import styles from "@/styles/projectPage.module.scss"
import { AccountIconType } from "@/@types/components/general.types"

const ReferencedUpdate: FC<projectReview> = ({
	body,
	public_id: post_id,
	title,
	owner,
	created,
}) => {
	const dispatch = useAppDispatch()
	const { pathname } = useRouter()

	const { display_name, account_type, avatar, public_id: owner_id } = owner

	const { user } = useAppSelector(authSelector)

	const onclickPost = () => {
		!(
			pathname.includes("/dashboard/feed/") ||
			pathname.includes("/dashboard/post/")
		) && dispatch(addPostID(post_id))
	}

	const userprofile = () => {
		//implement
	}

	return (
		<div
			className="bg-white rounded-lg p-4 lg:p-6 overflow-hidden hover:bg-grey-white transition duration-300 ease-in-out"
			onClick={onclickPost}
		>
			<div className="flex justify-end items-center space-x-1 sm:hidden">
				<p className={styles["project-tag-text"]}>{account_type}</p>
				<p className={styles["project-tag-text"]}>
					{accountIcon[account_type as AccountIconType]}
				</p>
			</div>

			<div className={styles["author-details-group"]}>
				<div className={styles["profile-and-date"]}>
					<div className="rounded-full object-cover h-9 w-9">
						<Image
							src={avatar || avatarPlaceholder}
							alt=""
							className="rounded-full object-cover h-9 w-9"
							width={36}
							height={36}
						/>
					</div>
					<div className="w-10/12 sm:w-7/12 lg:w-11/12 overflow-x-hidden">
						<h4 className={styles["author-name"]}>
							{display_name}
						</h4>
						<div className={styles["update-detail"]}>
							<p className={styles["posted"]}>
								{moment(created).fromNow()}
							</p>
						</div>
					</div>
				</div>
				<div className="sm:flex items-center space-x-1 hidden">
					<p className={styles["project-tag-text"]}>{account_type}</p>
					<p className={styles["project-tag-text"]}>
						{accountIcon[account_type as AccountIconType]}
					</p>
				</div>
			</div>

			<div className="mt-3">
				<p className={styles["post-title"]}>{title}</p>
				<p className="mt-2 text-xs">{body}</p>
			</div>
		</div>
	)
}

export default ReferencedUpdate
