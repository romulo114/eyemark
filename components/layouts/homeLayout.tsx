/** @format */

import { homeLayoutProps } from "@/@types/components/layout.types"
import { useAppSelector } from "@/hooks/redux.hooks"
import { appSelector } from "@/store/slices/app.slice"
import { FC } from "react"
import Footer from "../shared/home/footer"
import Nav from "../shared/home/nav"

const HomeLayout: FC<homeLayoutProps> = ({ children }) => {
	const { navOpen } = useAppSelector(appSelector)
	return (
		<div className={`${navOpen && "overflow-hidden h-screen"}`}>
			<Nav />
			{children}
			<Footer />
		</div>
	)
}

export default HomeLayout
