/** @format */

import { projectMedia } from "./projects.types"

export type mediaExpandModalPropTypes = {
	close: () => void
	images: projectMedia[]
	activeIndex: number
}
