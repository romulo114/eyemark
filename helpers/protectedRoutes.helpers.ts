/** @format */

import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { contractorRoutes, mdaRoutes } from "@/constants/AppRoutes/mda.routes"
import { citizensNav } from "@/constants/general/citizens"
import { mdaAccountType } from "@/constants/general/defaults"
import { getAccountType } from "./general.helpers"

export const protectRoute = (req: any, ctx = {}) => {
	const { account_type, registering, is_authenticated } = getAccountType(req)
	const { url } = req

	//construct redirect object
	const redirectObj = {
		redirect: {
			destination: authRoutes.login,
			permanent: false,
		},
		...ctx,
	}

	//check if the user is visiting the mda/contractor dashboard without logging in and redirect to login
	if (
		!account_type &&
		!url.includes("auth") &&
		!url.includes("citizen") &&
		!is_authenticated
	)
		return redirectObj

	//check if user is visiting any of the auth pages after profile without signing up and redirect to  user-type/profile page
	if (
		!registering &&
		url.includes("signup") &&
		!url.includes("user-type") &&
		!url.includes("profile")
	) {
		redirectObj.redirect.destination = account_type
			? authRoutes.profile
			: authRoutes.createAccount
		return redirectObj
	}

	//check if he is trying to go to any sign up page at all without selecting a user type redirect to user-type page
	if (!account_type && url.includes("signup") && !url.includes("user-type")) {
		redirectObj.redirect.destination = authRoutes.createAccount
		return redirectObj
	}

	//set the redirect url to mda if the account type is one of the mda account types
	mdaAccountType.includes(account_type as string) &&
		(redirectObj.redirect.destination = mdaRoutes.dashboard)

	switch (account_type) {
		//set the redirect url to contractor if the account type is a contractor account
		case "contractor":
			redirectObj.redirect.destination = contractorRoutes.dashboard
			break
		//set the redirect url to citizens dashboard
		default:
			redirectObj.redirect.destination = citizensRoutes.dashboard
			break
	}

	//redirect if visiting mda without an mda account
	if (url.includes("mda") && !mdaAccountType.includes(account_type as string))
		return redirectObj

	//redirect if visiting contractor without a contractor account
	if (url.includes("contractor") && account_type !== "contractor")
		return redirectObj

	// if your on any auth page and are authenticated and your not registering
	if (url.includes("auth") && is_authenticated && !registering)
		return redirectObj

	//check what part of citizens its on
	const res = citizensNav.filter((item) => item.route === url)
	if (res.length > 0 && res[0].auth && !is_authenticated) {
		redirectObj.redirect.destination = citizensRoutes.dashboard
		return redirectObj
	}

	return {
		props: {},
		...ctx,
	}
}
