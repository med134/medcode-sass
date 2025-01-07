import React from "react";
import EditArticle from "@/src/app/components/EditArticle";
import { getPostsBySlug } from "@/src/utils/action";

const Edit = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const article = await getPostsBySlug(slug);

  return (
    <div className="p-6 md:p-1 bg-white">
      <h1 className="text-left text-2xl text-gray-800 font-semibold py-8">
        Edit Your Article & Submit
      </h1>
      <EditArticle article={article} />
    </div>
  );
};
export default Edit;
