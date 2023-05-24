/** @format */

const profileNav = (thirdParty?: boolean): { id: number; value: string }[] => {
	const defaultNav = [
		{
			id: 1,
			value: "Posts",
		},
		{
			id: 2,
			value: "Media",
		},
		{
			id: 3,
			value: "Eyemarked",
		},
	]
	thirdParty &&
		(defaultNav[2] = {
			id: 3,
			value: "Projects",
		})
	return defaultNav
}

export { profileNav }
