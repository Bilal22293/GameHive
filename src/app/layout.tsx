// File: src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import ClientWrapper from "@/components/ClientWrapper";
import { APP_SESSION_ID } from '@/utils/session';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GameHive - Best gaming products",
  description:
    "Discover the best gaming products and accessories at GameHive. Shop now for top-rated gaming gear and elevate your gaming experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen ">
          <ClientWrapper appSessionId={APP_SESSION_ID}>
            <GlobalStateProvider>
              <main className="flex-grow">
                <Header />
                {/* <ModelViewer/> */}
                {children}
                <Footer />
              </main>
            </GlobalStateProvider>
          </ClientWrapper>
        </div>
      </body>
    </html>
  );
}
