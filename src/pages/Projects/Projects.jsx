import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFilter } from 'react-icons/fi';
import axios from 'axios';
import { apiConfig } from '../../config/api';

const ProjectsContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: ${props => props.theme.spacing[16]};
`;

const Header = styled.section`
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.05) 0%, 
    rgba(16, 185, 129, 0.05) 100%);
  padding: ${props => props.theme.spacing[16]} 0 ${props => props.theme.spacing[12]};
  text-align: center;
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const Title = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  margin-bottom: ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['5xl']};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`;

const FilterSection = styled.section`
  padding: ${props => props.theme.spacing[8]} 0;
`;

const FilterContainer = styled.div`
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

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing[6]};
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
`;

const FilterTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.textDark};

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 2px solid ${props => props.isActive ? 
    props.theme.colors.primary : props.theme.colors.border};
  background-color: ${props => props.isActive ? 
    props.theme.colors.primary : 'transparent'};
  color: ${props => props.isActive ? 
    'white' : props.theme.colors.text};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background-color: ${props => props.isActive ? 
      props.theme.colors.primaryDark : 'rgba(37, 99, 235, 0.1)'};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all ${props => props.theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}20, 
    ${props => props.theme.colors.secondary}20);
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      ${props => props.theme.colors.primary}40, 
      ${props => props.theme.colors.secondary}40);
    opacity: ${props => props.image ? 0 : 1};
  }
`;

const ProjectContent = styled.div`
  padding: ${props => props.theme.spacing[6]};
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const ProjectTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.textDark};
`;

const ProjectCategory = styled.span`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.colors.backgroundGray};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all ${props => props.theme.transitions.fast};

  &.github {
    background-color: ${props => props.theme.colors.textDark};
    color: white;

    &:hover {
      background-color: ${props => props.theme.colors.text};
      transform: translateY(-2px);
    }
  }

  &.live {
    background-color: ${props => props.theme.colors.primary};
    color: white;

    &:hover {
      background-color: ${props => props.theme.colors.primaryDark};
      transform: translateY(-2px);
    }
  }

  svg {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textLight};
`;

const NoProjects = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[16]} 0;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'Machine Learning', 'Artificial Intelligence', 'Web Development', 'Scientific Computing'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(apiConfig.endpoints.projects);
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback data if API is not available
        const fallbackProjects = [
          {
            id: 1,
            title: "Portfolio Website",
            description: "A responsive portfolio website built with React and Node.js",
            technologies: ["React", "Node.js", "Express", "Styled Components"],
            category: "Web Development",
            githubUrl: "https://github.com/yourusername/portfolio",
            liveUrl: "https://yourportfolio.com"
          }
        ];
        setProjects(fallbackProjects);
        setFilteredProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => 
        project.category === selectedCategory
      ));
    }
  }, [selectedCategory, projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <ProjectsContainer>
      <Header>
        <HeaderContent>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Projects
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A collection of projects that showcase my skills and passion for development
          </Subtitle>
        </HeaderContent>
      </Header>

      <FilterSection>
        <FilterContainer>
          <FilterHeader>
            <FilterTitle>
              <FiFilter />
              Filter Projects
            </FilterTitle>
            <FilterButtons>
              {categories.map(category => (
                <FilterButton
                  key={category}
                  isActive={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All Projects' : category}
                </FilterButton>
              ))}
            </FilterButtons>
          </FilterHeader>

          {loading ? (
            <LoadingSpinner>Loading projects...</LoadingSpinner>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <ProjectsGrid>
                {filteredProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ProjectImage image={project.imageUrl} />
                    <ProjectContent>
                      <ProjectHeader>
                        <div>
                          <ProjectTitle>{project.title}</ProjectTitle>
                          <ProjectCategory>{project.category}</ProjectCategory>
                        </div>
                      </ProjectHeader>
                      
                      <ProjectDescription>
                        {project.description}
                      </ProjectDescription>
                      
                      <TechStack>
                        {project.technologies?.map(tech => (
                          <TechTag key={tech}>{tech}</TechTag>
                        ))}
                      </TechStack>
                      
                      <ProjectLinks>
                        {project.githubUrl && (
                          <ProjectLink 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="github"
                          >
                            <FiGithub />
                            Code
                          </ProjectLink>
                        )}
                        {project.liveUrl && (
                          <ProjectLink 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="live"
                          >
                            <FiExternalLink />
                            Live Demo
                          </ProjectLink>
                        )}
                      </ProjectLinks>
                    </ProjectContent>
                  </ProjectCard>
                ))}
              </ProjectsGrid>
            </motion.div>
          ) : (
            <NoProjects>
              No projects found for the selected category.
            </NoProjects>
          )}
        </FilterContainer>
      </FilterSection>
    </ProjectsContainer>
  );
};

export default Projects;
