import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
	isValuePresent,
	mapIndexToValue,
	mapValueToIndex,
} from "@/helpers/general.helpers"
import { toast } from "react-toastify"
import { RootState } from ".."
import {
	MINISTRIES,
	SECTORS,
	GEO_POLITICAL_ZONES,
	CONTRACT_TYPE,
	STATUS2,
	PLANS,
	STATUS1,
	STATUSES,
} from "@/constants/mda/projectData"
import mdaApi from "@/api/mda.api"
import { projectType } from "@/@types/components/projects.types"
import { ownerType } from "@/@types/components/discover.types"
import { statusType } from "@/@types/app.types"
import { fetchSingleProject } from "./project.slice"

const initialState = {
	project: {
		public_id: "",
		name: "",
		sectors: [],
		start_date: "",
		end_date: "",
		description: "",
		percentage_completed: 0,
		projectTags: "",
		sdgs: [],
		tags: [],
		code: "",
		states: [],
		geolocations: [] as any[],
		location: [],
		total_amount_released: 0,
		appropriation_for_2021: 0,
		total_amount_utilized: 0,
		total_project_cost: 0,
		contractors: [] as ownerType[],
		LGAs: [],
		yearly_appropriation: {},
		plan: PLANS[0],
		status: STATUS1[0] as statusType,
	},
	loading: false,
	localGovernmentArea: "",
	industryTags: "",
	stateList: [],
	LGAs: null,
}

export const createProjectSlice = createSlice({
	name: "createProject",
	initialState,
	reducers: {
		updateProject: (state: any, { payload }) => {
			const { name, value } = payload
			state.project[name] = value
			if (name === "sdgs" || name === "sectors") {
				state.project[name] = value.map((a: any) => a.value)
			}
		},
		setProject: (state, { payload }) => {
			state.project = payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchStates.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchStates.fulfilled, (state, { payload }) => {
			state.stateList = payload
			state.loading = false
		})
		builder.addCase(fetchStates.rejected, (state) => {
			state.loading = false
		})

		builder.addCase(fetchLGA.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchLGA.fulfilled, (state, { payload }) => {
			state.LGAs = payload
			state.loading = false
		})
		builder.addCase(fetchLGA.rejected, (state) => {
			state.loading = false
		})

		builder.addCase(_createProject.pending, (state) => {
			state.loading = true
		})
		builder.addCase(_createProject.fulfilled, (state) => {
			state.loading = false
			// state.project = projectInitialState;
		})
		builder.addCase(_createProject.rejected, (state) => {
			state.loading = false
		})

		builder.addCase(_publishProject.pending, (state) => {
			state.loading = true
		})
		builder.addCase(_publishProject.fulfilled, (state) => {
			state.loading = false
		})
		builder.addCase(_publishProject.rejected, (state) => {
			state.loading = false
		})

		builder.addCase(_updateProject.pending, (state) => {
			state.loading = true
		})
		builder.addCase(_updateProject.fulfilled, (state, { payload }) => {
			state.loading = false
			state.project = payload
		})
		builder.addCase(_updateProject.rejected, (state) => {
			state.loading = false
		})
	},
})

const fetchStates = createAsyncThunk("states", async () => {
	const { data } = await mdaApi.getStates()
	return data
})

const fetchLGA = createAsyncThunk("LGAs", async (payload: string) => {
	try {
		const { data } = await mdaApi.getLGAS(payload)

		return data
	} catch (error) {
		throw error
	}
})

const _createProject = createAsyncThunk(
	"_createProject",
	async (project: projectType) => {
		try {
			const { data } = await mdaApi.createProject(project)

			return data
		} catch (error) {
			throw error
		}
	}
)

const _publishProject = createAsyncThunk(
	"publishProject",
	async (projectID: string) => {
		try {
			const { data } = await mdaApi.publishProject(projectID)
			toast.success("Project published successfully")
			return data
		} catch (error) {
			throw error
		}
	}
)

const _updateProject = createAsyncThunk(
	"updateProject",
	async ({
		projectId,
		project_edits,
	}: {
		projectId: string
		project_edits: Partial<projectType>
	}) => {
		try {
			const project = {
				...project_edits,
				contractors_ids: [] as string[],
			}

			if (project["status"]) {
				project["status"] = STATUSES[
					project["status"] as keyof typeof STATUSES
				] as statusType
			}

			project["plan"] = `${PLANS.indexOf(project["plan"]!)}`

			if (project.contractors && project.contractors.length > 0) {
				const id: string[] = []
				project.contractors.forEach(({ public_id }) => {
					id[id.length] = public_id
				})
				project.contractors_ids = id
			}

			const geolocations: any[] = []
			project.geolocations?.forEach((location) => {
				const { grid_3_data, ...rest } = location
				geolocations[geolocations.length] = rest
			})
			project["geolocations"] = geolocations

			Object.keys(project).forEach((key: string) => {
				const value = project[key as keyof typeof project]

				if (
					!value ||
					(Array.isArray(value) && value.length === 0) ||
					key === "contract_type" ||
					key === "geo_political_zone" ||
					key === "contractors"
				) {
					delete project[key as keyof typeof project]
				}
			})

			const { data } = await mdaApi.updateProject(projectId, project)
			toast.success("Project Updated")
			return data
		} catch (error) {
			console.error(error)

			throw error
		}
	}
)

export const createProjectSelector = (state: RootState) => state.createProject

export {
	_publishProject,
	_updateProject,
	fetchStates,
	fetchLGA,
	_createProject,
}

export const { updateProject, setProject } = createProjectSlice.actions

export default createProjectSlice.reducer
