
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      title: 'Secure Storage',
      description: 'Military-grade encryption ensures your evidence remains protected and tamper-proof.',
      icon: '🔒',
      gradient: 'from-forensic-green/20 to-forensic-green/5'
    },
    {
      title: 'Hash Verification',
      description: 'Blockchain-based hash verification guarantees the integrity of stored evidence.',
      icon: '🔗',
      gradient: 'from-forensic-blue/20 to-forensic-blue/5'
    },
    {
      title: 'Access Control',
      description: 'Role-based permissions ensure only authorized personnel can access evidence.',
      icon: '👤',
      gradient: 'from-purple-500/20 to-purple-500/5'
    },
    {
      title: 'Real-time Logs',
      description: 'Complete audit trail with real-time logging of all evidence interactions.',
      icon: '📊',
      gradient: 'from-orange-500/20 to-orange-500/5'
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-forensic-green">Advanced</span>{' '}
          <span className="text-white">Features</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Built with cutting-edge blockchain technology to ensure the highest standards 
          of evidence management and digital forensics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className={`evidence-card hover:scale-105 transition-all duration-300 bg-gradient-to-br ${feature.gradient} border-forensic-green/30`}
          >
            <CardHeader className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle className="text-forensic-green text-xl font-bold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Digital Evidence Grid */}
      <div className="mt-16 relative">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Digital Evidence Classification
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
          {['DNA-001', 'FP-047', 'IMG-293', 'DOC-156', 'VID-089', 'AUD-734', 'NET-412', 'SYS-901'].map((evidence, index) => (
            <div 
              key={index}
              className="bg-forensic-gray border border-forensic-green/20 p-3 text-center text-forensic-green font-mono text-sm"
            >
              {evidence}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
