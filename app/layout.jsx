import Analytics from "@/lib/analytics";
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
      <body
        className={`antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
