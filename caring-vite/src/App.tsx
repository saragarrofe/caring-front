import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlantDetail from './pages/PlantDetail';
import Navbar from './components/Navbar/Navbar';



const App: React.FC = () => {

  return (
    <Router>
      <div>
        <Navbar />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plant" element={<PlantDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
