# Portfolio Website

A modern, responsive portfolio website built with React.js and Node.js to showcase projects, academic achievements, and professional profile.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Components**: Smooth transitions and hover effects
- **Dynamic Content**: API-driven content management
- **Fast Performance**: Built with Vite for optimal performance
- **Professional Sections**:
  - Hero section with profile information
  - Projects showcase with filtering
  - Academic achievements and certifications
  - Contact form with social links

## 🛠️ Tech Stack

### Frontend

- **React.js** - Component-based UI library
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Beautiful icon components
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Nodemon** - Development auto-restart

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header/         # Navigation header
│   │   └── Footer/         # Site footer
│   ├── pages/              # Page components
│   │   ├── Home/           # Landing page
│   │   ├── Projects/       # Projects showcase
│   │   ├── Achievements/   # Academic achievements
│   │   └── Contact/        # Contact form
│   ├── styles/             # Global styles and theme
│   │   ├── theme.js        # Design system
│   │   └── GlobalStyle.js  # Global CSS
│   ├── App.jsx             # Main app component
│   └── main.jsx            # App entry point
├── backend/
│   ├── routes/             # API route handlers
│   │   ├── profile.js      # Profile data API
│   │   ├── projects.js     # Projects data API
│   │   └── achievements.js # Achievements data API
│   ├── server.js           # Express server setup
│   └── .env               # Environment variables
└── public/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

### Development

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The website will be available at `http://localhost:5173`

### Production Build

1. **Build the frontend**

   ```bash
   npm run build
   ```

2. **Start the backend in production**
   ```bash
   cd backend
   npm start
   ```

## 🎨 Customization

### Personal Information

Update the data in the backend route files:

- `backend/routes/profile.js` - Personal info and skills
- `backend/routes/projects.js` - Project portfolio
- `backend/routes/achievements.js` - Academic achievements

### Styling

Modify the theme in `src/styles/theme.js` to customize:

- Colors and branding
- Typography
- Spacing and layout
- Breakpoints

### Content

- Replace placeholder images in the `public` folder
- Update social media links in components
- Customize the contact information

## 📱 Responsive Design

The portfolio is built with a mobile-first approach and includes:

- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions
- Optimized images and assets

## 🔧 API Endpoints

### Profile

- `GET /api/profile` - Get profile information
- `PUT /api/profile` - Update profile (future admin functionality)

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects?category=web` - Filter by category
- `GET /api/projects?featured=true` - Get featured projects
- `GET /api/projects/:id` - Get specific project

### Achievements

- `GET /api/achievements` - Get all achievements
- `GET /api/achievements?type=education` - Filter by type
- `GET /api/achievements/:id` - Get specific achievement

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Connect your repository to Vercel or Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Backend (Heroku/Railway)

1. Set environment variables in your hosting platform
2. Ensure the PORT environment variable is set
3. Update FRONTEND_URL to your deployed frontend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Arun K H**

- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]
- Email: kashireddyarun@gmail.com

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from React Icons (Feather Icons)
- Fonts from Google Fonts (Inter & Poppins)
- Animation library: Framer Motion+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
