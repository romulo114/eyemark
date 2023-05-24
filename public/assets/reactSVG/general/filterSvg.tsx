import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const FilterSvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={24}
		height={24}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M20.25 15.375h-1.985a2.624 2.624 0 0 0-5.03 0H3.75a.75.75 0 0 0 0 1.5h9.485a2.624 2.624 0 0 0 5.03 0h1.985a.75.75 0 1 0 0-1.5Zm-4.5 1.875a1.124 1.124 0 1 1 0-2.248 1.124 1.124 0 0 1 0 2.248Zm-12-8.625h3.485a2.625 2.625 0 0 0 5.03 0h7.985a.75.75 0 1 0 0-1.5h-7.985a2.624 2.624 0 0 0-5.03 0H3.75a.75.75 0 0 0 0 1.5Zm6-1.875a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z"
			fill={active ? "#4BAA73" : "#252117"}
		/>
	</svg>
)

export default FilterSvg
