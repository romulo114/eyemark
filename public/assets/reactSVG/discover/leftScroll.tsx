import * as React from "react"
import { SVGProps } from "react"

const LeftScrollSvg = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={32}
		height={32}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M0 0h20c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12H0V0Z"
			fill="#666"
		/>
		<path
			d="M13.74 16a.521.521 0 0 1 .152-.37l3.481-3.48a.522.522 0 0 1 .739.738L15 16l3.112 3.112a.522.522 0 0 1-.739.738l-3.48-3.48a.522.522 0 0 1-.153-.37Z"
			fill="#fff"
		/>
	</svg>
)

export default LeftScrollSvg
