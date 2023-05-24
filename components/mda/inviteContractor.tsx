import { inviteContractorProps } from "@/@types/components/mda.types";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { inviteAContractor } from "@/store/slices/mda.slice";
import { FC, SyntheticEvent, useState } from "react";
import TextPrimary from "../shared/textPrimary";

const InviteContractor: FC<inviteContractorProps> = ({ close }) => {
  const dispatch = useAppDispatch();

  const [payload, setPayload] = useState({
    email: "",
    name: "",
  });

  const getInput = (name: string, event: SyntheticEvent<HTMLInputElement>) => {
    name &&
      event &&
      setPayload({
        ...payload,
        [name]: event.currentTarget.value,
      });
  };

  const inviteContractor = async () => {
    required && dispatch(inviteAContractor({ payload, cb: close }));
  };

  const required = payload.name.length > 0 && payload.email.length > 0;

  return (
    <>
      <div className="bg-cream py-7 px-12 medium">
        <TextPrimary translation="mda">Invite Contractor</TextPrimary>
        <TextPrimary translation="mda" className="mt-2 text-sm">
          Please provide the following details to invite a contractor
        </TextPrimary>

        <div className="mt-10 pb-12 flex space-x-4">
          <input
            type="text"
            placeholder="Company Name"
            className="w-6/12 px-4 py-3 border border-dark-grey rounded placeholder-dark-grey text-sm"
            onChange={(value) => getInput("name", value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-6/12 px-4 py-3 border border-dark-grey rounded placeholder-dark-grey text-sm"
            onChange={(value) => getInput("email", value)}
          />
        </div>
      </div>

      <div className="flex justify-end py-6 px-7 bg-dark-grey">
        <button
          className={`text-white bg-accepted rounded-full px-5 py-2 medium text-sm ${
            required
              ? "bg-accepted text-white"
              : "text-light-grey bg-input-border cursor-not-allowed"
          }`}
          onClick={inviteContractor}
        >
          Send Invite
        </button>
      </div>
    </>
  );
};

export default InviteContractor;
