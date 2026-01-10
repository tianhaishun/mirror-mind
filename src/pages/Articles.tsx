import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
  } | { username: string }[];
}

export default function Articles() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          created_at,
          profiles (username)
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts((data as unknown as Post[]) || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-[50vh] text-mirror-text-secondary font-sans animate-pulse">加载中...</div>;

  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto">
      <header className="space-y-4 border-b border-mirror-border/10 pb-8">
        <h1 className="title-medium text-mirror-text-primary">All Articles</h1>
        <p className="text-mirror-text-secondary text-lg font-light">
          按时间顺序排列的思维快照。
        </p>
      </header>

      <div className="grid gap-8">
        {posts.map((post, index) => (
          <Link 
            to={`/post/${post.id}`} 
            key={post.id}
            className="group block"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <article className="flex flex-col md:flex-row gap-6 md:items-baseline py-6 border-b border-mirror-border/5 hover:border-mirror-border/20 transition-colors duration-500">
              <div className="md:w-32 shrink-0">
                <time className="font-mono text-sm text-mirror-text-secondary group-hover:text-mirror-text-primary transition-colors">
                  {new Date(post.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                </time>
              </div>
              
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-medium text-mirror-text-primary group-hover:text-mirror-accent transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-mirror-text-secondary line-clamp-2 leading-relaxed">
                  {post.content.substring(0, 200)}...
                </p>
                <div className="flex items-center text-xs text-mirror-text-secondary uppercase tracking-widest pt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>Read Article</span>
                  <ArrowUpRight size={12} className="ml-1" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}