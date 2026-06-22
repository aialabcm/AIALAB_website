import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aialabcmr.com";
  const routes = ["", "/about/", "/work/", "/lancer-un-projet/"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
