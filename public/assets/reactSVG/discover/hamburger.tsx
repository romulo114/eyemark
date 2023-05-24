import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const Hamburger = ({ active, ...props }: svgPropType) => (
	<svg
		width={38}
		height={38}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<rect
			x={0.5}
			y={0.5}
			width={37}
			height={37}
			rx={6.5}
			fill={active ? "#F0F5F3" : "#fff"}
			stroke={active ? "#F0F5F3" : "#fff"}
		/>
		<path
			opacity={0.4}
			d="M11 12.63h16M11 19h16M11 25.371h16"
			stroke={active ? "#4BAA73" : "#A0AFBF"}
			strokeWidth={2.4}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export default Hamburger
