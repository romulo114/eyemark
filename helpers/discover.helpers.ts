/** @format */

const genUsersArr = (users: any[], projects = true) => {
	const citizens: any[] = users?.filter(
		(user) => user.account_type === "CITIZEN" || user.account_type === "CSO"
	)
	const mda: any[] = users?.filter(
		(user) =>
			user.account_type !== "CITIZEN" &&
			user.account_type !== "CSO" &&
			user.account_type !== "CONTRACTOR"
	)
	const contractors: any[] = users?.filter(
		(user) => user.account_type === "CONTRACTOR"
	)

	const headerArr: { value: string; id: number }[] = [{ value: "Top", id: 1 }]

	projects &&
		(headerArr[headerArr.length] = {
			value: "Projects",
			id: headerArr[headerArr.length - 1]?.id + 1,
		})
	contractors.length > 0 &&
		(headerArr[headerArr.length] = {
			value: "Contractors",
			id: headerArr[headerArr.length - 1]?.id + 1,
		})
	citizens.length > 0 &&
		(headerArr[headerArr.length] = {
			value: "Citizens",
			id: headerArr[headerArr.length - 1]?.id + 1,
		})
	mda.length > 0 &&
		(headerArr[headerArr.length] = {
			value: "MDAs",
			id: headerArr[headerArr.length - 1]?.id + 1,
		})

	return { citizens, mda, contractors, headerArr }
}

export { genUsersArr }
