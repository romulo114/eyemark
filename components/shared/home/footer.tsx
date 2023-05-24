/** @format */

import { homeRoutes } from "@/constants/AppRoutes/general.routes";
import { useAppSelector } from "@/hooks/redux.hooks";
import { coatofarms } from "@/public/assets/PNG";
import { textLogo } from "@/public/assets/SVG/general";
import {
  facebook,
  instagram,
  linkedin,
  twitter,
} from "@/public/assets/SVG/home";
import { appSelector, setLanguage } from "@/store/slices/app.slice";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import TextPrimary from "../textPrimary";

const Footer: FC = () => {
  const { language: activeLanguage } = useAppSelector(appSelector);

  const companyRoutes = [
    { name: "Terms of use", link: homeRoutes.terms },
    { name: "Privacy policy", link: homeRoutes.privacy },
    { name: "Community Guidelines", link: homeRoutes.community },
  ];

  const Languages = [
    { name: "English", code: "en" },
    { name: "Igbo", code: "igbo" },
    { name: "Yoruba", code: "yoruba" },
    { name: "Hausa", code: "hausa" },
  ];

  const socials = [
    { name: "Facebook", icon: facebook, link: "" },
    { name: "Twitter", icon: twitter, link: "https://twitter.com/EyemarkNG" },
    {
      name: "Instagram",
      icon: instagram,
      link: "https://www.instagram.com/eyemarkng/",
    },
    { name: "LinkedIn", icon: linkedin, link: "" },
  ];

  return (
    <footer className="xl:px-32 sm:px-20 px-7 xl:pb-32 py-12">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="lg:w-3/12 sm:w-6/12">
          <Image src={textLogo} alt="eyemark" />
          <TextPrimary
            translation="home"
            className="mt-8 text-sm text-light-grey"
          >
            Eyemark is the easiest way to discover and track government projects
            anytime, anywhere in Nigeria
          </TextPrimary>
        </div>
        <div className="xl:w-7/12 lg:w-8/12 flex flex-col sm:flex-row justify-between mt-10 lg:mt-0 space-y-10 sm:space-y-0">
          <div className="sm:w-4/12">
            <TextPrimary translation="home" className="text-dark-grey medium">
              Resources
            </TextPrimary>

            <div className="mt-8 text-sm space-y-3">
              <Link href={homeRoutes.faqs}>
                <a className="text-light-grey hover:text-dark-grey transition duration-300 ease-in-out">
                  <TextPrimary translation="home">FAQs</TextPrimary>
                </a>
              </Link>
            </div>
          </div>

          <div className="sm:w-4/12">
            <TextPrimary translation="home" className="text-dark-grey medium">
              Company
            </TextPrimary>
            <div className="mt-8 text-sm">
              {companyRoutes.map((route) => (
                <Link
                  key={route.name}
                  href={route.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <a>
                    <TextPrimary
                      translation="home"
                      className="mt-3 text-light-grey hover:text-dark-grey transition duration-300 ease-in-out"
                    >
                      {route.name}
                    </TextPrimary>
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="sm:w-4/12">
            <TextPrimary className="text-dark-grey medium" translation="home">
              Get in touch
            </TextPrimary>
            <TextPrimary
              className="mt-8 text-sm text-light-grey"
              translation="home"
            >
              Need more information? You can get in touch with us through our
              socials
            </TextPrimary>
            <div className="mt-8 flex items-center space-x-5">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={social.icon}
                    height={20}
                    width={20}
                    alt="social"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full items-center justify-center flex flex-1 mb-0 relative top-10">
        <Image src={coatofarms} alt="coatofarms" height={64} width={75} />
      </div>

      <div className="flex flex-col lg:flex-row w-full items-center justify-between mt-20 text-sub-text text-sm">
        <TextPrimary translation="home">
          Eyemark © 2021 All rights reserved.
        </TextPrimary>
        <div className="items-center justify-between space-x-5 hidden">
          {Languages.map((language) => (
            <button
              key={language.name}
              className={
                activeLanguage === language.code ? "font-bold" : "opacity-50"
              }
              onClick={() => setLanguage(language.code)}
            >
              {language.name}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
