
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import { BottomNav } from './components';

import Landing from '@pages/Landing/Landing';
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
import { Sidebar } from '@components/Sidebar/Sidebar';

const NO_BOTTOM_NAV = ['/', '/welcome', '/login', '/register', '/forgot-password'];
const NO_SIDEBAR_NAV =  ['/', '/welcome', '/login', '/register', '/forgot-password'];

function AppShell() {
  const { pathname } = useLocation();
  const hideBottomNav = NO_BOTTOM_NAV.includes(pathname);
  const hideSidebarNav = NO_SIDEBAR_NAV.includes(pathname)

  return (
    <>
      <main className={`app-main${!hideSidebarNav ? ' app-main--with-sidebar' : ''}`}>
        <Routes>
          <Route path="/" element={<Landing />} />
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
      {!hideSidebarNav && <Sidebar />}
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
