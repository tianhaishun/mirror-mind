import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Twitter, Mail, Layers, BookOpen } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
  } | { username: string }[];
}

// 模拟项目数据 (后续可接入数据库)
const PROJECTS = [
  {
    id: 1,
    title: "Neon Horizon",
    description: "一个基于 WebGL 的赛博朋克城市生成器，探索光影与代码的边界。",
    tags: ["WebGL", "Three.js", "React"],
    link: "#"
  },
  {
    id: 2,
    title: "Void Editor",
    description: "极简主义 Markdown 编辑器，专注于写作时的沉浸体验。",
    tags: ["Electron", "TypeScript", "Rust"],
    link: "#"
  },
  {
    id: 3,
    title: "Echo UI",
    description: "一套受包豪斯主义启发的设计系统，强调几何与功能的统一。",
    tags: ["Design System", "Figma", "CSS"],
    link: "#"
  }
];

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
        .order('created_at', { ascending: false })
        .limit(6); // 限制显示数量

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts((data as unknown as Post[]) || []);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen text-mirror-text-secondary/50 font-sans tracking-widest uppercase text-sm animate-pulse">Loading Lens...</div>;

  return (
    <div className="space-y-24 pb-20 animate-fade-in">
      
      {/* 1. 个人信息模块 - Hero Section */}
      <section className="relative py-12 md:py-20 border-b border-mirror-border/10">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-mirror-text-secondary uppercase tracking-widest">Available for work</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-mirror-text-primary mb-8 leading-[0.9]">
            Visual<br/>Thinking.
          </h1>
          <p className="text-xl md:text-2xl text-mirror-text-secondary max-w-2xl font-light leading-relaxed mb-10">
            我是 <span className="text-mirror-text-primary font-medium">Justin</span>，一名游走在代码与像素之间的数字工匠。
            我热衷于通过技术构建具有 <span className="text-mirror-text-primary/80 italic font-serif">电影感</span> 的交互体验，捕捉数字时代的思维碎片。
          </p>
          
          <div className="flex space-x-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors">
              <Github size={24} strokeWidth={1.5} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors">
              <Twitter size={24} strokeWidth={1.5} />
            </a>
            <a href="mailto:hello@example.com" className="text-mirror-text-secondary hover:text-mirror-text-primary transition-colors">
              <Mail size={24} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. 项目展示模块 - Projects */}
      <section className="space-y-10">
        <div className="flex items-end justify-between">
          <h2 className="text-sm font-mono text-mirror-text-secondary uppercase tracking-widest flex items-center space-x-2">
            <Layers size={14} />
            <span>Selected Works</span>
          </h2>
          <span className="h-px flex-1 bg-mirror-border/10 mx-6"></span>
          <Link to="/projects" className="text-xs text-mirror-text-secondary hover:text-mirror-text-primary transition-colors uppercase tracking-widest">View All</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              className="group relative h-[400px] bg-mirror-surface/40 rounded-sm overflow-hidden border border-mirror-border/10 hover:border-mirror-border/30 transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mirror-base/90 z-10"></div>
              <div className="absolute inset-0 bg-mirror-text-primary/5 group-hover:bg-mirror-text-primary/10 transition-colors duration-500"></div>
              
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider border border-mirror-border/20 text-mirror-text-primary/60 rounded-full bg-mirror-base/20 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-mirror-text-primary mb-2 group-hover:translate-x-2 transition-transform duration-500">{project.title}</h3>
                <p className="text-mirror-text-secondary/80 text-sm line-clamp-2 mb-6">{project.description}</p>
                <div className="w-8 h-8 rounded-full border border-mirror-border/20 flex items-center justify-center text-mirror-text-secondary group-hover:bg-mirror-text-primary group-hover:text-mirror-base group-hover:border-transparent transition-all duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 文章列表模块 - Articles */}
      <section className="space-y-10">
        <div className="flex items-end justify-between">
          <h2 className="text-sm font-mono text-mirror-text-secondary uppercase tracking-widest flex items-center space-x-2">
            <BookOpen size={14} />
            <span>Latest Thoughts</span>
          </h2>
          <span className="h-px flex-1 bg-mirror-border/10 mx-6"></span>
          <Link to="/articles" className="text-xs text-mirror-text-secondary hover:text-mirror-text-primary transition-colors uppercase tracking-widest">Archive</Link>
        </div>

        <div className="grid gap-4">
          {posts.map((post, index) => (
            <Link 
              to={`/post/${post.id}`} 
              key={post.id}
              className="group flex flex-col md:flex-row items-baseline justify-between py-6 border-b border-mirror-border/5 hover:bg-mirror-text-primary/[0.02] transition-colors duration-300 px-4 -mx-4 rounded-lg"
            >
              <div className="md:w-1/4 mb-2 md:mb-0">
                <span className="font-mono text-xs text-mirror-text-secondary group-hover:text-mirror-text-primary transition-colors">
                  {new Date(post.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                </span>
              </div>
              <div className="md:w-1/2 mb-2 md:mb-0">
                <h3 className="text-xl font-medium text-mirror-text-primary/90 group-hover:text-mirror-text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-mirror-text-secondary/60 text-sm mt-2 line-clamp-1 font-light">
                  {post.content.substring(0, 100)}...
                </p>
              </div>
              <div className="md:w-1/4 flex justify-end">
                <span className="text-xs text-mirror-text-secondary/40 group-hover:text-mirror-text-primary/80 transition-colors flex items-center space-x-1 uppercase tracking-widest">
                  <span>Read</span>
                  <ArrowUpRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}