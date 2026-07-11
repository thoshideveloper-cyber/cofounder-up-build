import type { Metadata } from "next";
import { TopNav } from "@/components/layout/TopNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "CofounderUp",
  description: "Find your cofounder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-page-bg">
        <TopNav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
