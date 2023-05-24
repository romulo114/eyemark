/** @format */

import { appLayoutPropTypes } from "@/@types/components/citizens.types"
import { FC } from "react"
import LeftSideBar from "./leftSideBar"
import DefaultRightSideBar from "./rightSideBar"
import styles from "@/styles/appLayout.module.scss"
import BottomNav from "./bottomNav"
import ReactModal from "react-modal"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authSelector, toggleModal } from "@/store/slices/auth.slice"
import AuthModal from "../../shared/authModal"
import { citizenAccountTypes } from "@/constants/general/defaults"
import { useRouter } from "next/router"

const AppLayout: FC<appLayoutPropTypes> = ({
	children,
	sidebar,
	layoutCenterRef,
	mda,
	full,
}) => {
	const dispatch = useAppDispatch()
	const { auth_modal, user } = useAppSelector(authSelector)

	const closeModal = () => {
		dispatch(
			toggleModal({
				show: false,
				action: "",
				subtitle: "",
				modal_page: 0,
			})
		)
	}

	return (
		<>
			{!mda && (
				<ReactModal
					isOpen={auth_modal?.show}
					onRequestClose={closeModal}
					ariaHideApp={false}
					className={`w-11/12 sm:w-[560px] ${styles["default-modal"]} bg-grey-white`}
					overlayClassName={styles["modal-overlay"]}
				>
					<AuthModal />
				</ReactModal>
			)}
			<div className={`${styles["dash-contents"]}`}>
				<LeftSideBar
					mda={
						mda ||
						(user &&
							user?.account_type &&
							!citizenAccountTypes.includes(
								user?.account_type.toLowerCase()
							))
					}
				/>

				<div
					className={`${styles["mainContents"]}  overflow-y-auto flex flex-col w-full hide-scroll pb-1 lg:pb-0`}
					ref={layoutCenterRef}
				>
					{children}
				</div>
				<BottomNav
					mda={
						mda ||
						(user &&
							user?.account_type &&
							!citizenAccountTypes.includes(
								user?.account_type.toLowerCase()
							))
					}
				/>
				<div
					className={`place-items-end h-screen flex-shrink-0 w-[20%]  bg-white ${
						full ? "hidden" : "hidden lg:block"
					}`}
				>
					{sidebar ? sidebar : !full ? <DefaultRightSideBar /> : null}
				</div>
			</div>
		</>
	)
}

export default AppLayout
