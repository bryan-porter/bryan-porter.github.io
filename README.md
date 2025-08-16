# Retro Terminal Blog

Throwback to my first computer - a 386 with 5.25 inch floppy dirve running DOS.

## 🖥️ Features

- **Boot Screen Animation**: Authentic DOS-style boot sequence with loading messages
- **Terminal Aesthetics**: CRT screen effects, scanlines, and phosphor green text
- **DOS Command Interface**: Functional command line with keyboard shortcuts
- **Blog Posts**: Directory-style listing of blog posts with file metadata
- **Blog Post Template**: Individual blog post pages with full content display
- **Projects Portfolio**: Featured projects with links to GitHub and live demos
- **Contact Form**: Terminal-styled contact form with mailto integration
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages as a static site.

### Quick Deploy

1. Fork this repository to your GitHub account
2. Go to your repository settings → Pages
3. Set source to "GitHub Actions"
4. Push changes to the `main` branch
5. The site will automatically build and deploy

### Manual Build

To build the static site locally:

```bash
npm ci
cd client
npm run build
```

The built files will be in `dist/public/` and can be served by any static hosting service.

## 🎨 Customization

### Personal Information

Update the content in these files:
- `client/src/data/blogPosts.ts` - Your blog posts
- `client/src/data/projects.ts` - Your projects
- `client/src/pages/AboutPage.tsx` - Your personal information
- `client/src/components/TerminalFooter.tsx` - Footer text

### Styling

The terminal theme can be customized in:
- `client/src/index.css` - Terminal colors and effects
- `tailwind.config.ts` - Color scheme configuration

### Contact Information

Update email addresses in:
- `client/src/pages/ContactPage.tsx` - Contact form destination
- Replace `jpgrigor@usc.edu` with your email

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom terminal theme
- **Components**: Shadcn/ui + Radix UI primitives  
- **Routing**: Wouter (lightweight client-side routing)
- **Build**: Vite with GitHub Actions deployment
- **Hosting**: GitHub Pages (static hosting)

## 📁 Project Structure

```
├── client/src/
│   ├── components/     # Reusable UI components
│   ├── data/          # Static data files
│   ├── pages/         # Route components
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utility functions
├── .github/workflows/ # GitHub Actions deployment
└── dist/public/       # Built static files
```

## 🎯 DOS Commands

The terminal interface supports these commands:
- `help` - Show available commands
- `dir` - Navigate to home/blog posts
- `type about.txt` - View about page
- `type projects.txt` - View projects page
- `type [filename].md` - Open specific blog post (e.g., `type building-quantitative-models.md`)
- `mail` - Open contact form
- `cls` - Clear command output
- `exit` - Display goodbye message

### Navigation
- Click on any blog post box to open the full article
- Use `ESC` key to go back to home from any page
- Use arrow keys for quick navigation between main pages

## 🔧 Development

For local development:

```bash
npm install
npm run dev
```

This runs the full-stack version with Express server. For static deployment, use the build process above.

## 📝 License

MIT License - feel free to use this template for your own portfolio!

---

