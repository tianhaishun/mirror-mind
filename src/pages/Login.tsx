import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 animate-fade-in">
      <div className="glass-panel p-8 rounded-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-mirror-text-primary tracking-tight">欢迎回来</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-mirror-text-secondary mb-2">电子邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-mirror-card-bg border border-mirror-border/20 rounded-xl px-4 py-3 text-mirror-text-primary placeholder-mirror-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-mirror-text-secondary mb-2">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-mirror-card-bg border border-mirror-border/20 rounded-xl px-4 py-3 text-mirror-text-primary placeholder-mirror-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-mirror-text-primary text-mirror-base font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all duration-300 transform active:scale-[0.98]"
          >
            {loading ? '登录中...' : '登录'}
          </button>
          <div className="text-center text-sm text-mirror-text-secondary">
            还没有账号？ <Link to="/register" className="text-mirror-text-primary hover:underline decoration-1 underline-offset-4">立即注册</Link>
          </div>
        </form>
      </div>
    </div>
  );
}