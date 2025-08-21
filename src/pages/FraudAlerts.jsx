
import React from 'react';
import { motion } from 'framer-motion';
import { useTransactions } from '@/contexts/TransactionsContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FraudAlertCard from '@/components/FraudAlertCard';

const FraudAlerts = () => {
  const { fraudAlerts, isLoading } = useTransactions();
  
  const unresolvedAlerts = fraudAlerts.filter(alert => alert.status === 'unresolved');
  const resolvedAlerts = fraudAlerts.filter(alert => alert.status === 'resolved');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading fraud alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Fraud Alerts</h1>
      
      <Tabs defaultValue="unresolved" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="unresolved">
            Unresolved ({unresolvedAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved ({resolvedAlerts.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="unresolved" className="mt-6">
          {unresolvedAlerts.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <h3 className="text-xl font-medium">No unresolved fraud alerts</h3>
              <p className="text-muted-foreground mt-2">
                Great! You don't have any unresolved fraud alerts at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {unresolvedAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <FraudAlertCard alert={alert} />
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="resolved" className="mt-6">
          {resolvedAlerts.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <h3 className="text-xl font-medium">No resolved fraud alerts</h3>
              <p className="text-muted-foreground mt-2">
                You haven't resolved any fraud alerts yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {resolvedAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <FraudAlertCard alert={alert} />
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FraudAlerts;
