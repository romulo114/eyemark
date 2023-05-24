/** @format */

import { currencyInputProps } from "@/@types/components/input.types"
import { FC, SyntheticEvent, useRef, useState } from "react"
import Image from "next/image"
import { NairaIcon } from "@/public/assets/SVG/general"
import numeral from "numeral"

const TextInputCurrency: FC<currencyInputProps> = ({
	error,
	label,
	type,
	className,
	testId,
	containerClassName,
	value,
	onChange,
	...props
}) => {
	const [isFocused, setIsFocused] = useState<boolean>(type === "date")
	const inputRef = useRef<HTMLInputElement>(null)

	const _handleFocus = () => setIsFocused(type === "date" ? true : !isFocused)
	const _handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
		if (typeof onChange !== "function") {
			return
		}
		const { value, name } = e.currentTarget
		let data =
			value[0] === "0"
				? parseInt(value[value.length - 1])
				: parseInt(numeral(value).format("0"))
		onChange({ name, value: data })
	}
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

			<div className="absolute left-3">
				<Image src={NairaIcon} alt="pointer" />
			</div>

			<input
				id={props.id || label?.split(" ")?.join("")?.toLowerCase()}
				data-testid={testId}
				type={type}
				className={`${className} text-black w-full h-full bg-transparent text-sm focus:outline-none relative z-20`}
				onFocus={_handleFocus}
				onBlur={_handleFocus}
				ref={inputRef}
				onChange={_handleChange}
				value={numeral(value).format(
					value && value > 0 ? "0,000" : "0.00"
				)}
				{...props}
			/>
		</div>
	)
}

export default TextInputCurrency
