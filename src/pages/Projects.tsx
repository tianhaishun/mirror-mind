import { ArrowUpRight } from 'lucide-react';

// 模拟项目数据 (这里复用 Home 的数据，实际开发中可以抽离到单独的数据文件或数据库)
const PROJECTS = [
  {
    id: 1,
    title: "Neon Horizon",
    description: "一个基于 WebGL 的赛博朋克城市生成器，探索光影与代码的边界。",
    tags: ["WebGL", "Three.js", "React"],
    image: "bg-gradient-to-br from-purple-900 to-blue-900"
  },
  {
    id: 2,
    title: "Void Editor",
    description: "极简主义 Markdown 编辑器，专注于写作时的沉浸体验。",
    tags: ["Electron", "TypeScript", "Rust"],
    image: "bg-gradient-to-br from-gray-900 to-black"
  },
  {
    id: 3,
    title: "Echo UI",
    description: "一套受包豪斯主义启发的设计系统，强调几何与功能的统一。",
    tags: ["Design System", "Figma", "CSS"],
    image: "bg-gradient-to-br from-orange-900 to-red-900"
  },
  {
    id: 4,
    title: "Data Pulse",
    description: "实时数据可视化大屏，捕捉信息的流动。",
    tags: ["D3.js", "Vue", "WebSocket"],
    image: "bg-gradient-to-br from-green-900 to-teal-900"
  }
];

export default function Projects() {
  return (
    <div className="space-y-12 animate-fade-in">
      <header className="space-y-4">
        <h1 className="title-medium text-mirror-text-primary">Selected Works</h1>
        <p className="text-mirror-text-secondary text-lg font-light max-w-2xl">
          探索代码与艺术的交汇点。这里展示了我的一些个人项目和实验性作品。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id}
            className="group relative h-[400px] bg-mirror-surface/50 rounded-lg overflow-hidden border border-mirror-border/10 hover:border-mirror-border/30 transition-all duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* 模拟封面图 */}
            <div className={`absolute inset-0 ${project.image} opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000 ease-out`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-mirror-base via-mirror-base/50 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider border border-mirror-border/20 text-mirror-text-primary/60 rounded-full bg-mirror-base/20 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-3xl font-bold text-mirror-text-primary mb-3">{project.title}</h2>
                <p className="text-mirror-text-secondary/80 line-clamp-2 mb-6 max-w-md group-hover:text-mirror-text-primary/90 transition-colors">
                  {project.description}
                </p>
                
                <a href="#" className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest text-mirror-text-primary hover:text-mirror-accent transition-colors">
                  <span>View Project</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}