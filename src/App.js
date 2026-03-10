import { useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { PWAProvider } from './contexts/PWAContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Toaster } from './components/ui/sonner';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import RenovationService from './pages/RenovationService';
import MaintenanceService from './pages/MaintenanceService';
import RentMaximizationService from './pages/RentMaximizationService';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import OwnerPortal from './pages/OwnerPortal';
import TenantPortal from './pages/TenantPortal';
import ServicePortal from './pages/ServicePortal';
import TenantApp from './pages/TenantApp';

// Layout wrapper to conditionally show navbar/footer
function AppLayout({ children, onOpenAuth }) {
  const location = useLocation();
  const isTenantApp = location.pathname === '/tenant-app';

  return (
    <div className="min-h-screen flex flex-col">
      {!isTenantApp && <Navbar onOpenAuth={onOpenAuth} />}
      <main className="flex-1">
        {children}
      </main>
      {!isTenantApp && <Footer />}
    </div>
  );
}

function App() {
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  const openAuth = (mode) => {
    setAuthModal({ open: true, mode });
  };

  const closeAuth = () => {
    setAuthModal({ open: false, mode: 'login' });
  };

  return (
    <HelmetProvider>
      <PWAProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppLayout onOpenAuth={openAuth}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/renovations" element={<RenovationService />} />
              <Route path="/services/maintenance" element={<MaintenanceService />} />
              <Route path="/services/rent-maximization" element={<RentMaximizationService />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/owner-portal" element={<OwnerPortal />} />
              <Route path="/tenant-portal" element={<TenantPortal />} />
              <Route path="/service-portal" element={<ServicePortal />} />
              <Route path="/tenant-app" element={<TenantApp />} />
            </Routes>
          </AppLayout>
          <AuthModal 
            isOpen={authModal.open} 
            onClose={closeAuth} 
            initialMode={authModal.mode}
          />
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </AuthProvider>
      </PWAProvider>
    </HelmetProvider>
  );
}

export default App;
