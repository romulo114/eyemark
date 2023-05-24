import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const SchoolsSvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={16}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M3.333 8.787v1.874c0 .487.267.94.693 1.173l3.334 1.82c.4.22.88.22 1.28 0l3.333-1.82c.426-.233.693-.686.693-1.173V8.788l-4.026 2.2c-.4.22-.88.22-1.28 0l-4.027-2.2Zm4.027-6.44L1.74 5.415a.671.671 0 0 0 0 1.174l5.62 3.066c.4.22.88.22 1.28 0L14 6.728v3.94c0 .366.3.666.666.666.367 0 .667-.3.667-.666V6.394a.67.67 0 0 0-.347-.587L8.64 2.348a1.36 1.36 0 0 0-1.28 0Z"
			fill={active ? "#fff" : "#252117"}
		/>
	</svg>
)

export default SchoolsSvg
