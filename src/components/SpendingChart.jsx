import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { FaRupeeSign } from 'react-icons/fa';
import { useTransactions } from '@/contexts/TransactionsContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const COLORS = [
  '#4f6bcc', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe',
  '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554'
];

const SpendingChart = () => {
  const { transactions } = useTransactions();
  const [chartType, setChartType] = useState('category');
  
  const expenses = transactions.filter(t => t.type === 'expense');
  
  const categoryData = expenses.reduce((acc, transaction) => {
    const existingCategory = acc.find(item => item.name === transaction.category);
    if (existingCategory) {
      existingCategory.value += transaction.amount;
    } else {
      acc.push({ name: transaction.category, value: transaction.amount });
    }
    return acc;
  }, []);
  categoryData.sort((a, b) => b.value - a.value);
  
  const monthlyData = expenses.reduce((acc, transaction) => {
    const month = transaction.date.substring(0, 7);
    const existingMonth = acc.find(item => item.month === month);
    if (existingMonth) {
      existingMonth.amount += transaction.amount;
    } else {
      acc.push({ month, amount: transaction.amount });
    }
    return acc;
  }, []);
  monthlyData.sort((a, b) => a.month.localeCompare(b.month));
  const formattedMonthlyData = monthlyData.map(item => ({
    ...item,
    month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' })
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary flex items-center">
            <FaRupeeSign className="mr-1 h-3 w-3" />
            {payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spending Analysis</CardTitle>
        <Tabs defaultValue="category" onValueChange={setChartType} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <motion.div
          key={chartType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[300px]"
        >
          {chartType === 'category' ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formattedMonthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#4f6bcc" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;