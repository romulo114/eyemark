/** @format */

import { FC, useState } from "react";
import tabStyles from "@/styles/tab.module.scss";
import { projectStatus, status_color } from "@/constants/general/defaults";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { statusType } from "@/@types/app.types";
import { projectTabType } from "@/@types/components/general.types";
import { WhiteEyeMarkLogo } from "@/public/assets/SVG/general";
import {
  addProjectsEyeMarked,
  removeProjectsEyeMarked,
} from "@/store/slices/onboarding.slice";
import { eyeMarkProjects } from "@/store/slices/eyeMark.slice";
import Image from "next/image";
import TextPrimary from "../shared/textPrimary";

const ProjectTab: FC<projectTabType> = ({ suggestion }) => {
  const [clickBtn, setClickBtn] = useState(false);
  const dispatch = useAppDispatch();

  const toggleBtn = async () => {
    if (clickBtn) {
      setClickBtn(false);
      dispatch(removeProjectsEyeMarked());
    } else {
      setClickBtn(true);
      dispatch(addProjectsEyeMarked());
    }
    dispatch(
      eyeMarkProjects({
        projects: [suggestion.id as string],
      })
    );
  };

  return (
    <div className="flex items-center mb-8 space-x-3">
      <div className="">
        <button
          id={suggestion.id}
          className={`rounded-full h-7 w-7 flex items-center justify-center border ${
            clickBtn
              ? "border-darkGreen bg-accepted"
              : "border-grey-stroke bg-white"
          } `}
          onClick={toggleBtn}
        >
          <Image
            src={WhiteEyeMarkLogo}
            className="h-4 w-4"
            alt="white eyemark"
          />
        </button>
      </div>

      <div className="flex">
        <div className="overflow-hidden">
          <p className="text-sm medium">{suggestion.name}</p>
          <div
            className={`flex mt-1 ${tabStyles["sub-text-1"]} whitespace-nowrap truncate`}
          >
            {suggestion.states.length && (
              <p className="truncate max-w-5/12">
                {suggestion.states.join(", ")}
              </p>
            )}
            <span className="mx-1">•</span>
            <span className={`${tabStyles["text-status"]} text-center mx-1`}>
              <TextPrimary
                translation="suggestions"
                className="text-status-text"
              >
                STATUS
              </TextPrimary>
            </span>
            <span
              className={`${tabStyles["text-status-2"]}  ${
                status_color[suggestion.status as statusType]
              }`}
            >
              {projectStatus[suggestion.status as statusType]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTab;
