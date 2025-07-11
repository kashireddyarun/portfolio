<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Portfolio Project Instructions

This is a full-stack portfolio application built with React.js frontend and Node.js backend.

## Project Structure

- **Frontend**: React.js with Vite, styled-components, framer-motion, react-router-dom
- **Backend**: Node.js with Express.js, CORS, Helmet for security
- **Styling**: Styled-components with a comprehensive theme system
- **Animation**: Framer Motion for smooth animations and transitions

## Key Features

- **Responsive Design**: Mobile-first approach with breakpoint-based styling
- **Component Architecture**: Modular components with clear separation of concerns
- **Theme System**: Centralized theme with colors, typography, spacing, and breakpoints
- **API Integration**: RESTful API for profile, projects, and achievements data
- **Modern UI/UX**: Clean, professional design with smooth animations

## Development Guidelines

- Use styled-components for all styling
- Follow the established theme system for consistent design
- Implement responsive design patterns
- Use semantic HTML and proper accessibility attributes
- Maintain consistent component structure and naming conventions
- Keep API calls in useEffect hooks with proper error handling

## File Organization

- Components in `/src/components/[ComponentName]/ComponentName.jsx`
- Pages in `/src/pages/[PageName]/PageName.jsx`
- Styles in `/src/styles/` (theme.js, GlobalStyle.js)
- Backend routes in `/backend/routes/`

## Best Practices

- Use meaningful component and variable names
- Add proper PropTypes or TypeScript definitions
- Include error boundaries and loading states
- Optimize for performance with proper memoization
- Follow React hooks best practices
