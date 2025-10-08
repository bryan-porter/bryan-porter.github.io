import { useLocation, useRoute } from "wouter";
import { useEffect } from "react";
import { blogPosts, type BlogPost } from "@/data/blogPosts";

export default function BlogPostPage() {
  const [, params] = useRoute("/post/:slug");
  const [location, setLocation] = useLocation();
  
  const post = blogPosts.find(p => p.slug === params?.slug);

  // Add keyboard shortcuts for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLocation('/');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setLocation]);
  
  if (!post) {
    return (
      <div className="space-y-6" data-testid="post-not-found">
        <section className="ascii-border p-6 relative z-0">
          <div className="pt-4 pb-2">
            <div className="mb-4">
              <span className="text-terminal-amber">C:\BLOG\POSTS{'>'}</span>
              <span className="ml-2 terminal-glow">TYPE {params?.slug}.md</span>
            </div>
            <div className="space-y-4 text-sm">
              <div className="text-terminal-amber">FILE NOT FOUND</div>
              <div className="text-terminal-green-dim">
                <p>The specified blog post does not exist.</p>
                <p>Use "DIR" command to list available posts.</p>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => window.history.back()}
                  className="border border-terminal-green px-4 py-2 hover:bg-terminal-green hover:text-terminal-bg transition-colors"
                  data-testid="back-button"
                >
                  <span className="text-terminal-amber">[ESC]</span> Back to Directory
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="blog-post-page">
      {/* File Header */}
      <section className="border-b border-terminal-green pb-4">
        <div className="mb-4">
          <span className="text-terminal-amber">C:\BLOG\POSTS{'>'}</span>
          <span className="ml-2 terminal-glow">TYPE {post.slug}.md</span>
        </div>
        <div className="text-sm space-y-1 text-terminal-green-dim">
          <div>Loading file: {post.slug}.md</div>
          <div>File size: {post.fileSize}</div>
          <div>Last modified: {new Date(post.publishedAt).toLocaleDateString()}</div>
          <div>Status: Published</div>
        </div>
      </section>

      {/* Blog Post Content */}
      <article className="ascii-border p-6 relative z-0">
        <div className="pt-4 pb-2">
          {/* Post Header */}
          <header className="mb-6 border-b border-terminal-green-dim pb-4">
            <div className="text-sm text-terminal-green-dim mb-2">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <h1 className="text-xl terminal-glow font-bold mb-3">{post.title}</h1>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs border border-terminal-green-dim px-2 py-1 text-terminal-amber"
                >
                  [{tag}]
                </span>
              ))}
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-sm prose-invert max-w-none">
            <div className="text-terminal-green-dim leading-relaxed space-y-4">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-sm">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Post Footer */}
          <footer className="mt-8 border-t border-terminal-green-dim pt-4">
            <div className="text-xs text-terminal-green-dim space-y-1">
              <div>EOF - End of File</div>
              <div>Words: ~{post.content.split(' ').length}</div>
              <div>Characters: {post.content.length}</div>
            </div>
          </footer>
        </div>
      </article>

      {/* Navigation */}
      <section className="flex justify-between items-center">
        <button 
          onClick={() => window.history.back()}
          className="border border-terminal-green px-6 py-2 hover:bg-terminal-green hover:text-terminal-bg transition-colors"
          data-testid="back-button"
        >
          <span className="text-terminal-amber">[ESC]</span> Back to Directory
        </button>
        
        <div className="text-sm text-terminal-green-dim">
          <span>Press </span>
          <span className="text-terminal-amber">[HOME]</span>
          <span> for main directory</span>
        </div>
      </section>

      {/* Related Files */}
      <section className="border-t border-terminal-green-dim pt-4">
        <div className="mb-2">
          <span className="text-terminal-amber">C:\BLOG\POSTS{'>'}</span>
          <span className="ml-2">DIR *.md /related</span>
        </div>
        <div className="text-sm space-y-1">
          <div className="text-terminal-green-dim">Other blog posts in directory:</div>
          <div className="ml-4 space-y-1">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map(relatedPost => (
                <div key={relatedPost.id}>
                  <button
                    onClick={() => window.location.href = `/post/${relatedPost.slug}`}
                    className="text-terminal-green hover:text-terminal-green-bright transition-colors"
                    data-testid={`related-post-${relatedPost.id}`}
                  >
                    {relatedPost.slug}.md
                  </button>
                  <span className="text-terminal-green-dim ml-4">{relatedPost.fileSize}</span>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}