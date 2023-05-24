/** @format */

import { toast } from "react-toastify"
import { AppError } from "@/@types/app.types"
import { storeRef } from "@/pages/_app"
import { refreshUserToken } from "@/store/slices/auth.slice"

const _handleError = async (error: AppError, altMessage?: string) => {
	if (error?.response?.status === 400) {
		const temp: any = error?.response?.data || error

		if (typeof error === "string") {
			return toast.error(`${error} please check your internet`)
		}

		delete temp["status_code"]

		if (typeof temp !== "object") {
			toast.error(`Something went wrong, please try again`)
		} else {
			const toastId = "400-toast"
			Object.keys(temp).forEach((key) => {
				temp[key][0] &&
					toast.error(
						typeof temp[key] === "string"
							? temp[key]
							: temp[key][0] ||
									altMessage ||
									"An error occured, try again.",
						{ toastId }
					)
			})
		}
		return
	}

	if (error?.response?.status === 500) {
		toast.error(
			"There was an error completing your request. Please try again later",
			{
				position: toast.POSITION.TOP_RIGHT,
			}
		)
		return
	}
	const customId = "429-toast"
	if (error?.response?.status === 429) {
		toast.error("Too many requests, please try again later", {
			position: toast.POSITION.TOP_RIGHT,
			toastId: customId,
		})
		return
	}

	if (error?.response?.status == 401)
		return storeRef.dispatch(refreshUserToken())

	const temp: any =
		error?.response?.data ||
		(error?.response?.data as any)?.message ||
		error?.data?.detail ||
		error?.message ||
		"An error occurred, try again."

	if (typeof temp === "string") {
		let message = `${temp} please check your internet`
		if (temp.includes("html")) {
			message = "An error occurred, try again."
		}
		toast.error(message)
		return
	}
	delete temp["status_code"]
	const items = Object.keys(temp)
	for (const key of items) {
		const message =
			typeof temp[key] === "string"
				? temp[key]
				: temp[key][0]["message"] ||
				  temp[key][0] ||
				  altMessage ||
				  "An error occurred, try again."
		toast.error(message)
		if (message === "Token is invalid or expired") {
			//logout user
			return
		}
	}
}

const _handleSuccess = (message: string) => {
	toast.success(message)
}

export { _handleError, _handleSuccess }
