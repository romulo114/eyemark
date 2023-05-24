import * as React from "react"
import { SVGProps } from "react"

const RightScrollSvg = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={32}
		height={32}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M0 12C0 5.373 5.373 0 12 0h20v32H12C5.373 32 0 26.627 0 20v-8Z"
			fill="#666"
		/>
		<path
			d="M18.26 16a.521.521 0 0 1-.152.37l-3.481 3.48a.522.522 0 0 1-.739-.738L17 16l-3.112-3.112a.522.522 0 0 1 .739-.738l3.48 3.48a.522.522 0 0 1 .153.37Z"
			fill="#fff"
		/>
	</svg>
)

export default RightScrollSvg
