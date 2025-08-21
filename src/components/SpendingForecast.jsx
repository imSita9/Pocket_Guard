import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';
import { useTransactions } from '@/contexts/TransactionsContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const SpendingForecast = () => {
  const { calculateSpendingForecast } = useTransactions();
  
  const forecast = calculateSpendingForecast();
  forecast.sort((a, b) => b.forecast - a.forecast);
  
  const totalCurrent = forecast.reduce((sum, item) => sum + item.amount, 0);
  const totalForecast = forecast.reduce((sum, item) => sum + item.forecast, 0);
  
  const percentChange = totalCurrent > 0 
    ? ((totalForecast - totalCurrent) / totalCurrent) * 100 
    : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Next Month Forecast</span>
          <span className="flex items-center text-sm font-normal">
            {percentChange > 0 ? (
              <>
                <TrendingUp className="mr-1 h-4 w-4 text-destructive" />
                <span className="text-destructive">+{percentChange.toFixed(1)}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="mr-1 h-4 w-4 text-success" />
                <span className="text-success">{percentChange.toFixed(1)}%</span>
              </>
            )}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {forecast.slice(0, 5).map((item, index) => {
            const percentDiff = ((item.forecast - item.amount) / item.amount) * 100;
            const isHighRisk = percentDiff > 20;
            
            return (
              <motion.div 
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="font-medium">{item.category}</span>
                    {isHighRisk && (
                      <AlertTriangle className="ml-1 h-4 w-4 text-warning" />
                    )}
                  </div>
                  <div className="text-sm flex items-center">
                    <FaRupeeSign className="mr-0.5 h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{item.amount.toFixed(2)}</span>
                    <span className="mx-1">→</span>
                    <FaRupeeSign className="mr-0.5 h-3 w-3" />
                    <span className={percentDiff > 0 ? "text-destructive" : "text-success"}>
                      {item.forecast.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={(item.forecast / Math.max(...forecast.map(f => f.forecast))) * 100} 
                  className={isHighRisk ? "h-2 bg-warning/20" : "h-2"}
                />
              </motion.div>
            );
          })}
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Total Forecast</span>
              <div className="flex items-center">
                <FaRupeeSign className="mr-0.5 h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{totalCurrent.toFixed(2)}</span>
                <span className="mx-1">→</span>
                <FaRupeeSign className="mr-0.5 h-3 w-3" />
                <span className={percentChange > 0 ? "text-destructive font-medium" : "text-success font-medium"}>
                  {totalForecast.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingForecast;