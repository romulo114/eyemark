import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const PortsSvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={16}
		height={14}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g clipPath="url(#a)">
			<path
				d="M7.719-1.5v2.781H8c.466 0 .719.366.744.738a.646.646 0 0 1-.147.481c-.11.125-.284.219-.597.219-.156 0-.347-.088-.487-.232-.144-.14-.232-.33-.232-.487H6.72c0 .344.162.653.393.888.235.23.544.393.888.393.438 0 .794-.156 1.016-.406a1.21 1.21 0 0 0 .29-.894C9.27 1.434 8.888.881 8.281.75V-1.5H7.72ZM6.222 2.89 1.917 5.72h1.022l3.59-2.36-.307-.468Zm3.556 0-.306.47 3.59 2.359h1.02L9.777 2.89ZM1.281 6.282v6.938H14.72V6.28H1.28ZM2.47 7h.562v5.5H2.47V7Zm1.5 0h.562v5.5H3.97V7Zm1.5 0h.562v5.5H5.47V7Zm1.5 0h.562v5.5H6.97V7Zm1.5 0h.562v5.5H8.47V7Zm1.5 0h.562v5.5H9.97V7Zm1.5 0h.562v5.5h-.562V7Zm1.5 0h.562v5.5h-.562V7Z"
				fill={active ? "#fff" : "#252117"}
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h16v14H0z" />
			</clipPath>
		</defs>
	</svg>
)

export default PortsSvg
