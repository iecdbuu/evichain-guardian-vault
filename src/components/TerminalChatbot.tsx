
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Terminal } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  type: 'system' | 'user' | 'input' | 'success' | 'error';
  timestamp: number;
}

interface TerminalChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onNotification: (message: string, type?: 'warning' | 'alert') => void;
}

const TerminalChatbot = ({ isOpen, onClose, currentUser, onNotification }: TerminalChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [commandState, setCommandState] = useState<{
    command: string;
    step: number;
    data: Record<string, string>;
  }>({ command: '', step: 0, data: {} });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addMessage = (text: string, type: ChatMessage['type'] = 'system') => {
    const message: ChatMessage = {
      id: Date.now(),
      text,
      type,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, message]);
  };

  const typeMessage = async (text: string, type: ChatMessage['type'] = 'system', delay = 50) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      setMessages(prev => [
        ...prev.slice(0, -1),
        { id: Date.now(), text: currentText + '█', type, timestamp: Date.now() }
      ]);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    setMessages(prev => [
      ...prev.slice(0, -1),
      { id: Date.now(), text: currentText, type, timestamp: Date.now() }
    ]);
    setIsTyping(false);
  };

  const initializeChat = async () => {
    await typeMessage('> INITIALIZING CHATBOT NODE...', 'system');
    await typeMessage(':: CONNECTION SECURE [✓]', 'success');
    await typeMessage(':: WELCOME TO EVICHAIN :: Blockchain Evidence Interface', 'system');
    await typeMessage('> How can I assist you today?', 'system');
    await typeMessage("> Type 'help' to see available commands.", 'system');
  };

  const showHelp = async () => {
    await typeMessage(':: COMMAND MENU', 'system');
    await typeMessage('> add_evidence        → Submit new digital evidence', 'system');
    await typeMessage('> transfer_custody    → Change evidence ownership location', 'system');
    await typeMessage('> view_history        → View chain of custody', 'system');
    await typeMessage('> qr_code             → Generate QR code for evidence ID', 'system');
    await typeMessage('> contact             → Show EVICHAIN support details', 'system');
    await typeMessage('> login               → Authenticate as verified officer', 'system');
    await typeMessage('> exit                → End session', 'system');
  };

  const handleCommand = async (input: string) => {
    const command = input.toLowerCase().trim();
    
    if (commandState.command && commandState.step > 0) {
      await handleCommandStep(input);
      return;
    }

    switch (command) {
      case 'help':
        await showHelp();
        break;
      case 'add_evidence':
        await startAddEvidence();
        break;
      case 'transfer_custody':
        await startTransferCustody();
        break;
      case 'view_history':
        await startViewHistory();
        break;
      case 'qr_code':
        await startQRCode();
        break;
      case 'contact':
        await showContact();
        break;
      case 'login':
        await showLogin();
        break;
      case 'exit':
        await handleExit();
        break;
      default:
        await typeMessage(`:: ERROR: Unknown command '${input}' [403]`, 'error');
        await typeMessage("> Please type 'help' for a list of valid commands.", 'system');
    }
  };

  const startAddEvidence = async () => {
    setCommandState({ command: 'add_evidence', step: 1, data: {} });
    await typeMessage('> COMMAND: add_evidence', 'system');
    await typeMessage(':: Please provide the following:', 'system');
    await typeMessage('> Evidence ID: ', 'input');
  };

  const startTransferCustody = async () => {
    setCommandState({ command: 'transfer_custody', step: 1, data: {} });
    await typeMessage('> COMMAND: transfer_custody', 'system');
    await typeMessage(':: Provide the evidence details below.', 'system');
    await typeMessage('> Evidence ID: ', 'input');
  };

  const startViewHistory = async () => {
    setCommandState({ command: 'view_history', step: 1, data: {} });
    await typeMessage('> COMMAND: view_history', 'system');
    await typeMessage(':: Please enter the Evidence ID:', 'system');
    await typeMessage('> Evidence ID: ', 'input');
  };

  const startQRCode = async () => {
    setCommandState({ command: 'qr_code', step: 1, data: {} });
    await typeMessage('> COMMAND: qr_code', 'system');
    await typeMessage(':: Enter Evidence ID to generate secure QR:', 'system');
    await typeMessage('> Evidence ID: ', 'input');
  };

  const handleCommandStep = async (input: string) => {
    const { command, step, data } = commandState;

    switch (command) {
      case 'add_evidence':
        if (step === 1) {
          data.evidenceId = input;
          setCommandState({ ...commandState, step: 2, data });
          await typeMessage('> Description: ', 'input');
        } else if (step === 2) {
          data.description = input;
          setCommandState({ ...commandState, step: 3, data });
          await typeMessage('> Location of Incident: ', 'input');
        } else if (step === 3) {
          data.location = input;
          await completeAddEvidence(data);
          setCommandState({ command: '', step: 0, data: {} });
        }
        break;
      
      case 'transfer_custody':
        if (step === 1) {
          data.evidenceId = input;
          setCommandState({ ...commandState, step: 2, data });
          await typeMessage('> New Custodian Location: ', 'input');
        } else if (step === 2) {
          data.newLocation = input;
          await completeTransferCustody(data);
          setCommandState({ command: '', step: 0, data: {} });
        }
        break;
      
      case 'view_history':
        await completeViewHistory(input);
        setCommandState({ command: '', step: 0, data: {} });
        break;
      
      case 'qr_code':
        await completeQRCode(input);
        setCommandState({ command: '', step: 0, data: {} });
        break;
    }
  };

  const completeAddEvidence = async (data: Record<string, string>) => {
    await typeMessage(':: Submitting evidence...', 'system');
    await typeMessage(':: Hash generated ✅', 'success');
    await typeMessage(':: Evidence stored securely on the blockchain.', 'system');
    await typeMessage('> Status: SUCCESS ✅', 'success');
    onNotification(`Evidence ${data.evidenceId} added successfully via chatbot`, 'warning');
  };

  const completeTransferCustody = async (data: Record<string, string>) => {
    await typeMessage(':: Transferring custody...', 'system');
    await typeMessage(':: Blockchain updated with new hash reference.', 'system');
    await typeMessage('> Status: TRANSFER COMPLETE ✅', 'success');
    onNotification(`Evidence ${data.evidenceId} custody transferred via chatbot`, 'warning');
  };

  const completeViewHistory = async (evidenceId: string) => {
    await typeMessage(':: Fetching custody log...', 'system');
    await typeMessage(':: Rendering transaction history...', 'system');
    await typeMessage('', 'system');
    await typeMessage('[✓] Jan 01 2025 – Created by Officer #002', 'success');
    await typeMessage('[✓] Jan 03 2025 – Transferred to Digital Lab A', 'success');
    await typeMessage('[✓] Jan 04 2025 – Reviewed by Legal Team', 'success');
    await typeMessage('> End of log.', 'system');
  };

  const completeQRCode = async (evidenceId: string) => {
    await typeMessage(':: Generating QR Code...', 'system');
    await typeMessage('[🧾 QR_CODE_GENERATED]', 'success');
    await typeMessage('> Use this QR to scan and verify evidence on-site.', 'system');
  };

  const showContact = async () => {
    await typeMessage('> COMMAND: contact', 'system');
    await typeMessage(':: EVICHAIN Support Node Online ::', 'system');
    await typeMessage('', 'system');
    await typeMessage('📞 Phone: +91 98729 99283', 'system');
    await typeMessage('📧 Email: info@evicain.com', 'system');
    await typeMessage('📍 Address: Dehradun, Uttarakhand, India', 'system');
    await typeMessage(':: Available 24/7 for verified legal inquiries.', 'system');
  };

  const showLogin = async () => {
    if (currentUser) {
      await typeMessage('> COMMAND: login', 'system');
      await typeMessage(':: Authentication Status: ALREADY LOGGED IN', 'success');
      await typeMessage(`:: Current User: ${currentUser.username}`, 'system');
      await typeMessage(`:: Access Level: ${currentUser.role} [✓]`, 'success');
    } else {
      await typeMessage('> COMMAND: login', 'system');
      await typeMessage(':: Please use the main login interface', 'system');
      await typeMessage(':: Authentication Required', 'error');
    }
  };

  const handleExit = async () => {
    await typeMessage('> COMMAND: exit', 'system');
    await typeMessage(':: Ending Session...', 'system');
    await typeMessage(':: LOGGING OFF EVICHAIN NODE █', 'system');
    await typeMessage('> Connection Terminated [🔒]', 'system');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isTyping) {
      addMessage(`> ${currentInput}`, 'user');
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] bg-black border-forensic-green/50 text-forensic-green font-mono">
        <CardHeader className="border-b border-forensic-green/30 pb-3">
          <CardTitle className="flex items-center justify-between text-forensic-green">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              EVICHAIN Terminal Interface
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-forensic-green hover:text-red-400 hover:bg-red-900/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`text-sm ${
                  message.type === 'user' 
                    ? 'text-cyan-400' 
                    : message.type === 'success'
                    ? 'text-green-400'
                    : message.type === 'error'
                    ? 'text-red-400'
                    : message.type === 'input'
                    ? 'text-yellow-400'
                    : 'text-forensic-green'
                }`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-forensic-green/30 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 flex items-center">
                <span className="text-forensic-green mr-2">{'>'}</span>
                <Input
                  ref={inputRef}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="bg-transparent border-none text-forensic-green font-mono focus:ring-0 focus:outline-none p-0"
                  placeholder={isTyping ? "Processing..." : "Enter command..."}
                  disabled={isTyping}
                />
              </div>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                disabled={isTyping}
                className="text-forensic-green hover:bg-forensic-green/10"
              >
                Execute
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TerminalChatbot;
