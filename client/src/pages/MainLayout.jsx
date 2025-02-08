import { useState, useEffect, useMemo, useCallback } from "react";
import { Outlet } from "react-router-dom";
import WarningDesktopOnly from "../components/WarningDesktopOnly";
import Sidebar from "../components/SidebarComponent";

export default function MainLayout() {
  const isDesktopInitial = useMemo(() => window.innerWidth >= 1024, []);
  const [isDesktop, setIsDesktop] = useState(isDesktopInitial);

  const handleResize = useCallback(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  if (!isDesktop) return <WarningDesktopOnly />;

  return (
    <div className="min-h-screen flex overflow-hidden">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
