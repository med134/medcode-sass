import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import "@/src/app/globals.css";
import "jodit/examples/assets/app.css";
import { auth } from "@/auth";
import { getPostsBySlug, FormatDate, getLikes } from "@/src/utils/action";
import Loading from "@/src/app/components/Loading";
import SideBarLoading from "@/src/app/components/SideBarLoading";
const ReactionBlog = dynamic(
  () => import("@/src/app/components/ReactionBlog"),
  {
    loading: () => <Loading />,
  }
);
const Comments = dynamic(
  () => import("@/src/app/components/comments/comments"),
  {
    loading: () => <Loading />,
  }
);
const SidBar = dynamic(() => import("@/src/app/components/SidBar"), {
  loading: () => <SideBarLoading />,
});
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await getPostsBySlug(slug);
  const publishedAt = new Date(post?.createdAt).toISOString();
  const modifiedAt = new Date(post?.updatedAt || post?.createdAt).toISOString();
  return {
    title: post?.title,
    description: post?.description,
    keywords: post?.tags,
    publishedTime: publishedAt,
    modifiedTime: modifiedAt,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/blogs/${slug}`,
      languages: {
        "en-US": `en-US/blogs/${slug}`,
      },
      types: {
        "application/rss+xml": "https://www.medcode.dev/rss",
      },
    },
    local: "en_Us",
    type: "article",
    openGraph: {
      title: post?.title,
      description: post?.description,
      ur: `https://www.medcode.dev/blogs/${slug}`,
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: [
        {
          url: post?.image,
          width: "400",
          height: "300",
        },
      ],
    },
  };
}
const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await getPostsBySlug(slug);
  const content = blog.content;
  const BlogId = JSON.parse(JSON.stringify(blog._id));
  const session = await auth();
  const likesPost = await getLikes(blog._id);
  console.log(likesPost);

  return (
    <section className="p-16 py-40 w-full grid grid-cols-7 gap-10 xl:gap-8 lg:flex lg:flex-col sm:p-3 sm:py-28 dark:bg-dark">
      <div className="myRightSide col-span-5 flex flex-col justify-around dark:bg-dark">
        <div className="w-full px-4 mb-1 sm:text-sm sm:mb-2 dark:text-light dark:bg-dark">
          <h1 className="hello text-4xl font-bold py-6 pt-6 sm:text-2xl text-mainColor dark:text-light xs:py-1">
            {blog.title}
          </h1>
          <span className="text-xl text-gray-600 py-3 sm:text-sm xs:text-sm xs:py-1 dark:text-light">
            {blog.description}
          </span>
          <div className="mt-6">
            <div className="flex justify-start py-1">
              <div className="flex justify-start items-center dark:bg-dark">
                <Link
                  href={`/dashboard/users/${blog.userId}`}
                  className="text-blue-600 text-sm uppercase dark:text-light xs:text-xs"
                >
                  {blog?.username}
                </Link>
                <span className="ml-2 text-sm text-gray-800 font-semibold dark:text-light xs:text-xs">
                  | {FormatDate(blog?.createdAt)}
                </span>
              </div>
              <Link
                href={`/category/${blog.category}`}
                className="uppercase text-xs text-gray-800 font-semibold rounded-sm px-2 py-1 ml-2 bg-yellow-400 hover:bg-yellow-300"
              >
                {blog.category}
              </Link>
            </div>
            <Image
              src={blog.image}
              alt={blog.title}
              className="w-[1280px] h-auto sm:h-auto object-cover rounded mt-2"
              width={800}
              height={400}
              priority={true}
              quality={100}
            />
          </div>

          <h2 className="flex underline font-bold justify-start items-start py-6 xs:py-2 ml-2 mt-1 font-bolder">
            {blog.tags}
          </h2>
          <div
            className="py-4 w-full xs:min-w-full"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <ReactionBlog slug={slug} totalLikes={likesPost} BlogId={BlogId} />
          {session && (
            <Comments
              postId={BlogId}
              user={
                session.user as { name: string; email: string; image: string }
              }
            />
          )}
        </div>
      </div>
      <div className="myLeftSide xl:w-72 col-span-2 sm:w-full xs:w-full sm:p-2 lg:h-[650px] sm:mb-8">
        <SidBar postSlug={blog.slug} />
      </div>
    </section>
  );
};
export default BlogPage;
