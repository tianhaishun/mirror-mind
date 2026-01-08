import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import PostDetail from '@/pages/PostDetail';
import CreatePost from '@/pages/CreatePost';
import EditPost from '@/pages/EditPost';
import Profile from '@/pages/Profile';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/hooks/useAuth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<PostDetail />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/post/new" element={<CreatePost />} />
              <Route path="/post/:id/edit" element={<EditPost />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;