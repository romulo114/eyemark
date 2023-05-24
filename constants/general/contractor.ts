/** @format */
import citizensAssets from "@/public/assets/SVG/citizens"
import mdaAssets from "@/public/assets/SVG/mda"
import { generalRoutes } from "../AppRoutes/general.routes"
import { analyticsRoutes, contractorRoutes } from "../AppRoutes/mda.routes"
import { settingsRoutes } from "../AppRoutes/settings.routes"

const contractorsNav: {
	name: string
	route: string
	auth?: boolean
	icon: string
	children?: { name: string; route: string; admin?: boolean }[]
}[] = [
	{
		name: "Overview",
		icon: mdaAssets["overview"],
		route: contractorRoutes.dashboard,
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
		children: [{ name: "Projects", route: analyticsRoutes.projects }],
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

export { contractorsNav }
