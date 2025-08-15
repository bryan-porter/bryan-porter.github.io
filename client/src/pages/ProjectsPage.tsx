import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";

export default function ProjectsPage() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects/featured'],
  });

  if (isLoading) {
    return (
      <div className="space-y-6" data-testid="projects-loading">
        <div className="text-terminal-green-dim">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="projects-page">
      <section className="space-y-4">
        <div className="mb-4">
          <span className="text-terminal-amber">C:\BLOG\PROJECTS{'>'}</span>
          <span className="ml-2">DIR /s</span>
        </div>
        
        {/* Work Experience */}
        <div className="ascii-border p-6 relative z-0">
          <div className="pt-4 pb-2">
            <div className="terminal-glow text-lg font-bold mb-4">WORK EXPERIENCE</div>
            
            <div className="space-y-4">
              <div className="border border-terminal-green-dim p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-terminal-amber font-bold">Amazon</h3>
                    <p className="text-terminal-green">Incoming SDE Intern</p>
                  </div>
                  <div className="text-right text-sm text-terminal-green-dim">
                    <p>May 2025 - Aug 2025</p>
                    <p>Seattle, WA</p>
                  </div>
                </div>
                <p className="text-terminal-green-dim">• Summer 2025 Software Development Internship</p>
                <p className="text-terminal-green-dim">• Team assignment TBD</p>
              </div>

              <div className="border border-terminal-green-dim p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-terminal-amber font-bold">Caltech</h3>
                    <p className="text-terminal-green">Research Assistant</p>
                  </div>
                  <div className="text-right text-sm text-terminal-green-dim">
                    <p>Research Period</p>
                    <p>Computational Astrophysics</p>
                  </div>
                </div>
                <p className="text-terminal-green-dim">• Published 2 papers in computational astrophysics</p>
                <p className="text-terminal-green-dim">• Developed brown dwarf simulation software</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="ascii-border p-6 relative z-0">
          <div className="pt-4 pb-2">
            <div className="terminal-glow text-lg font-bold mb-4">FEATURED PROJECTS</div>
            
            <div className="space-y-4">
              {projects?.map((project) => (
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
