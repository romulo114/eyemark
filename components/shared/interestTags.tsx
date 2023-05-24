/** @format */
/** eslint disable react-hooks/exhaustive-deps */

import { FC, useEffect, useState } from "react"
import ReactTooltip from "react-tooltip"
import { tooltip } from "@/public/assets/SVG/general"
import { tagType } from "@/@types/components/general.types"
import Image from "next/image"
import tagStyles from "@/styles/interestTags.module.scss"
import { TagButton } from "./buttons"
import { useAppSelector } from "@/hooks/redux.hooks"
import { onboardingSelector } from "@/store/slices/onboarding.slice"
import ScrollWrapper from "./scrollWrapper"

const Tags: FC<tagType> = ({ title, img, data = [], setSelectedItems }) => {
	const { selectedInterests } = useAppSelector(onboardingSelector)

	const [checkedItems, setCheckedItems] = useState<any>([])

	const toggleChecked = (id: string | number) => {
		let temp = [...checkedItems]

		if (temp.includes(id)) {
			const indexId = checkedItems.indexOf(id)

			if (indexId > -1) {
				temp.splice(indexId, 1)
			}
		} else {
			temp.push(id)
		}

		setCheckedItems(temp)
		setSelectedItems(temp, title)
	}

	useEffect(() => {
		selectedInterests &&
			selectedInterests[title] &&
			setCheckedItems(selectedInterests[title])
	}, [selectedInterests])

	return (
		<div className={`relative group mb-7 mt-5`}>
			<div className="flex items-center">
				<div className="flex items-center mr-2">
					<Image src={img} alt="logo" />
					<div className={"text-normal medium text-black ml-3"}>
						{title === "locations"
							? "Location"
							: title === "ministries"
							? "Ministry"
							: title === "sdgs"
							? "SDG"
							: "Sector"}
					</div>
				</div>
				<Image data-tip data-for="eyemark" src={tooltip} alt="logo" />
			</div>
			<ReactTooltip
				id="eyemark"
				aria-haspopup="true"
				className={tagStyles["tooltip-cont"]}
				type="light"
				place="right"
				effect="solid"
			>
				<p className={tagStyles["tooltip"]}></p>
			</ReactTooltip>
			<ScrollWrapper>
				<div className="flex">
					{data
						.slice(0, Math.floor(data.length / 3))
						.map((name, index) => (
							<TagButton
								text={name}
								key={index}
								checked={checkedItems?.includes(name)}
								onClick={() => toggleChecked(name)}
							/>
						))}
				</div>
				<div className="flex">
					{data
						.slice(
							Math.floor(data.length / 3),
							data.length - Math.floor(data.length / 3)
						)
						.map((name, index) => (
							<TagButton
								text={name}
								key={index}
								checked={checkedItems?.includes(name)}
								onClick={() => toggleChecked(name)}
							/>
						))}
				</div>
				<div className="flex">
					{data
						.slice(
							data.length - Math.floor(data.length / 3),
							data.length
						)
						.map((name, index) => (
							<TagButton
								text={name}
								key={index}
								checked={checkedItems?.includes(name)}
								onClick={() => toggleChecked(name)}
							/>
						))}
				</div>
			</ScrollWrapper>
		</div>
	)
}

export default Tags
