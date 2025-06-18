
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import LoginForm from '../components/LoginForm';
import EvidenceManagement from '../components/EvidenceManagement';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import NotificationSystem from '../components/NotificationSystem';
import LawsAndForms from '../components/LawsAndForms';
import TerminalChatbot from '../components/TerminalChatbot';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

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
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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
    setIsChatbotOpen(false);
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

      <section id="laws" className="py-20">
        <LawsAndForms />
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

      {/* Chatbot Toggle Button - Only show when logged in */}
      {isLoggedIn && (
        <Button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-forensic-green hover:bg-forensic-green/80 text-black font-bold rounded-full w-14 h-14 shadow-lg"
          size="lg"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}

      {/* Terminal Chatbot */}
      <TerminalChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        currentUser={currentUser}
        onNotification={addNotification}
      />
    </div>
  );
};

export default Index;
