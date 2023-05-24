/** @format */

import { prices } from "@/constants/general/defaults"
import { storeRef } from "@/pages/_app"
import moment from "moment"

const genQuery = (noTags?: boolean) => {
	const { filter } = storeRef.getState()
	const { from } = filter
	const { min, max } = prices
	const {
		timePeriod: { start_date, end_date, selected },
		location,
		status,
		mdaContractors,
		budget: { min_amt_budgeted, max_amt_budgeted },
		cost: { max_total_cost, min_total_cost },
		query: searchQuery,
		activeTag,
	} = (filter as any)[from]

	// begging of query
	let query = ""
	if (window.location.search && window.location.search.includes("category")) {
		const urlData = window.location.search.split("&")
		let activeCategory = urlData[0].split("=")[1]
		activeCategory === "states" && (activeCategory = "state")
		activeCategory === "ministries" && (activeCategory = "ministry")
		let activeSubcategory = urlData[1].split("=")[1].toUpperCase()
		activeCategory === "ministry" &&
			(activeSubcategory = activeSubcategory.toLowerCase())
		query = `&${activeCategory}=${activeSubcategory}`
	}

	//attach to query based on criteria

	//filter by tag
	activeTag.length > 0 &&
		!noTags &&
		from === "discover" &&
		(query += `&tags=${activeTag}`)

	//filter by cost
	max_total_cost < max && (query += `&max_total_cost=${max_total_cost}`)
	min_total_cost > min && (query += `&min_total_cost=${min_total_cost}`)

	//filter by budget
	max_amt_budgeted < max && (query += `&max_amt_budgeted=${max_amt_budgeted}`)
	min_amt_budgeted > min && (query += `min_amt_budgeted=${min_amt_budgeted}`)

	//filter by project status
	status.length > 0 && (query += `&status=${status.join(",")}`)

	//filter by location
	location.selected.length > 0 &&
		(query += `&state=${location.selected.join(",").toUpperCase()}`)

	//filter by contractors or ministry
	if (mdaContractors.length > 0) {
		let contractor = ""
		let ministry = ""

		//generate query string for contractor or ministry based on account type
		mdaContractors.forEach((value: any) => {
			if (value.account_type === "CONTRACTOR") {
				contractor += `${contractor.length > 0 ? "," : ""}${
					value.username
				}`
			} else {
				ministry += `${ministry.length > 0 ? "," : ""}${value.username}`
			}
		})

		//filter by contractor
		contractor.length > 0 && (query += `&contractor=${contractor}`)

		//filter by ministry
		ministry.length > 0 && (query += `&ministry=${ministry}`)
	}

	//filter by time period
	selected &&
		selected !== "null" &&
		(query += `&start_date=${moment(start_date).format("yyyy-MM-DD")}`) &&
		(query += `&end_date=${moment(end_date).format("yyyy-MM-DD")}`)

	searchQuery.length > 0 && (query += `&name=${searchQuery}`)

	return query
}

export { genQuery }
