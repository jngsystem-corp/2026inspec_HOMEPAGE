import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// next.config.ts 의 trailingSlash: true 와 맞춰 끝 슬래시 URL만 싣는다(리디렉션 URL 금지).
// lastModified 는 빌드 시각이 아닌 실제 수정일만 의미가 있으므로, 관리할 수 없으면 넣지 않는다.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inspec.jngsystem.co.kr";

  const pages: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/service/", changeFrequency: "monthly", priority: 0.9 },
    { path: "/target/", changeFrequency: "monthly", priority: 0.9 },
    { path: "/equipment/", changeFrequency: "monthly", priority: 0.8 },
    { path: "/process/", changeFrequency: "monthly", priority: 0.8 },
    { path: "/law/", changeFrequency: "monthly", priority: 0.8 },
    { path: "/faq/", changeFrequency: "weekly", priority: 0.9 },
    { path: "/contact/", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy/", changeFrequency: "yearly", priority: 0.3 },
  ];

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
