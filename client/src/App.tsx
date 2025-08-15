import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BootScreen from "@/components/BootScreen";
import TerminalHeader from "@/components/TerminalHeader";
import TerminalFooter from "@/components/TerminalFooter";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";
import { useTerminal } from "@/hooks/useTerminal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isBooting } = useTerminal();

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen crt-screen relative overflow-x-hidden">
        {isBooting ? (
          <BootScreen />
        ) : (
          <div className="min-h-screen relative" data-testid="main-content">
            {/* Scanline effect */}
            <div className="scanline-effect absolute inset-0 pointer-events-none"></div>
            
            <TerminalHeader />
            <main className="max-w-6xl mx-auto p-4">
              <Router />
            </main>
            <TerminalFooter />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export default App;
