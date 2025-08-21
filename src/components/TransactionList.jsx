import React, { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Edit, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';
import { useTransactions } from '@/contexts/TransactionsContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TransactionForm from '@/components/TransactionForm';
import { cn } from '@/lib/utils';

const TransactionList = ({ limit, filter }) => {
  const { transactions, deleteTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };
  
  const handleDelete = (id) => {
    deleteTransaction(id);
  };
  
  const closeEditForm = () => {
    setEditingTransaction(null);
  };
  
  let filteredTransactions = [...transactions];

  if (filter) {
    if (filter.searchTerm) {
      filteredTransactions = filteredTransactions.filter(t =>
        t.description.toLowerCase().includes(filter.searchTerm.toLowerCase())
      );
    }
    if (filter.category) {
      filteredTransactions = filteredTransactions.filter(t => t.category === filter.category);
    }
    if (filter.type) {
      filteredTransactions = filteredTransactions.filter(t => t.type === filter.type);
    }
  }
  
  const sortedTransactions = filteredTransactions.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  const displayedTransactions = limit 
    ? sortedTransactions.slice(0, limit) 
    : sortedTransactions;

  return (
    <div className="space-y-4">
      {displayedTransactions.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No transactions found.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {displayedTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="transaction-item"
            >
              <Card className={cn(
                "flex items-center justify-between p-4 hover:shadow-md transition-all",
                transaction.type === 'income' ? "border-l-4 border-l-success" : "border-l-4 border-l-primary"
              )}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    transaction.type === 'income' 
                      ? "bg-success/20 text-success" 
                      : "bg-primary/20 text-primary"
                  )}>
                    {transaction.type === 'income' 
                      ? <ArrowUpRight className="h-5 w-5" /> 
                      : <ArrowDownRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')} • {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "font-semibold flex items-center",
                    transaction.type === 'income' ? "text-success" : "text-primary"
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}
                    <FaRupeeSign className="ml-0.5 mr-0.5 h-4 w-4" />
                    {transaction.amount.toFixed(2)}
                  </span>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(transaction)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(transaction.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      
      {editingTransaction && (
        <TransactionForm 
          isOpen={!!editingTransaction} 
          onClose={closeEditForm} 
          editTransaction={editingTransaction} 
        />
      )}
    </div>
  );
};

export default TransactionList;