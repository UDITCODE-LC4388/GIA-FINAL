import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Verification from "./pages/Verification";
import NetworkGraph from "./pages/NetworkGraph";
import Heatmap from "./pages/Heatmap";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/network" element={<NetworkGraph />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/optimizer" element={<PlaceholderPage title="Scheme Optimizer" subtitle="AI-powered scheme allocation optimization engine" />} />
          <Route path="/certificates" element={<PlaceholderPage title="Audit Certificates" subtitle="Generated verification certificates and compliance documents" />} />
          <Route path="/logs" element={<PlaceholderPage title="System Logs" subtitle="Audit trail of all system activities and officer actions" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
