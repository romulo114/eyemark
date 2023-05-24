import { textElementType } from "@/@types/components/general.types"
import { darkCaret } from "@/public/assets/SVG/general"
import Image from "next/image"
import { FC, useState } from "react"
import TextPrimary from "../shared/textPrimary"
import ReactHtmlParser from "react-html-parser"

const FAQ: FC<{ faq: { title: string; content: string } }> = ({ faq }) => {
	const [checked, setChecked] = useState<boolean>(false)

	const toggleChecked = () => setChecked((value) => !value)
	return (
		<div className="mt-4">
			<button
				className="flex items-center justify-between border-none transform-none py-6 focus:outline-none w-full px-4 sm:px-8 bg-white rounded-t-lg"
				onClick={toggleChecked}
			>
				<TextPrimary
					headingLevel={1}
					elementType={textElementType.heading}
					className="medium text-dark-grey text-xs sm:text-sm text-left"
				>
					{faq.title}
				</TextPrimary>
				<Image
					src={darkCaret}
					alt="down"
					height={20}
					width={20}
					className={`transform transition duration-500 ease-in-out ${
						checked ? "rotate-180" : "rotate-0"
					}`}
				/>
			</button>
			<div
				className={`show-content rounded-b-lg px-4 sm:px-8 overflow-hidden ${
					!checked ? "h-0" : `h-fit show-open`
				}`}
			>
				<div className="py-6 w-11/12 xl:w-10/12 text-xs text-black">
					{ReactHtmlParser(faq.content)}
				</div>
			</div>
		</div>
	)
}

export default FAQ
