import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const MobileAround = ({ active, ...props }: svgPropType) => (
	<svg
		width={28}
		height={28}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<rect width={28} height={28} rx={8.167} fill="#F0F5F3" />
		<g
			clipPath="url(#a)"
			stroke={active ? "#4BAA73" : "#A0AFBF"}
			strokeWidth={1.296}
		>
			<path
				d="M14.008 7.518v5.509"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14.005 7.518a6.481 6.481 0 1 0 5.118 2.504"
				strokeLinecap="round"
			/>
			<path
				d="M14.006 10.434a3.565 3.565 0 1 0 2.815 1.377"
				strokeLinecap="round"
			/>
			<path d="M14.004 14.97a.972.972 0 1 0 0-1.945.972.972 0 0 0 0 1.945Z" />
		</g>
		<defs>
			<clipPath id="a">
				<path
					fill="#fff"
					transform="translate(6.223 6.223)"
					d="M0 0h15.556v15.556H0z"
				/>
			</clipPath>
		</defs>
	</svg>
)

export default MobileAround
