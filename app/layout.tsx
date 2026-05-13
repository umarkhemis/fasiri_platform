import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fasiri - African Language API",
  description:
    "Translate, transcribe, and synthesise speech across 30+ African languages. One API key. One endpoint. Powered by Sunbird AI, Khaya AI, and HuggingFace.",
  keywords: [
    "African language API", "translation API", "Luganda", "Yoruba", "Swahili",
    "Sunbird AI", "Khaya AI", "speech to text Africa", "NLP Africa",
  ],
  openGraph: {
    title: "Fasiri - African Language API",
    description: "One API for translation, STT, and TTS across 30+ African languages.",
    siteName: "Fasiri",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fasiri - African Language API",
    description: "One API for translation, STT, and TTS across 30+ African languages.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
