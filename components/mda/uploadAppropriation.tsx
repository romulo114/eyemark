import { uploadAppropriationProps } from "@/@types/components/mda.types";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { uploadYearlyAppropriation } from "@/store/slices/mda.slice";
import { FC, SyntheticEvent, useRef, useState } from "react";
import TextPrimary from "../shared/textPrimary";

const UploadAppropriation: FC<uploadAppropriationProps> = ({ close }) => {
  const inputFile = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const [done, setDone] = useState<boolean>(false);
  const [appropriation, setAppropriation] = useState({
    year: "",
    file: null as any,
  });

  const _handleChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    setAppropriation({ ...appropriation, year: e.currentTarget.value });
  };

  const required = !!(appropriation.file && appropriation.year);

  const addFile = () => {
    setDone(false);
    inputFile.current && inputFile.current.click();
  };

  const getFile = (name: string, event: any) => {
    name &&
      event &&
      setAppropriation({
        ...appropriation,
        [name]: event,
      });
  };

  const finishProcess = () => {
    setDone(true);
    setAppropriation({
      year: "",
      file: null,
    });
  };

  const uploadAppropriation = () => {
    if (required) {
      const formData = new FormData();
      formData.append("file", appropriation.file);
      formData.append("year", appropriation.year);
      dispatch(uploadYearlyAppropriation({ formData, cb: finishProcess }));
    }
  };

  const appropriationFiles = [
    {
      href: "https://docs.google.com/spreadsheets/d/1rVdRjCcMwPXGpu7rzT1aJlSJ0vMT1mmt/edit?usp=sharing&ouid=105678911074295956124&rtpof=true&sd=true",
      name: "2021",
    },
    {
      href: "https://docs.google.com/spreadsheets/d/1O2sJMQd29McrROu5iplNOekn5FLakzkb/edit?usp=sharing&ouid=105678911074295956124&rtpof=true&sd=true",
      name: "2022",
    },
    {
      href: "https://docs.google.com/spreadsheets/d/1KJ8p2uekXvMt9a_ropP9Xw-eiIT_3lwN/edit?usp=sharing&ouid=105678911074295956124&rtpof=true&sd=true",
      name: "Template",
    },
  ];

  return (
    <>
      <div className="bg-cream pt-7 pb-10 px-16 medium relative">
        <div className="absolute bottom-2 left-3 flex items-center text-xs">
          <TextPrimary translation="mda" className="text-dark-grey mr-3">
            Download appropriation files:
          </TextPrimary>
          {appropriationFiles.map((file) => (
            <a
              key={file.name}
              target="_blank"
              rel="noreferrer"
              href={file.href}
              className="text-accepted mr-3"
            >
              {file.name}
            </a>
          ))}
        </div>
        <TextPrimary translation="mda" className="text-sm text-center">
          Upload Yearly Appropriation
        </TextPrimary>
        <TextPrimary translation="mda" className="mt-2 text-center text-xs">
          Pick a year and click the button below to select the file
        </TextPrimary>

        <div className="mt-10">
          <div className="flex flex-col lg:flex-row items-center space-x-3">
            <div className="relative">
              <select
                name=""
                id=""
                className="w-32 select-input"
                onChange={_handleChange}
                defaultValue={"DEFAULT"}
              >
                <option disabled value={"DEFAULT"}>
                  Year
                </option>
                {[2019, 2020, 2021, 2022, 2023].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center w-full mt-4 lg:mt-0">
              <button
                className="text-white px-6 py-2 rounded-full bg-accepted"
                onClick={addFile}
              >
                {`Select ${done ? "another" : ""} file`}
              </button>
            </div>
          </div>
          <p className="text-center mt-4 text-xs">
            {appropriation.file && appropriation.file.name}
          </p>
          <input
            type="file"
            id="upload"
            name="images"
            ref={inputFile}
            className="hidden"
            onChangeCapture={() =>
              getFile("file", inputFile.current!.files![0])
            }
          />
        </div>
      </div>

      <div
        className={`
          flex py-6 px-7 bg-dark-grey ${
            !done ? "justify-between" : "justify-end"
          }
        `}
      >
        {!done && (
          <button
            className="rounded-full px-5 py-2 medium text-sm text-white bg-transparent"
            onClick={close}
          >
            Cancel
          </button>
        )}
        {!done ? (
          <button
            className={`
              rounded-full px-5 py-2 text-sm
              ${
                required
                  ? "bg-accepted text-white"
                  : "text-light-grey bg-input-border cursor-not-allowed"
              }
            `}
            onClick={uploadAppropriation}
          >
            <TextPrimary translation="mda" className="medium">
              Submit
            </TextPrimary>
          </button>
        ) : (
          <button
            className="rounded-full px-5 py-2 text-sm bg-accepted text-white"
            onClick={close}
          >
            <TextPrimary translation="mda" className="medium">
              Continue
            </TextPrimary>
          </button>
        )}
      </div>
    </>
  );
};

export default UploadAppropriation;
