import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './views/Client/Home';
import Login from './views/Admin/Login';
import Services from './views/Client/Services';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;