export default function AboutPage() {
  return (
    <div className="space-y-6" data-testid="about-page">
      <section className="ascii-border p-6 relative z-0">
        <div className="pt-4 pb-2">
          <div className="mb-4">
            <span className="text-terminal-amber">C:\BLOG\ABOUT{'>'}</span>
            <span className="ml-2 terminal-glow">TYPE biography.txt</span>
          </div>
          <div className="space-y-3 text-sm leading-relaxed">
            <div className="terminal-glow text-lg font-bold mb-4">PERSONAL INFORMATION FILE</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-terminal-amber">┌─ BACKGROUND ─┐</div>
                <div className="ml-2 space-y-1 text-terminal-green-dim">
                  <p>• Started coding at age 7 with Hour of Code</p>
                  <p>• First project: Music player on Scratch</p>
                  <p>• Currently pursuing B.S. in Computer Science at USC</p>
                  <p>• Incoming SDE Intern @ Amazon (Summer 2025)</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-terminal-amber">┌─ ACHIEVEMENTS ─┐</div>
                <div className="ml-2 space-y-1 text-terminal-green-dim">
                  <p>• Published 2 papers @ Caltech</p>
                  <p>• Co-founded data analytics startup</p>
                  <p>• USC & Armenian National Lacrosse Teams</p>
                  <p>• Computational astrophysics research</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-terminal-amber">┌─ TECHNICAL SKILLS ─┐</div>
              <div className="ml-2 mt-2 grid grid-cols-3 gap-4 text-terminal-green-dim">
                <div>
                  <p className="text-terminal-green">Languages:</p>
                  <p>• Python</p>
                  <p>• TypeScript</p>
                  <p>• JavaScript</p>
                  <p>• C++</p>
                  <p>• Java</p>
                  <p>• SQL</p>
                </div>
                <div>
                  <p className="text-terminal-green">Frameworks:</p>
                  <p>• React.js</p>
                  <p>• Next.js</p>
                  <p>• PostgreSQL</p>
                  <p>• Jupyter Notebook</p>
                </div>
                <div>
                  <p className="text-terminal-green">Interests:</p>
                  <p>• Quantitative Development</p>
                  <p>• Research Software</p>
                  <p>• Fullstack Development</p>
                  <p>• Machine Learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
