import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Site Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
