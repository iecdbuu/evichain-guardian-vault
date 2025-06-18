
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import LoginForm from '../components/LoginForm';
import EvidenceManagement from '../components/EvidenceManagement';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import NotificationSystem from '../components/NotificationSystem';

// Dummy user database with evidence access
const DUMMY_USERS = [
  { username: 'detective01', password: 'evidence2024', role: 'Detective', evidenceKeys: [] },
  { username: 'forensic_admin', password: 'secure123', role: 'Forensic Admin', evidenceKeys: [] },
  { username: 'officer_jones', password: 'police456', role: 'Police Officer', evidenceKeys: [] }
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const handleLogin = (username: string, password: string) => {
    const user = DUMMY_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      console.log('User logged in:', user);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    console.log('User logged out');
  };

  const addNotification = (message: string, type: 'warning' | 'alert' = 'alert') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleString()
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-forensic-dark">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      {isLoggedIn && (
        <NotificationSystem 
          notifications={notifications}
          onRemoveNotification={removeNotification}
        />
      )}
      
      <section id="home">
        <Hero />
      </section>

      <section id="features" className="py-20">
        <Features />
      </section>

      {!isLoggedIn ? (
        <section id="login" className="py-20">
          <LoginForm onLogin={handleLogin} dummyUsers={DUMMY_USERS} />
        </section>
      ) : (
        <section id="evidence" className="py-20">
          <EvidenceManagement 
            currentUser={currentUser}
            onNotification={addNotification}
          />
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
