import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SimulationProvider } from "@/contexts/SimulationContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import FleetMonitor from "./pages/FleetMonitor";
import Predictions from "./pages/Predictions";
import Appointments from "./pages/Appointments";
import AgentActivity from "./pages/AgentActivity";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="ivc-theme">
      <SimulationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/fleet" element={<FleetMonitor />} />
                <Route path="/predictions" element={<Predictions />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/agents" element={<AgentActivity />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </TooltipProvider>
      </SimulationProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
