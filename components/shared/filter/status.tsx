/** @format */

import { FC } from "react";
import Image from "next/image";
import FilterWrapper from "./filterWrapper";
import styles from "@/styles/discover.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import * as generalAsset from "@/public/assets/SVG/general";
import { filterSelector, updateStatus } from "@/store/slices/filter.slice";

const FilterStatus: FC = () => {
  const dispatch = useAppDispatch();
  const { from, ...filter } = useAppSelector(filterSelector);
  const { status } = filter[from];

  const options = [
    { displayName: "Not Started", route: "NOT_STARTED" },
    { displayName: "Ongoing", route: "ON_GOING" },
    { displayName: "On Hold", route: "ON_HOLD" },
    { displayName: "Completed", route: "COMPLETED" },
    { displayName: "Cancelled", route: "CANCELED" },
    { displayName: "Abandoned", route: "ABANDONED" },
  ];
  const _handleSelect = (status: string) => {
    dispatch(updateStatus(status));
  };
  return (
    <FilterWrapper
      selectedCount={status.length}
      selected={status.length > 0}
      title="Status"
      filterKey="status"
    >
      <div className="mt-5 flex justify-between flex-wrap space-x-1">
        {options.map(({ displayName, route }) => (
          <div
            onClick={() => _handleSelect(route)}
            key={displayName}
            className={`${styles["check-wrapper"]} mt-4 py-1 px-1 ${
              status?.includes(route)
                ? "bg-accepted text-white"
                : " bg-grey-blue text-light-grey"
            }`}
          >
            <p className={`mr-1`}>{displayName}</p>
            <div>
              <Image
                src={generalAsset["filterAdd"]}
                className={`transform transition duration-500 ease-in-out h-3 
								${status?.includes(route) ? "rotate-45" : "rotate-0"}
							`}
                alt="filter"
              />
            </div>
          </div>
        ))}
      </div>
    </FilterWrapper>
  );
};

export default FilterStatus;
