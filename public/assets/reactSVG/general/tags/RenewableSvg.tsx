import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const RenewableSvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={16}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M5.999 2H3.332c-.367 0-.667.3-.667.667 0 .367.3.667.667.667h2.667c.366 0 .666-.3.666-.667C6.665 2.3 6.365 2 6 2ZM3.332 4.667h-2c-.367 0-.667.3-.667.667 0 .366.3.666.667.666h2c.367 0 .667-.3.667-.666 0-.367-.3-.667-.667-.667ZM2.665 14h2c.367 0 .667-.3.667-.666 0-.367-.3-.667-.667-.667h-2c-.366 0-.666.3-.666.667 0 .366.3.666.666.666Zm6.487-6.926c.5.153.867.52 1.047.973l2.846-4.74a1.52 1.52 0 0 0-2.34-1.893L8.42 3.554c-.267.246-.42.6-.42.966v2.62c.24-.1.653-.22 1.153-.066ZM7.072 8.18c.107-.346.32-.64.593-.846h-5.48a1.52 1.52 0 0 0-.42 2.98l3.007.86c.353.1.733.053 1.053-.14L7.62 9.96a1.658 1.658 0 0 1-.547-1.78Zm7.733 4.227-1.52-2.733a1.366 1.366 0 0 0-.84-.647l-2.12-.533c.02.213 0 .44-.066.66a1.652 1.652 0 0 1-1.594 1.18c-.406 0-.66-.147-.666-.147V14c-.734 0-1.334.6-1.334 1.334h4c0-.734-.6-1.334-1.333-1.334v-2.853l3.073 3.073a1.517 1.517 0 0 0 2.147 0c.48-.48.587-1.22.253-1.813Z"
			fill={active ? "#fff" : "#111"}
		/>
		<path
			d="M8.374 9.62a.996.996 0 0 0 1.246-.668.996.996 0 0 0-.666-1.246.996.996 0 0 0-1.247.666c-.16.527.14 1.087.667 1.247Z"
			fill={active ? "#fff" : "#111"}
		/>
	</svg>
)

export default RenewableSvg
