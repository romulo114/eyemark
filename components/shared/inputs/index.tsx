/** @format */

import { inputPropTypes } from "@/@types/components/input.types"
import { Eye, HiddenEye } from "@/public/assets/SVG/input"
import { FC, useRef, useState } from "react"
import Image from "next/image"
import { cancelIcon, NairaIcon } from "@/public/assets/SVG/general"

const TextInputPrimary: FC<inputPropTypes> = ({
	error,
	label,
	type,
	className,
	testId,
	containerClassName,
	cancel,
	onCancelPress,
	...props
}) => {
	const [showText, setShowText] = useState<boolean>(false)
	const [isFocused, setIsFocused] = useState<boolean>(type === "date")
	const inputRef = useRef<HTMLInputElement>(null)

	const _handleFocus = () => setIsFocused(type === "date" ? true : !isFocused)
	const _handleTogglePassword = () => setShowText(!showText)
	return (
		<div
			className={`${containerClassName} mt-9 flex items-center relative group rounded ani border pb-2 pt-4 px-4 focus:outline-none h-14 
				${
					error
						? "border-abandoned"
						: isFocused
						? "border-accepted"
						: "border-input-border"
				}`}
		>
			<label
				htmlFor={props.id || label?.split(" ")?.join("")?.toLowerCase()}
				className={`absolute h-full left-4 text-input-border ani z-10 duration-150 ${
					type === "date" ||
					isFocused ||
					inputRef.current?.value !== ""
						? `top-1 ${type === "date" ? "text-3-xs" : "text-2-xs"}`
						: "text-sm top-4"
				}`}
			>
				{label || ""}
			</label>

			<input
				id={props.id || label?.split(" ")?.join("")?.toLowerCase()}
				data-testid={testId}
				type={type === "password" ? (!showText ? type : "text") : type}
				className={`${className} text-black w-full h-full bg-transparent text-sm focus:outline-none relative z-20`}
				onFocus={_handleFocus}
				onBlur={_handleFocus}
				ref={inputRef}
				{...props}
			/>
			{type === "password" && (
				<button
					type="button"
					className="absolute z-30 right-3 focus:outline-none "
					onClick={_handleTogglePassword}
				>
					<Image
						src={showText === false ? HiddenEye : Eye}
						alt="eye-password"
						className="group-focus:text-green-600 group-focus:fill-current "
					/>
				</button>
			)}
			{cancel && (
				<button
					className="absolute right-3 mt-2"
					onClick={onCancelPress}
				>
					<Image src={cancelIcon} />
				</button>
			)}
		</div>
	)
}

export default TextInputPrimary
