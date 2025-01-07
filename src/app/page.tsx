import React, { Suspense } from "react";
import HomePage from "@/src/app/components/HomePage";
import TransitionEffect from "@/src/app/components/TransitionEffect";
import dynamic from "next/dynamic";
import Loading from "@/src/app/components/Loading";
import FirstView from "@/src/app/components/FirstView";
const Easy = dynamic(() => import("@/src/app/components/EsayTemplates"), {
  loading: () => <Loading />,
});

export default async function Home() {
  return (
    <>
      <TransitionEffect />
      <FirstView />
      <HomePage />
      <Suspense fallback={<Loading />}>
        <Easy />
      </Suspense>
    </>
  );
}
