import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Send, Save, Loader2 } from 'lucide-react';

export default function Editor() {
  const { id } = useParams();
  const isEditing = !!id;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(isEditing); // Initial loading state
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  // Fetch post data if editing
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
      }
      setLoading(false);
    }

    if (isEditing) {
      fetchPost();
    }
  }, [id, user, navigate, isEditing]);

  const handleSubmit = async (publish: boolean) => {
    if (!user || !title.trim()) return;
    setSaving(true);

    const postData = {
      title,
      content,
      is_published: publish,
      user_id: user.id,
      updated_at: new Date().toISOString() // Always update timestamp
    };

    let error;

    if (isEditing) {
      const { error: updateError } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('posts')
        .insert([postData]);
      error = insertError;
    }

    if (error) {
      alert('Error: ' + error.message);
    } else {
      // Navigate to home or the post detail
      // For simplicity, go to home or the new post. 
      // If we inserted, we don't have the ID unless we select it back.
      // Let's just go to home for now as per original CreatePost logic.
      // Or maybe go to profile? Home is fine.
      navigate('/');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-mirror-base text-mirror-text-secondary">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mirror-base text-mirror-text-primary animate-fade-in flex flex-col">
      {/* Zen Header */}
      <header className="fixed top-0 left-0 right-0 h-16 px-6 flex justify-between items-center z-50 bg-mirror-base/80 backdrop-blur-sm border-b border-mirror-border/5">
        <button 
          onClick={() => navigate(-1)} 
          className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors flex items-center space-x-2 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest hidden md:inline">Back</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <span className="text-xs text-mirror-text-secondary font-mono">
            {content.length} words
          </span>
          <div className="h-4 w-px bg-mirror-border/20"></div>
          
          <button
            onClick={() => handleSubmit(false)}
            disabled={saving}
            className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors p-2"
            title="Save Draft"
          >
            <Save size={20} />
          </button>
          
          <button
            onClick={() => handleSubmit(true)}
            disabled={saving}
            className="bg-mirror-text-primary text-mirror-base px-6 py-2 rounded-none font-medium text-sm hover:opacity-90 transition-opacity flex items-center space-x-2 uppercase tracking-wider"
          >
            <span>{saving ? 'Processing...' : (publish => publish ? 'Publish' : 'Update')(true)}</span>
            <Send size={14} />
          </button>
        </div>
      </header>

      {/* Zen Workspace */}
      <main className="flex-1 w-full max-w-3xl mx-auto pt-32 pb-32 px-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="w-full bg-transparent text-5xl md:text-6xl font-bold placeholder-mirror-text-secondary/20 border-none outline-none mb-12 text-mirror-text-primary"
          autoFocus
        />
        
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="w-full bg-transparent text-xl leading-relaxed placeholder-mirror-text-secondary/20 border-none outline-none resize-none overflow-hidden min-h-[60vh] text-mirror-text-primary/90"
        />
      </main>
    </div>
  );
}
