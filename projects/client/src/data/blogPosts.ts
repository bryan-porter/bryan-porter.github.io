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
    title: "Minimum effective dose",
    slug: "if you learn nothing else...",
    content:
      "Sleep, exercise, nutrition, and emotional care serve as the scaffolding  of health and happiness",
    excerpt: "Habits for maximizing health.",
    tags: ["SLEEP", "EXERCISE", "NUTRITION", "MENTALS"],
    publishedAt: "2025-08-15T14:30:00",
    isPublished: true,
    fileSize: "208 bytes",
  },
  {
    id: "2",
    title: "Exercise for health and output",
    slug: "a hybrid approach to strength and endurance",
    content:
      "You can only be excellent in 3 things: most people woudl choose family, work, and one more thing: pick that thing wisely.",
    excerpt:
    "You can only be excellent in 3 things: most people woudl choose family, work, and one more thing: pick that thing wisely.",
    tags: ["EXERCISE", "STRENGTH", "ENDURANCE", "HYBRID"],
    publishedAt: "2025-08-15T14:30:00",
    isPublished: true,
    fileSize: "5,082 bytes",
  },
  {
    id: "3",
    title: "Sleep as a service to your brain and body",
    slug: "nothing works if sleep is off",
    content:
      "Free and legal performance enhancer, consistent sleep will move the needle immediately.",
    excerpt:
      "Stanford basketball team was asked to stay in bed for 10 hours for 5-7 weeks >> increased sleep by 80 mins to 8.5 hours, saw 9 ppt improvement in free throw and 3 point accuracy.",
    tags: ["REACT", "NEXTJS", "POSTGRESQL", "STARTUP"],
    publishedAt: "2024-12-05T16:45:00",
    isPublished: true,
    fileSize: "2,193 bytes",
  },
];
