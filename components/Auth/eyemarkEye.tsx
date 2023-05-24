/** @format */

import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import Eyemark from "@/public/assets/GreenGIF.gif";

const EyeMarkEye: FC = () => (
  <Link href="/">
    <>
      <Image
        src={Eyemark}
        width={28}
        height={18.8}
        layout="fixed"
        alt="eyemark"
      />
    </>
  </Link>
);

export default EyeMarkEye;
