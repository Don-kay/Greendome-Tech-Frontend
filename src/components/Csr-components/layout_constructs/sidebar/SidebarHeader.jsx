"use client";
import Image from "next/image";
import { setLoading } from "../../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Dennis from "../../../asset/dennis.jpg";
import Loading from "../loading";

export function SidebarHeader({ profileImg, trigger }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((strore) => strore.user);
  //console.log(profileImg);
  // if (profileImg !== "" || profileImg !== undefined) {
  //   dispatch(setLoading(false));
  // } else {
  //   dispatch(setLoading(true));
  // }
  return (
    <div className="sticky top-0 z-10 mb-6 flex items-center justify-center pb-6">
      {trigger ? (
        <div className=" flex items-center w-screen h-full  z-20 relative ">
          <Loading />
        </div>
      ) : (
        <div className="imgCont relative top-10  bg-green flex justify-center items-center m-3 overflow-hidden max-w-md1 h-any rounded-full">
          {profileImg !== "" || profileImg !== undefined ? (
            <Image
              className=" h-28"
              width={120}
              height={120}
              src={profileImg}
              alt="image"
            />
          ) : (
            <Image width={120} height={120} src={Dennis} alt="image" />
          )}
        </div>
      )}
    </div>
  );
}
