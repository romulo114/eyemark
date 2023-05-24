/** @format */

import ProjectCard from "@/components/project/projectCard"
import CitizensLayout from "@/components/layouts/appLayout"
import NoContent from "@/components/shared/noContent"
import { eyemarkedNoContent } from "@/constants/general/noContent"
import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { searchIcon } from "@/public/assets/SVG/general"
import { authSelector } from "@/store/slices/auth.slice"
import {
	eyeMarkSelector,
	fetchEyeMarkedProjects,
} from "@/store/slices/eyeMark.slice"
import { NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { SyntheticEvent, useEffect, useState } from "react"
import DiscoverProjectCard from "@/components/project/discoverProjectCard"

const Eyemarked: NextPage = () => {
	const { t } = useTranslation("eyemarked")

	const dispatch = useAppDispatch()
	const { eyeMarkedProjects, loading } = useAppSelector(eyeMarkSelector)
	const { is_authenticated } = useAppSelector(authSelector)

	const [projects, setProjects] = useState(eyeMarkedProjects || [])

	const search = (event: SyntheticEvent<HTMLInputElement>) => {
		const query = event.currentTarget.value
		setProjects(
			eyeMarkedProjects.filter((project: { name: string }) =>
				project?.name?.toLowerCase()?.includes(query.toLowerCase())
			) || []
		)
	}

	useEffect(() => {
		setProjects(eyeMarkedProjects)
	}, [eyeMarkedProjects])

	useEffect(() => {
		// if (eyeMarkedProjects.length === 0 && is_authenticated) {
		dispatch(fetchEyeMarkedProjects())
		// }
	}, [])

	return (
		<CitizensLayout>
			<Head>
				<title>Eyemark - {t("Eyemarked")}</title>
			</Head>
			<div className="top-bar">
				<Image src={searchIcon} alt="search" />
				<input
					className="focus:outline-none ml-3 border-none bg-transparent font-medium text-xs medium"
					placeholder={`${t("Search")}...`}
					onChange={search}
				/>
			</div>
			<div
				className={`px-5 pb-16 pt-8 flex sm:justify-start justify-center ${
					projects?.length === 0
						? "flex-grow items-center"
						: "flex-wrap"
				}`}
			>
				{!loading && projects?.length >= 1
					? projects?.map((data: any, i) => (
							<DiscoverProjectCard
								key={data?.public_id}
								{...data}
								className="sm:w-1/2 xl:w-4/12"
							/>
					  ))
					: !loading && <NoContent {...eyemarkedNoContent} />}
			</div>
		</CitizensLayout>
	)
}

export async function getServerSideProps(context: any) {
	const { req, locale } = context
	return protectRoute(req, {
		props: {
			...(await serverSideTranslations(locale, [
				"leftSidebar",
				"rightSidebar",
				"discover",
				"project",
				"login",
			])),
			// Will be passed to the page component as props
		},
	})
}

export default Eyemarked
