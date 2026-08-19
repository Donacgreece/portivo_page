import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portivo Control Center — Network control without the noise",
  description: "Open-source network operations for compatible ALE OmniSwitch environments.",
  icons: { icon: "/assets/favicon.ico", apple: "/assets/apple-touch-icon.png" },
  openGraph: { title: "Portivo Control Center", description: "Network control without the noise.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Portivo Control Center", description: "Network control without the noise.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
