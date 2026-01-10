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
      // 翻译常见 Supabase 错误信息
      let errorMessage = authError.message;
      if (errorMessage.includes('User already registered')) {
        errorMessage = '该邮箱已被注册，请直接登录。';
      } else if (errorMessage.includes('Password should be at least')) {
        errorMessage = '密码长度至少需要 6 位字符。';
      } else if (errorMessage.includes('invalid login credentials')) {
        errorMessage = '邮箱或密码格式不正确。';
      }
      
      setError(errorMessage);
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
        // RLS 策略错误通常是因为用户已存在但触发器没处理好，或者策略不允许插入
        // 这里做一个友好提示
        if (profileError.message.includes('row-level security policy')) {
           // 可能是重复注册导致的冲突，或者策略问题。
           // 如果用户注册成功了，资料没写入，其实也可以登录。
           console.warn('Profile creation warning:', profileError);
           alert('账号创建成功，但个人资料初始化遇到一点小问题。您可以尝试直接登录。');
           navigate('/login');
        } else {
           setError('账号创建成功，但个人资料设置失败: ' + profileError.message);
        }
      } else {
        alert('注册成功！请检查您的邮箱以验证账号。');
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
            className="w-full bg-mirror-text-primary text-mirror-base font-medium py-3 rounded-none border border-mirror-border hover:bg-transparent hover:text-mirror-text-primary transition-all duration-500 tracking-widest uppercase text-sm disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'JOIN NETWORK'}
          </button>
          <div className="text-center text-sm text-mirror-text-secondary">
            已有账号？ <Link to="/login" className="text-mirror-text-primary hover:underline decoration-1 underline-offset-4">直接登录</Link>
          </div>
        </form>
      </div>
    </div>
  );
}