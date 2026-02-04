import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
 
export const metadata = {
  title: "iQC — Iconic Quality Consultants",
  description:
    "Iconic Quality Consultants is an independent construction and quality control consultancy based in Bali, delivering projects with international standards, clear supervision, and long-term quality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
         <head>
        {/* Plausible Analytics */}
        <script
          async
          src="https://plausible.io/js/pa-VQzAAPgeNtX1WdZOzc-KO.js"
          data-domain="iqc-eta.vercel.app"
        ></script>

<script>
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
</script>

      </head>
      <body
        className={`antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
