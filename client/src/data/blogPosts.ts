export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  isPublished: boolean;
  fileSize: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Quantitative Models for Sneaker Price Prediction",
    slug: "building-quantitative-models",
    content: "How I built a linear regression model that predicts sneaker prices with 97.6% accuracy using Python and quantitative strategies. This project involved collecting data from multiple sneaker marketplaces, implementing feature engineering techniques, and applying machine learning algorithms to achieve high prediction accuracy.",
    excerpt: "How I built a linear regression model that predicts sneaker prices with 97.6% accuracy using Python and quantitative strategies.",
    tags: ["PYTHON", "MACHINE-LEARNING", "QUANTITATIVE"],
    publishedAt: "2024-12-15T14:30:00",
    isPublished: true,
    fileSize: "2,048 bytes"
  },
  {
    id: "2",
    title: "My Caltech Research Journey in Computational Astrophysics",
    slug: "caltech-research-journey",
    content: "My experience publishing papers in computational astrophysics and building brown dwarf simulation software at Caltech. Working with world-class researchers, I developed simulation code that models non-planetary brown dwarfs and contributed to groundbreaking research in the field.",
    excerpt: "My experience publishing papers in computational astrophysics and building brown dwarf simulation software at Caltech.",
    tags: ["RESEARCH", "ASTROPHYSICS", "PYTHON", "CALTECH"],
    publishedAt: "2024-12-10T09:15:00",
    isPublished: true,
    fileSize: "3,072 bytes"
  },
  {
    id: "3",
    title: "Fullstack Development Tips from Startup Experience",
    slug: "fullstack-development-tips",
    content: "Lessons learned from building fullstack applications with React.js, Next.js, and PostgreSQL at USC and during my startup journey. From database design to user interface optimization, here are the key insights I've gained from real-world development experience.",
    excerpt: "Lessons learned from building fullstack applications with React.js, Next.js, and PostgreSQL at USC and during my startup journey.",
    tags: ["REACT", "NEXTJS", "POSTGRESQL", "STARTUP"],
    publishedAt: "2024-12-05T16:45:00",
    isPublished: true,
    fileSize: "1,536 bytes"
  }
];