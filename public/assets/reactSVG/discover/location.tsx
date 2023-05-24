import * as React from "react"
import { SVGProps } from "react"

const LocationSvg = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={21}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M10.001 14.057a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666Z"
			fill="#C8C8C8"
		/>
		<path
			d="M10.835 4.115V2.39H9.168v1.724A6.675 6.675 0 0 0 3.392 9.89H1.668v1.666h1.724a6.673 6.673 0 0 0 5.776 5.776v1.724h1.667v-1.724a6.672 6.672 0 0 0 5.775-5.776h1.725V9.891H16.61a6.673 6.673 0 0 0-5.775-5.776ZM10 15.724c-2.757 0-5-2.242-5-5s2.243-5 5-5c2.758 0 5 2.242 5 5s-2.242 5-5 5Z"
			fill="#C8C8C8"
		/>
	</svg>
)

export default LocationSvg
