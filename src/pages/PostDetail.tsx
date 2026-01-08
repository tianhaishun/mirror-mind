import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Edit, Trash2 } from 'lucide-react';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (username)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      } else {
        setPost(data);
      }
      setLoading(false);
    }

    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting post: ' + error.message);
    } else {
      navigate('/');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  const isAuthor = user?.id === post.user_id;

  return (
    <article className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-500 border-b pb-4">
          <div className="flex items-center space-x-2">
            <span>By {post.profiles?.username}</span>
            <span>•</span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          {isAuthor && (
            <div className="flex space-x-2">
              <Link
                to={`/post/${post.id}/edit`}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit size={20} />
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="prose max-w-none whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}