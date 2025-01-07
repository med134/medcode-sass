import React from "react";
import dynamic from "next/dynamic";
import HomeDash from "@/src/app/components/HomeDash";
import Loading from "@/src/app/components/Loading";
import TransitionEffect from "@/src/app/components/TransitionEffect";
const ChartPage = dynamic(() => import("@/src/app/components/ChartPage"), {
  loading: () => <Loading />,
});

const page = () => {
  return (
    <>
      <TransitionEffect />
      <div className="p-12 bg-white sm:p-4 col-auto pt-4 px-1 md:p-6 w-[100%]">
        <h1 className="text-2xl mt-4 flex text-dark font-semibold">
          Dashboard <span className="text-mainColor ml-2">Panel</span>
        </h1>
        <HomeDash />
        <ChartPage />
      </div>
    </>
  );
};
export default page;
