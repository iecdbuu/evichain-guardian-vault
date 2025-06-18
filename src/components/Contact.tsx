
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-forensic-green">Secure</span>{' '}
          <span className="text-white">Communication</span>
        </h2>
        <p className="text-gray-300 text-lg">
          Encrypted contact channels for authorized personnel
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="evidence-card tape-border">
          <CardHeader>
            <CardTitle className="text-center text-forensic-green text-2xl font-bold flex items-center justify-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🔒</span>
              </div>
              CLASSIFIED COMMUNICATION
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="bg-forensic-dark/80 border border-forensic-green/30 p-6 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">📞</div>
                  <h3 className="text-forensic-green font-semibold mb-2">Secure Line</h3>
                  <p className="text-white font-mono">+91 98729 99283</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl mb-2">📧</div>
                  <h3 className="text-forensic-blue font-semibold mb-2">Encrypted Email</h3>
                  <p className="text-white font-mono">info@evicain.com</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl mb-2">📍</div>
                  <h3 className="text-orange-400 font-semibold mb-2">Secure Facility</h3>
                  <p className="text-white">Dehradun<br />Uttarakhand, India</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/50 px-4 py-2 rounded-md">
                <span className="text-yellow-400">⚠️</span>
                <span className="text-yellow-400 font-semibold text-sm">
                  All communications are monitored and encrypted
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-gray-500">
              <div>
                <div className="text-forensic-green">STATUS:</div>
                <div>ACTIVE</div>
              </div>
              <div>
                <div className="text-forensic-blue">ENCRYPTION:</div>
                <div>AES-256</div>
              </div>
              <div>
                <div className="text-purple-400">CLEARANCE:</div>
                <div>LEVEL-3</div>
              </div>
              <div>
                <div className="text-orange-400">PROTOCOL:</div>
                <div>SECURE</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
