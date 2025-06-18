
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateBlockchainHash, generateQRCodeData, logAccessAttempt } from '../utils/blockchainUtils';

interface QRScannerProps {
  currentUser: any;
  onNotification: (message: string, type?: 'warning' | 'alert') => void;
}

const QRScanner = ({ currentUser, onNotification }: QRScannerProps) => {
  const [scannedCode, setScannedCode] = useState('');
  const [evidenceId, setEvidenceId] = useState('');
  const [generatedHash, setGeneratedHash] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const handleScanQR = () => {
    if (!evidenceId) {
      toast({
        title: "Error",
        description: "Please enter an evidence ID to generate QR code",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate QR scanning process
    setTimeout(() => {
      const hashKey = generateBlockchainHash(evidenceId, currentUser.username, Date.now());
      const qrData = generateQRCodeData(evidenceId, hashKey);
      
      setGeneratedHash(hashKey);
      setScannedCode(qrData);
      
      // Save hash key to user's evidence keys (in real app, this would be saved to database)
      if (!currentUser.evidenceKeys) {
        currentUser.evidenceKeys = [];
      }
      currentUser.evidenceKeys.push({
        evidenceId,
        hashKey,
        timestamp: new Date().toISOString()
      });
      
      // Log the access
      logAccessAttempt(evidenceId, hashKey, currentUser.username);
      
      toast({
        title: "QR Code Generated",
        description: `Blockchain hash generated for evidence ${evidenceId}`,
      });
      
      setIsScanning(false);
    }, 2000);
  };

  const handleAccessEvidence = () => {
    if (!scannedCode) {
      toast({
        title: "Error",
        description: "No QR code data available",
        variant: "destructive",
      });
      return;
    }

    try {
      const qrData = JSON.parse(scannedCode);
      
      // Check if current user has access to this evidence
      const hasAccess = currentUser.evidenceKeys?.some(
        (key: any) => key.evidenceId === qrData.evidenceId && key.hashKey === qrData.hashKey
      );
      
      if (hasAccess) {
        toast({
          title: "Access Granted",
          description: `You have access to evidence ${qrData.evidenceId}`,
        });
      } else {
        // Unauthorized access attempt
        onNotification(
          `⚠️ SECURITY ALERT: Unauthorized access attempt to evidence ${qrData.evidenceId} by ${currentUser.username}`,
          'alert'
        );
        
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this evidence",
          variant: "destructive",
        });
        
        // In real implementation, this would notify authorities
        console.log('🚨 UNAUTHORIZED ACCESS ATTEMPT DETECTED 🚨');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid QR code format",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* QR Generation */}
      <Card className="evidence-card">
        <CardHeader>
          <CardTitle className="text-forensic-green text-xl font-bold">
            📱 Generate Evidence QR Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="evidence-id-qr" className="text-forensic-green font-semibold">
                Evidence ID
              </Label>
              <Input
                id="evidence-id-qr"
                value={evidenceId}
                onChange={(e) => setEvidenceId(e.target.value)}
                className="bg-forensic-gray border-forensic-green/30 text-white focus:border-forensic-green"
                placeholder="EVD-001"
              />
            </div>
            
            <Button
              onClick={handleScanQR}
              disabled={isScanning || !evidenceId}
              className="w-full bg-forensic-green hover:bg-forensic-green/80 text-black font-bold py-3"
            >
              {isScanning ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Generating Blockchain Hash...
                </div>
              ) : (
                'Generate QR Code & Hash'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Hash Display */}
      {generatedHash && (
        <Card className="evidence-card border-forensic-green/50">
          <CardHeader>
            <CardTitle className="text-forensic-green text-xl font-bold">
              🔗 Generated Blockchain Hash
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-forensic-gray/50 border border-forensic-green/30 p-4 rounded-md">
                <div className="text-sm space-y-2">
                  <div>
                    <span className="text-forensic-green font-semibold">Evidence ID:</span>
                    <span className="text-white ml-2">{evidenceId}</span>
                  </div>
                  <div>
                    <span className="text-forensic-green font-semibold">Hash Key:</span>
                    <span className="text-white ml-2 font-mono text-xs break-all">{generatedHash}</span>
                  </div>
                  <div>
                    <span className="text-forensic-green font-semibold">Owner:</span>
                    <span className="text-white ml-2">{currentUser.username}</span>
                  </div>
                  <div>
                    <span className="text-forensic-green font-semibold">Status:</span>
                    <span className="text-forensic-green ml-2">✓ Secured on Blockchain</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleAccessEvidence}
                className="w-full bg-forensic-blue hover:bg-forensic-blue/80 text-black font-bold py-2"
              >
                Test Evidence Access
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QRScanner;
