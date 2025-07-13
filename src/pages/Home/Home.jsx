import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiConfig } from '../../config/api';

const HomeContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px; // Account for fixed header
`;

const HeroSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.05) 0%, 
    rgba(16, 185, 129, 0.05) 100%);
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[12]};
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    padding: 0 ${props => props.theme.spacing[8]};
  }
`;

const HeroText = styled(motion.div)`
  text-align: center;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    text-align: left;
  }
`;

const Greeting = styled(motion.p)`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const Name = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['5xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['6xl']};
  }
`;

const Title = styled(motion.h2)`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.normal};
  margin-bottom: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const Description = styled(motion.p)`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing[8]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.md};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    color: white;
  }
`;

const SecondaryButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[8]};
  justify-content: center;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: ${props => props.theme.colors.backgroundGray};
  color: ${props => props.theme.colors.textLight};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }

  svg {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const HeroImage = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.secondary});
  padding: 4px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 400px;
    height: 400px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.borderRadius.full};
  object-fit: cover;
  background-color: ${props => props.theme.colors.backgroundGray};
`;

const SkillsSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  font-size: ${props => props.theme.fontSizes['3xl']};
`;

const SkillsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    padding: 0 ${props => props.theme.spacing[6]};
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 ${props => props.theme.spacing[8]};
  }
`;

const SkillCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  text-align: center;
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.sm};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.md};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(apiConfig.endpoints.profile);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Fallback data if API is not available
        setProfile({
          name: "Arun K H",
          title: "Software Engineer",
          bio: "As a curious and driven software engineer, I’m passionate about creating and innovating through technology. I thrive on building practical, impactful solutions—whether it's AI-powered tools, dynamic web applications, or experimental systems. My curiosity fuels my desire to explore new technologies and bring bold ideas to life through hands-on projects.",
          profileImage: "/images/profile.jpg",
          skills: ["Python","Java","React.js", "Node.js", "JavaScript", "MongoDB"]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <Greeting
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hello, I'm
            </Greeting>
            
            <Name
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {profile?.name}
            </Name>
            
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {profile?.title}
            </Title>
            
            <Description
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {profile?.bio}
            </Description>
            
            <ButtonGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <PrimaryButton 
                href={profile?.resume || "/assets/resume.pdf"} 
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload />
                Download Resume
              </PrimaryButton>
              
              <SecondaryButton 
                to="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <FiArrowRight />
              </SecondaryButton>
            </ButtonGroup>
            
            <SocialLinks
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <SocialLink 
                href="https://github.com/kashireddyarun" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FiGithub />
              </SocialLink>
              <SocialLink 
                href="www.linkedin.com/in/arun-k-h-76b94a271" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </SocialLink>
              <SocialLink 
                href="mailto:kashireddyarun@gmail.com"
                aria-label="Email"
              >
                <FiMail />
              </SocialLink>
            </SocialLinks>
          </HeroText>
          
          <HeroImage
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProfileImageContainer>
              <ProfileImage 
                src={profile?.profileImage || "/images/profile.jpg"} 
                alt={profile?.name}
                onError={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.display = 'flex';
                  e.target.style.alignItems = 'center';
                  e.target.style.justifyContent = 'center';
                  e.target.innerHTML = '<span style="color: #6b7280; font-size: 18px;">Add Your Photo</span>';
                }}
              />
            </ProfileImageContainer>
          </HeroImage>
        </HeroContent>
      </HeroSection>

      <SkillsSection>
        <div className="container">
          <SectionTitle>My Skills</SectionTitle>
          <SkillsGrid>
            {profile?.skills?.map((skill, index) => (
              <SkillCard
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3>{skill}</h3>
              </SkillCard>
            ))}
          </SkillsGrid>
        </div>
      </SkillsSection>
    </HomeContainer>
  );
};

export default Home;
