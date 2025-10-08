import { blogPosts, type BlogPost } from "@/data/blogPosts";
import { Link } from "wouter";
import CommandLine from "@/components/CommandLine";

export default function HomePage() {
  const posts = blogPosts;

  return (
    <div className="space-y-6" data-testid="home-page">
      {/* Introduction Section */}
      <section className="ascii-border p-6 relative z-0">
        <div className="pt-4 pb-2">
          <div className="mb-4">
            <span className="text-terminal-amber">C:\BLOG\ABOUT{'>'}</span>
            <span className="ml-2 terminal-glow">TYPE readme.txt</span>
          </div>
          <div className="space-y-2 text-sm leading-relaxed">
            <div className="typewriter-text">
              <span className="text-terminal-green-dim">Hi, my name is</span>
            </div>
            <div className="text-2xl terminal-glow font-bold">
              Bryan Porter.
            </div>
            <div className="text-xl text-terminal-green-dim">
              Time to build.
            </div>
            <div className="mt-4 space-y-1 text-terminal-green-dim">
              <p>I'm passionate about health </p>
              <p>and AI. </p>
            </div>
            <div className="mt-4">
              <button 
                className="border border-terminal-green px-4 py-2 hover:bg-terminal-green hover:text-terminal-bg transition-colors"
                data-testid="tell-more-button"
              >
                <span className="text-terminal-amber">[ENTER]</span> Tell me more!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Directory Listing */}
      <section className="space-y-4">
        <div className="mb-4">
          <span className="text-terminal-amber">C:\BLOG\POSTS{'>'}</span>
          <span className="ml-2">DIR /w</span>
        </div>
        <div className="text-sm space-y-1 mb-4">
          <div>Volume in drive C is BLOG</div>
          <div>Volume Serial Number is 1337-BET</div>
          <div>Directory of C:\BLOG\POSTS</div>
          <div></div>
        </div>

        <div className="grid gap-4">
          {posts?.map((post) => (
            <Link key={post.id} href={`/post/${post.slug}`} data-testid={`blog-post-link-${post.id}`}>
              <article 
                className="border border-terminal-green p-4 hover:bg-terminal-dark-green transition-colors cursor-pointer"
                data-testid={`blog-post-${post.id}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm">
                    <span className="text-terminal-amber">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric'
                      })}  {new Date(post.publishedAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      }).toUpperCase()}
                    </span>
                    <span className="ml-4">&lt;DIR&gt;</span>
                    <span className="ml-4 terminal-glow hover:text-terminal-green-bright">{post.slug}.md</span>
                  </div>
                  <span className="text-xs text-terminal-green-dim">{post.fileSize}</span>
                </div>
                <div className="ml-8 text-sm text-terminal-green-dim">
                  <p>{post.excerpt}</p>
                </div>
                <div className="ml-8 mt-2">
                  <span className="text-xs">
                    Tags: {post.tags.map(tag => `[${tag}]`).join(' ')}
                  </span>
                </div>
                <div className="ml-8 mt-2 text-xs text-terminal-amber">
                  Click to open file →
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-sm mt-4">
          <div className="space-y-1">
            <div>{posts?.length || 0} File(s)          {posts?.reduce((total, post) => total + parseInt(post.fileSize.replace(/[^\d]/g, '')), 0) || 0} bytes</div>
            <div>0 Dir(s)   999,999,999 bytes free</div>
          </div>
        </div>
      </section>

      <CommandLine />
    </div>
  );
}
