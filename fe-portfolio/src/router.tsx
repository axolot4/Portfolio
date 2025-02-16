import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // Component for the Home route
  },
  {
    path: '/projects/:projectId',
    element: <ProjectDetails />, // Component for the ProjectDetails route
  }
]);

export default router;
