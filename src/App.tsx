import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import LogIn from '@pages/LogIn';
import PlantDetail from '@components/MyPlants/PlantDetail/PlantDetail';
import NavbarComponent from '@components/Navbar/Navbar';




const App: React.FC = () => {

  return (
    <Router>
        <NavbarComponent />
      <div>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/plants" element={<PlantDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
