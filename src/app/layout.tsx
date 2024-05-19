import type { Metadata } from "next";
import "./globals.css";
import ProvidersWrapper from "@/components/common/ProvidersWrapper";

export const metadata: Metadata = {
  title: "Studio Stefane Paixão Nail Designer",
  description: "Studio Stefane Paixão Nail Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ProvidersWrapper>
        <body>{children}</body>
      </ProvidersWrapper>
    </html>
  );
}
