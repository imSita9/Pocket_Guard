import React, { createContext, useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { 
  CATEGORIES, 
  SAMPLE_TRANSACTIONS, 
  SAMPLE_FRAUD_ALERTS 
} from '@/config/transactionData';
import { detectPotentialFraud, calculateSpendingForecastUtil } from '@/lib/transactionUtils';

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = () => {
      const savedTransactions = localStorage.getItem('transactions');
      const savedFraudAlerts = localStorage.getItem('fraudAlerts');
      
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        setTransactions(SAMPLE_TRANSACTIONS);
        localStorage.setItem('transactions', JSON.stringify(SAMPLE_TRANSACTIONS));
      }
      
      if (savedFraudAlerts) {
        setFraudAlerts(JSON.parse(savedFraudAlerts));
      } else {
        setFraudAlerts(SAMPLE_FRAUD_ALERTS);
        localStorage.setItem('fraudAlerts', JSON.stringify(SAMPLE_FRAUD_ALERTS));
      }
      
      setIsLoading(false);
    };
    setTimeout(loadData, 1000);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('fraudAlerts', JSON.stringify(fraudAlerts));
    }
  }, [fraudAlerts, isLoading]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: format(new Date(transaction.date), 'yyyy-MM-dd')
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    if (detectPotentialFraud(newTransaction, transactions)) {
      const fraudAlert = {
        id: `fraud-${Date.now()}`,
        date: newTransaction.date,
        description: `Potential fraud: ${newTransaction.description}`,
        amount: newTransaction.amount,
        riskLevel: newTransaction.amount > 50000 ? 'high' : 'medium',
        status: 'unresolved'
      };
      
      setFraudAlerts(prev => [fraudAlert, ...prev]);
      
      toast({
        title: "Potential Fraud Detected",
        description: `Suspicious transaction: ${newTransaction.description} for ₹${newTransaction.amount.toFixed(2)}`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Transaction Added",
        description: "Your transaction has been successfully recorded.",
      });
    }
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, ...updatedTransaction } : t)
    );
    toast({
      title: "Transaction Updated",
      description: "Your transaction has been successfully updated.",
    });
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Transaction Deleted",
      description: "Your transaction has been successfully deleted.",
    });
  };

  const resolveFraudAlert = (id) => {
    setFraudAlerts(prev => 
      prev.map(alert => alert.id === id ? { ...alert, status: 'resolved' } : alert)
    );
    toast({
      title: "Fraud Alert Resolved",
      description: "The fraud alert has been marked as resolved.",
    });
  };

  const calculateSpendingForecast = () => {
    return calculateSpendingForecastUtil(transactions);
  };

  return (
    <TransactionsContext.Provider 
      value={{ 
        transactions, 
        fraudAlerts,
        categories: CATEGORIES,
        isLoading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        resolveFraudAlert,
        calculateSpendingForecast
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionsContext);