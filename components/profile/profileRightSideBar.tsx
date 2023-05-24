import { textElementType } from "@/@types/components/general.types"
import { useAppSelector } from "@/hooks/redux.hooks"
import { avatarPlaceholder } from "@/public/assets/PNG"
import { authSelector } from "@/store/slices/auth.slice"
import Image from "next/image"
import { FC } from "react"
import TextPrimary from "../shared/textPrimary"
import SearchInput from "../shared/search"
import { notCitizen, shortenCurrency } from "@/helpers/general.helpers"
import { profileSelector } from "@/store/slices/profile.slice"
import { useRouter } from "next/router"
import { AccountRoutes } from "@/constants/AppRoutes/settings.routes"

const ProfileRightSideBar: FC<{ thirdParty: boolean }> = ({ thirdParty }) => {
	const { user } = useAppSelector(authSelector)
	const { user: profileUser, projects } = useAppSelector(profileSelector)

	const { push } = useRouter()

	const {
		avatar,
		display_name,
		username,
		reviews_count,
		eyemarked_count,
		bio,
		total_appropriated_amount,
		account_type,
	} = thirdParty ? profileUser : user

	const toEditProfile = () => {
		push(AccountRoutes.editProfile)
	}

	return (
		<div className="h-screen overflow-y-auto px-2 py-6 border-l border-grey-stroke bg-white text-dark-grey flex flex-col justify-between">
			<div>
				<SearchInput />
				<div className="px-4 mt-12 flex flex-col items-center">
					<Image
						src={avatar || avatarPlaceholder}
						className="rounded-full object-cover h-32 w-32"
						height={128}
						width={128}
						objectFit="cover"
					/>
					<div className="text-sm medium mt-4 text-center w-8/12 mx-auto">
						<p>{display_name}</p>
						<p className="mt-1 text-light-grey-2 text-xs">
							@{username}
						</p>
					</div>
				</div>
				<div className="px-4 flex justify-around text-center mt-5">
					<div>
						<TextPrimary
							translation="profile"
							className="text-input-border text-2-xs uppercase"
							elementType={textElementType.heading}
							headingLevel={5}
						>
							{notCitizen(account_type) ? "projects" : "review"}
						</TextPrimary>

						<h4 className="mt-1 text-xs medium">
							{notCitizen(account_type)
								? projects?.count
								: reviews_count}
						</h4>
					</div>
					<div>
						<TextPrimary
							translation="profile"
							className="text-input-border text-2-xs uppercase"
							elementType={textElementType.heading}
							headingLevel={5}
						>
							{notCitizen(account_type)
								? "total appropriated"
								: "eyemarked"}
						</TextPrimary>

						<h4 className="mt-1 text-xs medium">
							{notCitizen(account_type)
								? shortenCurrency(total_appropriated_amount!)
								: eyemarked_count}
						</h4>
					</div>
				</div>

				<p className="px-4 text-2-xs text-sub-text mt-6 text-center h-12 overflow-hidden">
					{bio || display_name}
				</p>
				{!thirdParty && (
					<div className="mt-5 flex justify-center">
						<button
							className="py-2 px-6 border border-dark-grey rounded"
							onClick={toEditProfile}
						>
							<p className="text-sm">Edit Profile</p>
						</button>
					</div>
				)}
				<hr className="mx-4 my-3" />
			</div>

			<div>
				<hr />
				<p className="mt-3 text-2-xs text-light-grey-2">
					Eyemark © 2021. All rights reserved.
				</p>
			</div>
		</div>
	)
}

export default ProfileRightSideBar
