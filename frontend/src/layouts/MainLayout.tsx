import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/login";

  if (hideSidebar) {
    return (
      <main className="bg-slate-100 min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-slate-100 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}