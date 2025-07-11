const express = require('express');
const router = express.Router();

// Sample projects data - In a real app, this would come from a database
const projectsData = [
  {
    id: 1,
    title: "Deepfake Detection System",
    description: "An advanced machine learning system for detecting deepfake videos using computer vision and neural networks. Implements state-of-the-art algorithms to identify artificially generated content with high accuracy.",
    technologies: ["Python", "TensorFlow", "OpenCV", "CNN", "Deep Learning", "Computer Vision"],
    githubUrl: "https://github.com/arun-kh/deepfake-detection",
    liveUrl: null,
    imageUrl: "/assets/projects/deepfake.jpg",
    category: "Machine Learning",
    featured: true,
    createdAt: "2024-04-15"
  },
  {
    id: 2,
    title: "AI Traffic Management System",
    description: "Intelligent traffic management system using AI to optimize traffic flow, reduce congestion, and improve urban transportation efficiency. Features real-time traffic analysis and adaptive signal control.",
    technologies: ["Python", "TensorFlow", "Computer Vision", "IoT", "Real-time Processing", "AI"],
    githubUrl: "https://github.com/arun-kh/ai-traffic-management",
    liveUrl: null,
    imageUrl: "/assets/projects/traffic.jpg",
    category: "Artificial Intelligence",
    featured: true,
    createdAt: "2024-03-20"
  },
  {
    id: 3,
    title: "Skin Disease Analysis using ML",
    description: "Machine learning-based skin disease classification system that analyzes medical images to assist in early diagnosis. Uses deep learning models trained on dermatological datasets.",
    technologies: ["Python", "TensorFlow", "Keras", "Image Processing", "Medical AI", "CNN"],
    githubUrl: "https://github.com/arun-kh/skin-disease-analysis",
    liveUrl: null,
    imageUrl: "/assets/projects/skin-analysis.jpg",
    category: "Machine Learning",
    featured: true,
    createdAt: "2024-02-10"
  },
  {
    id: 4,
    title: "Solid State Chemical Reaction Simulation",
    description: "Computational simulation system for modeling solid-state chemical reactions using advanced algorithms. Provides insights into reaction mechanisms and material properties.",
    technologies: ["Python", "NumPy", "SciPy", "Matplotlib", "Computational Chemistry", "Simulation"],
    githubUrl: "https://github.com/arun-kh/chemical-reaction-simulation",
    liveUrl: null,
    imageUrl: "/assets/projects/chemical.jpg",
    category: "Scientific Computing",
    featured: false,
    createdAt: "2024-01-15"
  },
  {
    id: 5,
    title: "Placement Management System",
    description: "Comprehensive web-based placement management system for educational institutions. Features student registration, company management, interview scheduling, and placement tracking.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Material-UI"],
    githubUrl: "https://github.com/arun-kh/placement-management",
    liveUrl: "https://placement-management-demo.com",
    imageUrl: "/assets/projects/placement.jpg",
    category: "Web Development",
    featured: false,
    createdAt: "2023-12-05"
  }
];

// GET /api/projects
router.get('/', (req, res) => {
  try {
    const { category, featured } = req.query;
    let filteredProjects = [...projectsData];

    if (category && category !== 'all') {
      filteredProjects = filteredProjects.filter(
        project => project.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === 'true') {
      filteredProjects = filteredProjects.filter(project => project.featured);
    }

    // Sort by creation date (newest first)
    filteredProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(filteredProjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects data' });
  }
});

// GET /api/projects/:id
router.get('/:id', (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = projectsData.find(p => p.id === projectId);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project data' });
  }
});

// POST /api/projects - Add new project (for future admin functionality)
router.post('/', (req, res) => {
  try {
    const newProject = {
      id: projectsData.length + 1,
      ...req.body,
      createdAt: new Date().toISOString().split('T')[0]
    };
    projectsData.push(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

module.exports = router;
