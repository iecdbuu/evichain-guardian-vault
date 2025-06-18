
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle, Shield } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  type: 'warning' | 'alert';
  timestamp: string;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemoveNotification: (id: number) => void;
}

const NotificationSystem = ({ notifications, onRemoveNotification }: NotificationSystemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-40 max-w-md">
      <Card className="evidence-card border-red-500/50 bg-red-900/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-400 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security Alerts ({notifications.length})
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-red-400 hover:text-red-300 p-1"
            >
              {isExpanded ? '−' : '+'}
            </Button>
          </CardTitle>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="space-y-2 max-h-60 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-md border ${
                  notification.type === 'alert' 
                    ? 'bg-red-900/30 border-red-500/30' 
                    : 'bg-yellow-900/30 border-yellow-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                      notification.type === 'alert' ? 'text-red-400' : 'text-yellow-400'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-sm ${
                        notification.type === 'alert' ? 'text-red-300' : 'text-yellow-300'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveNotification(notification.id)}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default NotificationSystem;
