/** @format */

import { protectRoute } from "@/helpers/protectedRoutes.helpers"
import type { NextPage } from "next"

const Contractors: NextPage = () => {
	return <div>welcome to contractors dashboard</div>
}

export async function getServerSideProps(context: any) {
	const { req } = context
	return protectRoute(req)
}

export default Contractors
