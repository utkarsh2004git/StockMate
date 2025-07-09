// App.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Landing from './pages/Landing';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Landing />
      {/* Use <Outlet /> if you're using nested routes */}
    </div>
  );
};

export default App;
