import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/Client/Home';
import Login from './views/Admin/Login';
import Services from './views/Client/Services';
import Reserve from './views/Client/Reserve';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

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
      </Routes>
    </Router>
  );
}

export default App;
