import type React from "react";
import type { ReactNode } from "react";
import { SideBar } from "./sidebar";

interface IChatLayoutProps {
  children: ReactNode;
}

export const IngestLayout: React.FC<IChatLayoutProps> = ({ children }) => {
  return (
    <main className="relative h-[calc(100vh-73px)] overflow-y-auto flex flex-row">
      {/* Sidebar */}
      <aside className="sticky top-0 h-full px-[40px] py-8 w-[350px]">
        <SideBar />
      </aside>

      {/** Content */}
      <section className="flex-1 py-8">{children}</section>
    </main>
  );
};
