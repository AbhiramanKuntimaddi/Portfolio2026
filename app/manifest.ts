import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Abhiraman K.",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#040811",
    theme_color: "#040811",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
