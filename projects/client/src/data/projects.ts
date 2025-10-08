export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Endurance manual",
    description: "Science and practical guides on building fitness to move fast through the mountains",
    techStack: "paperback, audiobook",
    Url: "https://uphillathlete.com/product/training-for-the-uphill-athlete-book/",
    liveUrl: "https://uphillathlete.com/product/training-for-the-uphill-athlete-book/",
    featured: true
  },
  {
    id: "2",
    title: "Core workout",
    description: "Very good workout for core",
    techStack: "youtube",
    Url: "https://www.youtube.com/watch?v=IKqpbU1Y3bU",
    liveUrl: "https://www.youtube.com/watch?v=IKqpbU1Y3bU",
    featured: true
  }
];