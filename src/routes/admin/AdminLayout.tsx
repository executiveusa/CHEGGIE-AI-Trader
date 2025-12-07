import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const ADMIN_TABS = [
  { value: 'assistant', label: 'Assistant' },
  { value: 'computer-use', label: 'Computer-Use' },
  { value: 'agents', label: 'Agents' },
  { value: 'reviews', label: 'Reviews' },
  { value: 'logs', label: 'Logs' },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();
  const [tabValue, setTabValue] = useState('assistant');

  useEffect(() => {
    if (!user) {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const currentSegment = useMemo(() => {
    const [, , maybeTab] = location.pathname.split('/');
    return maybeTab ?? 'assistant';
  }, [location.pathname]);

  useEffect(() => {
    setTabValue(currentSegment);
  }, [currentSegment]);

  const initials = user?.email?.[0]?.toUpperCase() ?? '?';

  const handleTabChange = (value: string) => {
    setTabValue(value);
    navigate(`/admin/${value}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <div className="flex items-center gap-3">
              <Badge className="bg-emerald-500/20 text-emerald-200">Cheggie Admin</Badge>
              <span className="text-xl font-semibold">Agent Orchestration Dashboard</span>
            </div>
            <p className="mt-1 text-sm text-white/60">
              Manage Flowise loops, Always-On assistant, and Gemini Computer-Use operations with operator approvals.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <Avatar className="h-9 w-9 border border-emerald-400/50">
                <AvatarFallback className="bg-emerald-500/20 text-emerald-200">{initials}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-white">{user.email}</p>
                <p className="text-xs text-white/60">Lovable Cloud Authenticated</p>
              </div>
            </div>
            <Button variant="outline" className="border-white/40 text-white" onClick={logout}>
              Sign out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <Tabs value={tabValue} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="flex w-full justify-start overflow-x-auto rounded-2xl bg-white/5 p-1">
            {ADMIN_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-emerald-500/30 data-[state=active]:text-white"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator className="border-white/10" />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <Outlet />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminLayout;
