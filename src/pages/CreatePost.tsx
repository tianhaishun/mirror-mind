import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);

    const { error } = await supabase
      .from('posts')
      .insert([
        { 
          title, 
          content, 
          is_published: isPublished,
          user_id: user.id 
        }
      ]);

    if (error) {
      alert('Error creating post: ' + error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="title-medium text-gradient mb-8">开始创作</h1>
      <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-8 rounded-3xl">
        <div>
          <label className="block text-sm font-medium text-mirror-text-secondary mb-2">标题</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all text-lg"
            placeholder="输入文章标题..."
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
            placeholder="在此处撰写您的想法..."
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
            立即发布
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-white/90 disabled:opacity-50 transition-all duration-300 transform active:scale-[0.98]"
        >
          {loading ? '发布中...' : '发布文章'}
        </button>
      </form>
    </div>
  );
}