/** @format */

import React, { FC, SyntheticEvent, useState, KeyboardEvent } from "react"

import { authSelector, login, setModalPage } from "@/store/slices/auth.slice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import { authComponentType } from "@/@types/app.types"
import TextInputPrimary from "@/components/shared/inputs"
import ButtonPrimary from "@/components/shared/buttons"
import { useRouter } from "next/router"
import TextPrimary from "../shared/textPrimary"

const LoginModal: FC<authComponentType> = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const {
		error,
		auth_modal: { show },
	} = useAppSelector(authSelector)

	const [payload, setPayload] = useState({ email: "", password: "" })

	const onGetInputValue = (event: SyntheticEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value
		const name = event.currentTarget.name
		setPayload({ ...payload, [name]: value })
	}

	const _handleLogin = (e?: SyntheticEvent<HTMLFormElement>) => {
		e?.preventDefault()
		dispatch(login({ formData: payload, auth_modal: show, router }))
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			_handleLogin()
		}
	}

	return (
		<div className={`${show && "px-6 py-10"} relative`}>
			<TextPrimary
				className="text-dark-grey medium text-sm mt-7"
				translation="login"
			>
				welcome_back
			</TextPrimary>

			<TextPrimary
				className="text-sm pr-2 mt-2 text-auth-subtext"
				translation="login"
			>
				login_subtext
			</TextPrimary>

			<form className="mt-8" onSubmit={_handleLogin}>
				<TextInputPrimary
					label="Email"
					name="email"
					testId="email"
					type="email"
					error={error}
					onKeyDown={handleKeyDown}
					onChange={onGetInputValue}
				/>
				<TextInputPrimary
					label="Password"
					name="password"
					testId="password"
					type="password"
					error={error}
					onKeyDown={handleKeyDown}
					onChange={onGetInputValue}
				/>

				<ButtonPrimary text={"login"} data-testid={"login-button"} />
				{/* <TextPrimary
          className="text-xs text-center mt-6 cursor-pointer text-accepted underline"
          onClick={() => router.push(authRoutes.passwordReset)}
          translation="login"
        >
          forgot_password
        </TextPrimary> */}

				{
					<p className="text-center mt-6 text-sm text-light-grey-6 medium cursor-pointer">
						Don&apos;t have an account?{" "}
						<span
							className="text-dark-grey medium"
							onClick={
								show
									? () => dispatch(setModalPage(1.5))
									: () => {
											router.push(
												authRoutes.createAccount
											)
									  }
							}
						>
							Create Account
						</span>
					</p>
				}
			</form>
		</div>
	)
}

export default LoginModal
