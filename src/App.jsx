import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
  // Icon components
  const MenuIcon = getIcon('Menu');
  const XIcon = getIcon('X');
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getIcon from './utils/iconUtils';
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-surface-800 shadow-sm py-4 px-4 md:px-6">
// Pages
          <div className="flex items-center">
            <Link to="/" className="text-primary dark:text-primary-light text-xl font-bold">FreeLance</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>

          
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hidden md:block btn btn-primary">Get Started</Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
            <button 
              className="md:hidden p-2 rounded-lg bg-surface-100 dark:bg-surface-700"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
    if (darkMode) {
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-surface-800 py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="nav-link px-4 py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/dashboard" className="nav-link px-4 py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <a href="#features" className="nav-link px-4 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#pricing" className="nav-link px-4 py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <Link to="/dashboard" className="btn btn-primary w-full text-center mt-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}
      document.documentElement.classList.add('dark');
    } else {
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

  };

  return (
    <div className="App min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-surface-800 shadow-sm py-2 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-primary dark:text-primary-light text-xl font-bold">FreeLance</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </header>

      <main className="container mx-auto pt-16 px-4 md:px-6 pb-20">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="!rounded-xl !font-medium"
        progressClassName="!bg-primary"
      />
    </div>
  );
}

export default App;