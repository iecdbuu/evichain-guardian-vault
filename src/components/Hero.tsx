
import { Button } from '@/components/ui/button';

const Hero = () => {
  const enterSite = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      {/* Moving Grid Lines */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-forensic-green/30 to-transparent animate-grid-move"></div>
        <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-forensic-blue/30 to-transparent animate-grid-move" style={{ left: '20%' }}></div>
        <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-forensic-green/20 to-transparent animate-grid-move" style={{ left: '60%', animationDelay: '5s' }}></div>
      </div>

      {/* Fingerprint Pattern */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-forensic-green">
          <path
            d="M50 10c22.091 0 40 17.909 40 40s-17.909 40-40 40S10 72.091 10 50 27.909 10 50 10zm0 8c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0 8c13.255 0 24 10.745 24 24s-10.745 24-24 24-24-10.745-24-24 10.745-24 24-24zm0 8c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Evidence Tag */}
      <div className="absolute bottom-20 left-20 tape-border">
        <div className="bg-yellow-400/80 text-black px-4 py-2 rotate-12 font-bold text-sm">
          EVIDENCE #001
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-forensic-green animate-glow">EVI</span>
            <span className="text-forensic-blue">CHAIN</span>
          </h1>
          
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Blockchain-powered Platform
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Blockchain-powered platform for securely storing digital evidence —<br />
              <span className="text-forensic-green font-semibold">tamper-proof and trusted.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-forensic-green">
              <div className="w-2 h-2 bg-forensic-green rounded-full animate-pulse"></div>
              <span className="font-semibold">Store</span>
            </div>
            <div className="w-px h-6 bg-gray-500 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-forensic-blue">
              <div className="w-2 h-2 bg-forensic-blue rounded-full animate-pulse"></div>
              <span className="font-semibold">Verify</span>
            </div>
            <div className="w-px h-6 bg-gray-500 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-white">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-semibold">Protect</span>
            </div>
          </div>

          <Button
            onClick={enterSite}
            size="lg"
            className="bg-forensic-green hover:bg-forensic-green/80 text-black font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
          >
            Enter Site
          </Button>
        </div>
      </div>

      {/* Digital Noise Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ff41' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
  );
};

export default Hero;
