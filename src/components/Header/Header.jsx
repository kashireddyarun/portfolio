import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiFolder, FiAward, FiMail } from 'react-icons/fi';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.sticky};
  background-color: ${props => props.isScrolled ? 
    'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: all ${props => props.theme.transitions.base};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[4]} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${props => props.theme.spacing[4]};
  padding-right: ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding-left: ${props => props.theme.spacing[6]};
    padding-right: ${props => props.theme.spacing[6]};
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding-left: ${props => props.theme.spacing[8]};
    padding-right: ${props => props.theme.spacing[8]};
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

const DesktopNavLinks = styled.div`
  display: none;
  gap: ${props => props.theme.spacing[8]};
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.isActive ? 
    props.theme.colors.primary : props.theme.colors.text};
  background-color: ${props => props.isActive ? 
    'rgba(37, 99, 235, 0.1)' : 'transparent'};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: rgba(37, 99, 235, 0.05);
  }

  svg {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundGray};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }

  svg {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.isActive ? 
    props.theme.colors.primary : props.theme.colors.text};
  background-color: ${props => props.isActive ? 
    'rgba(37, 99, 235, 0.1)' : 'transparent'};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: rgba(37, 99, 235, 0.05);
  }

  svg {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const navItems = [
  { path: '/', label: 'Home', icon: FiHome },
  { path: '/projects', label: 'Projects', icon: FiFolder },
  { path: '/achievements', label: 'Achievements', icon: FiAward },
  { path: '/contact', label: 'Contact', icon: FiMail }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      isScrolled={isScrolled}
    >
      <Nav>
        <Logo to="/">Arun</Logo>
        
        <DesktopNavLinks>
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              isActive={location.pathname === path}
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </DesktopNavLinks>

        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </Nav>

      {isMobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <MobileNavLinks>
            {navItems.map(({ path, label, icon: Icon }) => (
              <MobileNavLink
                key={path}
                to={path}
                isActive={location.pathname === path}
                onClick={closeMobileMenu}
              >
                <Icon />
                {label}
              </MobileNavLink>
            ))}
          </MobileNavLinks>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
