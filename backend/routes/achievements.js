const express = require('express');
const router = express.Router();

// Arun K H's achievements data - In a real app, this would come from a database
const achievementsData = [
  {
    id: 1,
    title: "Smart India Hackathon 2023 Finalist",
    institution: "Government of India",
    type: "Competition",
    date: "2023-08-15",
    description: "Selected as finalist in Smart India Hackathon 2023, showcasing innovative solutions for real-world problems at the national level.",
    imageUrl: "/assets/achievements/sih-2023.jpg"
  },
  {
    id: 2,
    title: "2nd Place - Project Expo",
    institution: "Jerusalem College of Engineering",
    type: "Competition",
    date: "2024-02-10",
    description: "Won 2nd place in the project exposition conducted by Jerusalem College of Engineering for innovative project presentation.",
    imageUrl: "/assets/achievements/jce-expo.jpg"
  },
  {
    id: 3,
    title: "1st Place - BIS National Competition",
    institution: "Bureau of Indian Standards",
    type: "Competition",
    date: "2024-01-20",
    description: "Secured first place in the BIS (Bureau of Indian Standards) national competition, demonstrating excellence in technical innovation.",
    imageUrl: "/assets/achievements/bis-national.jpg"
  },
  {
    id: 4,
    title: "Top 10 - Hackathon",
    institution: "St. Joseph's College of Engineering",
    type: "Competition",
    date: "2023-11-15",
    description: "Achieved top 10 position in the hackathon conducted by St. Joseph's College of Engineering among numerous participants.",
    imageUrl: "/assets/achievements/sjce-hackathon.jpg"
  },
  {
    id: 5,
    title: "Deep Learning Certification",
    institution: "NPTEL",
    type: "Certification",
    date: "2024-04-30",
    description: "Successfully completed and certified in Deep Learning course from NPTEL, covering neural networks, CNNs, RNNs, and advanced deep learning techniques.",
    certificateUrl: "https://nptel.ac.in/certificate/verify",
    imageUrl: "/assets/achievements/nptel-dl.jpg"
  },
  {
    id: 6,
    title: "Large Language Models (LLM) Certification",
    institution: "NPTEL",
    type: "Certification",
    date: "2024-06-15",
    description: "Completed certification in Large Language Models from NPTEL, focusing on transformer architectures, GPT models, and natural language processing.",
    certificateUrl: "https://nptel.ac.in/certificate/verify",
    imageUrl: "/assets/achievements/nptel-llm.jpg"
  },
  {
    id: 7,
    title: "Entrepreneurship Program Participant",
    institution: "SRM Tiruchirappalli",
    type: "Program",
    date: "2023-09-20",
    description: "Actively participated in the entrepreneurship development program conducted by SRM Tiruchirappalli, gaining insights into startup ecosystem and business development.",
    imageUrl: "/assets/achievements/srm-entrepreneurship.jpg"
  }
];

// GET /api/achievements
router.get('/', (req, res) => {
  try {
    const { type } = req.query;
    let filteredAchievements = [...achievementsData];

    if (type && type !== 'all') {
      filteredAchievements = filteredAchievements.filter(
        achievement => achievement.type.toLowerCase() === type.toLowerCase()
      );
    }

    // Sort by date (newest first)
    filteredAchievements.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(filteredAchievements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievements data' });
  }
});

// GET /api/achievements/:id
router.get('/:id', (req, res) => {
  try {
    const achievementId = parseInt(req.params.id);
    const achievement = achievementsData.find(a => a.id === achievementId);
    
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievement data' });
  }
});

// POST /api/achievements - Add new achievement (for future admin functionality)
router.post('/', (req, res) => {
  try {
    const newAchievement = {
      id: achievementsData.length + 1,
      ...req.body,
      date: req.body.date || new Date().toISOString().split('T')[0]
    };
    achievementsData.push(newAchievement);
    res.status(201).json(newAchievement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create achievement' });
  }
});

module.exports = router;
