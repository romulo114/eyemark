/** @format */

import { authRoutes } from "@/constants/AppRoutes/auth.routes";
import {
  generalRoutes,
  homeRoutes,
} from "@/constants/AppRoutes/general.routes";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { greenCaret, textLogo } from "@/public/assets/SVG/general";
import { menu, separator } from "@/public/assets/SVG/home";
import { appSelector, toggleNav } from "@/store/slices/app.slice";
import { authSelector, logout } from "@/store/slices/auth.slice";
import { textElementType } from "@/@types/components/general.types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import TextPrimary from "../textPrimary";
import { useRouter } from "next/router";
import { redirectToDashboard } from "@/helpers/general.helpers";

const Nav: FC = () => {
  const dispatch = useAppDispatch();
  const { navOpen } = useAppSelector(appSelector);
  const { is_authenticated, user } = useAppSelector(authSelector);

  const router = useRouter();
  const { pathname } = router;

  const toggleopen = () => dispatch(toggleNav());

  const toDashboard = () => {
    redirectToDashboard(user?.account_type, router);
  };

  const categories = [
    { name: "Sectors", link: "sectors" },
    { name: "Ministries", link: "ministries" },
    { name: "States", link: "states" },
  ];

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        className={`
      bg-black absolute bg-opacity-10 min-h-screen h-full w-full z-50 inset-0 ${
        navOpen ? "block" : "hidden"
      }
    `}
        onClick={toggleopen}
      ></div>

      <nav className="relative flex justify-between items-center xl:px-32 sm:px-20 px-7 py-7 bg-white">
        <div className="flex items-center lg:hidden">
          <Image src={textLogo} height={28} alt="logo" />
        </div>
        <button className="lg:hidden relative z-20" onClick={toggleopen}>
          <Image src={menu} alt="menu" />
        </button>

        <div
          className={`transform ease-in-out transition duration-500 lg:flex-grow
            ${
              !navOpen
                ? "hidden -translate-x-full lg:translate-x-0 lg:flex"
                : "flex flex-col justify-center px-6 py-5 rounded lg:bg-transparent lg:static z-50 bg-white absolute right-0 top-0 w-8/12 sm:w-5/12 translate-x-0 h-screen"
            }`}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center w-full">
            <div className="items-center hidden lg:flex">
              <Image src={textLogo} height={28} alt="logo" />
            </div>
            <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
              <div className="flex flex-col lg:items-center lg:flex-row w-full space-y-3 lg:space-y-0 lg:space-x-8 lg:border-none border-b py-4 lg:py-0 border-grey-stroke">
                <Link href={homeRoutes.home}>
                  <a
                    className={`text-base lg:text-sm ${
                      pathname === homeRoutes.home
                        ? "text-black"
                        : "text-light-grey"
                    }`}
                  >
                    <TextPrimary className="medium" translation="home">
                      Home
                    </TextPrimary>
                  </a>
                </Link>
                <Link href={homeRoutes.faqs}>
                  <a
                    className={`text-base lg:text-sm ${
                      pathname === homeRoutes.faqs
                        ? "text-black"
                        : "text-light-grey"
                    }`}
                  >
                    <TextPrimary className="medium" translation="home">
                      FAQs
                    </TextPrimary>
                  </a>
                </Link>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                  <Image src={separator} alt="separator" />
                </div>
              </div>
              <div className="lg:ml-8 flex flex-col lg:flex-row w-full lg:w-auto space-y-3 lg:space-y-0 lg:space-x-8 border-b lg:border-none py-4 lg:py-0 border-grey-stroke">
                {categories.map((category) => (
                  <Link
                    key={category.link}
                    href={`${generalRoutes.subcategory}/?category=${category.link}`}
                  >
                    <a className="text-light-grey text-base lg:text-sm">
                      <TextPrimary className="medium" translation="home">
                        {category.name}
                      </TextPrimary>
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            {!is_authenticated ? (
              <div className="flex flex-col lg:flex-row items-start lg:items-center w-full lg:w-auto space-y-3 lg:space-y-0 lg:py-0 py-4 lg:space-x-5">
                <Link href={authRoutes.login}>
                  <a className="">
                    <TextPrimary
                      className="text-base lg:text-sm medium"
                      translation="home"
                    >
                      Login
                    </TextPrimary>
                  </a>
                </Link>
                <Link href={authRoutes.createAccount}>
                  <a>
                    <button className="whitespace-nowrap text-sm flex items-center px-6 py-3 bg-accepted-light rounded-full text-accepted backdrop-blur-3xl">
                      <TextPrimary
                        className="medium mr-2"
                        translation="home"
                        elementType={textElementType.Span}
                      >
                        Create Account
                      </TextPrimary>
                      <Image src={greenCaret} alt="caret" />
                    </button>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto space-y-3 lg:space-y-0 lg:py-0 py-4 lg:space-x-5">
                <button onClick={toDashboard}>
                  <a>
                    <TextPrimary
                      className="text-base lg:text-sm medium"
                      translation="home"
                    >
                      Dashboard
                    </TextPrimary>
                  </a>
                </button>
                <button
                  onClick={logOut}
                  className="px-4 py-2 bg-accepted text-white rounded-full mt-2"
                >
                  <TextPrimary translation="home">Log Out</TextPrimary>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
