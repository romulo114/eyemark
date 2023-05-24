/** @format */

import { prices } from "@/constants/general/defaults";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { filterSelector, updateBudget } from "@/store/slices/filter.slice";
import { FC, SyntheticEvent } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import TextPrimary from "../textPrimary";
import FilterWrapper from "./filterWrapper";

const FilterBudget: FC = () => {
  const dispatch = useAppDispatch();
  const { from, ...filter } = useAppSelector(filterSelector);
  const { min_amt_budgeted, max_amt_budgeted } = filter[from].budget;
  const { min, max } = prices;

  const _handleChange = (value: { min: number; max: number } | number) => {
    if (typeof value !== "number") {
      const { min, max } = value;
      dispatch(updateBudget({ min_amt_budgeted: min, max_amt_budgeted: max }));
    }
  };

  const _handleMinInput = (e: SyntheticEvent<HTMLInputElement>) =>
    dispatch(
      updateBudget({
        min_amt_budgeted: e.currentTarget.value,
        max_amt_budgeted,
      })
    );

  const _handleMaxInput = (e: SyntheticEvent<HTMLInputElement>) =>
    dispatch(
      updateBudget({
        min_amt_budgeted,
        max_amt_budgeted: e.currentTarget.value,
      })
    );
  return (
    <FilterWrapper
      title="Budget"
      selected={min_amt_budgeted > min || max_amt_budgeted < max}
      filterKey="budget"
    >
      <div className="mt-5">
        <div className="text-xs flex justify-between">
          <TextPrimary translation="categories">Budget</TextPrimary>
          <p>NGN</p>
        </div>
        <div className="mt-7 px-3">
          <InputRange
            maxValue={max}
            minValue={min}
            step={50000}
            value={{ min: min_amt_budgeted, max: max_amt_budgeted }}
            onChange={_handleChange}
          />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="text-center w-5/12 py-2 text-xs rounded bg-light-grey-4">
            <input
              type="number"
              id="total-min-input"
              className="bg-transparent w-full text-center focus:outline-none"
              value={min_amt_budgeted}
              min={min}
              max={max}
              onChange={_handleMinInput}
            />
          </div>
          <hr className="border border-grey-stroke w-1/12" />
          <div className="text-center w-5/12 py-2 text-xs rounded bg-light-grey-4">
            <input
              type="number"
              id="total-max-input"
              className="bg-transparent w-full text-center focus:outline-none"
              value={max_amt_budgeted}
              min={min}
              max={max}
              onChange={_handleMaxInput}
            />
          </div>
        </div>
      </div>
    </FilterWrapper>
  );
};
export default FilterBudget;
