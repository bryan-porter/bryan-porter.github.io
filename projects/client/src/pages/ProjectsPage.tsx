import { projects, type Project } from "@/data/projects";

export default function ProjectsPage() {
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="space-y-6" data-testid="projects-page">
      <section className="space-y-4">
        <div className="mb-4">
          <span className="text-terminal-amber">C:\BLOG\PROJECTS{'>'}</span>
          <span className="ml-2">DIR /s</span>
        </div>
        
        {/* Featured Projects */}
        <div className="ascii-border p-6 relative z-0">
          <div className="pt-4 pb-2">
            <div className="terminal-glow text-lg font-bold mb-4">FEATURED PROJECTS</div>
            
            <div className="space-y-4">
              {featuredProjects?.map((project) => (
                <div 
                  key={project.id}
                  className="border border-terminal-green-dim p-4 hover:bg-terminal-dark-green transition-colors"
                  data-testid={`project-${project.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-terminal-amber">📁</span>
                      <h3 className="terminal-glow font-bold">{project.title}</h3>
                    </div>
                    <div className="flex space-x-2">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-terminal-green-dim hover:text-terminal-green text-sm"
                          data-testid={`github-link-${project.id}`}
                        >
                          [VIEW ON GITHUB]
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-terminal-green-dim hover:text-terminal-green text-sm"
                          data-testid={`live-link-${project.id}`}
                        >
                          [VIEW LIVE SITE]
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-terminal-green-dim mb-2">
                    {project.description}
                  </p>
                  <div className="text-xs">
                    <span className="text-terminal-amber">Tech Stack:</span>
                    <span className="text-terminal-green-dim"> {project.techStack}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
