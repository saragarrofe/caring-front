// Esta pagina suele ser el "shell" de la app: layout general y <Router/> con rutas.

import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import { BottomNav } from './components';

import Welcome from '@pages/Welcome/Welcome';
import Login from '@pages/Auth/LogIn/Login';
import Register from '@pages/Auth/Register/Register';
import ForgotPassword from '@pages/Auth/ForgotPassword/ForgotPassword';
import Home from '@pages/Home/Home';
import MyPlants from '@pages/PlantList/PlantList';
import MyPlantDetail from '@pages/PlantDetail/PlantDetail';
import Profile from '@pages/Profile/Profile';
import Discover from '@pages/Discover/Discover';
import NotFound from '@pages/NotFound/NotFound';

const AUTH_ROUTES = ['/', '/welcome', '/login', '/register', '/forgot-password'];

function AppShell() {
  const { pathname } = useLocation();
  const hideBottomNav = AUTH_ROUTES.includes(pathname);

  const Index = () => {
    const { user } = useAuth();
    return <Navigate to={user ? '/my-plants' : '/welcome'} replace />;
  };

  return (
    <>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/my-plants" element={<MyPlants />} />
          <Route path="/my-plants/:id" element={<MyPlantDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="*" element={<NotFound />} />
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
