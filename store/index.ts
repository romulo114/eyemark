/** @format */

import {
	Action,
	configureStore,
	ThunkAction,
	combineReducers,
	PreloadedState,
} from "@reduxjs/toolkit"
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import auth from "@/store/slices/auth.slice"
import onboarding from "@/store/slices/onboarding.slice"
import project from "@/store/slices/project.slice"
import eyeMark from "@/store/slices/eyeMark.slice"
import discover from "@/store/slices/discover.slice"
import categories from "@/store/slices/categories.slice"
import filter from "@/store/slices/filter.slice"
import app from "@/store/slices/app.slice"
import post from "@/store/slices/post.slice"
import mda from "@/store/slices/mda.slice"
import settings from "@/store/slices/settings.slice"
import profile from "@/store/slices/profile.slice"
import createProject from "@/store/slices/createProject"

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
	app,
	auth,
	onboarding,
	project,
	eyeMark,
	discover,
	categories,
	filter,
	post,
	mda,
	settings,
	profile,
	createProject,
})

const persistConfig = {
	key: "eyemark",
	version: 1,
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function setupStore(preloadedState?: PreloadedState<RootState>) {
	return configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [
						FLUSH,
						REHYDRATE,
						PAUSE,
						PERSIST,
						PURGE,
						REGISTER,
					],
				},
			}),
		preloadedState,
	})
}

export const store = setupStore()
export const persistor = persistStore(store)

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
