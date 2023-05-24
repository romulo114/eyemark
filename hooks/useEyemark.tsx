/** @format */

import { SyntheticEvent, useEffect, useState } from "react"
import { checkIsEyeMarked } from "@/helpers/general.helpers"
import { AppDispatch } from "@/store"
import { authSelector, toggleModal } from "../store/slices/auth.slice"
import { eyeMarkProjects, eyeMarkSelector } from "@/store/slices/eyeMark.slice"
import { useAppSelector, useAppDispatch } from "./redux.hooks"

const useEyeMark = (projectId: string, name: string) => {
	const [isEyeMarked, setIsEyeMarked] = useState(false)
	const dispatch: AppDispatch = useAppDispatch()
	const { eyeMarkedProjects } = useAppSelector(eyeMarkSelector)
	const { is_authenticated } = useAppSelector(authSelector)

	useEffect(() => {
		if (is_authenticated) {
			setIsEyeMarked(checkIsEyeMarked(projectId, eyeMarkedProjects))
		}
	}, [eyeMarkedProjects, is_authenticated, projectId])

	const _handleEyeMark = (e: SyntheticEvent<HTMLElement | SVGSVGElement>) => {
		e.stopPropagation()
		if (!is_authenticated) {
			return dispatch(
				toggleModal({
					show: true,
					text: `Eyemark "${name}"`,
					subtitle: " a project",
					modal_page: 0,
				})
			)
		}
		dispatch(eyeMarkProjects({ projects: [projectId] }))
	}
	return { isEyeMarked, _handleEyeMark }
}

export default useEyeMark
