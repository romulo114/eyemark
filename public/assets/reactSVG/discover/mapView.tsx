import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const MapView = ({ active, ...props }: svgPropType) => (
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
			d="m15.368 11.79-2.736-.914A2 2 0 0 0 10 12.774v11.783a2 2 0 0 0 1.368 1.898l4 1.333a2 2 0 0 0 1.264 0l4.736-1.578a2 2 0 0 1 1.264 0l2.736.912A2.001 2.001 0 0 0 28 25.223V13.441a2 2 0 0 0-1.367-1.898l-4-1.333a2 2 0 0 0-1.265 0l-4.737 1.578a2 2 0 0 1-1.264 0l.001.001Z"
			stroke={active ? "#4BAA73" : "#DCDCDC"}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M16 12v16M22 10v16"
			stroke={active ? "#4BAA73" : "#DCDCDC"}
			strokeWidth={1.5}
			strokeLinejoin="round"
		/>
	</svg>
)

export default MapView
