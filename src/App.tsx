import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import FisherDashboard from "./pages/FisherDashboard";
import Auth from "./pages/Auth";
import ThumbnailAuth from "./pages/ThumbnailAuth";
import ThumbnailGenerator from "./pages/ThumbnailGenerator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/dashboard" element={<FisherDashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/thumbnail-auth" element={<ThumbnailAuth />} />
          <Route path="/thumbnail-generator" element={<ThumbnailGenerator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
