import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { validateAdminCredentials } from '@/services/flowwise';

interface AdminUser {
  email: string;
  metadata?: Record<string, unknown>;
}

interface AdminAuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const STORAGE_KEY = 'cheggie-admin-session-v1';

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AdminUser;
        setUser(parsed);
      } catch (err) {
        console.error('Failed to parse stored admin session', err);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const allowedEmails = useMemo(() => {
    const allowList = import.meta.env.ADMIN_ALLOWED_EMAILS || import.meta.env.VITE_ADMIN_ALLOWED_EMAILS;
    if (!allowList) return null;
    return allowList.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await validateAdminCredentials(username, password);
      if (!result.success) {
        setError('Invalid credentials or Flowwise validation failed.');
        setLoading(false);
        return false;
      }

      const normalizedEmail = (result.email || username).toLowerCase();
      if (allowedEmails && !allowedEmails.includes(normalizedEmail)) {
        setError('Email is not authorized for admin access.');
        setLoading(false);
        return false;
      }

      const adminUser: AdminUser = { email: normalizedEmail, metadata: result.metadata };
      setUser(adminUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unknown login error.');
      setLoading(false);
      return false;
    }
  }, [allowedEmails]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error, login, logout],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
