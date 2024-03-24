import React from "react";
import G from "../../asset/G.png";
import Image from "next/image";

const Loading = () => {
  return (
    <section className=" relative flex items-center justify-center h-full w-full  ">
      <div className=" flex items-center justify-center w-percen50 h-32 rounded-radius50 after:pb-72 after:block after:content-none bg-greenGradedHov ">
        <Image
          className=" mt-5 animate-bounce"
          src={G}
          alt="loading"
          height={70}
          width={70}
        />
      </div>
    </section>
  );
};

export default Loading;
