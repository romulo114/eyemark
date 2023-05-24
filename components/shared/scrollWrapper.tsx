/** @format */

import { FC, ReactNode, useEffect, useRef, useState } from "react"
import ScrollArrow from "./scrollArrow"

const ScrollWrapper: FC<{ children: ReactNode | ReactNode[] }> = ({
	children,
}) => {
	const container = useRef<HTMLDivElement>(null)
	const [hideLeftArrow, setHideLeftArrow] = useState<number>(0)
	const [hideRightArrow, setHideRightArrow] = useState<number>(665)
	const [hover, setHover] = useState<boolean>(false)

	const checkScroll = () => {
		let temp = container.current?.scrollLeft || 0
		let temp2 =
			container.current?.scrollWidth ||
			665 -
				((container.current?.scrollLeft || 665) +
					(container.current?.clientWidth || 665))

		setHideLeftArrow(temp)
		setHideRightArrow(temp2)
	}

	const _handleLeftSlide = () => {
		container.current?.scrollBy({
			left: window.screen.width <= 500 ? -200 : -350,
			top: 0,
			behavior: "smooth",
		})
	}
	const _handleRightSlide = () => {
		container.current?.scrollBy({
			left: window.screen.width <= 500 ? 200 : 350,
			top: 0,
			behavior: "smooth",
		})
	}

	const _handleHover = () => setHover((prev) => !prev)

	useEffect(() => {
		container.current?.addEventListener("scroll", checkScroll)

		// cleanup this component
		return () => {
			container.current &&
				container.current?.removeEventListener("scroll", checkScroll)
		}
	}, [])
	return (
		<div
			className="flex items-center pt-2"
			onMouseEnter={_handleHover}
			onMouseLeave={_handleHover}
		>
			<ScrollArrow
				onClick={_handleLeftSlide}
				interests
				hide={hideLeftArrow <= 1}
				hover={hover}
			/>

			<div ref={container} className="hide-scroll overflow-x-auto">
				{children}
			</div>
			<ScrollArrow
				onClick={_handleRightSlide}
				right
				interests
				hide={Math.floor(hideRightArrow - hideLeftArrow) <= 560}
				hover={hover}
			/>
		</div>
	)
}

export default ScrollWrapper
