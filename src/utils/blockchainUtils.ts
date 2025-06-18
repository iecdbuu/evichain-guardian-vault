
// Blockchain-inspired hash generation utilities
export const generateBlockchainHash = (evidenceId: string, uploaderId: string, timestamp: number): string => {
  // Simulate blockchain hash generation with unique salt
  const data = `${evidenceId}-${uploaderId}-${timestamp}-${Math.random()}`;
  let hash = 0;
  
  // Simple hash function for demonstration (in real blockchain, this would be SHA-256 or similar)
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert to hex and ensure it's long enough
  const baseHash = Math.abs(hash).toString(16);
  const randomSuffix = Math.random().toString(16).substr(2, 8);
  
  return `0x${baseHash}${randomSuffix}`.toLowerCase().padStart(66, '0').substr(0, 66);
};

export const generateQRCodeData = (evidenceId: string, hashKey: string): string => {
  return JSON.stringify({
    evidenceId,
    hashKey,
    timestamp: Date.now(),
    blockchain: 'EVICHAIN',
    version: '1.0'
  });
};

export const verifyHashIntegrity = (hashKey: string): boolean => {
  // Simulate hash verification against blockchain
  return hashKey.startsWith('0x') && hashKey.length === 66;
};

export const logAccessAttempt = (evidenceId: string, hashKey: string, userId: string): void => {
  const accessLog = {
    evidenceId,
    hashKey,
    userId,
    timestamp: new Date().toISOString(),
    action: 'ACCESS_ATTEMPT',
    ip: 'xxx.xxx.xxx.xxx' // In real implementation, get actual IP
  };
  
  console.log('🔒 Evidence Access Logged:', accessLog);
  
  // In real implementation, this would be sent to blockchain/database
  localStorage.setItem(`access_log_${Date.now()}`, JSON.stringify(accessLog));
};
