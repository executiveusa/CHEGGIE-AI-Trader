import { Suspense, lazy, useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
const TradingDashboard = lazy(() => import('./pages/TradingDashboard'));

const AdminFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
    Loading Cheggie admin console…
  </div>
);

// Protected route for dashboard - requires auth or demo session
const DashboardProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAdminAuth();
  
  // Also check localStorage for demo session
  const storedSession = localStorage.getItem('cheggie-admin-session-v1');
  const hasSession = !!user || !!storedSession;
  
  if (loading) {
    return <AdminFallback />;
  }
  
  if (!hasSession) {
    return <Navigate to="/auth" replace />;
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

// First-run language modal wrapper
const FirstRunLanguageCheck = ({ children }: { children: React.ReactNode }) => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('languageSelected');
    // Only show modal on home page if language not selected
    if (!hasSelectedLanguage && location.pathname === '/') {
      setShowLanguageModal(true);
    }
  }, [location.pathname]);

  // If on language page or modal is dismissed, render children
  if (location.pathname === '/language') {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {showLanguageModal && (
        <Navigate to="/language" state={{ returnTo: location.pathname }} replace />
      )}
    </>
  );
};

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    {/* PUBLIC ROUTES - / is now HOME */}
    <Route path="/" element={<Index />} />
    <Route path="/language" element={<LanguageSelection />} />
    <Route path="/auth" element={<Auth />} />
    
    {/* Legacy redirect from /home to / */}
    <Route path="/home" element={<Navigate to="/" replace />} />
    
    {/* PROTECTED ROUTES */}
    <Route 
      path="/dashboard" 
      element={
        <DashboardProtectedRoute>
          <Dashboard />
        </DashboardProtectedRoute>
      } 
    />
    <Route 
      path="/dashboard/trading" 
      element={
        <Suspense fallback={<AdminFallback />}>
          <TradingDashboard />
        </Suspense>
      } 
    />
    <Route path="/agents" element={<AgentsConsole />} />
    
    {/* ADMIN ROUTES */}
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
