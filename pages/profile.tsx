import ProfileEyeMarked from "@/components/profile/tabs/profileEyemarked"
import ProfileMedia from "@/components/profile/tabs/profileMedia"
import ProfileHeader from "@/components/profile/profilePageHeader"
import ProfilePosts from "@/components/profile/tabs/profilePost"
import ProfileRightSideBar from "@/components/profile/profileRightSideBar"
import CustomNav from "@/components/shared/customNav"
import AppLayout from "@/components/layouts/appLayout"
import { profileNav } from "@/constants/general/profile"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authSelector } from "@/store/slices/auth.slice"
import {
	fetchProjects,
	fetchUserDetails,
	fetchUserEyemarked,
	fetchUserMedia,
	fetchUserPosts,
	profileSelector,
} from "@/store/slices/profile.slice"
import { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { notCitizen } from "@/helpers/general.helpers"
import { citizenAccountTypes } from "@/constants/general/defaults"

const Profile: NextPage = () => {
	const [activeTab, setActiveTab] = useState(profileNav()[0].value)
	const dispatch = useAppDispatch()
	const {
		user: { username, account_type },
		user,
	} = useAppSelector(authSelector)
	const { user: profileUser } = useAppSelector(profileSelector)
	const scrollRef = useRef<HTMLDivElement>(null)

	const { loading } = useAppSelector(profileSelector)

	const { query } = useRouter()

	const init = () => {
		if (query?.user)
			return dispatch(fetchUserDetails(query?.user as string))

		notCitizen(user?.account_type)
			? dispatch(fetchProjects({ account_type, username }))
			: dispatch(fetchUserEyemarked(username))

		dispatch(fetchUserMedia())
		dispatch(fetchUserPosts(username))
	}

	useEffect(() => {
		init()
	}, [query])

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
	}, [activeTab])

	return (
		<AppLayout
			sidebar={
				<ProfileRightSideBar thirdParty={query?.user !== undefined} />
			}
			layoutCenterRef={scrollRef}
		>
			<ProfileHeader thirdParty={query?.user !== undefined} />
			<div className="sticky top-[70px] z-30 bg-grey-white">
				<CustomNav
					data={profileNav(
						(profileUser && notCitizen(profileUser.account_type)) ||
							notCitizen(account_type)
					)}
					active={activeTab}
					onChange={setActiveTab}
					className="bg-grey-white"
				/>
			</div>

			<div className="mt-12  h-full">
				{activeTab === profileNav()[0].value && !loading && (
					<ProfilePosts thirdParty={query?.user !== undefined} />
				)}
				{activeTab === profileNav()[1].value && !loading && (
					<ProfileMedia thirdParty={query?.user !== undefined} />
				)}
				{activeTab ===
					profileNav(
						(profileUser && notCitizen(profileUser.account_type)) ||
							notCitizen(account_type)
					)[2].value && (
					<ProfileEyeMarked
						thirdParty={
							!citizenAccountTypes.includes(
								account_type.toLowerCase()
							) || query?.user !== undefined
						}
					/>
				)}
			</div>
		</AppLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { req, locale } = context
	return protectRoute(req, {
		props: {
			...(await serverSideTranslations(locale, [
				"leftSidebar",
				"rightSidebar",
				"profile",
				"project",
				"login",
			])),
			// Will be passed to the page component as props
		},
	})
}

export default Profile
