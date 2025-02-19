import { createBrowserRouter } from 'react-router-dom';

//sidor importeras in
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage';
import SinglePage from './pages/SinglePage';

const router = createBrowserRouter([
    {
        path: "/", 
        element: <HomePage />
    }, 
    {
        path: "/login", 
        element: <LoginPage />
    }, 
    {
        path: "/post/:id", 
        element: <SinglePage /> //kanske behöver göra om
    }
])

export default router;