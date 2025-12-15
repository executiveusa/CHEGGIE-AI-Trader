import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Mail, Lock, User, Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAdminAuth } from '@/context/AdminAuthContext';

// Demo mode flag - set to true for easy access
const DEMO_MODE = true;

export default function Auth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, error: authError } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    // Store demo session
    const demoUser = { email: 'demo@cheggie.ai', metadata: { role: 'demo' } };
    localStorage.setItem('cheggie-admin-session-v1', JSON.stringify(demoUser));
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (DEMO_MODE) {
      // In demo mode, any credentials work
      const demoUser = { email: email || 'user@cheggie.ai', metadata: { role: 'user' } };
      localStorage.setItem('cheggie-admin-session-v1', JSON.stringify(demoUser));
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
      navigate('/dashboard');
      return;
    }

    // Real auth via Flowwise
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (DEMO_MODE) {
      // In demo mode, sign up immediately logs in
      const demoUser = { email: email || 'newuser@cheggie.ai', metadata: { role: 'user' } };
      localStorage.setItem('cheggie-admin-session-v1', JSON.stringify(demoUser));
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
      navigate('/dashboard');
      return;
    }

    // TODO: Implement real sign up
    setTimeout(() => {
      setIsLoading(false);
      setError('Sign up is not yet available. Please use demo login.');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.1),transparent_50%)]" />
      
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"
      />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-lg shadow-lg shadow-emerald-500/20">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Cheggie AI
            </span>
          </Link>
          <div className="absolute top-0 right-0">
            <LanguageSwitcher />
          </div>
        </div>

        <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
          {/* Demo Login Banner */}
          {DEMO_MODE && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Button
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
              >
                <Zap className="mr-2 h-5 w-5" />
                {isLoading ? 'Logging in...' : 'Quick Demo Login'}
              </Button>
              <p className="text-center text-sm text-slate-500 mt-2">
                Click above to instantly access the dashboard
              </p>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900 text-slate-500">or sign in with email</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Alert */}
          {(error || authError) && (
            <Alert className="mb-4 border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">
                {error || authError}
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5">
              <TabsTrigger value="signin" className="data-[state=active]:bg-white/10">{t('nav.login')}</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white/10">{t('nav.signup')}</TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin" className="text-slate-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      id="email-signin"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-signin" className="text-slate-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      id="password-signin"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link to="/reset-password" className="text-sm text-emerald-400 hover:text-emerald-300">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : t('nav.login')}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-signup" className="text-slate-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-signup" className="text-slate-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      id="password-signup"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>

                <Button
                  type="submit"
                  className="w-full h-12 bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : t('nav.signup')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center mt-6 text-sm text-slate-500">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
}
