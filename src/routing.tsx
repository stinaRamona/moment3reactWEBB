import { createBrowserRouter } from 'react-router-dom';

//sidor importeras in
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage';
import SinglePage from './pages/SinglePage';
//layouts importeras in
import BaseLayout from './components/BaseLayout';

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
        ]   
    },
    //ska nog ha annan layout
    {
        path: "/post/:id", 
        element: <SinglePage /> //kanske behöver göra om
    }
])

export default router;