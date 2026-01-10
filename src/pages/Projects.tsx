import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  tags: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-[50vh] text-mirror-text-secondary font-sans animate-pulse">加载中...</div>;

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="space-y-4">
        <h1 className="title-medium text-mirror-text-primary">Selected Works</h1>
        <p className="text-mirror-text-secondary text-lg font-light max-w-2xl">
          探索代码与艺术的交汇点。这里展示了我的一些个人项目和实验性作品。
        </p>
      </header>

      {projects.length === 0 ? (
         <div className="text-mirror-text-secondary text-center py-20 border border-mirror-border/10 rounded-lg bg-mirror-surface/30">
           <p>暂无项目展示</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="group relative h-[400px] bg-mirror-surface/50 rounded-none overflow-hidden border border-mirror-border/10 hover:border-mirror-border/30 transition-all duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* 封面图 */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000 ease-out"
                style={{ backgroundImage: `url(${project.image_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-mirror-base via-mirror-base/50 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.tags?.map(tag => (
                      <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider border border-mirror-border/20 text-mirror-text-primary/60 rounded-full bg-mirror-base/20 backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-mirror-text-primary mb-3">{project.title}</h2>
                  <p className="text-mirror-text-secondary/80 line-clamp-2 mb-6 max-w-md group-hover:text-mirror-text-primary/90 transition-colors">
                    {project.description}
                  </p>
                  
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest text-mirror-text-primary hover:text-mirror-accent transition-colors">
                      <span>View Project</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}