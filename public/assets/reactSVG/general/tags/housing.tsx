import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const HousingSvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={16}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M12.662 1.334H6.008c-.74 0-1.34.6-1.34 1.34v3.758L1.534 9.527a.667.667 0 0 0 .468 1.14v3.334a.667.667 0 0 0 .666.666h10.667a.667.667 0 0 0 .667-.666V2.673c0-.74-.599-1.339-1.34-1.339Zm-5.379 8.74v3.26H3.335V9.622l1.991-1.966 1.957 2.002v.417Zm1.385-4.073H7.335V4.667h1.333v1.334Zm2.667 5.333h-1.333v-1.333h1.333v1.333Zm0-2.667h-1.333V7.334h1.333v1.333Zm0-2.666h-1.333V4.667h1.333v1.334Z"
			fill={active ? "#fff" : "#252117"}
		/>
		<path
			d="M4.668 10h1.333v1.333H4.668V10Z"
			fill={active ? "#fff" : "#252117"}
		/>
	</svg>
)

export default HousingSvg
