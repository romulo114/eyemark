/** @format */

import { eyeMarkButtonPropTypes } from "@/@types/components/buttons.types"
import useEyeMark from "@/hooks/useEyemark"
import { FC } from "react"
import TextPrimary from "../textPrimary"
import citizensAssets from "@/public/assets/SVG/citizens"
import Image from "next/image"
import EyeMarkButtonSvg from "@/public/assets/reactSVG/general/eyemarkButtonSvg"

const EyeMarkButton: FC<eyeMarkButtonPropTypes> = ({
	buttonType = "default",
	...props
}) => {
	switch (buttonType) {
		case "rounded":
			return <RoundedButton {...props} />
		case "new":
			return <NewButton {...props} />
		default:
			return <DefaultButton {...props} />
	}
}

const DefaultButton: FC<eyeMarkButtonPropTypes> = ({
	projectId,
	projectName,
	className,
	hover,
	...props
}) => {
	const { isEyeMarked, _handleEyeMark } = useEyeMark(projectId, projectName)
	return (
		<button
			className={`${className} font-bold text-center w-full border py-2 text-xs sm:text-sm rounded-md tracking-wider flex-shrink-0 ${
				isEyeMarked
					? "bg-grey-blue border-grey-blue text-light-grey"
					: "bg-accepted-light border-accepted text-accepted hover:bg-accepted hover:text-accepted-light transition ease-in-out duration-300"
			}`}
			onClick={_handleEyeMark}
			{...props}
			data-testid={isEyeMarked ? "project-btn_eyemarked" : "project-btn_eyemark"}
		>
			{isEyeMarked ? "Eyemarked" : "Eyemark"}
		</button>
	)
}

const NewButton: FC<eyeMarkButtonPropTypes> = ({
	projectId,
	projectName,
	className,
	...props
}) => {
	const { isEyeMarked, _handleEyeMark } = useEyeMark(projectId, projectName)
	return (
		<EyeMarkButtonSvg
			active={isEyeMarked}
			onClick={_handleEyeMark}
			className={`${className} cursor-pointer`}
		/>
	)
}

const RoundedButton: FC<eyeMarkButtonPropTypes> = ({
	projectId,
	projectName,
	className,
	hover,
	...props
}) => {
	const { isEyeMarked, _handleEyeMark } = useEyeMark(projectId, projectName)
	return (
		<div className="flex-shrink-0">
			{!isEyeMarked && (
				<div
					className={`w-7 h-7 ${
						hover && "hidden"
					} transition duration-300 ease-in-out`}
				>
					<Image src={citizensAssets["Folder"]} alt="project" />
				</div>
			)}

			<button
				className={`rounded-full h-7 w-7 flex items-center justify-center border transition duration-300 ease-in-out  ${
					isEyeMarked
						? `border-darkGreen  bg-accepted ${hover && "flex"}`
						: `${
								hover ? "flex" : "hidden"
						  } border-grey-stroke bg-white`
				}`}
				onClick={_handleEyeMark}
				{...props}
			>
				<Image
					src={citizensAssets["WhiteEyeMarkLogo"]}
					height="50%"
					width="100%"
					alt="eyemark"
				/>
			</button>
		</div>
	)
}

export { EyeMarkButton }
