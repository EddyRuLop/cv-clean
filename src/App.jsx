import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Chat from './pages/Chat';
import Plantillas from './pages/Plantillas';
import CvCreado from './pages/CvCreado';
import PDF from './pages/PDF'; // Asegúrate de que este componente exista


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} /> 
        <Route path="/chat" element={<Chat />} /> 
        <Route path="/plantillas" element={<Plantillas />} /> 
        <Route path="/cvcreado/:templateId" element={<CvCreado />} />
        <Route path="/pdf" element={<PDF />} /> 
      </Routes>
    </Router>
  );
}

export default App;