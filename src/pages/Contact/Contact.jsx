import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const ContactContainer = styled.div`
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

const ContactContent = styled.section`
  padding: ${props => props.theme.spacing[12]} 0;
`;

const ContactGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[12]};

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    padding: 0 ${props => props.theme.spacing[8]};
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[8]};
`;

const InfoCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[6]};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.lg};

  svg {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const InfoTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.textDark};
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`;

const SocialSection = styled.div`
  margin-top: ${props => props.theme.spacing[8]};
`;

const SocialTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.textDark};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
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

const ContactForm = styled(motion.div)`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const FormTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  margin-bottom: ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.textDark};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[5]};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Label = styled.label`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.textDark};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  transition: all ${props => props.theme.transitions.fast};
  background-color: ${props => props.theme.colors.background};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all ${props => props.theme.transitions.fast};
  background-color: ${props => props.theme.colors.background};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.base};
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.sm};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const StatusMessage = styled(motion.div)`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-align: center;
  
  &.success {
    background-color: rgba(16, 185, 129, 0.1);
    color: ${props => props.theme.colors.success};
    border: 1px solid rgba(16, 185, 129, 0.2);
  }
  
  &.error {
    background-color: rgba(239, 68, 68, 0.1);
    color: ${props => props.theme.colors.error};
    border: 1px solid rgba(239, 68, 68, 0.2);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus({
        type: 'success',
        message: 'Thank you for your message! I\'ll get back to you soon.'
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <Header>
        <HeaderContent>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I'd love to hear from you. Send me a message and I'll respond as soon as possible.
          </Subtitle>
        </HeaderContent>
      </Header>

      <ContactContent>
        <ContactGrid>
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InfoCard>
              <InfoHeader>
                <InfoIcon>
                  <FiMail />
                </InfoIcon>
                <InfoTitle>Email</InfoTitle>
              </InfoHeader>
              <InfoText>
                kashireddyarun@gmail.com<br />
                I'll respond within 24 hours
              </InfoText>
            </InfoCard>

            <InfoCard>
              <InfoHeader>
                <InfoIcon>
                  <FiPhone />
                </InfoIcon>
                <InfoTitle>Phone</InfoTitle>
              </InfoHeader>
              <InfoText>
                +1 (555) 123-4567<br />
                Available Mon-Fri, 9AM-5PM
              </InfoText>
            </InfoCard>

            <InfoCard>
              <InfoHeader>
                <InfoIcon>
                  <FiMapPin />
                </InfoIcon>
                <InfoTitle>Location</InfoTitle>
              </InfoHeader>
              <InfoText>
                Your City, Your State<br />
                Available for remote work
              </InfoText>
            </InfoCard>

            <SocialSection>
              <SocialTitle>Connect With Me</SocialTitle>
              <SocialLinks>
                <SocialLink 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </SocialLink>
                <SocialLink 
                  href="https://linkedin.com/in/yourusername" 
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
              </SocialLinks>
            </SocialSection>
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FormTitle>Send Me a Message</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or just say hello!"
                  required
                />
              </FormGroup>

              {status.message && (
                <StatusMessage 
                  className={status.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {status.message}
                </StatusMessage>
              )}
              
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </SubmitButton>
            </Form>
          </ContactForm>
        </ContactGrid>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;
