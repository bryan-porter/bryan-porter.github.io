import { useState } from "react";
import { useTerminal } from "@/hooks/useTerminal";

export default function CommandLine() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const { processCommand } = useTerminal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const result = processCommand(command);
    
    if (result === 'clear') {
      setOutput([]);
    } else {
      setOutput(prev => [...prev, `C:\\BLOG> ${command}`, result]);
    }
    
    setCommand("");
  };

  return (
    <section className="border-t border-terminal-green pt-4" data-testid="command-line">
      {output.length > 0 && (
        <div className="mb-4 space-y-1 text-sm text-terminal-green-dim">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="text-sm">
          <span className="text-terminal-amber">C:\BLOG{'>'}</span>
          <input 
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command (type 'help' for available commands)"
            className="ml-2 bg-transparent border-none outline-none text-terminal-green w-96 font-mono"
            data-testid="command-input"
          />
          <span className="animate-blink">_</span>
        </div>
        <div className="text-xs text-terminal-green-dim ml-8">
          Available: help, dir, type [filename], search [term], cls, exit
        </div>
      </form>
    </section>
  );
}
