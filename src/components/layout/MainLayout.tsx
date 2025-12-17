import { ReactNode, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(280);

  // Listen for sidebar collapse
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setSidebarWidth(sidebar.clientWidth);
      }
    });

    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['style'] });
      setSidebarWidth(sidebar.clientWidth);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <motion.div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Header />
        <main className="p-6">
          {children}
        </main>
      </motion.div>
    </div>
  );
}
