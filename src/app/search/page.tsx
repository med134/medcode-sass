import React from "react";
import { getAllCategories, getPosts, searchFunction } from "@/src/utils/action";
import SearPage from "@/src/app/components/SearchPage";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const query = Array.isArray(searchParams.query)
    ? searchParams.query[0]
    : searchParams.query || "";
  const allResult = await searchFunction(query);
  const articles = await getPosts();
  const cat = await getAllCategories();
  return (
    <div className="bg-light dark:bg-dark pt-36 text-center w-[100%]">
      <SearPage
        posts={articles}
        firstSearch={allResult}
        queryOne={query}
        cat={cat}
      />
    </div>
  );
};

export default page;
