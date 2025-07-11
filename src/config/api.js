// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api');

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    profile: `${API_BASE_URL}/profile`,
    projects: `${API_BASE_URL}/projects`,
    achievements: `${API_BASE_URL}/achievements`
  }
};

export default apiConfig;
