export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/sandbox"],
      },
    ],
    sitemap: "https://iqc-eta.vercel.app/sitemap.xml",
  };
}

