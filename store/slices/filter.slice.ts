/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userApi from "@/api/users.api"
import { RootState } from ".."
import { filterFrom, ownerType } from "@/@types/components/discover.types"
import { filterShared } from "@/@types/components/general.types"

export const shared = {
	timePeriod: {
		selected: "",
		start_date: new Date().toISOString(),
		end_date: new Date().toISOString(),
	},
	location: {
		selectedZone: "",
		selected: [] as string[],
	},
	status: [] as string[],
	mdaContractors: [] as ownerType[],
	mda: [] as ownerType[],
	budget: {
		min_amt_budgeted: 0,
		max_amt_budgeted: 500000000,
	},
	cost: {
		min_total_cost: 0,
		max_total_cost: 500000000,
	},
	query: "",
	recent: [] as string[],
	searchResults: {} as any,
	activeTag: "",
}

const initialState = {
	loading: false,
	categories: shared,
	discover: shared,
	mda: shared,
	search: shared,
	from: "discover" as filterFrom,
	searchActive: false,
}

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		updatePeriod: (state, { payload }) => {
			const { from } = state
			const { selected, start_date, end_date } = state[from].timePeriod
			state[from].timePeriod = {
				selected: payload?.selected || selected,
				start_date: payload?.start_date || start_date,
				end_date: payload?.end_date || end_date,
			}
		},
		updateLocation: (state, { payload }) => {
			const { from } = state
			const { selectedZone, selected } = state[from].location

			state[from].location = {
				selected: payload?.selected
					? selected.includes(payload.selected)
						? selected.filter((value) => value !== payload.selected)
						: [...selected, payload.selected]
					: selected,
				selectedZone:
					payload?.selectedZone === selectedZone
						? ""
						: payload?.selectedZone || selectedZone,
			}
		},
		updateStatus: (state, { payload }) => {
			const { from } = state
			const { status } = state[from]
			state[from].status = status.includes(payload)
				? status.filter((value) => value !== payload)
				: [...status, payload]
		},
		updateMdaContractors: (state, { payload }) => {
			const { from } = state
			const { mdaContractors } = state[from]
			state[from].mdaContractors = payload || mdaContractors
		},
		clearSearch: (state) => {
			const { from } = state
			state[from].mda = []
		},
		updateCost: (state, { payload }) => {
			const { from } = state
			state[from].cost = payload
		},
		updateBudget: (state, { payload }) => {
			const { from } = state
			state[from].budget = payload
		},

		setQuery: (state, { payload }) => {
			const { from } = state
			state[from].query = payload
		},
		resetFilter: (state: any) => {
			const { from } = state
			Object.keys(shared).map((value) => {
				if (
					value !== "query" &&
					value !== "recent" &&
					value !== "activeTag"
				) {
					state[from][value] = (shared as any)[value]
				}
			})
		},
		setFrom: (state, { payload }) => {
			state.from = payload
		},
		toggleSearch: (state, { payload }) => {
			state.searchActive = payload
		},
		setRecent: (state, { payload }: { payload: string }) => {
			const { from } = state
			const { recent } = state[from]
			const serialized = [...recent].filter(
				(value: string) => value.toLowerCase() !== payload.toLowerCase()
			)
			state[from].recent = [payload, ...serialized]
		},
		resetEach: (state, { payload }: { payload: filterShared }) => {
			const { from } = state
			state[from][payload] = shared[payload]
		},
		toggleLoading: (state, { payload }) => {
			state.loading = payload
		},
		setActiveTag: (state, { payload }) => {
			const { from } = state
			state[from].activeTag = payload
		},
	},
	extraReducers: (builders) => {
		builders.addCase(mdaSearch.pending, (state) => {
			state.loading = true
			const { from } = state
			state[from].mda = []
		})
		builders.addCase(mdaSearch.rejected, (state) => {
			state.loading = false
		})
		builders.addCase(mdaSearch.fulfilled, (state, { payload }) => {
			state.loading = false
			const { from } = state
			state[from].mda = payload as never
		})
		builders.addCase(search.pending, (state) => {
			state.loading = true
			const { from } = state
			state[from].searchResults = {}
		})
		builders.addCase(search.fulfilled, (state, { payload }: any) => {
			state.loading = false
			const { from } = state
			state[from].searchResults = payload
		})
		builders.addCase(search.rejected, (state) => {
			state.loading = false
		})
	},
})

const mdaSearch = createAsyncThunk("mdaSearch", async (payload: string) => {
	try {
		const response: any = await userApi.getMda(payload)
		return response.data.results
	} catch (error: any) {
		throw error
	}
})

const search = createAsyncThunk(
	"search",
	async (payload: string | string[]) => {
		try {
			const response: any = await userApi.search(payload)
			return response.data
		} catch (error: any) {
			throw error
		}
	}
)

export const filterSelector = (state: RootState) => state.filter

export const {
	updatePeriod,
	updateLocation,
	updateStatus,
	updateMdaContractors,
	clearSearch,
	updateBudget,
	updateCost,
	setQuery,
	resetFilter,
	setFrom,
	toggleSearch,
	setRecent,
	resetEach,
	toggleLoading,
	setActiveTag,
} = filterSlice.actions
export { mdaSearch, search }
export default filterSlice.reducer
