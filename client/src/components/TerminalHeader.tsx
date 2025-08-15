import { Link, useLocation } from "wouter";
import { useTerminal } from "@/hooks/useTerminal";

export default function TerminalHeader() {
  const { currentTime } = useTerminal();
  const [location] = useLocation();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  return (
    <header className="border-b border-terminal-green p-4" data-testid="terminal-header">
      <div className="max-w-6xl mx-auto">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-terminal-amber">█</span>
            <span className="terminal-glow text-lg">TERMINAL BLOG </span>
            <span className="text-terminal-amber">█</span>
          </div>
          <div className="text-sm" data-testid="current-time">
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* DOS-style Navigation */}
        <nav className="space-y-1" data-testid="dos-navigation">
          <div className="text-sm">
            <span className="text-terminal-amber">C:\BLOG{'>'}</span>
            <span className="ml-2">Available commands:</span>
          </div>
          <div className="ml-8 space-y-1 text-sm">
            <div>
              <Link href="/" data-testid="nav-home">
                <button className="hover:text-terminal-green-bright transition-colors">
                  <span className="text-terminal-amber">DIR</span> /home - List recent posts
                </button>
              </Link>
            </div>
            <div>
              <Link href="/about" data-testid="nav-about">
                <button className="hover:text-terminal-green-bright transition-colors">
                  <span className="text-terminal-amber">TYPE</span> about.txt - Display information
                </button>
              </Link>
            </div>
            <div>
              <Link href="/projects" data-testid="nav-projects">
                <button className="hover:text-terminal-green-bright transition-colors">
                  <span className="text-terminal-amber">DIR</span> /projects - View project files
                </button>
              </Link>
            </div>
            <div>
              <Link href="/contact" data-testid="nav-contact">
                <button className="hover:text-terminal-green-bright transition-colors">
                  <span className="text-terminal-amber">MAIL</span> contact.exe - Send message
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
