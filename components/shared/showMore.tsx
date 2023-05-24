/** @format */

import { FC } from "react";
import * as generalAssets from "@/public/assets/SVG/general";
import Image from "next/image";
import { showMorePropTypes } from "@/@types/components/discover.types";
import Link from "next/link";

const ShowMore: FC<showMorePropTypes> = ({ onClick, state, show, href }) => {
  return (
    <div
      className={`${
        !show && "lg:hidden"
      } flex justify-center py-4 bg-grey-white w-full sm:mt-2 sm:rounded-md`}
    >
      <div className="flex items-center">
        {href ? (
          <Link href={href}>
            <a className="text-accepted text-xs mr-2">
              {state !== null ? "Show" : "View"} {state ? "Less" : "More"}
            </a>
          </Link>
        ) : (
          <button className="text-accepted text-xs mr-2" onClick={onClick}>
            {state !== null ? "Show" : "View"} {state ? "Less" : "More"}
          </button>
        )}
        <Image
          src={generalAssets["greyCaret"]}
          className={`transform ${
            state && state !== "projectsAround" ? "rotate-180" : ""
          }`}
          alt="caret"
        />
      </div>
    </div>
  );
};

export default ShowMore;
