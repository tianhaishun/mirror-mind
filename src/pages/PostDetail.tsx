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

  if (loading) return <div className="flex justify-center items-center h-[50vh] text-white/50 font-sans animate-pulse">加载中...</div>;
  if (!post) return <div className="text-center text-white/50 mt-20">未找到文章</div>;

  const isAuthor = user?.id === post.user_id;

  return (
    <article className="max-w-3xl mx-auto animate-fade-in">
      <header className="mb-12 text-center">
        <div className="flex justify-center items-center space-x-2 text-mirror-text-secondary text-sm mb-6 tracking-wide uppercase">
          <span className="font-medium text-mirror-text-primary">
            {Array.isArray(post.profiles) ? post.profiles[0]?.username : post.profiles?.username}
          </span>
          <span className="w-1 h-1 bg-white/30 rounded-full"></span>
          <span>{new Date(post.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-mirror-text-primary leading-tight tracking-tight">
          {post.title}
        </h1>

        {isAuthor && (
          <div className="flex justify-center space-x-4">
            <Link
              to={`/post/${post.id}/edit`}
              className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white transition-all"
            >
              <Edit size={16} />
              <span>编辑</span>
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full text-sm transition-all"
            >
              <Trash2 size={16} />
              <span>删除</span>
            </button>
          </div>
        )}
      </header>
      
      <div className="glass-panel p-8 md:p-12 rounded-3xl">
        <div className="prose prose-invert max-w-none prose-lg prose-p:leading-relaxed prose-headings:font-bold prose-a:text-blue-400">
          {post.content.split('\n').map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}