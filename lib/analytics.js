"use client";

import Script from "next/script";

export default function Analytics() {
  return (
    <Script
      strategy="afterInteractive"
      src="https://plausible.io/js/pa-VQzAAPgeNtX1WdZOzc-KO.js"
      data-domain="iqc-eta.vercel.app"
    />
  );
}
