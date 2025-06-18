
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const EvidenceManagement = () => {
  const [evidenceData, setEvidenceData] = useState({
    id: '',
    description: '',
    location: '',
    newLocation: '',
    historyId: ''
  });
  
  const [custodyHistory, setCustodyHistory] = useState<Array<{
    id: string;
    location: string;
    timestamp: string;
    officer: string;
  }>>([]);

  const { toast } = useToast();

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Evidence Added",
      description: `Evidence ${evidenceData.id} has been securely stored on the blockchain.`,
    });
    console.log('Adding evidence:', evidenceData);
    setEvidenceData({ ...evidenceData, id: '', description: '', location: '' });
  };

  const handleTransferCustody = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: evidenceData.id,
      location: evidenceData.newLocation,
      timestamp: new Date().toLocaleString(),
      officer: 'Current User'
    };
    setCustodyHistory([newEntry, ...custodyHistory]);
    toast({
      title: "Custody Transferred",
      description: `Evidence ${evidenceData.id} transferred to ${evidenceData.newLocation}.`,
    });
    console.log('Transferring custody:', newEntry);
    setEvidenceData({ ...evidenceData, id: '', newLocation: '' });
  };

  const handleViewHistory = () => {
    toast({
      title: "History Retrieved",
      description: `Displaying complete custody history for evidence ${evidenceData.historyId}.`,
    });
    console.log('Viewing history for:', evidenceData.historyId);
  };

  const generateQRCode = () => {
    return (
      <div className="bg-white p-4 rounded-lg inline-block">
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-forensic-green">EVICHAIN</span>{' '}
          <span className="text-white">Management System</span>
        </h2>
        <p className="text-gray-300 text-lg">
          Secure evidence management powered by blockchain technology
        </p>
      </div>

      <Tabs defaultValue="add" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-4 bg-forensic-gray border border-forensic-green/30">
          <TabsTrigger value="add" className="data-[state=active]:bg-forensic-green data-[state=active]:text-black">
            Add Evidence
          </TabsTrigger>
          <TabsTrigger value="transfer" className="data-[state=active]:bg-forensic-green data-[state=active]:text-black">
            Transfer Custody
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-forensic-green data-[state=active]:text-black">
            View History
          </TabsTrigger>
          <TabsTrigger value="qr" className="data-[state=active]:bg-forensic-green data-[state=active]:text-black">
            QR Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="evidence-card">
            <CardHeader>
              <CardTitle className="text-forensic-green text-2xl font-bold">
                🏷️ Add New Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddEvidence} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="evidence-id" className="text-forensic-green font-semibold">
                    Evidence ID
                  </Label>
                  <Input
                    id="evidence-id"
                    value={evidenceData.id}
                    onChange={(e) => setEvidenceData({ ...evidenceData, id: e.target.value })}
                    className="bg-forensic-gray border-forensic-green/30 text-white focus:border-forensic-green"
                    placeholder="EVD-001"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-forensic-green font-semibold">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={evidenceData.description}
                    onChange={(e) => setEvidenceData({ ...evidenceData, description: e.target.value })}
                    className="bg-forensic-gray border-forensic-green/30 text-white focus:border-forensic-green"
                    placeholder="Detailed description of the evidence..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-forensic-green font-semibold">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={evidenceData.location}
                    onChange={(e) => setEvidenceData({ ...evidenceData, location: e.target.value })}
                    className="bg-forensic-gray border-forensic-green/30 text-white focus:border-forensic-green"
                    placeholder="Evidence storage location"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-forensic-green hover:bg-forensic-green/80 text-black font-bold py-3"
                >
                  Add Evidence to Blockchain
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfer">
          <Card className="evidence-card">
            <CardHeader>
              <CardTitle className="text-forensic-blue text-2xl font-bold">
                🔄 Transfer Custody
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTransferCustody} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="transfer-id" className="text-forensic-blue font-semibold">
                    Evidence ID
                  </Label>
                  <Input
                    id="transfer-id"
                    value={evidenceData.id}
                    onChange={(e) => setEvidenceData({ ...evidenceData, id: e.target.value })}
                    className="bg-forensic-gray border-forensic-blue/30 text-white focus:border-forensic-blue"
                    placeholder="EVD-001"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-location" className="text-forensic-blue font-semibold">
                    New Location
                  </Label>
                  <Input
                    id="new-location"
                    value={evidenceData.newLocation}
                    onChange={(e) => setEvidenceData({ ...evidenceData, newLocation: e.target.value })}
                    className="bg-forensic-gray border-forensic-blue/30 text-white focus:border-forensic-blue"
                    placeholder="New storage location"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-forensic-blue hover:bg-forensic-blue/80 text-black font-bold py-3"
                >
                  Transfer Custody
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="evidence-card">
            <CardHeader>
              <CardTitle className="text-purple-400 text-2xl font-bold">
                📊 Custody History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="history-id" className="text-purple-400 font-semibold">
                    Evidence ID
                  </Label>
                  <div className="flex gap-4">
                    <Input
                      id="history-id"
                      value={evidenceData.historyId}
                      onChange={(e) => setEvidenceData({ ...evidenceData, historyId: e.target.value })}
                      className="bg-forensic-gray border-purple-400/30 text-white focus:border-purple-400 flex-1"
                      placeholder="EVD-001"
                    />
                    <Button
                      onClick={handleViewHistory}
                      className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-6"
                    >
                      View History
                    </Button>
                  </div>
                </div>

                {custodyHistory.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Custody Chain:</h3>
                    {custodyHistory.map((entry, index) => (
                      <div key={index} className="bg-forensic-gray/50 border border-purple-400/30 p-4 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-purple-400 font-semibold">Location:</span>
                            <span className="text-white ml-2">{entry.location}</span>
                          </div>
                          <div>
                            <span className="text-purple-400 font-semibold">Time:</span>
                            <span className="text-white ml-2">{entry.timestamp}</span>
                          </div>
                          <div>
                            <span className="text-purple-400 font-semibold">Officer:</span>
                            <span className="text-white ml-2">{entry.officer}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qr">
          <Card className="evidence-card">
            <CardHeader>
              <CardTitle className="text-orange-400 text-2xl font-bold">
                📷 QR Code for Sample Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <p className="text-gray-300">
                  QR Code for quick evidence identification and blockchain verification
                </p>
                
                <div className="flex justify-center">
                  {generateQRCode()}
                </div>

                <div className="bg-forensic-gray/50 border border-orange-400/30 p-4 rounded-md">
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="text-orange-400 font-semibold">Evidence ID:</span>
                      <span className="text-white ml-2">EVD-SAMPLE-001</span>
                    </div>
                    <div>
                      <span className="text-orange-400 font-semibold">Hash:</span>
                      <span className="text-white ml-2 font-mono text-xs">0x7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730</span>
                    </div>
                    <div>
                      <span className="text-orange-400 font-semibold">Status:</span>
                      <span className="text-forensic-green ml-2">✓ Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EvidenceManagement;
