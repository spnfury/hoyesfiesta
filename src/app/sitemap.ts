import type { MetadataRoute } from "next";
import { comunidades, getProvincesByCommunity } from "@/lib/holidays-data";
import { getMunicipalitiesByProvince } from "@/lib/municipalities-data";

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
    {
      url: `${baseUrl}/optimizador`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
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

      // Municipios
      const municipalities = getMunicipalitiesByProvince(province.id);
      for (const muni of municipalities) {
        entries.push({
          url: `${baseUrl}/${community.slug}/${province.slug}/${muni.slug}`,
          lastModified: now,
          changeFrequency: "daily",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
