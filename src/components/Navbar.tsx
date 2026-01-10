import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { PenSquare, User, LogOut, Hexagon, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-mirror-border/10 bg-mirror-base/80 backdrop-blur-xl transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <Hexagon className="w-6 h-6 text-mirror-text-primary fill-mirror-text-primary/10 group-hover:rotate-90 transition-transform duration-700 ease-out" />
          <span className="text-lg font-medium tracking-tight text-mirror-text-primary font-sans">
            Mirror<span className="text-mirror-text-secondary/60">Mind</span>
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link 
            to="/projects" 
            className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors duration-300 text-sm font-medium"
          >
            项目
          </Link>
          <Link 
            to="/articles" 
            className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors duration-300 text-sm font-medium"
          >
            文章
          </Link>

          <button
            onClick={toggleTheme}
            className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors duration-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>

          {user ? (
            <>
              <Link
                to="/post/new"
                className="flex items-center space-x-2 text-mirror-text-secondary hover:text-mirror-text-primary transition-colors duration-300 text-sm font-medium"
              >
                <PenSquare size={18} strokeWidth={1.5} />
                <span>创作</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-mirror-text-secondary hover:text-mirror-text-primary transition-colors duration-300 text-sm font-medium"
              >
                <User size={18} strokeWidth={1.5} />
                <span>主页</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-mirror-text-secondary hover:text-red-400 transition-colors duration-300 text-sm font-medium"
              >
                <LogOut size={18} strokeWidth={1.5} />
                <span>退出</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors duration-300 text-sm font-medium"
              >
                登录
              </Link>
              <Link
                to="/register"
                className="bg-mirror-text-primary text-mirror-base px-5 py-1.5 rounded-full hover:bg-mirror-text-primary/90 transition-colors duration-300 text-sm font-medium"
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