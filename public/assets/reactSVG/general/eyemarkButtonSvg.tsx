import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const EyeMarkButtonSvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={35}
		height={34}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<rect
			x={0.673}
			y={1.659}
			width={33.654}
			height={30.962}
			rx={15.481}
			fill={active ? "#F0F5F3" : "#000"}
			fillOpacity={active ? undefined : 0.5}
		/>
		<path
			d="M12.117 11.757c0-.744.603-1.347 1.346-1.347h8.077c.744 0 1.346.603 1.346 1.346v9.687a1.346 1.346 0 0 1-2.06 1.141l-3.324-2.078-3.325 2.078a1.346 1.346 0 0 1-2.06-1.141v-9.687Z"
			fill={active ? "#4BAA73" : "#000"}
			fillOpacity={active ? undefined : 0.5}
		/>
		<path
			d="M21.81 11.532v10.543l-3.231-2.13c-.216-.112-.754-.56-1.077-.56-.323 0-1.077.56-1.077.56l-3.23 2.13V11.532h8.614Zm1.076.224c0-.743-.602-1.346-1.346-1.346h-8.077c-.743 0-1.346.603-1.346 1.347v9.686a1.346 1.346 0 0 0 2.06 1.141l3.325-2.078 3.325 2.078c.896.56 2.06-.084 2.06-1.141v-9.687Z"
			fill={active ? "#F0F5F3" : "#fff"}
		/>
		<rect
			x={0.673}
			y={1.659}
			width={33.654}
			height={30.962}
			rx={15.481}
			stroke="#DCDCDC"
			strokeWidth={1.346}
		/>
	</svg>
)

export default EyeMarkButtonSvg
