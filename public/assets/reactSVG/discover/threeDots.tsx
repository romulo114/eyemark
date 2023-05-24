import * as React from "react"
import { SVGProps } from "react"

const ThreeDotsSvg = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={4}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<circle cx={2} cy={2} r={2} fill="#252117" />
		<circle cx={2} cy={8} r={2} fill="#252117" />
		<circle cx={2} cy={14} r={2} fill="#252117" />
	</svg>
)

export default ThreeDotsSvg
