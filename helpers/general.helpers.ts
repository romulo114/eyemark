/** @format */

import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { contractorRoutes, mdaRoutes } from "@/constants/AppRoutes/mda.routes"
import { NextRouter } from "next/router"
import { parseCookie } from "@/helpers/parseCookies.helpers"
import moment from "moment"
import {
	projectSentimentType,
	sentimentString,
} from "@/@types/components/projects.types"
import {
	Angry,
	Excited,
	Hopeful,
	Impressed,
	Suggestion,
	Unimpressed,
} from "@/public/assets/PNG"
import {
	citizenAccountTypes,
	mdaAccountType,
} from "@/constants/general/defaults"
import { TypeOfAccount } from "@/@types/components/general.types"

const toTitleCase = (str: string) => {
	return str?.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}

const getAccountType = (
	req: any
): {
	account_type: string | boolean
	registering: boolean
	is_authenticated: boolean
} => {
	const cookie = parseCookie(req)
	const AUTH = cookie?.AUTH && JSON.parse(cookie["AUTH"])
	const registering = AUTH?.registering || false
	const is_authenticated = AUTH?.is_authenticated || false
	const account_type =
		AUTH?.user?.account_type?.toLowerCase() || cookie?.userType || false
	return { account_type, registering, is_authenticated }
}

const checkIsEyeMarked = (project_Id: string, eyeMarkedProjects: any[]) => {
	return eyeMarkedProjects?.find(
		(eyeMarkedProject: any) => eyeMarkedProject?.public_id === project_Id
	)
		? true
		: false
}

const shortenCurrency = (labelValue: number | string) => {
	// twelve Zeroes for Billions
	if (!labelValue || labelValue === "0.00") return "_"
	return Math.abs(Number(labelValue)) >= 1.0e12
		? "₦" + (Math.abs(Number(labelValue)) / 1.0e12).toFixed(2) + "T"
		: // Nine Zeroes for Billions
		Math.abs(Number(labelValue)) >= 1.0e9
		? "₦" + (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
		: // Six Zeroes for Millions
		Math.abs(Number(labelValue)) >= 1.0e6
		? "₦" + (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
		: // Three Zeroes for Thousands
		Math.abs(Number(labelValue)) >= 1.0e3
		? "₦" + (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
		: "₦" + Math.abs(Number(labelValue))
}

export const getDateDifference = (end_date: string, start_date: string) => {
	let endDate = moment(end_date)
	let startDate = moment(start_date)
	return endDate.diff(startDate, "years") >= 1
		? endDate.diff(startDate, "years") === 1
			? endDate.diff(startDate, "years") + " Year"
			: endDate.diff(startDate, "years") + " Years"
		: endDate.diff(startDate, "months") + " Months"
	// return moment(date1).diff(moment(date2), "years");
}

const getAverageSentiment = (sentiments: projectSentimentType) => {
	let maxVal = 0
	let maxSentiment = "_"
	let val: any

	if (!sentiments) return maxSentiment

	for (val of Object?.keys(sentiments)) {
		const currentVal: any = sentiments[val as sentimentString]
		if (currentVal > maxVal) {
			maxVal = currentVal
			maxSentiment = val
		}
	}
	return maxSentiment
}

const convertSentiments = (sentiments: projectSentimentType) => {
	if (!sentiments) return
	const sentimentObj = {
		impressed: { name: "impressed", index: 5 },
		excited: { name: "excited", index: 4 },
		hopeful: { name: "hopeful", index: 3 },
		unimpressed: { name: "unimpressed", index: 2 },
		angry: { name: "angry", index: 1 },
		suggestion: { name: "suggestion", index: 6 },
	}
	const sentimentEmo = {
		impressed: Impressed,
		excited: Excited,
		hopeful: Hopeful,
		unimpressed: Unimpressed,
		angry: Angry,
		suggestion: Suggestion,
	}

	const convertedSentiments = []

	for (const sentiment in sentiments) {
		convertedSentiments.push({
			sentiment: sentimentObj[sentiment as sentimentString]?.name,
			index: sentimentObj[sentiment as sentimentString]?.index,
			emoji: sentimentEmo[sentiment as sentimentString],
			width: (sentiments[sentiment as sentimentString] / 100) * 100,
			total: sentiments[sentiment as sentimentString],
		})
	}

	var sortedConvertedSentiments = convertedSentiments.sort(function (a, b) {
		return b.index - a.index
	})

	return sortedConvertedSentiments
}

const checkCurrentVoteStatus = (votes: any[], user: string) => {
	return votes?.find((vote: any) => vote?.user?.public_id === user)
		? true
		: false
}
const generateStateString = (geolocations: any[], single?: boolean): string => {
	if (!geolocations) {
		return "-"
	}

	let states: string[] = []
	for (const location of geolocations) {
		if (location?.state && !states.includes(location?.state)) {
			states[states.length] = location.state
		}
	}

	return states.length > 0
		? single && states.length > 1
			? `${states[0]}...`
			: states.join(", ")
		: "-"
}

const redirectToDashboard = (account: string, router: any) => {
	if (mdaAccountType.includes(account.toLowerCase() as string)) {
		router.push(mdaRoutes.dashboard)
	} else if (citizenAccountTypes.includes(account.toLowerCase())) {
		router.push(citizensRoutes.dashboard)
	} else {
		router.push(contractorRoutes.dashboard)
	}
}

const notCitizen = (account_type?: TypeOfAccount): boolean => {
	if (account_type)
		return account_type !== "CITIZEN" && account_type !== "CSO"

	return typeof window !== "undefined"
		? window.location.pathname.includes("mda/dashboard") ||
				window.location.pathname.includes("contractors/dashboard")
		: false
}

const formatMultiSelect = (
	s: string[] | { value: string; label: string }[]
): { value: string; label: string }[] => {
	let mapping = s?.map((a) => {
		if (typeof a === "object") {
			return a
		} else {
			return { value: a, label: a }
		}
	})
	return mapping
}

const mapValueToIndex = (value: any, items: any[]) => {
	const foundValue = items.indexOf(value)
	return foundValue > 0 ? foundValue : 0
}

const mapIndexToValue = (index: number, items: any[]) => {
	const foundValue = items[index]
	return foundValue ? foundValue : items[0]
}

const isValuePresent = (value: any, items: any[]) => {
	return items.includes(value)
}

export {
	toTitleCase,
	getAccountType,
	checkIsEyeMarked,
	shortenCurrency,
	getAverageSentiment,
	checkCurrentVoteStatus,
	generateStateString,
	notCitizen,
	convertSentiments,
	redirectToDashboard,
	formatMultiSelect,
	mapValueToIndex,
	mapIndexToValue,
	isValuePresent,
}
