import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SelectionPage from './pages/SelectionPage';
import GamePage from './pages/GamePage';
import RulesPage from './pages/RulesPage';
import ScoresPage from './pages/ScoresPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'games', element: <SelectionPage /> },
            { path: 'games/:mode', element: <GamePage /> }, // Handles both /easy and /normal
            { path: 'rules', element: <RulesPage /> },
            { path: 'scores', element: <ScoresPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;