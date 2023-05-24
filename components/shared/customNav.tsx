/** @format */

import { FC, useEffect } from "react"
import styles from "@/styles/nav.module.scss"
import { customNavPropTypes } from "@/@types/components/general.types"

const CustomNav: FC<customNavPropTypes> = ({
	onChange,
	data,
	active,
	className,
}) => {
	const _handleTabChange = (value: string) => {
		typeof onChange === "function" && onChange(value)
	}

	return (
		<div className={`${className} w-full bg-white sticky top-0 z-30 pt-2`}>
			<div className={styles["search-navbar"]}>
				{data.map(({ value, id }) => (
					<div
						className={`${styles["nav"]} ${
							active === value && styles["search-nav-active"]
						} cursor-pointer`}
						key={id}
						onClick={() => _handleTabChange(value)}
						data-testid={`project-tab_${value}`}
					>
						<p>{value}</p>
						<div className={styles["active-bar"]} />
					</div>
				))}
			</div>
			<div className={styles["nav-base"]} />
		</div>
	)
}

export default CustomNav
