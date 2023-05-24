/** @format */

import { FC } from "react"
import { onBoardingButtonPropTypes } from "@/@types/components/buttons.types"
import TextPrimary from "../textPrimary"

const OnboardingButton: FC<onBoardingButtonPropTypes> = ({
	onClick,
	back,
	text,
	translation,
	...props
}) => {
	return (
		<button
			onClick={onClick}
			className={`${
				back ? "bg-transparent " : "bg-accepted px-5"
			} text-white medium rounded-full py-2`}
			{...props}
		>
			<TextPrimary translation={translation || "login"}>{text}</TextPrimary>
		</button>
	)
}

export default OnboardingButton
