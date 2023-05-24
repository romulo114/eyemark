/** @format */
import citizensAssets from "@/public/assets/SVG/citizens"
import mdaAssets from "@/public/assets/SVG/mda"
import { generalRoutes } from "../AppRoutes/general.routes"
import { analyticsRoutes, mdaRoutes } from "../AppRoutes/mda.routes"
import { settingsRoutes } from "../AppRoutes/settings.routes"

const mdaNav: {
	name: string
	route: string
	auth?: boolean
	icon: string
	children?: { name: string; route: string; admin?: boolean }[]
}[] = [
	{
		name: "Overview",
		icon: mdaAssets["overview"],
		route: mdaRoutes.dashboard,
		auth: true,
	},
	{
		name: "Projects",
		icon: mdaAssets["projects"],
		route: generalRoutes.projects,
		auth: true,
	},
	{
		name: "Analytics",
		icon: mdaAssets["analytics"],
		route: generalRoutes.analytics,
		auth: true,
		children: [
			{ name: "Projects", route: analyticsRoutes.projects },
			{ name: "Citizens", route: analyticsRoutes.citizens, admin: true },
			{ name: "Contractors", route: analyticsRoutes.contractors },
		],
	},
	{
		name: "Profile",
		icon: citizensAssets["ProfileIcon"],
		route: generalRoutes.profile,
		auth: true,
	},
	{
		name: "Settings",
		icon: citizensAssets["SettingsIcon"],
		route: settingsRoutes.home,
		auth: true,
	},
]

const editProjectBreadCrumb: { value: string; step: string }[] = [
	{ value: "Basic Information", step: "one" },
	{ value: "Location", step: "two" },
	{ value: "Contractor Information", step: "three" },
	{ value: "Budget Information", step: "four" },
]

export { mdaNav, editProjectBreadCrumb }
