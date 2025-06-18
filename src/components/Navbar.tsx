
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-forensic-dark/90 backdrop-blur-md border-b border-forensic-green/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-forensic-green rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-forensic-green forensic-glow">
              EVICHAIN
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-forensic-green transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-white hover:text-forensic-green transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('laws')}
              className="text-white hover:text-forensic-green transition-colors"
            >
              Laws & Forms
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-forensic-green transition-colors"
            >
              Contact
            </button>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => scrollToSection('evidence')}
                  className="text-white hover:text-forensic-green transition-colors"
                >
                  Evidence
                </button>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="border-forensic-green text-forensic-green hover:bg-forensic-green hover:text-black"
                >
                  Logout
                </Button>
              </>
            ) : (
              <button
                onClick={() => scrollToSection('login')}
                className="text-white hover:text-forensic-green transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-full h-0.5 bg-current transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-full h-0.5 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-full h-0.5 bg-current transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-forensic-green/30">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-forensic-green transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-white hover:text-forensic-green transition-colors text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('laws')}
                className="text-white hover:text-forensic-green transition-colors text-left"
              >
                Laws & Forms
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-forensic-green transition-colors text-left"
              >
                Contact
              </button>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => scrollToSection('evidence')}
                    className="text-white hover:text-forensic-green transition-colors text-left"
                  >
                    Evidence
                  </button>
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    className="border-forensic-green text-forensic-green hover:bg-forensic-green hover:text-black w-fit"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <button
                  onClick={() => scrollToSection('login')}
                  className="text-white hover:text-forensic-green transition-colors text-left"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
