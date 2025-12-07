import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminLogin = () => {
  const { login, loading, error, user } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    const success = await login(username.trim(), password);
    if (success) {
      setSuccessMessage('Flowwise validation complete. Redirecting to admin console...');
      setTimeout(() => navigate('/admin/assistant'), 600);
    }
  };

  if (user) {
    navigate('/admin/assistant');
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900/40 px-4 py-12">
      <Card className="w-full max-w-md border-white/10 bg-slate-900/80 backdrop-blur-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-semibold text-white">Admin Command Center</CardTitle>
          <CardDescription className="text-sm text-white/60">
            Authenticate with Lovable Cloud credentials. Flowwise webhook validation ensures secure access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Username or email
              </Label>
              <Input
                id="username"
                placeholder="alex@cheggie.com"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Validating Flowwise Webhook…' : 'Enter Admin Console'}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Login failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {successMessage && !error && (
            <Alert className="mt-4 border-emerald-500/30 bg-emerald-500/10 text-emerald-100">
              <AlertTitle>Access granted</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
