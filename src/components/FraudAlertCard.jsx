
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionsContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const FraudAlertCard = ({ alert }) => {
  const { resolveFraudAlert } = useTransactions();
  
  const handleResolve = () => {
    resolveFraudAlert(alert.id);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "overflow-hidden",
        alert.status === 'unresolved' && alert.riskLevel === 'high' && "fraud-alert border-destructive"
      )}>
        <div className={cn(
          "h-2",
          alert.riskLevel === 'high' ? "bg-destructive" : 
          alert.riskLevel === 'medium' ? "bg-warning" : "bg-primary"
        )} />
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-base font-medium">
              {alert.riskLevel === 'high' ? (
                <ShieldAlert className="inline-block mr-2 h-5 w-5 text-destructive" />
              ) : (
                <AlertTriangle className="inline-block mr-2 h-5 w-5 text-warning" />
              )}
              {alert.description}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {format(new Date(alert.date), 'MMM dd, yyyy')}
            </p>
          </div>
          <div className={cn(
            "rounded-full px-2 py-1 text-xs font-semibold",
            alert.riskLevel === 'high' 
              ? "bg-destructive/10 text-destructive" 
              : "bg-warning/10 text-warning"
          )}>
            {alert.riskLevel.toUpperCase()} RISK
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Amount</p>
              <p className="text-lg font-bold">${alert.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className={cn(
                "text-sm font-medium",
                alert.status === 'resolved' ? "text-success" : "text-destructive"
              )}>
                {alert.status === 'resolved' ? (
                  <span className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Resolved
                  </span>
                ) : (
                  <span className="flex items-center">
                    <AlertTriangle className="mr-1 h-4 w-4" />
                    Unresolved
                  </span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
        {alert.status === 'unresolved' && (
          <CardFooter>
            <Button 
              onClick={handleResolve} 
              className="w-full"
              variant={alert.riskLevel === 'high' ? "default" : "outline"}
            >
              Mark as Resolved
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default FraudAlertCard;
