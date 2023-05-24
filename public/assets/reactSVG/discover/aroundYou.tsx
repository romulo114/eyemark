import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const AroundYou = ({ active, ...props }: svgPropType) => (
	<svg
		width={16}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g
			clipPath="url(#a)"
			stroke={active ? "#4BAA73" : "#252117"}
			strokeWidth={1.333}
		>
			<path
				d="M8 1.334v5.667"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7.999 1.334a6.667 6.667 0 1 0 5.264 2.576"
				strokeLinecap="round"
			/>
			<path
				d="M7.999 4.334a3.667 3.667 0 1 0 2.895 1.417"
				strokeLinecap="round"
			/>
			<path d="M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h16v16H0z" />
			</clipPath>
		</defs>
	</svg>
)

export default AroundYou
