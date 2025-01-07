import type { MetadataRoute } from "next";
import { getAllCategories, getPosts, getTemplates } from "../utils/action";
import routes from "@/src/utils/data/routes.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getTemplates();
  const blogs = await getPosts();
  const categories = await getAllCategories();
  const baseUrl = "https://medcode.dev";
  const staticUrls = routes.map((route) => {
    return {
      url: `${baseUrl}${route.url}`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: "monthly",
    };
  });
  const AllPosts = posts.map((item) => {
    return {
      url: `${baseUrl}/templates/${item.slug}`,
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: "weakly",
    };
  });
  const AllBlogs = blogs.map((item) => {
    return {
      url: `${baseUrl}/blogs/${item.slug}`,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: "daily",
    };
  });
  const allCategories = categories.map((cat) => {
    return {
      url: `${baseUrl}/category/${cat.value}`,
      lastModified: new Date().toISOString(),
    };
  });

  return [...staticUrls, ...AllPosts, ...AllBlogs, ...allCategories];
}
