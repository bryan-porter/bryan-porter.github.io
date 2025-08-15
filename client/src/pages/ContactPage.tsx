import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { InsertContactMessage } from "@shared/schema";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    from: "",
    subject: "",
    message: "",
  });
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const sendMessageMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ from: "", subject: "", message: "" });
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from || !formData.subject || !formData.message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    sendMessageMutation.mutate(formData);
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
              <p>Reach out if you'd like to see my full resume, demos for my startup,</p>
              <p>or anything in between. I'm always looking for new opportunities for</p>
              <p>internships, projects, and more - whether you have an inquiry or just</p>
              <p>want to connect, I'm quick to respond!</p>
            </div>

            {/* Contact Form */}
            <div className="mt-6 space-y-4">
              <div className="text-terminal-amber">┌─ MESSAGE COMPOSITION ─┐</div>
              <form onSubmit={handleSubmit} className="space-y-3 ml-2">
                <div>
                  <label className="block text-sm text-terminal-green">To: jpgrigor@usc.edu</label>
                </div>
                <div>
                  <label className="block text-sm text-terminal-green mb-1">From:</label>
                  <input 
                    type="email"
                    value={formData.from}
                    onChange={(e) => setFormData(prev => ({ ...prev, from: e.target.value }))}
                    placeholder="your.email@domain.com"
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
                    disabled={sendMessageMutation.isPending}
                    className="border border-terminal-green px-6 py-2 hover:bg-terminal-green hover:text-terminal-bg transition-colors disabled:opacity-50"
                    data-testid="send-button"
                  >
                    <span className="text-terminal-amber">[F2]</span> {sendMessageMutation.isPending ? 'SENDING...' : 'SEND'}
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
                  <p>• Email: <a href="mailto:jpgrigor@usc.edu" className="text-terminal-green hover:text-terminal-green-bright">jpgrigor@usc.edu</a></p>
                  <p>• LinkedIn: <a href="https://linkedin.com/in/jakegrigorian" className="text-terminal-green hover:text-terminal-green-bright">linkedin.com/in/jakegrigorian</a></p>
                  <p>• GitHub: <a href="https://github.com/jgrigorian23" className="text-terminal-green hover:text-terminal-green-bright">github.com/jgrigorian23</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
