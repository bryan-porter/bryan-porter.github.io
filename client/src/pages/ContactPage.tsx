import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ContactMessage {
  from: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    from: "",
    subject: "",
    message: "",
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from || !formData.subject || !formData.message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Create mailto link for static deployment
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(`From: ${formData.from}\n\n${formData.message}`);
    const mailtoLink = `mailto:jpgrigor@usc.edu?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
    
    toast({
      title: "Opening your email client...",
      description: "The message has been prepared. Please send it from your email client.",
    });
    
    setFormData({ from: "", subject: "", message: "" });
  };

  const handleReset = () => {
    setFormData({ from: "", subject: "", message: "" });
  };

  return (
    <div className="space-y-6" data-testid="contact-page">
      <section className="ascii-border p-6 relative z-0">
        <div className="pt-4 pb-2">
          <div className="mb-4">
            <span className="text-terminal-amber">C:\BLOG\CONTACT{'>'}</span>
            <span className="ml-2 terminal-glow">MAIL.EXE</span>
          </div>
          
          <div className="space-y-4">
            <div className="terminal-glow text-lg font-bold">GET IN TOUCH</div>
            
            <div className="text-terminal-green-dim space-y-2">
              <p>Reach out if want to talk health, AI,</p>
              <p>or just say hi. </p>
            </div>

            {/* Contact Form */}
            <div className="mt-6 space-y-4">
              <div className="text-terminal-amber">┌─ MESSAGE COMPOSITION ─┐</div>
              <form onSubmit={handleSubmit} className="space-y-3 ml-2">
                <div>
                  <label className="block text-sm text-terminal-green">To: bryan@bryan-porter.com</label>
                </div>
                <div>
                  <label className="block text-sm text-terminal-green mb-1">From:</label>
                  <input 
                    type="email"
                    value={formData.from}
                    onChange={(e) => setFormData(prev => ({ ...prev, from: e.target.value }))}
                    placeholder="bryan@bryan-porter.com"
                    className="w-full bg-terminal-bg border border-terminal-green p-2 text-terminal-green font-mono text-sm focus:outline-none focus:border-terminal-green-bright"
                    data-testid="email-input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-terminal-green mb-1">Subject:</label>
                  <input 
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter subject line"
                    className="w-full bg-terminal-bg border border-terminal-green p-2 text-terminal-green font-mono text-sm focus:outline-none focus:border-terminal-green-bright"
                    data-testid="subject-input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-terminal-green mb-1">Message:</label>
                  <textarea 
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Type your message here..."
                    className="w-full bg-terminal-bg border border-terminal-green p-2 text-terminal-green font-mono text-sm focus:outline-none focus:border-terminal-green-bright resize-none"
                    data-testid="message-textarea"
                  />
                </div>
                <div className="flex space-x-4">
                  <button 
                    type="submit"
                    className="border border-terminal-green px-6 py-2 hover:bg-terminal-green hover:text-terminal-bg transition-colors"
                    data-testid="send-button"
                  >
                    <span className="text-terminal-amber">[F2]</span> SEND
                  </button>
                  <button 
                    type="button"
                    onClick={handleReset}
                    className="border border-terminal-green-dim px-6 py-2 hover:bg-terminal-green-dim hover:text-terminal-bg transition-colors"
                    data-testid="clear-button"
                  >
                    <span className="text-terminal-amber">[ESC]</span> CLEAR
                  </button>
                </div>
              </form>
            </div>

            {/* Direct Contact */}
            <div className="mt-6 border-t border-terminal-green-dim pt-4">
              <div className="text-sm">
                <p className="text-terminal-green">Alternative contact methods:</p>
                <div className="ml-4 mt-2 space-y-1 text-terminal-green-dim">
                  <p>• Email: <a href="mailto:bryan@bryan-porter.com" className="text-terminal-green hover:text-terminal-green-bright">bryan@bryan-porter.com</a></p>
                  <p>• LinkedIn: <a href="https://www.linkedin.com/in/bryandporter/" className="text-terminal-green hover:text-terminal-green-bright">linkedin.com/in/bryandporter/</a></p>
                  <p>• GitHub: <a href="https://github.com/bryan-porter" className="text-terminal-green hover:text-terminal-green-bright">github.com/bryan-porter</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
