import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const HealthSvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={14}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g clipPath="url(#a)">
			<path
				d="M7 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 9.725a5.573 5.573 0 0 0-4 5.347c0 .512.416.928.928.928h12.144a.928.928 0 0 0 .928-.928 5.573 5.573 0 0 0-4-5.347v1.588a2.002 2.002 0 0 1 1.5 1.937v1.25c0 .275-.225.5-.5.5h-.5a.501.501 0 0 1-.5-.5c0-.275.225-.5.5-.5v-.75a.999.999 0 1 0-2 0V14c.275 0 .5.225.5.5s-.225.5-.5.5H8a.501.501 0 0 1-.5-.5v-1.25c0-.931.637-1.716 1.5-1.938V9.528a5.744 5.744 0 0 0-.572-.028H5.572c-.194 0-.385.01-.572.028v2.044a1.751 1.751 0 1 1-2.25 1.678c0-.794.528-1.463 1.25-1.678V9.725ZM4.5 14c.416 0 .75-.334.75-.75a.748.748 0 0 0-.75-.75.748.748 0 0 0-.75.75c0 .416.334.75.75.75Z"
				fill={active ? "#fff" : "#252117"}
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h14v16H0z" />
			</clipPath>
		</defs>
	</svg>
)

export default HealthSvg
