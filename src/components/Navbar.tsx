import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { PenSquare, User, LogOut, Hexagon } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-mirror-border bg-[#000000]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <Hexagon className="w-6 h-6 text-white fill-white/20 group-hover:rotate-90 transition-transform duration-700 ease-out" />
          <span className="text-lg font-medium tracking-tight text-white font-sans">
            Mirror<span className="text-white/40">Mind</span>
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/post/new"
                className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                <PenSquare size={18} strokeWidth={1.5} />
                <span>创作</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                <User size={18} strokeWidth={1.5} />
                <span>主页</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-white/60 hover:text-red-400 transition-colors duration-300 text-sm font-medium"
              >
                <LogOut size={18} strokeWidth={1.5} />
                <span>退出</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                登录
              </Link>
              <Link
                to="/register"
                className="bg-white text-black px-5 py-1.5 rounded-full hover:bg-white/90 transition-colors duration-300 text-sm font-medium"
              >
                注册
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}