import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AgentsConsole from "./pages/AgentsConsole";
import LanguageSelection from "./pages/LanguageSelection";
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import './i18n/config';

const AdminLogin = lazy(() => import('./routes/admin/login'));
const AdminLayout = lazy(() => import('./routes/admin/AdminLayout'));
const AdminAssistant = lazy(() => import('./routes/admin/assistant'));
const AdminComputerUse = lazy(() => import('./routes/admin/computer-use'));
const AdminAgents = lazy(() => import('./routes/admin/agents'));
const AdminReviews = lazy(() => import('./routes/admin/reviews'));
const AdminLogs = lazy(() => import('./routes/admin/logs'));

const AdminFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
    Loading Cheggie admin console…
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const hasSelectedLanguage = localStorage.getItem('languageSelected');

  if (!hasSelectedLanguage) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAdminAuth();
  if (!user) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
};

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LanguageSelection />} />
    <Route
      path="/home"
      element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      }
    />
    <Route path="/auth" element={<Auth />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/agents" element={<AgentsConsole />} />
    <Route
      path="/admin"
      element={
        <Suspense fallback={<AdminFallback />}>
          <AdminLogin />
        </Suspense>
      }
    />
    <Route
      path="/admin/*"
      element={
        <Suspense fallback={<AdminFallback />}>
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        </Suspense>
      }
    >
      <Route index element={<Navigate to="assistant" replace />} />
      <Route
        path="assistant"
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminAssistant />
          </Suspense>
        }
      />
      <Route
        path="computer-use"
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminComputerUse />
          </Suspense>
        }
      />
      <Route
        path="agents"
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminAgents />
          </Suspense>
        }
      />
      <Route
        path="reviews"
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminReviews />
          </Suspense>
        }
      />
      <Route
        path="logs"
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminLogs />
          </Suspense>
        }
      />
    </Route>
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
