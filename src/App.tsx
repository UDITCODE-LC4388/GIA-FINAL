import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Verification from "./pages/Verification";
import NetworkGraph from "./pages/NetworkGraph";
import Heatmap from "./pages/Heatmap";
import SchemeOptimizer from "./pages/SchemeOptimizer";
import AuditCertificates from "./pages/AuditCertificates";
import SystemLogs from "./pages/SystemLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
      }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/network" element={<NetworkGraph />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/optimizer" element={<SchemeOptimizer />} />
          <Route path="/certificates" element={<AuditCertificates />} />
          <Route path="/logs" element={<SystemLogs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
