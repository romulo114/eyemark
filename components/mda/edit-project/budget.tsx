import { FC, SyntheticEvent } from "react"
import styles from "@/styles/editProject.module.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import {
	createProjectSelector,
	updateProject,
} from "@/store/slices/createProject"
import TextInputCurrency from "@/components/shared/inputs/currencyInput"

const BudgetPage: FC = () => {
	const dispatch = useAppDispatch()
	const {
		project: {
			total_project_cost,
			total_amount_utilized,
			total_amount_released,
			yearly_appropriation,
		},
	} = useAppSelector(createProjectSelector)

	const _handleChange = (e: { name: string; value: number }) => {
		const { value, name } = e
		dispatch(updateProject({ name, value }))
	}

	return (
		<div className="relative flex-grow flex flex-col justify-between">
			<div className={`${styles["form-control-l"]} mt-12`}>
				<div className="flex flex-wrap sm:flex-nowrap justify-between sm:space-x-4">
					<div className="w-4/12">
						<TextInputCurrency
							value={total_project_cost}
							className="w-full focus:outline-none bg-transparent z-20 pl-10 pr-3"
							onChange={_handleChange}
							label="Total Project Cost"
							name="total_project_cost"
							containerClassName="mt-0"
						/>
					</div>

					<div className="w-4/12">
						<TextInputCurrency
							value={total_amount_released}
							className="w-full focus:outline-none bg-transparent z-20 pl-10 pr-3"
							onChange={_handleChange}
							label="Total Amount Released"
							name="total_amount_released"
							containerClassName="mt-0"
						/>
					</div>

					<div className="w-4/12">
						<TextInputCurrency
							value={total_amount_utilized}
							className="w-full focus:outline-none bg-transparent z-20 pl-10 pr-3"
							onChange={_handleChange}
							label="Total Amount Utilised"
							name="total_amount_utilized"
							containerClassName="mt-0"
						/>
					</div>
					<div className="w-4/12">
						{yearly_appropriation &&
							Object.keys(yearly_appropriation).map(
								(appropriation) => (
									<TextInputCurrency
										key={appropriation}
										value={
											(yearly_appropriation as any)[
												appropriation
											]
										}
										className="w-full focus:outline-none bg-transparent z-20 pl-10 pr-3"
										readOnly
										disabled
										label={`${appropriation} Appropriation`}
										containerClassName="mt-0"
									/>
								)
							)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BudgetPage
