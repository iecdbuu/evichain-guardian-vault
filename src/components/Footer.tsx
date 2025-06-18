
const Footer = () => {
  return (
    <footer className="bg-forensic-dark border-t border-forensic-green/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-forensic-green rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs">E</span>
            </div>
            <span className="text-forensic-green font-bold">EVICHAIN</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © 2025 EVICHAIN. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Secured by blockchain technology
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-forensic-green/20">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>🔒 Military-Grade Security</span>
            <span>⛓️ Blockchain Verified</span>
            <span>🛡️ Tamper-Proof Storage</span>
            <span>📊 Real-Time Monitoring</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
