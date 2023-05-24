import AppLayout from "@/components/layouts/appLayout"
import { useAppDispatch } from "@/hooks/redux.hooks"
import { setAnalytics } from "@/store/slices/mda.slice"
import { NextPage } from "next"
import Head from "next/head"
import { useEffect } from "react"

const Contractors: NextPage = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setAnalytics("contractors"))
	}, [dispatch])

	return (
		<AppLayout full mda>
			<Head>
				<title>{`Eyemark - Analytics (Contractors)`}</title>
			</Head>
			<div className="top-bar">
				<p className="text-dark-grey medium">Analytics (Contractors)</p>
			</div>
			<div className="px-4 sm:px-8 py-8">
				<div className="flex justify-between mb-5">
					<div className="flex">
						<p className="pl-3 pt-2 text-dark-grey">Contractors</p>
					</div>
				</div>
			</div>
		</AppLayout>
	)
}

export default Contractors
