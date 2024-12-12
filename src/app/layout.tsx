import type { Metadata } from "next";
import "../styles/globals.css";
import Script from "next/script";
import { Header, Footer } from "@/components/section";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "@/context/AppContext";

export const metadata: Metadata = {
  title: "iLoma Technology",
  description:
    "At iLoma Technology, we provide innovative digital solutions designed to meet the needs of modern businesses. Our expert services include iOS app development, Android app development, and Flutter app development for high-performance, cross-platform mobile applications. We also offer website development to help businesses create a powerful online presence. Our graphic design and UX/UI design services focus on enhancing your brand’s visual identity and delivering exceptional user experiences across both web and mobile platforms. Partner with iLoma Technology to bring your digital vision to life with seamless, user-friendly solutions that engage and convert your audience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          <ToastContainer />
          {children}
          <Footer />
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            strategy="afterInteractive"
          />
        </AppProvider>
      </body>
    </html>
  );
}
