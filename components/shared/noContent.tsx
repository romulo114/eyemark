/** @format */

import { noContentPropTypes } from "@/@types/components/general.types"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import TextPrimary from "./textPrimary"

const NoContent: FC<noContentPropTypes> = ({
	title,
	img,
	body,
	buttonText,
	href,
	onClick,
}) => {
	return (
		<div className="flex flex-col items-center mx-auto">
			<div className="mx-auto h-4/5">
				<Image src={img} alt="illustration" />
			</div>
			<TextPrimary className="mt-5 medium text-center text-2xl">
				{title}
			</TextPrimary>
			{body && (
				<TextPrimary className="text-sm text-center text-input-border mt-3 w-10/12 lg:w-7/12 mx-auto">
					{body}
				</TextPrimary>
			)}
			{buttonText && href && (
				<Link href={href}>
					<a className="bg-white text-accepted hover:bg-accepted hover:text-white transition ease-in-out duration-300 rounded-md px-4 py-1 mt-6">
						{buttonText}
					</a>
				</Link>
			)}

			{buttonText && !href && (
				<div
					onClick={onClick}
					className="bg-white cursor-pointer text-accepted hover:bg-accepted hover:text-white transition ease-in-out duration-300 rounded-md px-4 py-1 mt-6"
				>
					{buttonText}
				</div>
			)}
		</div>
	)
}

export default NoContent
