export const CATEGORIES = [
  'Food & Dining', 'Shopping', 'Housing', 'Transportation', 
  'Entertainment', 'Health', 'Travel', 'Education', 'Personal Care', 
  'Gifts & Donations', 'Utilities', 'Insurance', 'Taxes', 'Other'
];

export const SAMPLE_TRANSACTIONS = [
  {
    id: '1',
    date: '2025-05-20',
    description: 'Grocery Store',
    amount: 7000.47,
    category: 'Food & Dining',
    type: 'expense'
  },
  {
    id: '2',
    date: '2025-05-18',
    description: 'Monthly Salary',
    amount: 250000.00,
    category: 'Income',
    type: 'income'
  },
  {
    id: '3',
    date: '2025-05-15',
    description: 'Electric Bill',
    amount: 10000.56,
    category: 'Utilities',
    type: 'expense'
  },
  {
    id: '4',
    date: '2025-05-12',
    description: 'Online Shopping',
    amount: 5500.99,
    category: 'Shopping',
    type: 'expense'
  },
  {
    id: '5',
    date: '2025-05-10',
    description: 'Restaurant Dinner',
    amount: 8000.75,
    category: 'Food & Dining',
    type: 'expense'
  },
  {
    id: '6',
    date: '2025-05-05',
    description: 'Fuel Station',
    amount: 3500.23,
    category: 'Transportation',
    type: 'expense'
  },
  {
    id: '7',
    date: '2025-05-03',
    description: 'Movie Tickets',
    amount: 2500.50,
    category: 'Entertainment',
    type: 'expense'
  },
  {
    id: '8',
    date: '2025-05-01',
    description: 'Rent Payment',
    amount: 100000.00,
    category: 'Housing',
    type: 'expense'
  }
];

export const SAMPLE_FRAUD_ALERTS = [
  {
    id: 'fraud1',
    date: '2025-05-22',
    description: 'Unusual transaction at Foreign Online Store',
    amount: 40000.99,
    riskLevel: 'high',
    status: 'unresolved'
  },
  {
    id: 'fraud2',
    date: '2025-05-15',
    description: 'Multiple transactions in quick succession',
    amount: 2000.99,
    riskLevel: 'medium',
    status: 'resolved'
  }
];