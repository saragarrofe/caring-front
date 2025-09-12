// Esta pagina suele ser el “shell” de la app: layout general y <Router/> con rutas.

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Login from '@pages/Login';
import MyPlants from '@pages/MyPlants';
import MyPlantDetail from '@pages/MyPlantDetail';
import NavbarComponent from '@components/Navbar/Navbar';
import Register from '@pages/Register';

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Lista y detalle */}
          <Route path="/my-plants" element={<MyPlants />} />
          <Route path="/my-plants/:id" element={<MyPlantDetail />} />

          {/* Ruta comodín para 404 - Not Found */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
