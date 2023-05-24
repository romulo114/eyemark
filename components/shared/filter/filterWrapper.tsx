/** @format */

import { FC, SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import * as generalAssets from "@/public/assets/SVG/general";
import { filterWrapperPropTypes } from "@/@types/components/discover.types";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { resetEach } from "@/store/slices/filter.slice";

const FilterWrapper: FC<filterWrapperPropTypes> = ({
  children,
  title,
  selectedCount,
  selected,
  filterKey,
}) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const _toggleOpen = () => setIsOpen((prev) => !prev);

  const _handleReset = (e: SyntheticEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!selected) return;
    dispatch(resetEach(filterKey));
  };

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  return (
    <div className="border-b border-grey-blue">
      <div
        className="flex items-center justify-between px-4 py-4"
        onClick={_toggleOpen}
      >
        <div className="flex space-x-3 items-center w-8/12 cursor-pointer">
          <button>
            <Image
              src={generalAssets["caretRight"]}
              width="15%"
              className={`transform transition duration-500 ease-in-out h-3 
								${isOpen ? "rotate-90" : "rotate-0"}
							`}
              alt="caret"
            />
          </button>

          <p className="text-2-xs text-black">{title}</p>
        </div>
        <div className="flex space-x-4">
          {selectedCount !== undefined && selectedCount > 0 && (
            <p className="text-2-xs text-light-grey-6">
              {selectedCount} selected
            </p>
          )}
          <input
            type="checkbox"
            id="group-checkbox"
            checked={selected}
            readOnly
            onClick={_handleReset}
          />
        </div>
      </div>
      <div
        className={`show-title px-5 bg-grey-white show-options
							${!isOpen ? "h-0 overflow-hidden" : "h-52  overflow-y-hidden"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FilterWrapper;
