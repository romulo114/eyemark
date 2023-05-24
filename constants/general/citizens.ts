/** @format */
import citizensAssets from "@/public/assets/SVG/citizens"
import { citizensRoutes } from "../AppRoutes/citizens.routes"
import { generalRoutes } from "../AppRoutes/general.routes"
import { settingsRoutes } from "../AppRoutes/settings.routes"

const citizensNav: {
	name: string
	route: string
	auth?: boolean
	icon: string
}[] = [
	{
		name: "discover",
		icon: citizensAssets["DiscoverIcon"],
		route: citizensRoutes.dashboard,
	},
	{
		name: "eyemarked",
		icon: citizensAssets["EyemarkedIcon"],
		route: citizensRoutes.eyeMarked,
		auth: true,
	},
	{
		name: "categories",
		icon: citizensAssets["CategoryIcon"],
		route: generalRoutes.categoriesOverview,
	},
	{
		name: "profile",
		icon: citizensAssets["ProfileIcon"],
		route: citizensRoutes.profile,
		auth: true,
	},
	{
		name: "settings",
		icon: citizensAssets["SettingsIcon"],
		route: settingsRoutes.home,
		auth: true,
	},
]

export { citizensNav }
