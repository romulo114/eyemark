/** @format */

import { FC } from "react"
import { scrollArrowButtonPropTypes } from "@/@types/components/buttons.types"
import { leftScrollArrowSvg } from "@/public/assets/SVG/general"
import Image from "next/image"
import styles from "@/styles/top.module.scss"

const ScrollArrow: FC<scrollArrowButtonPropTypes> = ({
	onClick,
	right,
	interests,
	settings,
	hide,
	hover,
	fromDiscover,
}) => {
	return (
		<div
			className={`absolute ${
				styles["scroll-arrow"]
			} cursor-pointer lg:group-hover:block ${
				right ? "right-0 transform rotate-180 -mt-4" : "left-0"
			} ${interests && settings ? "" : interests ? "" : ""} ${
				hide ? "hidden" : !hover && "hidden"
			} duration-500 z-10`}
			onClick={onClick}
		>
			<Image src={leftScrollArrowSvg} alt="scroll" />
		</div>
	)
}

export default ScrollArrow
