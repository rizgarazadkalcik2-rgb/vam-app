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
      locale: lang === "DE" ? "de_DE" : lang === "EN" ? "en_US" : lang === "KU" ? "ku_TR" : lang === "CKB" ? "ckb_IQ" : "tr_TR",
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

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VAM — Visit Anatolia and Mesopotamia",
    url: "https://visitvam.com",
    logo: "https://visitvam.com/logo/vam-logo-512.png",
    description: t("meta_site_desc", lang),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Akköprü Mahallesi, Orta Sokak No: 68",
      addressLocality: "Tuşba/Van",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@visitvam.com",
      telephone: "+90-543-683-7978",
    },
  };

  return (
    <html
      lang={lang === "DE" ? "de" : lang === "EN" ? "en" : lang === "KU" ? "ku" : lang === "CKB" ? "ckb" : "tr"}
      dir={lang === "CKB" ? "rtl" : "ltr"}
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Outfit:wght@300;400;500;600;700&family=Cinzel:wght@500;600&family=Vazirmatn:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
