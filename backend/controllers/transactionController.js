import Month from '../models/Month.js';
import Transaction from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
  try {
    const month = await Month.findOne({
      year: req.params.year,
      month: req.params.month
    }).populate('transactions');
    
    if (!month) return res.status(404).json({ message: 'Month not found' });
    res.json(month.transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const month = await Month.findOne({
      year: req.params.year,
      month: req.params.month
    });
    
    if (!month) return res.status(404).json({ message: 'Month not found' });

    const transaction = new Transaction({
      ...req.body,
      amount: req.body.type === 'income' ? 
        Math.abs(req.body.amount) : 
        -Math.abs(req.body.amount)
    });

    const savedTransaction = await transaction.save();
    month.transactions.push(savedTransaction._id);
    
    // Update month totals
    if (req.body.type === 'income') {
      month.income += Math.abs(req.body.amount);
    } else {
      month.categories[req.body.type] += Math.abs(req.body.amount);
    }
    month.balance += transaction.amount;
    
    await month.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const oldAmount = transaction.amount;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.transactionId,
      {
        ...req.body,
        amount: req.body.type === 'income' ?
          Math.abs(req.body.amount) :
          -Math.abs(req.body.amount)
      },
      { new: true }
    );

    // Update month totals
    const month = await Month.findOne({
      year: req.params.year,
      month: req.params.month
    });
    
    if (!month) return res.status(404).json({ message: 'Month not found' });

    // Remove old amount
    if (transaction.type === 'income') {
      month.income -= Math.abs(oldAmount);
    } else {
      month.categories[transaction.type] -= Math.abs(oldAmount);
    }
    month.balance -= oldAmount;

    // Add new amount
    if (req.body.type === 'income') {
      month.income += Math.abs(updatedTransaction.amount);
    } else {
      month.categories[req.body.type] += Math.abs(updatedTransaction.amount);
    }
    month.balance += updatedTransaction.amount;

    await month.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.transactionId);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const month = await Month.findOne({
      year: req.params.year,
      month: req.params.month
    });
    
    if (!month) return res.status(404).json({ message: 'Month not found' });

    // Remove from month's transactions array
    month.transactions.pull(req.params.transactionId);
    
    // Update totals
    if (transaction.type === 'income') {
      month.income -= Math.abs(transaction.amount);
    } else {
      month.categories[transaction.type] -= Math.abs(transaction.amount);
    }
    month.balance -= transaction.amount;
    
    await month.save();
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 