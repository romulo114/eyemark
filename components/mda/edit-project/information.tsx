import TextInputPrimary from "@/components/shared/inputs"
import { FC, SyntheticEvent } from "react"
import styles from "@/styles/editProject.module.scss"
import Select, { MultiValue } from "react-select"
import Image from "next/image"
import mdaAssets from "@/public/assets/SVG/mda"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	createProjectSelector,
	updateProject,
} from "@/store/slices/createProject"
import {
	SECTORS,
	PLANS,
	STATUSES,
	SDGs,
	STATUS1,
} from "@/constants/mda/projectData"
import { formatMultiSelect } from "@/helpers/general.helpers"

const Information: FC = () => {
	const dispatch = useAppDispatch()
	const {
		project: {
			name,
			code,
			plan,
			status,
			sectors,
			percentage_completed,
			sdgs,
			description,
			start_date,
			end_date,
		},
	} = useAppSelector(createProjectSelector)

	const _handleChange = (
		e: SyntheticEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { value, name } = e.currentTarget
		dispatch(updateProject({ name, value }))
	}

	const _handleSelectChange = (value: MultiValue<{}>, name: string) =>
		dispatch(updateProject({ name, value }))
	return (
		<>
			<div className="flex flex-col lg:flex-row items-center justify-between py-10 border-b border-grey-stroke w-full">
				<div className="h-44 sm:h-auto sm:w-4/12 lg:pr-5">
					<Image src={mdaAssets["projectAvatar"]} />
				</div>

				<div className={styles["form-cont"]}>
					<TextInputPrimary
						name="name"
						label="Project Name"
						value={name}
						onChange={_handleChange}
					/>

					<div>
						<div className="flex justify-between mt-6 space-x-7">
							<TextInputPrimary
								name="code"
								label="Project Code"
								containerClassName="w-full sm:w-6/12 relative mt-0 cursor-not-allowed"
								className="cursor-not-allowed"
								value={code}
								readOnly
							/>

							<div className="w-full sm:w-6/12 relative">
								<label className="absolute h-full left-4 text-input-border ani z-10 top-1 text-2-xs">
									Plan
								</label>
								<select
									name="plan"
									id=""
									defaultValue={plan}
									className={`w-full ${styles["select-input"]} h-14`}
									onChange={_handleChange}
									value={plan}
								>
									<option disabled>Plan</option>
									{PLANS.map((plan) => (
										<option key={plan} value={plan}>
											{plan}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="flex justify-between mt-6 space-x-7">
							<div className="w-full sm:w-6/12 relative">
								{true && (
									<label className="absolute h-full left-4 text-input-border ani z-10 top-1 text-2-xs">
										Status
									</label>
								)}
								<select
									name="status"
									id=""
									className={`w-full ${styles["select-input"]} h-14`}
									onChange={_handleChange}
									value={status}
									defaultValue={status}
								>
									<option disabled>Status</option>
									{STATUS1.map((stat) => (
										<option key={stat} value={stat}>
											{stat}
										</option>
									))}
								</select>
							</div>
							<TextInputPrimary
								name="percentage_completed"
								label="Project Percentage"
								type="number"
								value={percentage_completed}
								containerClassName="w-full sm:w-6/12 relative mt-0"
								onChange={_handleChange}
							/>
						</div>

						<div className="flex justify-between space-x-7">
							<TextInputPrimary
								name="start_date"
								label="Start Date"
								type="date"
								value={start_date}
								containerClassName={`w-full sm:w-6/12 ${styles["project-date-container"]} border-0 relative px-0 pt-0`}
								className={`w-full ${styles["date-input"]}`}
								onChange={_handleChange}
							/>
							<TextInputPrimary
								name="end_date"
								label="End Date"
								type="date"
								value={end_date}
								containerClassName={`w-full sm:w-6/12 ${styles["project-date-container"]} border-0 relative px-0 pt-0`}
								className={`w-full ${styles["date-input"]}`}
								min="2021-01-01"
								max="2050-12-31"
								onChange={_handleChange}
							/>
						</div>
						<div className="w-full mt-6 relative">
							<div className="w-full min-h-14">
								<p className={`${styles["project-desc"]} pb-1`}>
									Sectors
								</p>
								<Select
									isMulti
									name="sectors"
									placeholder="Sectors"
									defaultValue={formatMultiSelect(sectors)}
									value={formatMultiSelect(sectors)}
									onChange={(e: any) =>
										_handleSelectChange(e, "sectors")
									}
									options={formatMultiSelect(SECTORS)}
								/>
							</div>
						</div>
						<div className="w-full min-h-14 mt-2">
							<p className={`${styles["project-desc"]} pb-1`}>
								SDGS
							</p>
							<Select
								isMulti
								name="sdgs"
								placeholder="SDGs"
								defaultValue={formatMultiSelect(sdgs)}
								value={formatMultiSelect(sdgs)}
								onChange={(e: any) =>
									_handleSelectChange(e, "sdgs")
								}
								options={formatMultiSelect(SDGs)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap justify-between py-10">
				<div className={styles["text-area-project"]}>
					<p className={`${styles["project-desc"]} pb-4`}>
						Description
					</p>
					<textarea
						className={`w-full h-full ${styles["text-area"]}`}
						placeholder="Write description here..."
						onChange={_handleChange}
						value={description}
						name="description"
					/>
				</div>
			</div>
		</>
	)
}

export default Information
