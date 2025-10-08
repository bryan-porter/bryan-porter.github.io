import { type BlogPost, type InsertBlogPost, type Project, type InsertProject, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;

  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;

  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private blogPosts: Map<string, BlogPost>;
  private projects: Map<string, Project>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.blogPosts = new Map();
    this.projects = new Map();
    this.contactMessages = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample blog posts
    const post1: BlogPost = {
      id: randomUUID(),
      title: "Building Quantitative Models for Sneaker Price Prediction",
      slug: "building-quantitative-models",
      content: "How I built a linear regression model that predicts sneaker prices with 97.6% accuracy using Python and quantitative strategies...",
      excerpt: "How I built a linear regression model that predicts sneaker prices with 97.6% accuracy using Python and quantitative strategies.",
      tags: ["PYTHON", "MACHINE-LEARNING", "QUANTITATIVE"],
      publishedAt: new Date("2024-12-15T14:30:00"),
      isPublished: true,
      fileSize: "2,048 bytes"
    };

    const post2: BlogPost = {
      id: randomUUID(),
      title: "My Caltech Research Journey in Computational Astrophysics",
      slug: "caltech-research-journey",
      content: "My experience publishing papers in computational astrophysics and building brown dwarf simulation software at Caltech...",
      excerpt: "My experience publishing papers in computational astrophysics and building brown dwarf simulation software at Caltech.",
      tags: ["RESEARCH", "ASTROPHYSICS", "PYTHON", "CALTECH"],
      publishedAt: new Date("2024-12-10T09:15:00"),
      isPublished: true,
      fileSize: "3,072 bytes"
    };

    const post3: BlogPost = {
      id: randomUUID(),
      title: "Fullstack Development Tips from Startup Experience",
      slug: "fullstack-development-tips",
      content: "Lessons learned from building fullstack applications with React.js, Next.js, and PostgreSQL at USC and during my startup journey...",
      excerpt: "Lessons learned from building fullstack applications with React.js, Next.js, and PostgreSQL at USC and during my startup journey.",
      tags: ["REACT", "NEXTJS", "POSTGRESQL", "STARTUP"],
      publishedAt: new Date("2024-12-05T16:45:00"),
      isPublished: true,
      fileSize: "1,536 bytes"
    };

    this.blogPosts.set(post1.id, post1);
    this.blogPosts.set(post2.id, post2);
    this.blogPosts.set(post3.id, post3);

    // Sample projects
    const project1: Project = {
      id: randomUUID(),
      title: "Quantitative Shoe Price Predictor",
      description: "A linear regression model with 5 indicators that uses quantitative strategies to predict sneaker prices with 97.6% accuracy",
      techStack: "Python - Jupyter Notebook",
      githubUrl: "https://github.com/jgrigorian23/sneaker-quant-price",
      liveUrl: null,
      featured: true
    };

    const project2: Project = {
      id: randomUUID(),
      title: "Caltech Brown Dwarf Simulation Code",
      description: "Research software that simulates non-planetary brown dwarfs by returning references to age, mass, and temperature",
      techStack: "Python - Github",
      githubUrl: "https://github.com/jgrigorian23/Brown-Dwarf-Simulation-Code",
      liveUrl: null,
      featured: true
    };

    const project3: Project = {
      id: randomUUID(),
      title: "The Shield Literary Magazine",
      description: "Official website for The Shield Literary Magazine that includes Poetry, Nonfiction, Fiction, Art, Photography, Film and Music",
      techStack: "Go - HTML/CSS - Heroku",
      githubUrl: null,
      liveUrl: "https://the-shield.herokuapp.com/",
      featured: true
    };

    this.projects.set(project1.id, project1);
    this.projects.set(project2.id, project2);
    this.projects.set(project3.id, project3);
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.isPublished)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = {
      ...insertPost,
      id,
      publishedAt: new Date(),
      tags: insertPost.tags || [],
      isPublished: insertPost.isPublished !== undefined ? insertPost.isPublished : true,
      fileSize: insertPost.fileSize || "1,024 bytes",
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return undefined;

    const updatedPost = { ...existingPost, ...updateData };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.featured);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id,
      githubUrl: insertProject.githubUrl || null,
      liveUrl: insertProject.liveUrl || null,
      featured: insertProject.featured !== undefined ? insertProject.featured : false,
    };
    this.projects.set(id, project);
    return project;
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      isRead: false,
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const message = this.contactMessages.get(id);
    if (!message) return false;
    
    message.isRead = true;
    this.contactMessages.set(id, message);
    return true;
  }
}

export const storage = new MemStorage();
