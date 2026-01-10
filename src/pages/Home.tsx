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

export default function Home() {
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

  if (loading) return <div className="flex justify-center items-center h-[50vh] text-white/50 font-sans animate-pulse">加载中...</div>;

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="py-8 text-center space-y-4">
        <h1 className="title-large text-gradient">
          思想镜像
        </h1>
        <p className="text-mirror-text-secondary text-lg font-light tracking-wide">
          捕捉数字时代的思维碎片
        </p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div 
            key={post.id} 
            className="glass-card group relative p-8 rounded-3xl h-[340px] flex flex-col justify-between animate-slide-up hover:scale-[1.02] transition-all duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div>
              <div className="flex justify-between items-start mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-medium text-mirror-text-secondary tracking-wide">
                  {new Date(post.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </div>
              
              <h2 className="title-medium text-2xl mb-4 text-mirror-text-primary leading-tight line-clamp-2">
                <Link to={`/post/${post.id}`} className="before:absolute before:inset-0">
                  {post.title}
                </Link>
              </h2>
              <p className="text-mirror-text-secondary line-clamp-3 leading-relaxed text-sm">
                {post.content.substring(0, 150)}...
              </p>
            </div>
            
            <div className="pt-6 border-t border-white/5 flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-80"></div>
              <span className="text-xs font-medium text-mirror-text-secondary">
                 {Array.isArray(post.profiles) ? post.profiles[0]?.username : post.profiles?.username || '匿名'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}