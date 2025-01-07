import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MedCode Dev blog & Articles",
    short_name: "medcode",
    description:
      "Learning programming is accessible for beginners through free software programming",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f5",
    theme_color: "#FFFFFF",
    icons: [
      {
        src: "/src/app/favicon.ico",
        sizes: "any",
        type: "image/icon",
      },
      {
        src: "/src/app/favicon.ico",
        sizes: "384x384",
        type: "image/ico",
      },
      {
        src: "/src/app/favicon.ico",
        sizes: "512x512",
        type: "image/ico",
      },
    ],
  };
}
