// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import Landing from './pages/Landing'; // adjust path if needed

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Landing />} />
            </Route>
        </Routes>
    );
}
