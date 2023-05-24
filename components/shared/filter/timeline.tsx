/** @format */

import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { filterSelector, updatePeriod } from "@/store/slices/filter.slice";
import moment from "moment";
import { FC, SyntheticEvent } from "react";
import FilterWrapper from "./filterWrapper";
import styles from "@/styles/discover.module.scss";
import TextPrimary from "../textPrimary";

const FilterTimeline: FC = () => {
  const dispatch = useAppDispatch();
  const { from, ...filter } = useAppSelector(filterSelector);
  const { selected, start_date, end_date } = filter[from].timePeriod;

  const options = ["last quarter", "last year", "custom range"];

  const _handleSelect = (value: string) => {
    dispatch(
      updatePeriod({
        end_date: moment().format("YYYY-MM-DD"),
        start_date:
          value === options[0]
            ? moment().subtract(3, "months").format("YYYY-MM-DD")
            : moment().subtract(12, "months").format("YYYY-MM-DD"),
        selected: value,
      })
    );
  };

  const _handleChange = (e: SyntheticEvent<HTMLInputElement>, key: string) => {
    const payload = {
      start_date,
      end_date,
      selected: options[2],
    };
    dispatch(
      updatePeriod({
        ...payload,
        [key]: moment(e.currentTarget.value).format("YYYY-MM-DD"),
      })
    );
  };

  return (
    <FilterWrapper
      selected={selected.length > 0}
      title="Time Period"
      filterKey="timePeriod"
    >
      {options.map((value) => (
        <div className="mt-4 flex space-x-3" key={value}>
          <input
            type="radio"
            name="time_period"
            checked={value === selected}
            onChange={() => _handleSelect(value)}
          />
          <p className="text-xs text-brown capitalize">{value}</p>
        </div>
      ))}

      <div className="flex mt-4">
        <div
          className={`w-1/2 pr-2 border-r border-grey-stroke ${styles["date-container"]}`}
        >
          <TextPrimary
            translation="categories"
            className="text-2-xs text-light-grey-2"
          >
            Start Date
          </TextPrimary>
          <input
            type="date"
            id="startDate"
            className="mt-1 bg-transparent focus:outline-none pl-8 text-xs"
            onChange={(e) => _handleChange(e, "start_date")}
            value={start_date}
          />
        </div>
        <div className={`w-1/2 pl-2 ${styles["date-container"]}`}>
          <TextPrimary
            translation="categories"
            className="text-2-xs text-light-grey-2"
          >
            End Date
          </TextPrimary>
          <input
            type="date"
            id="endDate"
            className="mt-1 bg-transparent focus:outline-none pl-8 text-xs"
            onChange={(e) => _handleChange(e, "end_date")}
            value={end_date}
          />
        </div>
      </div>
    </FilterWrapper>
  );
};

export default FilterTimeline;
