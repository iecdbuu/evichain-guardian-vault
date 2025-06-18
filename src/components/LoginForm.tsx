
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onLogin: (username: string, password: string) => boolean;
  dummyUsers: Array<{
    username: string;
    password: string;
    role: string;
    evidenceKeys: string[];
  }>;
}

const LoginForm = ({ onLogin, dummyUsers }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      const success = onLogin(username, password);
      if (success) {
        toast({
          title: "Access Granted",
          description: "Welcome to EVICHAIN Evidence Management System",
        });
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid credentials. Please check your username and password.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (demoUser: typeof dummyUsers[0]) => {
    setUsername(demoUser.username);
    setPassword(demoUser.password);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-forensic-green">Secure</span>{' '}
            <span className="text-white">Access</span>
          </h2>
          <p className="text-gray-300">
            Enter your credentials to access the evidence management system
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Login Form */}
          <Card className="evidence-card">
            <CardHeader>
              <CardTitle className="text-center text-forensic-green flex items-center justify-center gap-2">
                <div className="w-6 h-6 bg-forensic-green rounded-full flex items-center justify-center">
                  <span className="text-black text-xs">🔐</span>
                </div>
                Authentication Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-forensic-green font-semibold">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-forensic-gray border-forensic-green/30 text-white focus:border-forensic-green"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-forensic-green font-semibold">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-forensic-gray border-forensic-green/30 text-white focus:border-forensic-green"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-forensic-green hover:bg-forensic-green/80 text-black font-bold py-3 transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Authenticating...
                    </div>
                  ) : (
                    'Access System'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Secured by blockchain encryption
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="evidence-card">
            <CardHeader>
              <CardTitle className="text-center text-forensic-blue flex items-center justify-center gap-2">
                <div className="w-6 h-6 bg-forensic-blue rounded-full flex items-center justify-center">
                  <span className="text-black text-xs">👤</span>
                </div>
                Demo Credentials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300 text-sm text-center mb-6">
                  Click on any demo user to auto-fill the login form
                </p>
                
                {dummyUsers.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => handleDemoLogin(user)}
                    className="bg-forensic-gray/50 border border-forensic-blue/30 p-4 rounded-md cursor-pointer hover:bg-forensic-blue/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-forensic-blue font-semibold">{user.role}</span>
                      <div className="w-2 h-2 bg-forensic-green rounded-full"></div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-gray-400">Username:</span>
                        <span className="text-white ml-2 font-mono">{user.username}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Password:</span>
                        <span className="text-white ml-2 font-mono">{user.password}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
                  <p className="text-yellow-400 text-xs text-center">
                    ⚠️ These are demo credentials for testing purposes only
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
