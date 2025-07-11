import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    font-size: ${props => props.theme.fontSizes.base};
    line-height: 1.6;
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fontWeights.semibold};
    line-height: 1.2;
    color: ${props => props.theme.colors.textDark};
  }

  h1 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }

  h4 {
    font-size: ${props => props.theme.fontSizes.xl};
  }

  h5 {
    font-size: ${props => props.theme.fontSizes.lg};
  }

  h6 {
    font-size: ${props => props.theme.fontSizes.base};
  }

  p {
    margin-bottom: ${props => props.theme.spacing[4]};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all ${props => props.theme.transitions.fast};

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  code {
    font-family: ${props => props.theme.fonts.mono};
    background-color: ${props => props.theme.colors.backgroundGray};
    padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 0.875em;
  }

  pre {
    font-family: ${props => props.theme.fonts.mono};
    background-color: ${props => props.theme.colors.backgroundGray};
    padding: ${props => props.theme.spacing[4]};
    border-radius: ${props => props.theme.borderRadius.md};
    overflow-x: auto;
    margin: ${props => props.theme.spacing[4]} 0;
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: ${props => props.theme.spacing[4]};
    margin: ${props => props.theme.spacing[4]} 0;
    font-style: italic;
    color: ${props => props.theme.colors.textLight};
  }

  ul, ol {
    padding-left: ${props => props.theme.spacing[6]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }

  li {
    margin-bottom: ${props => props.theme.spacing[2]};
  }

  hr {
    border: none;
    height: 1px;
    background-color: ${props => props.theme.colors.border};
    margin: ${props => props.theme.spacing[8]} 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing[4]};

    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      padding: 0 ${props => props.theme.spacing[6]};
    }

    @media (min-width: ${props => props.theme.breakpoints.lg}) {
      padding: 0 ${props => props.theme.spacing[8]};
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundGray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.textLight};
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  button:focus,
  a:focus,
  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

export default GlobalStyle;
