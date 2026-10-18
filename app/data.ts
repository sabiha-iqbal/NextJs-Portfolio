export const heroData = {
    name: "Sabiha Malik",
    roles: [
        "Full-Stack Developer",
        "Game Developer",
        "AI Automation Specialist",
        "WordPress Expert"
    ],
    paragraph: "I build performant web applications, interactive games, and AI-driven experiences with a passion for clean code and innovative design.",
    stats: [
        { number: "10+", label: "Projects" },
        { number: "2+", label: "Years" },
        { number: "100%", label: "Passion" },
    ]
};

export const aboutData = {
    title: "About Me",
    paragraph: "I'm a passionate full-stack developer building interactive experiences, games, and AI-driven applications. I combine creativity with solid engineering to deliver delightful products.",
    description: "With professional experience across web and game projects, I specialize in building scalable web applications, indie games, and AI-integrated solutions. I focus on craftsmanship and user experience.",
    interests: [
        { name: "Full-Stack Web", icon: "💻" },
        { name: "Game Dev", icon: "🎮" },
        { name: "AI & ML", icon: "🤖" },
        { name: "Open Source", icon: "🌐" }
    ]
};

export const timeline = [
    {
        year: "2023 - Present",
        title: "Senior Developer",
        company: "Tech Company Inc.",
        description:
            "Leading development of scalable web applications and mentoring junior developers. Implemented performance optimizations resulting in faster page loads.",
    },
    {
        year: "2022 - 2023",
        title: "Full-Stack Developer",
        company: "Creative Studio",
        description:
            "Built interactive web applications with React and Node.js. Developed prototypes and integrations for client projects.",
    },
    {
        year: "2021 - 2022",
        title: "Junior Developer",
        company: "StartUp XYZ",
        description:
            "Started my professional career building frontend components and learning backend development. Contributed to multiple product launches.",
    },
];

export const achievements = [
    {
        title: "10+ Projects",
        desc: "Completed and deployed to production",
        icon: "🚀"
    },
    {
        title: "100+ Users",
        desc: "Active users across projects",
        icon: "👥"
    },
    {
        title: "5-Star Rating",
        desc: "Positive feedback from clients",
        icon: "🌟"
    },
];

export const projects = [
    {
        title: "Game Engine Project",
        category: "Game Development",
        privacy: "Public",
        description: "A custom game engine built with advanced physics, particle systems, and AI pathfinding.",
        tech: ["C++", "Physics", "Graphics"],
        link: "#",
        github: "#",
    },
    {
        title: "AI Chat Application",
        category: "Full-Stack",
        privacy: "Private",
        description: "Real-time chat application with AI integration for smart responses and sentiment analysis.",
        tech: ["Next.js", "Node.js", "AI/ML"],
        link: "#",
        github: "#",
    },
    {
        title: "Portfolio Website",
        category: "Frontend",
        privacy: "Public",
        description: "Animated portfolio showcasing projects with smooth transitions and interactive elements.",
        tech: ["Next.js", "Framer Motion", "Tailwind"],
        link: "#",
        github: "#",
    },
    {
        title: "Data Dashboard",
        category: "Full-Stack",
        privacy: "Private",
        description: "Real-time analytics dashboard with WebSocket integration and D3.js visualizations.",
        tech: ["React", "Node.js", "MongoDB"],
        link: "#",
        github: "#",
    },
    {
        title: "E-Commerce Platform",
        category: "Full-Stack",
        privacy: "Public",
        description: "Scalable e-commerce solution with stripe integration and inventory management.",
        tech: ["Next.js", "PostgreSQL", "Stripe"],
        link: "#",
        github: "#",
    },
    {
        title: "Weather Forecast App",
        category: "Frontend",
        privacy: "Public",
        description: "Beautiful weather application with animated backgrounds and detailed forecasting.",
        tech: ["React", "Weather API", "CSS"],
        link: "#",
        github: "#",
    }
];

export const skillCategories = [
    {
        name: "Frontend",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "D3.js"],
    },
    {
        name: "Backend",
        skills: ["Node.js", "Express", "Python", "FastAPI", "PHP", "Laravel", "REST APIs", "GraphQL"],
    },
    {
        name: "Database",
        skills: ["MongoDB", "PostgreSQL", "Firebase", "Redis", "SQL"],
    },
    {
        name: "Game Development",
        skills: ["C++", "Unity", "Godot", "Unreal Engine", "Physics", "Graphics"],
    },
    {
        name: "AI/ML",
        skills: ["TensorFlow", "PyTorch", "ChatGPT API", "LLM Integration", "NLP", "Computer Vision"],
    },
    {
        name: "Tools & DevOps",
        skills: ["Git", "Docker", "AWS", "Vercel", "GitHub Actions", "Linux"],
    },
];

export const services = [
    {
        title: "AI Automation",
        icon: "🤖",
        description: "Custom AI chatbots, agents, and automated workflows using n8n and LLMs to streamline your business.",
        tools: ["n8n", "OpenAI", "LangChain"]
    },
    {
        title: "WordPress Development",
        icon: "WP",
        description: "Custom theme development, plugin creation, and bug fixing. Tailored WordPress solutions for specific needs.",
        tools: ["PHP", "Themes", "Plugins"]
    },
    {
        title: "MERN Stack Web App",
        icon: "⚛️",
        description: "Scalable full-stack web applications using MongoDB, Express, React, and Node.js. Modern and dynamic.",
        tools: ["MongoDB", "Express", "React", "Node"]
    },
    {
        title: "Laravel & Livewire",
        icon: "🔥",
        description: "Robust, secure enterprise applications built with the Laravel ecosystem and Livewire for reactive interfaces.",
        tools: ["Laravel", "Livewire", "MySQL"]
    },
    {
        title: "App Customization",
        icon: "🛠️",
        description: "Refactoring, bug fixing, and feature enhancements for existing applications to improve performance and usability.",
        tools: ["Refactoring", "Fixes", "Updates"]
    }
];

export const codeSnippets = [
    {
        language: "TypeScript",
        filename: "portfolio.tsx",
        code: `import { motion } from "framer-motion";

const Portfolio = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="portfolio"
    >
      <h1>Welcome to my portfolio!</h1>
    </motion.div>
  );
};`,
    },
    {
        language: "Python",
        filename: "ai_model.py",
        code: `import tensorflow as tf

class AIModel:
    def __init__(self, layers):
        self.model = tf.keras.Sequential(layers)
    
    def train(self, data, epochs=10):
        self.model.compile(
            optimizer='adam',
            loss='categorical_crossentropy'
        )
        return self.model.fit(data, epochs=epochs)`,
    },
    {
        language: "JavaScript",
        filename: "game.js",
        code: `class GameEngine {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.entities = [];
    this.running = false;
  }
  
  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);
    });
  }
  
  render() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.entities.forEach(e => e.render(this.ctx));
  }
}`,
    }
];

export const contactInfo = [
    { name: "Email", value: "contact@sabiha.dev", icon: "📧", link: "mailto:contact@sabiha.dev" },
    { name: "GitHub", value: "@sabiha-iqbal", icon: "💻", link: "https://github.com/sabiha-iqbal" },
    { name: "LinkedIn", value: "Sabiha Malik", icon: "💼", link: "https://linkedin.com" },
    { name: "Twitter", value: "@sabiha_tech", icon: "🐦", link: "https://twitter.com" }
];

export const availabilityData = [
    {
        icon: "📍",
        title: "Location",
        value: "Remote / Worldwide",
        subtext: "Open to global opportunities"
    },
    {
        icon: "💼",
        title: "Status",
        value: "Available for Hire",
        subtext: "Full-time & contract roles"
    },
    {
        icon: "⚡",
        title: "Response Time",
        value: "Within 24 Hours",
        subtext: "Mon - Fri, 9am - 6pm UTC"
    }
];

export const defaultThemes = [
    {
        name: "Dark Theme",
        variables: {
            bg_primary: "#000000",
            bg_card: "rgba(10, 10, 10, 0.8)",
            bg_nav: "rgba(0, 0, 0, 0.95)",
            text_primary: "#ffffff",
            accent_cyan: "#22d3ee",
            accent_blue: "#3b82f6",
            background: "#000000",
            foreground: "#ffffff",
        },
    },
    {
        name: "Cyberpunk",
        variables: {
            bg_primary: "#0f051d",
            bg_card: "rgba(25, 10, 45, 0.85)",
            bg_nav: "rgba(15, 5, 29, 0.95)",
            text_primary: "#f8fafc",
            accent_cyan: "#06b6d4",
            accent_blue: "#ec4899",
            background: "#0f051d",
            foreground: "#f8fafc",
        },
    },
    {
        name: "Midnight",
        variables: {
            bg_primary: "#030712",
            bg_card: "rgba(17, 24, 39, 0.85)",
            bg_nav: "rgba(3, 7, 18, 0.95)",
            text_primary: "#f9fafb",
            accent_cyan: "#38bdf8",
            accent_blue: "#6366f1",
            background: "#030712",
            foreground: "#f9fafb",
        },
    },
    {
        name: "Matrix",
        variables: {
            bg_primary: "#020d06",
            bg_card: "rgba(5, 25, 12, 0.85)",
            bg_nav: "rgba(2, 13, 6, 0.95)",
            text_primary: "#f0fdf4",
            accent_cyan: "#22c55e",
            accent_blue: "#10b981",
            background: "#020d06",
            foreground: "#f0fdf4",
        },
    },
    {
        name: "Ocean",
        variables: {
            bg_primary: "#02121e",
            bg_card: "rgba(6, 32, 54, 0.85)",
            bg_nav: "rgba(2, 18, 30, 0.95)",
            text_primary: "#f0f9ff",
            accent_cyan: "#38bdf8",
            accent_blue: "#0284c7",
            background: "#02121e",
            foreground: "#f0f9ff",
        },
    },
];
