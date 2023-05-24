/** @format */

import { contextClassType } from "../../@types/app.types"
import {
	Angry,
	Unimpressed,
	Hopeful,
	Excited,
	Impressed,
	Suggestion,
} from "@/public/assets/PNG"

import {
	SDGSPoverty,
	SDGSHunger,
	SDGSHealth,
	SDGSEducation,
	SDGSEquality,
	SDGSWater,
	SDGSEnergy,
	SDGSDecentWork,
	SDGSIndustry,
	SDGSReducedInequalities,
	SDGSSustainableCities,
	SDGSResponsibleConsumption,
	SDGSClimateAction,
	SDGSBelowWater,
	SDGSOnLand,
	SDGSPeace,
	SDGSPartnerships,
} from "@/public/assets/SVG/general"

const contextClass: contextClassType = {
	success: "bg-dark-grey",
	error: "bg-dark-grey",
	info: "bg-dark-grey",
	warning: "bg-dark-grey",
	default: "bg-dark-grey",
	dark: "bg-dark-grey",
}

const projectStatus = {
	"ON HOLD": "On Hold",
	COMPLETED: "Completed",
	"ON GOING": "Ongoing",
	ON_GOING: "Ongoing",
	"NOT STARTED": "Not Started",
	ABANDONED: "Abandoned",
	CANCELED: "Canceled",
}

const projectGroups = [
	{ name: "Not Started", value: "not_started", color: "text-light-grey-5" },
	{ name: "On Going", value: "ongoing", color: "text-ongoing" },
	{ name: "Completed", value: "completed", color: "text-complete" },
	{ name: "Abandonded", value: "abandonded", color: "text-abandonded" },
	{ name: "On Hold", value: "on_hold", color: "text-pending" },
]

const status_color = {
	"ON HOLD": "text-golden-brown",
	COMPLETED: "text-complete",
	"ON GOING": "text-ongoing",
	"NOT STARTED": "text-light-grey-2",
	ABANDONED: "text-abandoned",
	CANCELED: "text-light-grey-4",
}

const status_classes = {
	"ON HOLD": "text-pending border-pending bg-pending",
	COMPLETED: "text-complete border-complete bg-complete",
	"ON GOING": "text-ongoing border-ongoing bg-ongoing",
	"NOT STARTED": "text-pending border-pending bg-pending",
	CANCELED: "text-abandoned border-abandoned bg-abandoned",
	ABANDONED: "text-abandoned border-abandoned bg-abandoned",
}

const sentimentEmojis = {
	excited: Excited,
	angry: Angry,
	hopeful: Hopeful,
	impressed: Impressed,
	unimpressed: Unimpressed,
}

const mdaAccountType = ["ministry", "admin", "agency", "department"]

const citizenAccountTypes = ["citizen", "cso"]

const prices = { min: 0, max: 500000000 }

const geoZones: string[] = ["NC", "NE", "NW", "SE", "SS", "SW"]

const accountIcon = {
	MINISTRY: "💼",
	CONTRACTOR: "👷🏾‍♂️",
}

const SDG_backgrounds = {
	"no poverty": "no-poverty",
	"zero hunger": "zero-hunger",
	"good health and well-being": "good-health",
	"good health & well-being": "good-health",
	"quality education": "quality-education",
	"gender equality": "gender-equality",
	"clean water": "clean-water",
	"affordable and clean energy": "clean-energy",
	"affordable & clean energy": "clean-energy",
	"decent work and economic growth": "decent-work",
	"decent work & economic growth": "decent-work",
	"industry, innovation and infrastructure": "industry",
	"industry, innovation & infrastructure": "industry",
	"reduced inequalities": "reduced-inequalities",
	"sustainable cities and communities": "sustainable-cities",
	"sustainable cities & communities": "sustainable-cities",
	"responsibile consumption and production": "responsibile-consumption",
	"responsibile consumption & production": "responsibile-consumption",
	"climate action": "climate-action",
	"life below water": "below-water",
	"life on land": "on-land",
	"peace, justice and strong institutions": "peace",
	"peace, justice & strong institutions": "peace",
	"partnerships for the goals": "partnerships",
	"partnerships to achieve the goal": "partnerships",
}

const SDGImages = {
	"no poverty": SDGSPoverty,
	"zero hunger": SDGSHunger,
	"good health & well-being": SDGSHealth,
	"good health and well-being": SDGSHealth,
	"quality education": SDGSEducation,
	"gender equality": SDGSEquality,
	"clean water": SDGSWater,
	"clean water & sanitation": SDGSWater,
	"clean water and sanitation": SDGSWater,
	"affordable & clean energy": SDGSEnergy,
	"decent work and economic growth": SDGSDecentWork,
	"decent work & economic growth": SDGSDecentWork,
	"industry, innovation and infrastructure": SDGSIndustry,
	"industry, innovation & infrastructure": SDGSIndustry,
	"reduced inequality": SDGSReducedInequalities,
	"sustainable cities and communities": SDGSSustainableCities,
	"sustainable cities & communities": SDGSSustainableCities,
	"responsible consumption and production": SDGSResponsibleConsumption,
	"responsible consumption & production": SDGSResponsibleConsumption,
	"climate action": SDGSClimateAction,
	"life below water": SDGSBelowWater,
	"life on land": SDGSOnLand,
	"peace and justice strong institutions": SDGSPeace,
	"peace & justice strong institutions": SDGSPeace,
	"partnerships for the goals": SDGSPartnerships,
	"partnerships to achieve the goal": SDGSPartnerships,
}

export {
	contextClass,
	projectStatus,
	status_color,
	mdaAccountType,
	sentimentEmojis,
	prices,
	geoZones,
	accountIcon,
	SDG_backgrounds,
	SDGImages,
	projectGroups,
	citizenAccountTypes,
	status_classes,
}
