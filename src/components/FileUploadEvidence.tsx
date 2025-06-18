
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { generateBlockchainHash } from '../utils/blockchainUtils';

interface FileUploadEvidenceProps {
  currentUser: any;
  onNotification: (message: string, type?: 'warning' | 'alert') => void;
}

interface UploadedFile {
  file: File;
  id: string;
  hash: string;
  preview?: string;
}

const FileUploadEvidence = ({ currentUser, onNotification }: FileUploadEvidenceProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [evidenceData, setEvidenceData] = useState({
    id: '',
    description: '',
    location: '',
    category: 'Digital Evidence'
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    selectedFiles.forEach((file) => {
      const fileId = `FILE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const hash = generateBlockchainHash(fileId, currentUser.username, Date.now());
      
      const uploadedFile: UploadedFile = {
        file,
        id: fileId,
        hash
      };

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFile.preview = e.target?.result as string;
          setFiles(prev => [...prev, uploadedFile]);
        };
        reader.readAsDataURL(file);
      } else {
        setFiles(prev => [...prev, uploadedFile]);
      }
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one file to upload as evidence.",
        variant: "destructive"
      });
      return;
    }

    if (!evidenceData.id || !evidenceData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide evidence ID and description.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate file upload process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create evidence record with file hashes
      const evidenceRecord = {
        ...evidenceData,
        files: files.map(f => ({
          filename: f.file.name,
          size: f.file.size,
          type: f.file.type,
          hash: f.hash,
          uploadTime: new Date().toISOString()
        })),
        timestamp: new Date().toISOString(),
        uploader: currentUser.username,
        blockchainHash: generateBlockchainHash(evidenceData.id, currentUser.username, Date.now())
      };

      console.log('Evidence uploaded:', evidenceRecord);

      toast({
        title: "Evidence Uploaded Successfully",
        description: `Evidence ${evidenceData.id} with ${files.length} file(s) has been stored on the blockchain.`,
      });

      onNotification(`Evidence ${evidenceData.id} uploaded with ${files.length} file(s)`, 'warning');

      // Reset form
      setEvidenceData({ id: '', description: '', location: '', category: 'Digital Evidence' });
      setFiles([]);

    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload evidence. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="evidence-card">
      <CardHeader>
        <CardTitle className="text-forensic-blue text-2xl font-bold">
          📁 Upload Evidence Files
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Evidence Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="evidence-id" className="text-forensic-blue font-semibold">
                Evidence ID *
              </Label>
              <Input
                id="evidence-id"
                value={evidenceData.id}
                onChange={(e) => setEvidenceData({ ...evidenceData, id: e.target.value })}
                className="bg-forensic-gray border-forensic-blue/30 text-white focus:border-forensic-blue"
                placeholder="EVD-FILE-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-forensic-blue font-semibold">
                Location
              </Label>
              <Input
                id="location"
                value={evidenceData.location}
                onChange={(e) => setEvidenceData({ ...evidenceData, location: e.target.value })}
                className="bg-forensic-gray border-forensic-blue/30 text-white focus:border-forensic-blue"
                placeholder="Crime scene location"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-forensic-blue font-semibold">
              Description *
            </Label>
            <Textarea
              id="description"
              value={evidenceData.description}
              onChange={(e) => setEvidenceData({ ...evidenceData, description: e.target.value })}
              className="bg-forensic-gray border-forensic-blue/30 text-white focus:border-forensic-blue"
              placeholder="Detailed description of the evidence files..."
              required
            />
          </div>

          {/* File Upload Area */}
          <div className="space-y-4">
            <Label className="text-forensic-blue font-semibold">Evidence Files</Label>
            
            <div className="border-2 border-dashed border-forensic-blue/30 rounded-lg p-8 text-center hover:border-forensic-blue/50 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*,video/*,.pdf,.doc,.docx,.txt,.zip,.rar"
              />
              
              <Upload className="w-12 h-12 text-forensic-blue mx-auto mb-4" />
              <p className="text-white mb-2">
                Drag and drop files here, or click to select
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Supported: Images, Videos, Documents, Archives
              </p>
              
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-forensic-blue hover:bg-forensic-blue/80 text-black font-bold"
              >
                Select Files
              </Button>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-forensic-blue font-semibold">Selected Files ({files.length})</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((uploadedFile) => (
                  <div
                    key={uploadedFile.id}
                    className="flex items-center gap-3 p-3 bg-forensic-gray/50 border border-forensic-blue/30 rounded-md"
                  >
                    {uploadedFile.preview ? (
                      <img
                        src={uploadedFile.preview}
                        alt={uploadedFile.file.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      <File className="w-10 h-10 text-forensic-blue" />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formatFileSize(uploadedFile.file.size)} • {uploadedFile.file.type}
                      </p>
                      <p className="text-forensic-blue text-xs font-mono">
                        Hash: {uploadedFile.hash.substr(0, 16)}...
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isUploading || files.length === 0}
            className="w-full bg-forensic-blue hover:bg-forensic-blue/80 text-black font-bold py-3"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                Uploading to Blockchain...
              </>
            ) : (
              `Upload ${files.length} File(s) as Evidence`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FileUploadEvidence;
