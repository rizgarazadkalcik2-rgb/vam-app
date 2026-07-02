import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getLang } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const description = t("meta_site_desc", lang);

  return {
    metadataBase: new URL("https://visitvam.com"),
    title: {
      default: "VAM — Visit Anatolia and Mesopotamia",
      template: "%s | VAM",
    },
    description,
    openGraph: {
      siteName: "VAM — Visit Anatolia and Mesopotamia",
      type: "website",
      locale: lang === "DE" ? "de_DE" : "tr_TR",
      description,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  return (
    <html lang={lang === "DE" ? "de" : "tr"} className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Outfit:wght@300;400;500;600;700&family=Cinzel:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
