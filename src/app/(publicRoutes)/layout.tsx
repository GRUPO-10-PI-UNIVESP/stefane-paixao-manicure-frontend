import type { Metadata } from "next";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen">
      <div className="hidden md:flex basis-1/2 bg-brand-300 justify-center items-center">
        <Image
          src={"/logo.png"}
          width={400}
          height={400}
          alt={
            "Logo cor de rosa com o texto Studio Stefane Paixao Nail Designer"
          }
        />
      </div>
      <div className="w-full flex-col md:basis-1/2 flex md:justify-center items-center bg-neutral0">
        <div className="md:hidden block">
          <Image
            src={"/logo.png"}
            width={200}
            height={200}
            alt={
              "Logo cor de rosa com o texto Studio Stefane Paixao Nail Designer"
            }
          />
        </div>
        <div className="border-2 border-neutral400 p-8 rounded max-w-[380px] w-full m-8">
          {children}
        </div>
      </div>
    </main>
  );
}
