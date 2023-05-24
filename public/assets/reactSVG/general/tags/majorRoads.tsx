import { svgPropType } from "@/@types/app.types"
import * as React from "react"

const MajorRoadsSvg = ({ active, ...props }: svgPropType) => (
	<svg
		width={18}
		height={16}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g clipPath="url(#a)">
			<path
				d="m17.912 12.583-4.368-10A.951.951 0 0 0 12.678 2h-3.05l.077.724a.25.25 0 0 1-.25.276h-.91a.25.25 0 0 1-.25-.276L8.373 2h-3.05a.951.951 0 0 0-.866.583l-4.368 10C-.202 13.246.26 14 .955 14h6.15l.323-3.053a.5.5 0 0 1 .497-.447h2.15a.5.5 0 0 1 .497.447L10.895 14h6.15c.695 0 1.157-.754.867-1.417Zm-9.774-8.36A.25.25 0 0 1 8.386 4h1.228a.25.25 0 0 1 .249.224l.144 1.362A.375.375 0 0 1 9.634 6H8.367a.375.375 0 0 1-.373-.414l.144-1.362ZM9.864 9.5H8.136a.5.5 0 0 1-.497-.553l.158-1.5A.5.5 0 0 1 8.295 7h1.41a.5.5 0 0 1 .498.447l.158 1.5a.5.5 0 0 1-.497.553Z"
				fill={active ? "#fff" : "#252117"}
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h18v16H0z" />
			</clipPath>
		</defs>
	</svg>
)

export default MajorRoadsSvg
