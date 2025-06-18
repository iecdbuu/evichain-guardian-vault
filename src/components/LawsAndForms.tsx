
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, FileText, Scale, CheckCircle, AlertTriangle } from 'lucide-react';

const LawsAndForms = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-forensic-green mb-4 forensic-glow">
          Laws & Legal Framework
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Understanding the legal landscape of blockchain technology in Indian forensic and digital evidence systems
        </p>
      </div>

      {/* Legal Status Overview */}
      <Card className="evidence-card mb-8">
        <CardHeader>
          <CardTitle className="text-forensic-blue text-2xl font-bold flex items-center gap-2">
            <Scale className="w-8 h-8" />
            Legal Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Important Notice</span>
            </div>
            <p className="text-white">
              Blockchain is <strong>NOT yet a mandatory legal requirement</strong> in Indian forensic or digital systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Accepted</span>
              </div>
              <p className="text-white text-sm">
                Hashing and digital verification methods are accepted by courts under the IT Act.
              </p>
            </div>
            
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Voluntary Use</span>
              </div>
              <p className="text-white text-sm">
                Blockchain can be used as a voluntary, tamper-proof audit trail in chain of custody.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Technology Act, 2000 */}
      <Card className="evidence-card mb-8">
        <CardHeader>
          <CardTitle className="text-forensic-blue text-2xl font-bold flex items-center gap-2">
            <FileText className="w-8 h-8" />
            Information Technology Act, 2000 (IT Act)
            <Badge variant="outline" className="ml-2 text-yellow-400 border-yellow-400">
              Partially Applicable
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-300">
            India's IT Act does not directly mention "blockchain" or "distributed ledger technology" (DLT), but covers related aspects:
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-forensic-blue pl-4">
              <h3 className="text-forensic-green font-semibold text-lg mb-2">Section 3</h3>
              <p className="text-white">
                Recognizes digital signatures and electronic records, which are fundamental components used in blockchain technology.
              </p>
            </div>
            
            <Separator className="bg-forensic-blue/30" />
            
            <div className="border-l-4 border-forensic-blue pl-4">
              <h3 className="text-forensic-green font-semibold text-lg mb-2">Section 65B</h3>
              <p className="text-white">
                Validates digital evidence (if properly authenticated), including hash values for file integrity verification - a core blockchain feature.
              </p>
            </div>
            
            <Separator className="bg-forensic-blue/30" />
            
            <div className="border-l-4 border-forensic-blue pl-4">
              <h3 className="text-forensic-green font-semibold text-lg mb-2">Sections 43 & 66</h3>
              <p className="text-white">
                Handle tampering, hacking, and data manipulation — directly relevant for blockchain's tamper-resistance capabilities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Court Acceptance */}
      <Card className="evidence-card mb-8">
        <CardHeader>
          <CardTitle className="text-forensic-blue text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Court Acceptance Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
            <p className="text-white mb-4">
              The value of blockchain evidence in courts depends on how well it's implemented and explained, particularly:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Clear documentation of hash values and their verification process
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Accurate timestamps and chain of custody records
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Proper authentication procedures under IT Act Section 65B
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Expert testimony explaining the technology and its reliability
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="evidence-card border-orange-500/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-orange-300 text-sm">
              <strong>Legal Disclaimer:</strong> This information is for educational purposes only. 
              Always consult with qualified legal professionals for specific legal advice and current regulations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LawsAndForms;
