import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      // 2. Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { id: authData.user.id, username, avatar_url: '' }
        ]);

      if (profileError) {
        setError('Account created but profile setup failed: ' + profileError.message);
      } else {
        alert('Registration successful! Please check your email to verify your account.');
        navigate('/login');
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 animate-fade-in">
      <div className="glass-panel p-8 rounded-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-mirror-text-primary tracking-tight">创建账号</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          {error && <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-mirror-text-secondary mb-2">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-mirror-card-bg border border-mirror-border/20 rounded-xl px-4 py-3 text-mirror-text-primary placeholder-mirror-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="怎么称呼你？"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-mirror-text-secondary mb-2">电子邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-mirror-card-bg border border-mirror-border/20 rounded-xl px-4 py-3 text-mirror-text-primary placeholder-mirror-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
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
              minLength={6}
              className="w-full bg-mirror-card-bg border border-mirror-border/20 rounded-xl px-4 py-3 text-mirror-text-primary placeholder-mirror-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="至少6位字符"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-mirror-accent text-white font-semibold py-3 rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-blue-500/20"
          >
            {loading ? '注册中...' : '立即注册'}
          </button>
          <div className="text-center text-sm text-mirror-text-secondary">
            已有账号？ <Link to="/login" className="text-mirror-text-primary hover:underline decoration-1 underline-offset-4">直接登录</Link>
          </div>
        </form>
      </div>
    </div>
  );
}