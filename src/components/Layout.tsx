import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-mirror-base text-mirror-text-primary selection:bg-white selection:text-black">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}