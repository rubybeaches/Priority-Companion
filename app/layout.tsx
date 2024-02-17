import { Inter } from "next/font/google";
import { Metadata } from "next";
import type { Viewport } from "next";
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
import "./layout.css";

export const metadata: Metadata = {
  title: "Priority Companion",
  description:
    "Priority Companion: Your personal system-based task manager. Provides a useful system to apply your unqiue gifts, skills, and talents effecitvely as you participate in your daily roles. Partner habits and initiatives to facilitate outcomes that provide personal fufillment and rewards consistent with your values, goals, and lifestyle.",
};

export const viewport: Viewport = {
  width: "700px",
  initialScale: 1.0,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
