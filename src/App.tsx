import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import PostDetail from '@/pages/PostDetail';
import CreatePost from '@/pages/CreatePost';
import EditPost from '@/pages/EditPost';
import Profile from '@/pages/Profile';
import Projects from '@/pages/Projects';
import Articles from '@/pages/Articles';
import ProtectedRoute from '@/components/ProtectedRoute';
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
            
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Full Screen Editor Routes (No Layout) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/post/new" element={<CreatePost />} />
            <Route path="/post/:id/edit" element={<EditPost />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;