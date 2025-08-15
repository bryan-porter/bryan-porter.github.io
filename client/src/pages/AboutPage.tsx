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
                  <p>• Be brave</p>
                  <p>• Be kind</p>
                  <p>• Currently cooking an AI startup</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-terminal-amber">┌─ 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
