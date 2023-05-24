/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			screens: {
				"3xl": "2000px",
			},
			width: {
				32.4: "32.4%",
				36: "36%",
				"72/100": "72%",
				49: "49%",
				"30r": "30rem",
				150: "150%",
			},
			maxWidth: {
				650: "650px",
				80: "320px",
				40: "240px",
				96: "384px",
				card: "749px",
				"4/12": "33.33333%",
				"5/12": "41.6666667%",
				"8/12": "66.6666667%",
			},
			height: {
				"40r": "40rem",
				500: "530px",
				110: "410px",
				"1/12": "8.333333%",
				"2/12": "16.666667%",
				"3/12": "25%",
				"4/12": "33.333333%",
				"5/12": "41.666667%",
				"6/12": "50%",
				"7/12": "58.333333%",
				"8/12": "66.666667%",
				"9/12": "75%",
				"10/12": "83.333333%",
				"11/12": "91.666667%",
			},
			maxHeight: {
				650: "650px",
				500: "500px",
			},
			zIndex: {
				"-10": "-10",
				"above-modal": "100010",
			},
			colors: {
				accepted: "#4BAA73",
				"accepted-light": "#F0F5F3",
				abandoned: "#C82C20",
				"abandoned-light": "#FBE8E7",
				lightGreen: "#B5D2C1",
				lightGreen2: "#caf9cc",
				darkGreen: "#61B684",
				ongoing: "#226AF5",
				pending: "#E4AA24",
				onhold: "#ECD193",
				"sub-text": "#5E5E5E",
				cream: "#F5F4F0",
				"dark-grey": "#252117",
				"grey-blue": "#E2E8F0",
				"light-grey": "#757575",
				"light-grey-2": "#989898",
				"light-grey-3": "#7A7A7A",
				"light-grey-4": "#EDF2F7",
				"light-grey-5": "#C8C8C8",
				"light-grey-6": "#ADADAD",
				"light-grey-7": "#CCD5DF",
				"grey-stroke": "#DCDCDC",
				"input-border": "#a0afbf",
				"grey-white": "#F9F9F9",
				"golden-brown-light": "#FCF6E8",
				brown: "#252117",
				"golden-brown": "#E4AA24",
				"features-brown": "#383734",
				complete: "#02903C",
				"complete-light": "#E3FFE4",
				EB: "#EBEBEB",
				f2: "#F2F0E0",
				FD: "#FDFDFD",
				excited: "#d1cdb2",
				"auth-subtext": "#4B5667",
			},
			letterSpacing: {
				sectionhead: "0.135em",
			},
			fontSize: {
				"2-xs": ".65rem",
				"3-xs": ".5rem",
				tiny: ".7rem",
				small: ".75rem",
				med: "0.8em",
				"4-xl": "2em",
			},
			backgroundImage: {
				"survey-header":
					"url('https://res.cloudinary.com/zst/image/upload/v1637953562/eyemark/survey-header_mlwt27.png')",
			},
			gridTemplateColumns: {
				14: "repeat(14, minmax(0, 1fr))",
			},
			boxShadow: {
				login: "0px 0px 50px rgba(61, 132, 172, 0.15)",
			},
		},
	},
	variants: {
		extend: {
			translate: ["group-hover"],
			fill: ["group-focus", "focus"],
			textColor: ["group-focus", "focus"],
			borderWidth: ["hover", "focus"],
			display: ["group-hover", "hover"],
			height: ["group-hover"],
			width: ["group-hover"],
			inset: ["group-hover"],
		},
	},
}