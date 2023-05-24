import { textElementType } from "@/@types/components/general.types"
import { notCitizen, shortenCurrency } from "@/helpers/general.helpers"
import { useAppSelector } from "@/hooks/redux.hooks"
import { avatarPlaceholder } from "@/public/assets/PNG"
import { arrowBack } from "@/public/assets/SVG/general"
import { authSelector } from "@/store/slices/auth.slice"
import { profileSelector } from "@/store/slices/profile.slice"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"
import TextPrimary from "../shared/textPrimary"

const ProfileHeader: FC<{ thirdParty?: boolean }> = ({ thirdParty }) => {
	const { user: authUser } = useAppSelector(authSelector)
	const { user: profileUser } = useAppSelector(profileSelector)
	const { back } = useRouter()

	const {
		avatar,
		display_name,
		username,
		reviews_count,
		eyemarked_count,
		account_type,
		total_appropriated_amount,
		total_no_of_projects,
		bio,
	} = thirdParty ? profileUser : authUser

	return (
		<>
			<div className={`${thirdParty && "flex items-center"} top-bar`}>
				{thirdParty && (
					<button onClick={back}>
						<Image src={arrowBack} alt="back" />
					</button>
				)}
				<TextPrimary
					translation="profile"
					className={`medium ${
						thirdParty && " w-full text-center"
					} truncate sm:ml-0 ml-3`}
				>
					{thirdParty ? display_name || "" : "profile"}
				</TextPrimary>
			</div>

			<div className="sm:hidden px-5 py-6">
				<div className="flex items-center space-x-5">
					<Image
						src={avatar || avatarPlaceholder}
						className="rounded-full object-cover h-20 w-20"
						width={80}
						height={80}
						objectFit="cover"
					/>
					<div className="flex flex-grow justify-around text-center">
						<div>
							<TextPrimary
								translation="profile"
								className="text-input-border text-2-xs uppercase"
								elementType={textElementType.heading}
								headingLevel={5}
							>
								{notCitizen(account_type)
									? "projects"
									: "reviews"}
							</TextPrimary>

							<h4 className="mt-1 text-xs medium">
								{notCitizen(account_type)
									? total_no_of_projects
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
									? shortenCurrency(
											total_appropriated_amount!
									  )
									: eyemarked_count}
							</h4>
						</div>
					</div>
				</div>

				<div className="text-sm medium mt-6">
					<p className="font-bold text-sm">{display_name}</p>
					<p className="mt-1 text-light-grey-2 text-xs">
						@{username}
					</p>
				</div>

				<p className="text-2-xs text-sub-text mt-6">{bio}</p>
			</div>
		</>
	)
}

export default ProfileHeader
