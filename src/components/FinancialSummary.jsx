import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';
import { useTransactions } from '@/contexts/TransactionsContext';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const FinancialSummary = () => {
  const { transactions } = useTransactions();
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const balance = totalIncome - totalExpenses;
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const thisMonthExpenses = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return (
        t.type === 'expense' &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const summaryItems = [
    {
      title: 'Total Balance',
      value: balance,
      icon: FaRupeeSign,
      color: balance >= 0 ? 'text-success' : 'text-destructive',
      bgColor: balance >= 0 ? 'bg-success/10' : 'bg-destructive/10'
    },
    {
      title: 'Total Income',
      value: totalIncome,
      icon: ArrowUpRight,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: ArrowDownRight,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      title: 'This Month',
      value: thisMonthExpenses,
      icon: CreditCard,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  <h3 className={cn("text-2xl font-bold mt-1 flex items-center", item.color)}>
                    <FaRupeeSign className="mr-1 h-5 w-5" />
                    {Math.abs(item.value).toFixed(2)}
                  </h3>
                </div>
                <div className={cn("p-2 rounded-full", item.bgColor)}>
                  <item.icon className={cn("h-5 w-5", item.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default FinancialSummary;