import { ownerType } from "@/@types/components/discover.types"
import { AccountIconType } from "@/@types/components/general.types"
import TextInputPrimary from "@/components/shared/inputs"
import { accountIcon } from "@/constants/general/defaults"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import projectAssets from "@/public/assets/SVG/project"
import {
	createProjectSelector,
	updateProject,
} from "@/store/slices/createProject"
import {
	filterSelector,
	mdaSearch,
	toggleLoading,
} from "@/store/slices/filter.slice"
import Image from "next/image"
import {
	FC,
	KeyboardEvent,
	SyntheticEvent,
	useEffect,
	useRef,
	useState,
} from "react"
import styles from "@/styles/editProject.module.scss"

const ContractorPage: FC = () => {
	const dispatch = useAppDispatch()
	const {
		mda: { mda: searchResult },
		loading,
	} = useAppSelector(filterSelector)
	const {
		project: { public_id, contractors },
	} = useAppSelector(createProjectSelector)

	const _addProjectInfo = (name: string, value: any) =>
		dispatch(updateProject({ name, value }))

	const [search, setSearch] = useState("")
	const timeout = useRef<number>()

	const onSearchContractors = (e: SyntheticEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget
		setSearch(value)
	}

	useEffect(() => {
		if (!loading) {
			dispatch(toggleLoading(true))
		}
		if (timeout?.current) {
			clearTimeout(timeout?.current)
		}
		timeout.current = window.setTimeout(
			() => search.length > 0 && dispatch(mdaSearch(search)),
			500
		)
		if (loading && search.length === 0) {
			dispatch(toggleLoading(false))
		}

		return () => {
			clearTimeout(timeout?.current)
		}
	}, [search])

	const addContractor = (contractor: ownerType) => {
		if (
			contractors.find((cont) => cont.public_id === contractor.public_id)
		) {
			return
		}
		_addProjectInfo("contractors", [...contractors, contractor])
	}

	const removeContractor = (contractor_id: string) => {
		const new_contractors = contractors.filter(
			(contractor) => contractor?.public_id != contractor_id
		)

		_addProjectInfo("contractors", new_contractors)
	}

	const clearSearch = () => {
		setSearch("")
		dispatch(mdaSearch(""))
	}

	const enter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && search.length > 0)
			return dispatch(mdaSearch(search))
	}

	return (
		<div className="flex-grow flex flex-col justify-between">
			<div
				className={`flex flex-wrap justify-between items-end ${styles["s4-cont"]} mt-10`}
			>
				<div className={styles["s4-sec1"]}>
					<div>
						<div className="flex w-100 mt-10 items-center">
							<div className={styles["location-count-cont"]}>
								<p className={styles["location-no"]}>
									{contractors?.length}
								</p>
								<p
									className={`${styles["location-title-text"]} pt-5`}
								>
									{`ADDED CONTRACTOR${
										contractors?.length !== 1 ? "S" : ""
									}`}
								</p>
							</div>
							<div className="ml-4">
								<p className={styles["p-location"]}>
									Project Contractor
								</p>
								<p className={`${styles["b-location"]} pt-1`}>
									Please provide the contractor for this
									project
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className={styles["s4-sec1"]}>
					<div className="text-2-xs text-right mt-7 pb-1 border-b border-grey-stroke">
						Add contractor by searching and selecting
					</div>
					<div className="relative mt-6 flex items-center w-full">
						<TextInputPrimary
							name="contractors-search"
							label="Contractors"
							onChange={onSearchContractors}
							onKeyDown={enter}
							cancel={search.length > 0}
							onCancelPress={clearSearch}
							containerClassName="mt-0 w-full"
							className="w-full h-full bg-transparent text-sm focus:outline-none relative z-20"
						/>

						<div
							className={`rounded-b-lg z-20 border h-32 w-full bg-white border-brown absolute top-12 overflow-x-auto ${
								search.length > 0 ? "block" : "hidden"
							}`}
						>
							{!loading &&
								searchResult
									?.filter(
										(result) =>
											result.account_type === "CONTRACTOR"
									)
									.map((result, index) => (
										<div
											key={index}
											onClick={() => {
												addContractor(result)
												clearSearch()
											}}
											className="px-3 py-3 text-sm flex justify-between border-b border-grey-blue hover:bg-grey-white transition duration-300 ease-in-out cursor-pointer"
										>
											<div>
												{result.display_name ||
													result.username}
											</div>
											<div>
												<p
													className={
														styles[
															"project-tag-text"
														]
													}
												>
													{
														accountIcon[
															result.account_type as AccountIconType
														]
													}
												</p>
											</div>
										</div>
									))}
							{searchResult?.length === 0 && !loading && (
								<p className="text-xs text-center mt-3">
									No results found
								</p>
							)}
						</div>
					</div>
				</div>

				<div className="mt-5 w-5/12">
					{contractors?.map(({ public_id, avatar, display_name }) => (
						<div
							key={public_id}
							className={`${styles["form-control-l"]} mt-6 relative`}
						>
							<button
								className={styles["rmIcon"]}
								onClick={() => removeContractor(public_id)}
							>
								<Image
									className="h-4"
									width={16}
									height={16}
									src={projectAssets["removeIcon"]}
								/>
							</button>
							<div className="relative mt-6 flex items-center full bg-white border border-input-border py-3 rounded px-3">
								{avatar && (
									<div className="">
										<Image
											width={16}
											height={16}
											className=""
											src={avatar}
										/>
									</div>
								)}
								<div className="w-11/12 pl-2">
									{display_name}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ContractorPage
