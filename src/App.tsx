import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import PostDetail from '@/pages/PostDetail';
import Editor from '@/pages/Editor';
import Profile from '@/pages/Profile';
import Projects from '@/pages/Projects';
import Articles from '@/pages/Articles';
import ProtectedRoute from '@/components/ProtectedRoute';
import Health from '@/pages/Health';
import { AuthProvider } from '@/hooks/useAuth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Main Layout Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/health" element={<Health />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Full Screen Editor Routes (No Layout) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/post/new" element={<Editor />} />
            <Route path="/post/:id/edit" element={<Editor />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
