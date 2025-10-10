# Bryan Porter - Personal Website

This repository hosts my personal website at [bryan-porter.github.io](https://bryan-porter.github.io), featuring a Jekyll blog with the Scriptor theme at the root and a retro terminal portfolio under `/projects`.

## 🏗️ Site Structure

```
bryan-porter.github.io/
├── _config.yml              # Jekyll configuration
├── _data/                   # Data files (author info, social links)
├── _layouts/                # Page layouts from Scriptor theme
│   ├── default.html
│   ├── post.html
│   └── page.html
├── _includes/               # Reusable components
├── _posts/                  # Blog posts (Markdown)
│   └── YYYY-MM-DD-title.md
├── _sass/                   # SCSS stylesheets
├── assets/                  # Static assets (CSS, JS, images)
├── images/                  # Theme and content images
├── projects/                # Retro terminal portfolio (separate React app)
│   ├── index.html
│   ├── client/
│   ├── assets/
│   └── ...
├── index.html               # Blog homepage
├── about.md                 # About page
├── tags.md                  # Tags archive
├── CNAME                    # Custom domain
├── Gemfile                  # Ruby dependencies
└── README.md               # This file
```

## 🎯 Two Sites in One

### 1. Scriptor Blog (Root `/`)
A minimal, clean blog using the [Scriptor Jekyll theme](https://github.com/JustGoodThemes/Scriptor-Jekyll-Theme) featuring:
- Responsive, mobile-first design
- Beautiful typography and clean layout
- Tag-based post organization
- RSS feed support
- Social sharing
- SEO optimization

### 2. Retro Terminal Portfolio (`/projects`)
A nostalgic DOS-style terminal interface featuring:
- Boot screen animation
- CRT screen effects with scanlines
- Functional DOS command interface
- Interactive project showcase
- Contact form

## 📝 Writing Blog Posts

Create new blog posts in the `_posts/` directory following this naming convention:

```
YYYY-MM-DD-post-title.md
```

Example post structure:

```markdown
---
layout: post
title: "Your Post Title"
description: A brief description for SEO
date: 2025-01-15 10:00:00 -0800
feature_image: images/your-image.jpg
tags: [tag1, tag2]
---

Your opening paragraph here. This will show in the excerpt.

<!--more-->

The rest of your post content goes here...
```

## 🖼️ Image Optimization

For optimal website performance, compress images before adding them to the site:

**Recommended tools**:
- **[Squoosh](https://squoosh.app/editor)** - Image compression
  - Web-based image compression tool
  - Supports multiple formats (WebP, JPEG, PNG, etc.)
  - Adjustable quality settings
  - Side-by-side comparison

- **[iLoveIMG](https://www.iloveimg.com/crop-image)** - Image cropping
  - Easy-to-use crop tool
  - Batch processing support
  - Maintains image quality

## 🎨 Customization

### Site Configuration

Edit `_config.yml` to customize:
- Site title and description
- URL and baseurl
- Navigation menu items
- Accent color
- Social links
- Disqus comments
- Google Analytics
- Footer content

### Author Information

Update `_data/author.json` with your information:
```json
{
  "name": "Your Name",
  "bio": "Your bio here",
  "url": "https://yoursite.com",
  "location": "Your Location",
  "image": "images/author.png"
}
```

### Navigation

The navigation is configured in `_config.yml`:
```yaml
navigation:
  - text: Home
    url: /
  - text: About
    url: /about/
  - text: Projects
    url: /projects/
  - text: Tags
    url: /tags/
```

### Styling

The Scriptor theme uses Sass for styling. Main files:
- `_sass/`: Theme SCSS files
- `assets/css/style.scss`: Main stylesheet
- Customize colors via `accent_color` in `_config.yml`

## 🚀 Local Development

### Prerequisites
- Ruby 2.7 or higher
- Bundler gem
- Jekyll 4.0

### Running Locally

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Serve the site:
   ```bash
   bundle exec jekyll serve
   ```

3. Visit `http://localhost:4000`

The site will auto-reload when you make changes.

### Building for Production

```bash
bundle exec jekyll build
```

Built files will be in `_site/` directory.

## 📦 Deployment

This site is automatically deployed to GitHub Pages when you push to the `main` branch:

1. Make your changes
2. Commit and push to `main`
3. GitHub Pages will build and deploy automatically

The site will be available at `https://bryan-porter.github.io`

### Custom Domain

The `CNAME` file configures a custom domain. To use your own:
1. Update the `CNAME` file with your domain
2. Configure your DNS provider to point to GitHub Pages
3. Update `url` in `_config.yml`

## 🔧 Jekyll Configuration

This site uses:
- **Jekyll version**: 4.0.x
- **Theme**: Scriptor (included in repo, not gem-based)
- **Plugins**:
  - jekyll-paginate (for post pagination)
  - jekyll-sitemap (automatically enabled by GitHub Pages)

## 📁 Projects Directory

The `/projects` directory contains a separate React-based retro terminal portfolio. It's built with:
- React + TypeScript
- Vite
- Tailwind CSS
- Custom DOS-style components

This subdirectory is accessible at `https://bryan-porter.github.io/projects`

## 🎯 Navigation Between Sites

Users can easily navigate between the blog and terminal portfolio:
- **From Blog → Projects**: Click "Projects" in the navigation
- **From Projects → Blog**: The terminal can link back to the main site

## 📚 Resources

- [Scriptor Theme Documentation](https://github.com/JustGoodThemes/Scriptor-Jekyll-Theme)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 📄 License

MIT License - feel free to use this as a template for your own site!

The Scriptor theme is created by [JustGoodThemes](https://www.justgoodthemes.com) and is also MIT licensed.

---

Built with ❤️ using Jekyll, Scriptor theme, and GitHub Pages
