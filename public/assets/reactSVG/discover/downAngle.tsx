import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const DownAngle = ({ active, ...props }: svgPropType) => (
	<svg
		width={8}
		height={6}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M4 5.26a.52.52 0 0 1-.37-.153L.15 1.627A.522.522 0 0 1 .888.888L4 4 7.112.888a.522.522 0 0 1 .738.739l-3.48 3.48A.52.52 0 0 1 4 5.26Z"
			fill={active ? "#4BAA73" : "#A0AFBF"}
		/>
	</svg>
)

export default DownAngle
