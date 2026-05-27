import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Services from './views/Services';
import Reserve from './views/Reserve';
import Management from './views/Management';

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/management" element={<Management />} />
      </Routes>
    </Router>
  );
}

export default App;
