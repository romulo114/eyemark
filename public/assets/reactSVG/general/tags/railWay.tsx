import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const RailWaySvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={16}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M8.001 1.334c-2.666 0-5.333.333-5.333 2.667v6.333a2.336 2.336 0 0 0 2.333 2.333l-1 1v.334h1.334l1.333-1.334h2.667l1.333 1.334h1.333v-.334l-1-1a2.336 2.336 0 0 0 2.334-2.333V4.001c0-2.334-2.667-2.667-5.334-2.667Zm-3 10c-.553 0-1-.447-1-1 0-.553.447-1 1-1 .554 0 1 .447 1 1 0 .553-.446 1-1 1Zm2.334-4.667H4V4.001h3.334v2.666ZM11 11.334c-.553 0-1-.447-1-1 0-.553.447-1 1-1 .554 0 1 .447 1 1 0 .553-.446 1-1 1Zm1-4.667H8.668V4.001h3.333v2.666Z"
			fill={active ? "#fff" : "#252117"}
		/>
	</svg>
)

export default RailWaySvg
