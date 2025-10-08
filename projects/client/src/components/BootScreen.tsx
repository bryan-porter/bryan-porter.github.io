import { useState, useEffect } from "react";

const bootMessages = [
  'Initializing blog system...',
  'Loading user interface...',
  'Checking file system integrity...',
  'Mounting drives...',
  'Starting network services...',
  'Loading terminal emulator...',
  'System ready.'
];

export default function BootScreen() {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (currentMessageIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages(prev => [...prev, bootMessages[currentMessageIndex]]);
        setCurrentMessageIndex(prev => prev + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-terminal-bg flex flex-col justify-center items-start p-8 animate-boot-fade"
      data-testid="boot-screen"
    >
      <div className="terminal-glow">
        <div className="mb-4">
          <span className="text-terminal-amber">BLOG.SYS v2.1</span><br />
          <span className="text-sm">Copyright (C) 2024 Terminal Systems</span>
        </div>
        
        <div className="space-y-1 text-sm">
          {displayedMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        
        {currentMessageIndex >= bootMessages.length && (
          <div className="mt-4">
            <span>Press any key to continue...</span>
            <span className="animate-blink">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
