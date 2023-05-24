/** @format */

import userApi from "@/api/users.api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { RootState } from ".."

const initialState = {
	loading: false,
}

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(_changePassword.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(_changePassword.fulfilled, (state, action) => {
			state.loading = false
		})
		builder.addCase(_changePassword.rejected, (state, action) => {
			state.loading = false
		})
	},
})

const _changePassword = createAsyncThunk(
	"changePassword",
	async (passwords: {
		currentPassword: string
		newPassword: string
		confirmNewPassword: string
	}) => {
		try {
			const response = await userApi.changePassword({
				old_password: passwords?.currentPassword,
				new_password1: passwords?.newPassword,
				new_password2: passwords?.confirmNewPassword,
			})
			toast.success("Password changed")
			return response.data
		} catch (error) {
			return error
		}
	}
)
export const settingsSelector = (state: RootState) => state.settings

export { _changePassword }

export default settingsSlice.reducer
