import { faqCardProps } from "@/@types/components/general.types";
import { faqCaret } from "@/public/assets/SVG/faqs";
import Image from "next/image";
import { FC, useState } from "react";
import ReactHtmlParser from "react-html-parser";

const FAQCard: FC<faqCardProps> = ({ title, content }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const toggleOpened = () => setOpened((value) => !value);
  return (
    <>
      <button className="flex items-center space-x-5" onClick={toggleOpened}>
        <div
          className={`transform transition duration-300 ease-in-out h-5 ${
            opened ? "rotate-90" : "rotate-0"
          }`}
        >
          <Image src={faqCaret} alt="carat" />
        </div>
        <h1
          className={`medium lg:text-xl text-base text-left ${
            opened ? "text-accepted" : "text-dark-grey"
          }`}
        >
          {title}
        </h1>
      </button>
      <div
        className={`overflow-hidden pl-8 mt-2 text-sm lg:text-base ${
          opened ? "h-fit" : "h-0 hidden"
        }`}
      >
        {ReactHtmlParser(content)}
      </div>
    </>
  );
};

export default FAQCard;
