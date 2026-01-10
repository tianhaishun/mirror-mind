import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        navigate('/');
      } else {
        if (user?.id !== data.user_id) {
          navigate('/'); // Not authorized
          return;
        }
        setTitle(data.title);
        setContent(data.content);
        setIsPublished(data.is_published);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('posts')
      .update({ 
        title, 
        content, 
        is_published: isPublished,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      alert('Error updating post: ' + error.message);
    } else {
      navigate(`/post/${id}`);
    }
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center items-center h-[50vh] text-white/50 font-sans animate-pulse">加载中...</div>;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="title-medium text-gradient mb-8">编辑文章</h1>
      <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-8 rounded-3xl">
        <div>
          <label className="block text-sm font-medium text-mirror-text-secondary mb-2">标题</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-mirror-text-secondary mb-2">内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={12}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none leading-relaxed"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-5 w-5 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0 transition-all"
          />
          <label htmlFor="publish" className="ml-3 block text-sm text-mirror-text-primary font-medium cursor-pointer select-none">
            已发布
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-white/90 disabled:opacity-50 transition-all duration-300 transform active:scale-[0.98]"
        >
          {saving ? '保存中...' : '更新文章'}
        </button>
      </form>
    </div>
  );
}