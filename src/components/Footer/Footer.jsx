import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiHeart, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import axios from 'axios';
import { apiConfig } from '../../config/api';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing[12]} 0 ${props => props.theme.spacing[8]};
  margin-top: ${props => props.theme.spacing[16]};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing[6]};
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 ${props => props.theme.spacing[8]};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[8]};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.background};
    margin-bottom: ${props => props.theme.spacing[4]};
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const FooterDescription = styled.p`
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.background};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }

  svg {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
`;

const FooterLink = styled.a`
  color: #9ca3af;
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.background};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #374151;
  padding-top: ${props => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Copyright = styled.p`
  color: #9ca3af;
  font-size: ${props => props.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};

  .heart {
    color: ${props => props.theme.colors.error};
    animation: heartbeat 2s ease-in-out infinite;
  }

  @keyframes heartbeat {
    0%, 50%, 100% {
      transform: scale(1);
    }
    25%, 75% {
      transform: scale(1.1);
    }
  }
`;

const BackToTop = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(apiConfig.endpoints.profile);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>Arun K H</h3>
            <FooterDescription>
              As a curious software engineer, I’m passionate about building innovative projects that solve real-world problems.
              My drive to explore new technologies fuels my creativity and hands-on development approach.
            </FooterDescription>
            <SocialLinks>
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
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FiTwitter />
              </SocialLink>
              <SocialLink 
                href="mailto:kashireddyarun@gmail.com"
                aria-label="Email"
              >
                <FiMail />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/projects">Projects</FooterLink>
              <FooterLink href="/achievements">Achievements</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Resources</h3>
            <FooterLinks>
              <FooterLink href={profile?.resume || "/assets/resume.pdf"} target="_blank">Resume</FooterLink>
              <FooterLink href={profile?.social?.github || "https://github.com/kashireddyarun"} target="_blank">GitHub</FooterLink>
              <FooterLink href={profile?.social?.linkedin || "www.linkedin.com/in/arun-k-h-76b94a271"} target="_blank">LinkedIn</FooterLink>
              <FooterLink href={`mailto:${profile?.email || "kashireddyarun@gmail.com"}`}>Email Me</FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © {new Date().getFullYear()} Arun K H. Made with <FiHeart className="heart" /> and React
          </Copyright>
          <BackToTop onClick={scrollToTop}>
            Back to Top
          </BackToTop>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
