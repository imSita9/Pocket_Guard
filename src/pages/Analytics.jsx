import React from 'react';
import { motion } from 'framer-motion';
import { FaRupeeSign } from 'react-icons/fa';
import { useTransactions } from '@/contexts/TransactionsContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SpendingChart from '@/components/SpendingChart';
import SpendingForecast from '@/components/SpendingForecast';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const Analytics = () => {
  const { transactions, isLoading } = useTransactions();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your analytics...</p>
        </div>
      </div>
    );
  }
  
  const incomeVsExpensesData = transactions.reduce((acc, transaction) => {
    const month = transaction.date.substring(0, 7);
    const existingMonth = acc.find(item => item.month === month);
    if (existingMonth) {
      if (transaction.type === 'income') existingMonth.income += transaction.amount;
      else existingMonth.expenses += transaction.amount;
    } else {
      acc.push({
        month,
        income: transaction.type === 'income' ? transaction.amount : 0,
        expenses: transaction.type === 'expense' ? transaction.amount : 0
      });
    }
    return acc;
  }, []);
  incomeVsExpensesData.sort((a, b) => a.month.localeCompare(b.month));
  const formattedIncomeVsExpensesData = incomeVsExpensesData.map(item => ({
    ...item,
    month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' })
  }));
  
  const dayOfWeekData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
      const existingDay = acc.find(item => item.day === dayOfWeek);
      if (existingDay) existingDay.amount += transaction.amount;
      else acc.push({ day: dayOfWeek, amount: transaction.amount });
      return acc;
    }, []);
  const daysOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayOfWeekData.sort((a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded shadow-sm">
          <p className="font-medium">{payload[0].payload.month || payload[0].payload.day}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="flex items-center">
              {entry.name}: <FaRupeeSign className="mx-0.5 h-3 w-3" />{entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader><CardTitle>Income vs Expenses</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedIncomeVsExpensesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `₹${value}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 8 }} name="Income" />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader><CardTitle>Spending by Day of Week</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dayOfWeekData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis tickFormatter={(value) => `₹${value}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="amount" fill="#4f6bcc" name="Amount" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="spending" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SpendingChart />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="forecast" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SpendingForecast />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;