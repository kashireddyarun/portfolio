const express = require('express');
const router = express.Router();

// Sample profile data - In a real app, this would come from a database
const profileData = {
  id: 1,
  name: "Arun K H",
  title: "Full Stack Developer",
  email: "kashireddyarun@gmail.com",
  phone: "+91 8015924370",
  location: "Chennai",
  bio: "Passionate full-stack developer from Chennai with expertise in React, Node.js, and modern web technologies. I love creating innovative solutions and building user-friendly applications that make a difference.",
  profileImage: "/images/profile.jpg", // Replace with your actual photo path
  skills: [
    "React.js",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Git",
    "Docker",
    "AWS"
  ],
  social: {
    github: "https://github.com/arun-kh", // Update with your actual GitHub username
    linkedin: "https://linkedin.com/in/arun-kh", // Update with your actual LinkedIn profile
    twitter: "https://twitter.com/arun_kh", // Update with your actual Twitter handle
    portfolio: "https://arun-portfolio.com" // Update with your actual portfolio URL
  },
  resume: "/assets/ARUN.K.H_AI_DS_312822243003_AGNI.pdf" // Resume file moved to public/assets/
};

// GET /api/profile
router.get('/', (req, res) => {
  try {
    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
});

// PUT /api/profile - Update profile (for future admin functionality)
router.put('/', (req, res) => {
  try {
    // In a real app, you'd validate and update database
    Object.assign(profileData, req.body);
    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile data' });
  }
});

module.exports = router;
