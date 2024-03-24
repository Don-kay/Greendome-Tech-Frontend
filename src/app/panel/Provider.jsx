import React from "react";
import {
  useState,
  useEffect,
  useCallback,
  useContext,
  ReactNode,
  createContext,
} from "react";

import { useRouter } from "next/navigation";

// interface DashboardProviderProps {
//   children: React.ReactNode;
// }

// interface ProviderValues {
//   sidebarOpen?: boolean;
//   openSidebar?: () => void;
//   closeSidebar?: () => void;
// }

// create new context
// const Context = React.createContext<ProviderValues>({});
const Context = createContext();

export function DashboardProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // set the html tag overflow to hidden
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  // close Sidebar on route changes when viewport is less than 1024px
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  // close side navigation when route changes
  useEffect(() => {
    if (sidebarOpen) {
      router.events.on("routeChangeStart", () => setSidebarOpen(false));
    }

    return () => {
      if (sidebarOpen) {
        router.events.off("routeChangeStart", () => setSidebarOpen(false));
      }
    };
  }, [sidebarOpen, router]);

  return (
    <Context.Provider value={{ sidebarOpen, openSidebar, closeSidebar }}>
      {children}
    </Context.Provider>
  );
}

// custom hook to consume all context values { sidebarOpen, openSidebar, closeSidebar }
export function useDashboardContext() {
  return useContext(Context);
}
