/** @format */

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."

const initialState = {
	navOpen: false,
	language: "en",
	loading: false,
}

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		toggleNav: (state) => {
			state.navOpen = !state.navOpen
		},
		setLanguage: (state, action) => {
			state.language = action.payload
		},
		toggleLoader: (state, { payload }) => {
			state.loading = payload
		},
	},
	extraReducers: (builder) => {},
})
export const appSelector = (state: RootState) => state.app

export const { toggleNav, setLanguage, toggleLoader } = appSlice.actions
export default appSlice.reducer
