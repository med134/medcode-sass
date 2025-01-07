import React from "react";
import { getDashboardPosts, getEmailSession } from "@/src/utils/action";
import ListBlogUsers from "../../components/ListBlogUsers";

const Blogs = async () => {
  const email = await getEmailSession();
  if (!email) {
    throw new Error("Email is required");
  }
  const posts = await getDashboardPosts(email)

  return (
    <div className="w-full p-6 h-full md:p-1 xs:py-10">
      <ListBlogUsers posts={posts} />
    </div>
  );
};

export default Blogs;
