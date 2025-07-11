import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiExternalLink, FiFilter, FiMapPin } from 'react-icons/fi';
import axios from 'axios';
import { apiConfig } from '../../config/api';

const AchievementsContainer = styled.div`
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

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const AchievementCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all ${props => props.theme.transitions.base};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
    border-color: ${props => props.theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(45deg, 
      ${props => props.theme.colors.primary}, 
      ${props => props.theme.colors.secondary});
  }
`;

const AchievementHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing[3]};
  }
`;

const AchievementIcon = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: ${props => props.theme.borderRadius.xl};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.theme.fontSizes['2xl']};
`;

const AchievementInfo = styled.div`
  flex: 1;
`;

const AchievementTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.textDark};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const AchievementInstitution = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing[2]};

  svg {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const AchievementMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.sm};

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const AchievementType = styled.span`
  background-color: ${props => {
    switch(props.type) {
      case 'Education': return props.theme.colors.primary;
      case 'Certification': return props.theme.colors.secondary;
      case 'Award': return props.theme.colors.accent;
      case 'Competition': return props.theme.colors.error;
      default: return props.theme.colors.textLight;
    }
  }};
  color: white;
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const AchievementDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const AchievementLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
`;

const AchievementLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  svg {
    font-size: ${props => props.theme.fontSizes.base};
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

const NoAchievements = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[16]} 0;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  const types = ['all', 'Education', 'Certification', 'Award', 'Competition'];

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(apiConfig.endpoints.achievements);
        setAchievements(response.data);
        setFilteredAchievements(response.data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        // Fallback data if API is not available
        const fallbackAchievements = [
          {
            id: 1,
            title: "Bachelor of Science in Computer Science",
            institution: "University Name",
            type: "Education",
            date: "2023-05-15",
            description: "Graduated with honors in Computer Science",
            gpa: "3.9/4.0"
          }
        ];
        setAchievements(fallbackAchievements);
        setFilteredAchievements(fallbackAchievements);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredAchievements(achievements);
    } else {
      setFilteredAchievements(achievements.filter(achievement => 
        achievement.type === selectedType
      ));
    }
  }, [selectedType, achievements]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Education': return '🎓';
      case 'Certification': return '📜';
      case 'Award': return '🏆';
      case 'Competition': return '🥇';
      default: return '⭐';
    }
  };

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
    <AchievementsContainer>
      <Header>
        <HeaderContent>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Achievements
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A collection of my academic accomplishments, certifications, and awards
          </Subtitle>
        </HeaderContent>
      </Header>

      <FilterSection>
        <FilterContainer>
          <FilterHeader>
            <FilterTitle>
              <FiFilter />
              Filter Achievements
            </FilterTitle>
            <FilterButtons>
              {types.map(type => (
                <FilterButton
                  key={type}
                  isActive={selectedType === type}
                  onClick={() => setSelectedType(type)}
                >
                  {type === 'all' ? 'All Types' : type}
                </FilterButton>
              ))}
            </FilterButtons>
          </FilterHeader>

          {loading ? (
            <LoadingSpinner>Loading achievements...</LoadingSpinner>
          ) : filteredAchievements.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AchievementsList>
                {filteredAchievements.map(achievement => (
                  <AchievementCard
                    key={achievement.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                  >
                    <AchievementHeader>
                      <AchievementIcon>
                        {getTypeIcon(achievement.type)}
                      </AchievementIcon>
                      <AchievementInfo>
                        <AchievementTitle>{achievement.title}</AchievementTitle>
                        <AchievementInstitution>
                          <FiMapPin />
                          {achievement.institution}
                        </AchievementInstitution>
                        <AchievementMeta>
                          <MetaItem>
                            <FiCalendar />
                            {formatDate(achievement.date)}
                          </MetaItem>
                          <AchievementType type={achievement.type}>
                            {achievement.type}
                          </AchievementType>
                          {achievement.gpa && (
                            <MetaItem>
                              <FiAward />
                              GPA: {achievement.gpa}
                            </MetaItem>
                          )}
                        </AchievementMeta>
                      </AchievementInfo>
                    </AchievementHeader>
                    
                    <AchievementDescription>
                      {achievement.description}
                    </AchievementDescription>
                    
                    {(achievement.certificateUrl || achievement.projectUrl) && (
                      <AchievementLinks>
                        {achievement.certificateUrl && (
                          <AchievementLink 
                            href={achievement.certificateUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <FiExternalLink />
                            View Certificate
                          </AchievementLink>
                        )}
                        {achievement.projectUrl && (
                          <AchievementLink 
                            href={achievement.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <FiExternalLink />
                            View Project
                          </AchievementLink>
                        )}
                      </AchievementLinks>
                    )}
                  </AchievementCard>
                ))}
              </AchievementsList>
            </motion.div>
          ) : (
            <NoAchievements>
              No achievements found for the selected type.
            </NoAchievements>
          )}
        </FilterContainer>
      </FilterSection>
    </AchievementsContainer>
  );
};

export default Achievements;
