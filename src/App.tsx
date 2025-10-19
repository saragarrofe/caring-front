// Esta pagina suele ser el “shell” de la app: layout general y <Router/> con rutas.

import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from '@pages/Home';
import Login from '@pages/LogIn';
import MyPlants from '@pages/MyPlants';
import MyPlantDetail from '@pages/MyPlantDetail';
import Register from '@pages/Register';
import { BottomNav, NavbarComponent } from './components';
import Profile from '@pages/Profile';
import TricksAndAdvices from '@pages/TricksAndAdvices';
import Welcome from '@pages/Welcome';
import { useMemo } from 'react';

function AppShell() {

   const { pathname } = useLocation();
  const hideBottomNav = ["/", "/welcome", "/login", "/register"].includes(pathname);

  const Index = () => {
    const { user } = useAuth();
    return <Navigate to={user ? '/my-plants' : '/welcome'} replace />;
  };

  return (
    <>
      <NavbarComponent />
      <main className="app-main">
        <Routes>
            <Route path="/" element={<Index />} /> 
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />

            {/* Lista y detalle */}
            <Route path="/my-plants" element={<MyPlants />} />
            <Route path="/my-plants/:id" element={<MyPlantDetail />} />

            {/* Ruta comodín para 404 - Not Found */}
            <Route path="*" element={<div>404 Not Found</div>} />

            {/* Rutas cuidados plantas */}
            <Route path="/tricks-and-advices" element={<TricksAndAdvices />} />
          </Routes>
        {!hideBottomNav && <div className="bottom-nav-spacer d-md-none" aria-hidden="true" />}
      </main>
      {!hideBottomNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppShell />
      </Router>
    </AuthProvider>
  );
}
