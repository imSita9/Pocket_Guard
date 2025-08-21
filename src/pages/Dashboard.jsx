import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionsContext';
import { Button } from '@/components/ui/button';
import FinancialSummary from '@/components/FinancialSummary';
import SpendingChart from '@/components/SpendingChart';
import SpendingForecast from '@/components/SpendingForecast';
import TransactionList from '@/components/TransactionList';
import TransactionForm from '@/components/TransactionForm';
import FraudAlertCard from '@/components/FraudAlertCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { fraudAlerts, isLoading } = useTransactions();
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const navigate = useNavigate();
  
  const unresolvedAlerts = fraudAlerts.filter(alert => alert.status === 'unresolved');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button onClick={() => setIsAddingTransaction(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </div>
      
      <FinancialSummary />
      
      {unresolvedAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Fraud Alerts</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {unresolvedAlerts.slice(0, 2).map(alert => (
              <FraudAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SpendingChart />
        <SpendingForecast />
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Button variant="outline" onClick={() => navigate('/transactions')}>
            View All
          </Button>
        </div>
        <TransactionList limit={5} />
      </div>
      
      <TransactionForm 
        isOpen={isAddingTransaction} 
        onClose={() => setIsAddingTransaction(false)} 
      />
    </div>
  );
};

export default Dashboard;