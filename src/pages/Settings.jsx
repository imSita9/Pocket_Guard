
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Moon, Sun, Trash2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTransactions } from '@/contexts/TransactionsContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  
  const handleResetData = () => {
    // Clear localStorage
    localStorage.removeItem('transactions');
    localStorage.removeItem('fraudAlerts');
    
    // Show success toast
    toast({
      title: "Data Reset",
      description: "All your data has been reset. The page will reload.",
    });
    
    // Close dialog
    setIsResetDialogOpen(false);
    
    // Reload the page after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      
      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="mr-2 h-5 w-5" />
                <Moon className="mr-2 h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how the app looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme-toggle" className="font-medium">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark mode
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleTheme}
                  className="h-10 w-10"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="fraud-alerts" className="font-medium">
                    Fraud Alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when suspicious activity is detected
                  </p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary p-1">
                  <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="spending-alerts" className="font-medium">
                    Spending Alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you exceed your spending limits
                  </p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-muted p-1">
                  <div className="h-4 w-4 rounded-full bg-muted-foreground transition-transform"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="fraud-detection" className="font-medium">
                    Fraud Detection
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable advanced fraud detection algorithms
                  </p>
                </div>
                <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-primary p-1">
                  <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-destructive">
                <Trash2 className="mr-2 h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions that affect your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                onClick={() => setIsResetDialogOpen(true)}
              >
                Reset All Data
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset All Data</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete all your transactions and settings.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleResetData}>
              Yes, Reset All Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
