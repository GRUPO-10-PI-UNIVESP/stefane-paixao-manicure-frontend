import { HamburgerMenu } from "@/components/_common/HamburgerMenu";
import { Sidebar } from "@/components/_common/SideBar";
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
      <div className="w-full overflow-y-auto bg-neutral-50 px-4 py-4">
        <div className="bg-white rounded-lg px-4 py-6">{children}</div>
      </div>
    </main>
  );
}
