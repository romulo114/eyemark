import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const GridView = ({ active, ...props }: svgPropType) => (
	<svg
		width={28}
		height={28}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<rect
			width={28}
			height={28}
			rx={8.167}
			fill={active ? "#F0F5F3" : "#fff"}
		/>
		<path
			fill={active ? "#4BAA73" : "#DCDCDC"}
			stroke={active ? "#4BAA73" : "#DCDCDC"}
			strokeWidth={1.167}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M8.105 8.105h4.421v4.421H8.105zM15.477 8.105h4.421v4.421h-4.421zM15.477 15.475h4.421v4.421h-4.421zM8.105 15.475h4.421v4.421H8.105z"
		/>
	</svg>
)

export default GridView
