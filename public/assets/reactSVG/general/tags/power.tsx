import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const PowerSvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={16}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="m14 5.83-1.227-1.227-2.424 2.424-1.376-1.376 2.424-2.424L10.17 2 7.746 4.424 6.19 2.868 5.015 4.042l6.942 6.942 1.175-1.174-1.556-1.556L14 5.83Zm-3.118 5.306L4.864 5.118c-1.3 1.558-2.774 3.966-1.755 6.037l-1.793 1.793a1.088 1.088 0 0 0 0 1.534l.202.202a1.088 1.088 0 0 0 1.534 0l1.793-1.793c2.071 1.018 4.478-.455 6.037-1.755Z"
			fill={active ? "#fff" : "#252117"}
		/>
	</svg>
)

export default PowerSvg
