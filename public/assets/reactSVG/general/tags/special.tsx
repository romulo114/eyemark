import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const SpecialProjectsSvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={16}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M9 13h4v1H9v-1Zm0-2h6v1H9v-1Zm0-2h6v1H9V9Z"
			fill={active ? "#fff" : "#252117"}
		/>
		<path
			d="M10.275 5.609 8.001 1 5.726 5.609l-5.085.739 3.68 3.587L3.45 15l3.55-1.866v-1.13l-2.22 1.168.525-3.068.09-.518-.377-.367-2.23-2.173 3.081-.448.52-.075.233-.472 1.378-2.792 1.377 2.792.233.471.52.076 3.727.543.143-.991-3.726-.542Z"
			fill={active ? "#fff" : "#252117"}
		/>
	</svg>
)

export default SpecialProjectsSvg
