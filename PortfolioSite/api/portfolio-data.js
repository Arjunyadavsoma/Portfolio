export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const portfolioData = {
      name: "Soma Arjun Yadav",
      title: "AI & ML Engineer",
      bio: "Passionate AI/ML engineer with expertise in developing intelligent solutions and interactive data visualizations. I specialize in creating cutting-edge applications that bridge the gap between complex algorithms and user-friendly interfaces.",
      location: "San Francisco, CA",
      email: "soma.arjun@example.com",
      phone: "+1 (555) 123-4567",
      website: "https://somaarjun.dev",
      linkedin: "https://linkedin.com/in/somaarjun",
      github: "https://github.com/somaarjun",
      visitCount: Math.floor(Math.random() * 1000) + 500,
      projects: [
        {
          id: "1",
          title: "ML-Powered Analytics Dashboard",
          description: "Interactive dashboard with real-time machine learning predictions and beautiful data visualizations.",
          category: "AI/ML",
          technologies: ["Python", "TensorFlow", "React", "D3.js"],
          image: "/api/placeholder-image/project1",
          github: "https://github.com/somaarjun/ml-dashboard",
          live: "https://ml-dashboard-demo.vercel.app",
          featured: true,
          status: "completed"
        },
        {
          id: "2",
          title: "Smart Data Visualization Suite",
          description: "Advanced charting library with AI-powered insights and automated pattern recognition.",
          category: "Data Visualization", 
          technologies: ["D3.js", "TypeScript", "WebGL", "Python"],
          image: "/api/placeholder-image/project2",
          github: "https://github.com/somaarjun/smart-viz",
          live: "https://smart-viz-demo.vercel.app",
          featured: true,
          status: "completed"
        },
        {
          id: "3",
          title: "AI-Powered Mobile App",
          description: "Cross-platform mobile application with computer vision and natural language processing capabilities.",
          category: "App Development",
          technologies: ["React Native", "TensorFlow Lite", "Firebase", "Node.js"],
          image: "/api/placeholder-image/project3",
          github: "https://github.com/somaarjun/ai-mobile-app",
          live: "https://ai-mobile-app.vercel.app",
          featured: false,
          status: "in-progress"
        }
      ],
      skills: [
        { name: "Python", level: 95, icon: "🐍", category: "Programming" },
        { name: "Machine Learning", level: 92, icon: "🤖", category: "AI/ML" },
        { name: "TensorFlow", level: 88, icon: "🧠", category: "AI/ML" },
        { name: "React", level: 90, icon: "⚛️", category: "Frontend" },
        { name: "TypeScript", level: 85, icon: "📘", category: "Programming" },
        { name: "Node.js", level: 82, icon: "🟢", category: "Backend" },
        { name: "Data Visualization", level: 87, icon: "📊", category: "Data Science" },
        { name: "Deep Learning", level: 85, icon: "🔬", category: "AI/ML" },
        { name: "AWS", level: 75, icon: "☁️", category: "Cloud" },
        { name: "Docker", level: 78, icon: "🐳", category: "DevOps" },
        { name: "PostgreSQL", level: 82, icon: "🐘", category: "Database" },
      ],
      experience: {
        title: "AI & ML Engineer",
        description: "Specialized in developing machine learning solutions, interactive data visualizations, and intelligent applications. Expert in Python, TensorFlow, and modern web technologies with a focus on AI-driven user experiences.",
        years: 4,
        timeline: [
          {
            id: "1",
            position: "Senior AI/ML Engineer",
            company: "TechCorp Innovation Labs",
            period: "2022 - Present",
            duration: "2+ years",
            type: "full-time",
            description: "Leading AI initiatives and developing cutting-edge machine learning solutions for enterprise clients.",
            achievements: [
              "Built and deployed 5+ ML models improving client efficiency by 40%",
              "Led a team of 4 engineers on computer vision projects",
              "Reduced model inference time by 60% through optimization",
              "Implemented MLOps pipelines serving 1M+ daily predictions"
            ],
            technologies: ["Python", "TensorFlow", "Kubernetes", "AWS", "Docker"]
          },
          {
            id: "2", 
            position: "AI/ML Developer",
            company: "DataViz Solutions",
            period: "2021 - 2022",
            duration: "1 year",
            type: "full-time",
            description: "Specialized in data visualization and analytics platforms with AI-powered insights.",
            achievements: [
              "Created interactive dashboards processing 10TB+ data daily",
              "Developed real-time anomaly detection systems",
              "Improved data processing speed by 3x using optimized algorithms",
              "Built custom D3.js visualizations for complex datasets"
            ],
            technologies: ["Python", "D3.js", "React", "PostgreSQL", "Apache Kafka"]
          },
          {
            id: "3",
            position: "Junior Developer",
            company: "Startup Incubator",
            period: "2020 - 2021", 
            duration: "1 year",
            type: "full-time",
            description: "Full-stack development with focus on mobile applications and user experience.",
            achievements: [
              "Developed 3 mobile apps with 50K+ downloads",
              "Implemented responsive designs for 15+ client projects",
              "Collaborated with UI/UX designers on user research",
              "Optimized app performance reducing load times by 50%"
            ],
            technologies: ["React Native", "Node.js", "Firebase", "MongoDB"]
          }
        ]
      },
      certificates: [
        {
          name: "AWS Solutions Architect",
          issuer: "Amazon Web Services",
          icon: "fab fa-aws",
          date: "2023",
        },
        {
          name: "Meta React Developer",
          issuer: "Meta (Facebook)",
          icon: "fab fa-react",
          date: "2022",
        },
      ],
    };

    res.json(portfolioData);
  } catch (error) {
    console.error("Portfolio data error:", error);
    res.status(500).json({ error: "Failed to fetch portfolio data" });
  }
}