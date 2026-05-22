import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './views/Client/Home';
import Login from './views/Admin/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;