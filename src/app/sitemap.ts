import type { MetadataRoute } from "next";
import { comunidades, getProvincesByCommunity } from "@/lib/holidays-data";
import { getMunicipalitiesByProvince } from "@/lib/municipalities-data";

// Genera una fecha lastModified basada en el inicio del día actual (UTC)
// Esto incentiva a Googlebot a re-rastrear el sitemap regularmente,
// ya que el contenido "¿Hoy es fiesta?" cambia cada día.
function getTodayDate(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hoyesfiesta.com";
  const today = getTodayDate();

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/optimizador`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Comunidades autónomas
  const communities = comunidades.filter((c) => c.type === "autonomous_region");
  for (const community of communities) {
    entries.push({
      url: `${baseUrl}/${community.slug}`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Provincias
    const provinces = getProvincesByCommunity(community.id);
    for (const province of provinces) {
      entries.push({
        url: `${baseUrl}/${community.slug}/${province.slug}`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.7,
      });

      // Municipios
      const municipalities = getMunicipalitiesByProvince(province.id);
      for (const muni of municipalities) {
        entries.push({
          url: `${baseUrl}/${community.slug}/${province.slug}/${muni.slug}`,
          lastModified: today,
          changeFrequency: "daily",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
