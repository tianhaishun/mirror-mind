import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Send, Save } from 'lucide-react';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动调整 Textarea 高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const handleSubmit = async (publish: boolean) => {
    if (!user || !title.trim()) return;
    setLoading(true);

    const { error } = await supabase
      .from('posts')
      .insert([
        { 
          title, 
          content, 
          is_published: publish,
          user_id: user.id 
        }
      ]);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-mirror-base text-mirror-text-primary animate-fade-in flex flex-col">
      {/* 顶部工具栏 - 极简 */}
      <header className="fixed top-0 left-0 right-0 h-16 px-6 flex justify-between items-center z-50 bg-mirror-base/80 backdrop-blur-sm border-b border-mirror-border/5">
        <button 
          onClick={() => navigate(-1)} 
          className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span className="text-sm uppercase tracking-widest hidden md:inline">Back</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <span className="text-xs text-mirror-text-secondary font-mono">
            {content.length} words
          </span>
          <div className="h-4 w-px bg-mirror-border/20"></div>
          <button
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors p-2"
            title="Save Draft"
          >
            <Save size={20} />
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="bg-mirror-text-primary text-mirror-base px-6 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-opacity flex items-center space-x-2"
          >
            <span>发布</span>
            <Send size={14} />
          </button>
        </div>
      </header>

      {/* 编辑区域 - 居中沉浸 */}
      <main className="flex-1 w-full max-w-3xl mx-auto pt-32 pb-32 px-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="无题"
          className="w-full bg-transparent text-5xl md:text-6xl font-bold placeholder-mirror-text-secondary/20 border-none outline-none mb-12"
          autoFocus
        />
        
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="开始书写..."
          className="w-full bg-transparent text-xl leading-relaxed placeholder-mirror-text-secondary/20 border-none outline-none resize-none overflow-hidden min-h-[60vh]"
        />
      </main>
    </div>
  );
}