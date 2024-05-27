import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/Custom/Header";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title:
    "The Alchemy State - Join us at our next community walk - Each Saturday in Montreal",
  description: "Join us at our next community walk - Each Saturday in Montreal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <NextTopLoader
            color="#DC2626"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div>
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />

          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
