import type { MetadataRoute } from "next";
import { comunidades, getProvincesByCommunity } from "@/lib/holidays-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hoyesfiesta.com";
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Comunidades autónomas
  const communities = comunidades.filter((c) => c.type === "autonomous_region");
  for (const community of communities) {
    entries.push({
      url: `${baseUrl}/${community.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Provincias
    const provinces = getProvincesByCommunity(community.id);
    for (const province of provinces) {
      entries.push({
        url: `${baseUrl}/${community.slug}/${province.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
