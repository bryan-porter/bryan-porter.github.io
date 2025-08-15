import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export function useTerminal() {
  const [isBooting, setIsBooting] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-finish boot after 3 seconds or on any key press
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 3000);

    const handleKeyPress = () => {
      setIsBooting(false);
      clearTimeout(bootTimer);
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      clearTimeout(bootTimer);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!isBooting) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBooting]);

  useEffect(() => {
    if (!isBooting) {
      const handleKeyDown = (e: KeyboardEvent) => {
        // ESC key - go to home
        if (e.key === 'Escape') {
          setLocation('/');
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowRight') {
          const pages = ['/', '/about', '/projects', '/contact'];
          const currentIndex = pages.indexOf(window.location.pathname);
          const nextIndex = (currentIndex + 1) % pages.length;
          setLocation(pages[nextIndex]);
        }
        
        if (e.key === 'ArrowLeft') {
          const pages = ['/', '/about', '/projects', '/contact'];
          const currentIndex = pages.indexOf(window.location.pathname);
          const prevIndex = (currentIndex - 1 + pages.length) % pages.length;
          setLocation(pages[prevIndex]);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isBooting, setLocation]);

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    switch(cmd) {
      case 'help':
        return 'Available commands: dir, type [filename], search, cls, exit\nExample: type building-quantitative-models.md';
      case 'dir':
        setLocation('/');
        return 'Navigating to home directory...';
      case 'type about.txt':
        setLocation('/about');
        return 'Loading about.txt...';
      case 'type projects.txt':
        setLocation('/projects');
        return 'Loading projects.txt...';
      case 'mail':
        setLocation('/contact');
        return 'Starting mail program...';
      case 'cls':
        return 'clear';
      case 'exit':
        return 'Be brave and kind!';
      default:
        // Check if it's a blog post command
        if (cmd.startsWith('type ') && cmd.endsWith('.md')) {
          const filename = cmd.substring(5, cmd.length - 3); // Remove 'type ' and '.md'
          setLocation(`/post/${filename}`);
          return `Opening ${filename}.md...`;
        }
        return `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
    }
  };

  return {
    isBooting,
    currentTime,
    processCommand,
    setIsBooting,
  };
}
