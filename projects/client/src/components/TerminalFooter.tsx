export default function TerminalFooter() {
  return (
    <footer className="border-t border-terminal-green p-4 mt-8" data-testid="terminal-footer">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="text-terminal-amber">BLOG.SYS</span>
            <span className="text-terminal-green-dim ml-2">Ready</span>
          </div>
          <div className="text-terminal-green-dim">
            Website Built by Bryan Porter
          </div>
        </div>
      </div>
    </footer>
  );
}
