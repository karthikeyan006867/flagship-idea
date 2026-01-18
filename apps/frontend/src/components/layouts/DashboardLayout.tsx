import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "@components/ui/Sidebar";
import Header from "@components/ui/Header";
import CommandPalette from "@components/ui/CommandPalette";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette />
    </div>
  );
}
