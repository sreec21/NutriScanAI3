import {
  LayoutDashboard,
  ScanLine,
  BookOpen,
  MessageSquare,
  FileText,
  User,
} from "lucide-react";
import {
  History as HistoryIcon
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all ${
      isActive
        ? "bg-green-500 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="w-64 h-screen bg-slate-900 p-6">
      <h1 className="text-2xl font-bold text-green-400 mb-10">
        NutriScan AI
      </h1>

      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={linkClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/scan" className={linkClass}>
          <ScanLine size={20} />
          <span>Scan Food</span>
        </NavLink>

        <NavLink to="/diary" className={linkClass}>
          <BookOpen size={20} />
          <span>Food Diary</span>
        </NavLink>

        <NavLink to="/chat" className={linkClass}>
          <MessageSquare size={20} />
          <span>AI Chat</span>
        </NavLink>
        <NavLink to="/history" className={linkClass}>
  <HistoryIcon size={20} />
  <span>History</span>
</NavLink>
        

        <NavLink to="/profile" className={linkClass}>
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}