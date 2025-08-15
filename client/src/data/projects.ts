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
    title: "Quantitative Shoe Price Predictor",
    description: "A linear regression model with 5 indicators that uses quantitative strategies to predict sneaker prices with 97.6% accuracy",
    techStack: "Python - Jupyter Notebook",
    githubUrl: "https://github.com/jgrigorian23/sneaker-quant-price",
    liveUrl: null,
    featured: true
  },
  {
    id: "2",
    title: "Caltech Brown Dwarf Simulation Code",
    description: "Research software that simulates non-planetary brown dwarfs by returning references to age, mass, and temperature",
    techStack: "Python - Github",
    githubUrl: "https://github.com/jgrigorian23/Brown-Dwarf-Simulation-Code",
    liveUrl: null,
    featured: true
  },
  {
    id: "3",
    title: "The Shield Literary Magazine",
    description: "Official website for The Shield Literary Magazine that includes Poetry, Nonfiction, Fiction, Art, Photography, Film and Music",
    techStack: "Go - HTML/CSS - Heroku",
    githubUrl: null,
    liveUrl: "https://the-shield.herokuapp.com/",
    featured: true
  }
];