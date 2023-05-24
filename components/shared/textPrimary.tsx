/** @format */

import { textElementType, TextProps } from "@/@types/components/general.types"
import { useTranslation } from "next-i18next"
import React from "react"
import { FC } from "react"

const TextPrimary: FC<TextProps> = ({
	elementType = textElementType.Paragraph,
	headingLevel = 1,
	children,
	translation = "common",
	extra = "",
	...props
}) => {
	const { t } = useTranslation(translation)
	const element =
		elementType === textElementType.Paragraph
			? "p"
			: elementType === textElementType.Span
			? "span"
			: `h${headingLevel}`

	return React.createElement(
		element,
		{ ...props },
		`${t(`${children}`)}${extra}`
	)
}

export default TextPrimary
