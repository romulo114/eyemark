/** @format */

import { FC, useEffect, useState } from "react"
import styles from "@/styles/loader.module.scss"
import { useRouter } from "next/router"
import { useAppSelector } from "@/hooks/redux.hooks"
import { authSelector } from "@/store/slices/auth.slice"
import { onboardingSelector } from "@/store/slices/onboarding.slice"
import { projectSelector } from "@/store/slices/project.slice"
import { discoverSelector } from "@/store/slices/discover.slice"
import { categoriesSelector } from "@/store/slices/categories.slice"
import { filterSelector } from "@/store/slices/filter.slice"
import { eyeMarkSelector } from "@/store/slices/eyeMark.slice"
import { postsSelector } from "@/store/slices/post.slice"
import { mdaSelector } from "@/store/slices/mda.slice"
import { settingsSelector } from "@/store/slices/settings.slice"
import { profileSelector } from "@/store/slices/profile.slice"
import { createProjectSelector } from "@/store/slices/createProject"

const Loader: FC = () => {
	const { loading: authLoader } = useAppSelector(authSelector)
	const { loading: onboardingLoader } = useAppSelector(onboardingSelector)
	const { loading: projectLoader } = useAppSelector(projectSelector)
	const { loading: discoverLoader } = useAppSelector(discoverSelector)
	const { loading: categoriesLoader } = useAppSelector(categoriesSelector)
	const { loading: filterLoader } = useAppSelector(filterSelector)
	const { loading: eyeMarkLoader } = useAppSelector(eyeMarkSelector)
	const { loading: postLoader } = useAppSelector(postsSelector)
	const { loading: mdaLoader } = useAppSelector(mdaSelector)
	const { loading: settingsLoader } = useAppSelector(settingsSelector)
	const { loading: profileLoader } = useAppSelector(profileSelector)
	const { loading: createProjectLoader } = useAppSelector(
		createProjectSelector
	)

	const router = useRouter()

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const handleStart = (url: string) =>
			url !== router.asPath && setLoading(true)
		const handleComplete = (url: string) =>
			url === router.asPath &&
			setTimeout(() => {
				setLoading(false)
			}, 5000)

		router.events.on("routeChangeStart", handleStart)
		router.events.on("routeChangeComplete", handleComplete)
		router.events.on("routeChangeError", handleComplete)

		return () => {
			router.events.off("routeChangeStart", handleStart)
			router.events.off("routeChangeComplete", handleComplete)
			router.events.off("routeChangeError", handleComplete)
		}
	})

	return authLoader ||
		onboardingLoader ||
		projectLoader ||
		discoverLoader ||
		categoriesLoader ||
		filterLoader ||
		eyeMarkLoader ||
		postLoader ||
		mdaLoader ||
		settingsLoader ||
		profileLoader ||
		createProjectLoader ||
		loading ? (
		<div className={styles["setting-loader"]}>
			<div className={styles["setting-load-line"]}></div>
		</div>
	) : (
		<></>
	)
}

export default Loader
