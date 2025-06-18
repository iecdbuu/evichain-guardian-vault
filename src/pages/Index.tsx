
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import LoginForm from '../components/LoginForm';
import EvidenceManagement from '../components/EvidenceManagement';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    // Simple login validation for demo
    if (username && password) {
      setIsLoggedIn(true);
      console.log('User logged in:', username);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-forensic-dark">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <section id="home">
        <Hero />
      </section>

      <section id="features" className="py-20">
        <Features />
      </section>

      {!isLoggedIn ? (
        <section id="login" className="py-20">
          <LoginForm onLogin={handleLogin} />
        </section>
      ) : (
        <section id="evidence" className="py-20">
          <EvidenceManagement />
        </section>
      )}

      <section id="contact" className="py-20">
        <Contact />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
