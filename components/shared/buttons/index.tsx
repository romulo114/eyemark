/** @format */

import {
	buttonPropTypes,
	tagButtonPropTypes,
} from "@/@types/components/buttons.types"
import { FC } from "react"
import TextPrimary from "../textPrimary"
import styles from "@/styles/onboarding.module.scss"
import tagStyles from "@/styles/interestTags.module.scss"
import { toTitleCase } from "@/helpers/general.helpers"

const ButtonPrimary: FC<buttonPropTypes> = ({
	className,
	text,
	translation,
	...props
}) => {
	return (
		<button
			className={
				className ||
				`w-full rounded-full bg-accepted text-white mt-12 py-3 text-center`
			}
			{...props}
		>
			<TextPrimary
				className="medium"
				translation={translation || "login"}
			>
				{text}
			</TextPrimary>
		</button>
	)
}

const ButtonSkipForNow: FC<buttonPropTypes> = ({
	className,
	text,
	translation,
	...props
}) => {
	return (
		<button className={`${className} ${styles["skip-for-now"]}`} {...props}>
			<TextPrimary translation={translation || "login"}>
				{text}
			</TextPrimary>
		</button>
	)
}

const TagButton: FC<tagButtonPropTypes> = ({
	className,
	text,
	translation,
	checked,
	...props
}) => {
	return (
		<button
			{...props}
			className={`whitespace-nowrap ${
				tagStyles["tags"]
			} text-center text-white 
            ${
				checked
					? tagStyles["clicked-tags"]
					: tagStyles["unclicked-tags"]
			}`}
		>
			{toTitleCase(text)}
		</button>
	)
}

export { ButtonSkipForNow, TagButton }

export default ButtonPrimary
