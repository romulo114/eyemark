import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import Follow from "@/pages/auth/signup/follow";
import CreateInterest from "@/pages/auth/signup/interests";
import ProfilePage from "@/pages/auth/signup/profile";
import UploadProfilePicture from "@/pages/auth/signup/upload";
import UserDetails from "@/pages/auth/signup/user-details";
import UserType from "@/pages/auth/signup/user-type";
import VerifyCode from "@/pages/auth/signup/verify-code";
import { closeMap } from "@/public/assets/SVG/general";
import {
  authSelector,
  setModalPage,
  toggleModal,
} from "@/store/slices/auth.slice";
import Image from "next/image";
import { FC } from "react";
import EyeMarkEye from "../Auth/eyemarkEye";
import LoginModal from "../Auth/loginModal";
import TextPrimary from "./textPrimary";

const AuthModal: FC = () => {
  const dispatch = useAppDispatch();
  const { auth_modal } = useAppSelector(authSelector);
  const { modal_page } = auth_modal;

  const navigate = (num: number) => {
    dispatch(setModalPage(num));
  };

  const close = () => {
    dispatch(
      toggleModal({ show: false, action: "", subtitle: "", modal_page: 0 })
    );
  };

  return (
    <div
      className="bg-white"
      data-testid="modal_auth"
    >
      {(modal_page === 0 || modal_page === 1) && (
        <div className="flex justify-between px-6 pt-10">
          <EyeMarkEye />

          <button onClick={close}>
            <Image src={closeMap} height={20} width={20} alt="logo" />
          </button>
        </div>
      )}

      {modal_page === 0 ? (
        <div className="px-6 pb-10">
          <div className="mt-8">
            <TextPrimary
              translation="discover"
              className="text-black text-xl medium"
            >
              {auth_modal?.text}
            </TextPrimary>
            <p className="mt-3 text-light-grey-2 text-xs">
              Sign up to never miss{auth_modal?.subtitle}.
            </p>
          </div>
          <div className="mt-8 flex flex-col">
            <button
              className="py-4 rounded-full w-full bg-accepted border border-acccepted text-white medium"
              onClick={() => navigate(1)}
            >
              Log in
            </button>
            <button
              className="mt-1.5 py-4 rounded-full w-full bg-white border border-accepted text-accepted medium"
              onClick={() => navigate(1.5)}
            >
              Create an Account
            </button>
          </div>
        </div>
      ) : modal_page === 1 ? (
        <>
          <LoginModal />
        </>
      ) : modal_page === 1.5 ? (
        <>
          <UserType />
        </>
      ) : modal_page === 2 ? (
        <>
          <ProfilePage />
        </>
      ) : modal_page === 2.5 ? (
        <>
          <VerifyCode />
        </>
      ) : modal_page === 3 ? (
        <>
          <UserDetails />
        </>
      ) : modal_page === 3 ? (
        <>
          <UserDetails />
        </>
      ) : modal_page === 4 ? (
        <>
          <UploadProfilePicture />
        </>
      ) : modal_page === 5 ? (
        <>
          <CreateInterest />
        </>
      ) : (
        modal_page === 6 && (
          <>
            <Follow />
          </>
        )
      )}
    </div>
  );
};

export default AuthModal;
