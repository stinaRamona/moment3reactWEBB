import { createBrowserRouter } from 'react-router-dom';

//sidor importeras in
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage';
import SinglePage from './pages/SinglePage';
//layouts importeras in
import BaseLayout from './components/BaseLayout';
//skyddad adminsida undertiden för utveckling av komponeneter 
import AdminPage from './pages/AdminPage';
//skyddad routing 
import ProtectedRoute from "./components/ProtectedRoute"; 

const router = createBrowserRouter([
    {
        path: "/", 
        element: <BaseLayout />, 
        children: [
            {
                path: "/", 
                element: <HomePage />
            }, 
            {
                path: "/login", 
                element: <LoginPage />
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                )
                 
            }, 
            {
                path: "/post/:id", 
                element: <SinglePage /> //kanske behöver göra om
            }
        ]   
    },

])

export default router;