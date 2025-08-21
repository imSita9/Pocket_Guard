export const detectPotentialFraud = (transaction, allTransactions) => {
  const hour = new Date().getHours();
  const unusualTime = hour >= 1 && hour < 5;
  const largeAmount = transaction.amount > 80000; 
  
  const categoryTransactions = allTransactions.filter(t => t.category === transaction.category);
  const rareCategory = categoryTransactions.length < 2;
  
  const randomFlag = Math.random() < 0.1;
  
  return largeAmount || (unusualTime && transaction.amount > 8000) || (rareCategory && transaction.amount > 15000) || randomFlag;
};

export const calculateSpendingForecastUtil = (transactions) => {
  const categoryTotals = {};
  
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      if (!categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] = 0;
      }
      categoryTotals[transaction.category] += transaction.amount;
    }
  });
  
  const forecast = Object.keys(categoryTotals).map(category => ({
    category,
    amount: categoryTotals[category],
    forecast: categoryTotals[category] * (0.9 + Math.random() * 0.3)
  }));
  
  return forecast;
};