import { Sidebar } from "@/components/common";
import { HamburgerMenu } from "@/components/common/HamburgerMenu";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-screen h-screen md:flex-row  flex-col">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="md:hidden block">
        <HamburgerMenu />
      </div>
      <div className="w-full bg-neutral0 px-4 py-4">
        <div className="bg-white rounded-lg h-full px-4 py-6">{children}</div>
      </div>
    </main>
  );
}
