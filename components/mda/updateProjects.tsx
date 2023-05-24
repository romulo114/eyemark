import { updateProjectProps } from "@/@types/components/mda.types";
import { BASE_URL } from "@/api/instance";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { authSelector } from "@/store/slices/auth.slice";
import { mdaSelector, updateProjects } from "@/store/slices/mda.slice";
import { FC, useRef, useState } from "react";
import TextPrimary from "../shared/textPrimary";

const UpdateProjects: FC<updateProjectProps> = ({ close }) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(authSelector);
  const { updateResponse } = useAppSelector(mdaSelector);

  const [done, setDone] = useState<boolean>(false);
  const [payload, setPayload] = useState({
    file: null as any,
  });

  const required = !!payload.file;

  const addFile = () => {
    setDone(false);
    inputFile.current && inputFile.current.click();
  };

  const finishProcess = () => {
    setDone(true);
    setPayload({
      file: null,
    });
  };

  const uploadProjects = async () => {
    if (required) {
      const formData = new FormData();
      formData.append("file", payload.file);

      dispatch(updateProjects({ formData, cb: finishProcess }));
    }
  };

  const getFile = (name: string, event: any) => {
    name &&
      event &&
      setPayload({
        ...payload,
        [name]: event,
      });
  };

  return (
    <>
      <div className="bg-cream py-7 px-16 medium relative overflow-hidden">
        <TextPrimary translation="mda" className="text-sm text-center">
          Import Projects
        </TextPrimary>
        <TextPrimary translation="mda" className="mt-2 text-xs text-center">
          Click the button below to select the file
        </TextPrimary>
        <a
          target="_blank"
          rel="noreferrer"
          href={`${BASE_URL}/projects/export/projects/?email=${user?.email}`}
          className="mt-4 text-xs text-accepted absolute bottom-2 right-3"
        >
          Download Template
        </a>

        <div className="mt-10">
          <div className="flex justify-center w-full">
            <button
              className="text-white px-6 py-2 rounded-full bg-accepted"
              onClick={addFile}
            >
              {`Select ${done ? "another" : ""} file`}
            </button>
          </div>
          <p className="text-center mt-2 text-xs">
            {payload.file && payload.file.name}
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

        {done && (
          <div className="text-sm pb-12 mt-9">
            <div className="py-3 border-b border-light-grey-1 flex justify-between ">
              <TextPrimary translation="mda" className="text-xs w-9/12 ">
                Newly created Projects
              </TextPrimary>{" "}
              {updateResponse.created_projects}
            </div>
            <div className="py-3 border-b border-light-grey-1 flex justify-between ">
              <TextPrimary translation="mda" className="text-xs w-9/12 ">
                Already exisiting Projects in file
              </TextPrimary>
              {updateResponse.rows_with_existing_project_data?.length}
            </div>
            <div className="py-3 border-b border-light-grey-1 flex justify-between ">
              <TextPrimary translation="mda" className="text-xs w-9/12 ">
                Projects missing &apos;name&apos; or &apos;project code&apos;
              </TextPrimary>
              {updateResponse.rows_with_incomplete_compulsory_columns?.length}
            </div>
          </div>
        )}
      </div>

      <div
        className={`flex py-6 px-7 bg-dark-grey ${
          !done ? "justify-between" : "justify-end"
        }`}
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
            className={`rounded-full px-5 py-2 text-sm
              ${
                required
                  ? "bg-accepted text-white"
                  : "text-light-grey bg-input-border cursor-not-allowed"
              }`}
            onClick={uploadProjects}
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

export default UpdateProjects;
