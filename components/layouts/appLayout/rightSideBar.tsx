/** @format */

import { textElementType } from "@/@types/components/general.types"
import ProjectToEyeMark from "@/components/project/projectsToEyemark"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authSelector, toggleModal } from "@/store/slices/auth.slice"
import {
	fetchSuggestions,
	onboardingSelector,
} from "@/store/slices/onboarding.slice"
import { projectSelector } from "@/store/slices/project.slice"
import Link from "next/link"
import { FC, useEffect } from "react"
import ButtonPrimary from "../../shared/buttons"
import TextPrimary from "../../shared/textPrimary"

const RightSideBar: FC = () => {
	const dispatch = useAppDispatch()
	const { is_authenticated, loading } = useAppSelector(authSelector)
	const { suggestions } = useAppSelector(onboardingSelector)

	const _handleToggleModal = (modal_page: number) => {
		dispatch(
			toggleModal({
				action: `Eyemark`,
				show: true,
				subtitle: " an update",
				modal_page,
			})
		)
	}

	useEffect(() => {
		!suggestions?.projects && !loading && dispatch(fetchSuggestions())
	}, [])

	return (
		<div className="px-2 py-6 w-full border-l flex flex-col justify-between h-screen overflow-y-auto">
			<div>
				{!is_authenticated && (
					<div className="px-4 pt-6">
						<TextPrimary
							translation="rightSidebar"
							className="medium text-dark-grey"
						>
							New to Eyemark?
						</TextPrimary>
						<TextPrimary
							translation="rightSidebar"
							className="text-2-xs text-light-grey-2 mt-2.5"
						>
							Sign up now to keep projects within your
							supervision!
						</TextPrimary>
						<div className="mt-6 flex flex-col">
							<ButtonPrimary
								text="Log in"
								className="py-4 rounded-full w-full bg-accepted border border-accepted text-white medium"
								onClick={() => _handleToggleModal(1)}
							/>
							<ButtonPrimary
								text="Sign up"
								className="mt-1.5 py-4 rounded-full w-full bg-white border border-accepted text-accepted medium"
								onClick={() => _handleToggleModal(1.5)}
							/>
						</div>
						<p className="medium text-2-xs text-light-grey-2 py-6 border-b border-grey-stroke">
							By signing up, you agree to the{" "}
							<span className="text-accepted">
								<Link href="/terms">Terms of Service</Link>{" "}
							</span>
							and{" "}
							<span className="text-accepted">
								<Link href="/privacy">Privacy Policy</Link>
							</span>
							, including{" "}
							<span className="text-accepted">Cookie Use</span>.
						</p>
					</div>
				)}

				<div>
					<div className="px-4 pt-6">
						<TextPrimary
							elementType={textElementType.heading}
							headingLevel={3}
							translation="rightSidebar"
							className="text-sm medium"
						>
							projects
						</TextPrimary>
						<TextPrimary
							className="mt-2 text-2-xs medium text-light-grey-2"
							translation="rightSidebar"
						>
							projects_subtext
						</TextPrimary>
					</div>
					<div className="mt-5 mb-12">
						{suggestions?.projects
							?.slice(0, 3)
							?.map((value: any) => (
								<ProjectToEyeMark key={value.id} {...value} />
							))}
					</div>
				</div>
			</div>
			<div>
				<hr />
				<p className="mt-3 text-2-xs text-light-grey-2">
					Eyemark © 2021. All rights reserved.
				</p>
			</div>
		</div>
	)
}
export default RightSideBar
