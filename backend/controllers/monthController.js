import Month from '../models/Month.js';
import Transaction from '../models/Transaction.js';

export const getMonths = async (req, res) => {
  try {
    const months = await Month.find().populate('transactions');
    res.json(months);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMonth = async (req, res) => {
  try {
    const month = await Month.findOne({
      year: req.params.year,
      month: { $regex: new RegExp(req.params.month, 'i') }
    }).populate('transactions');
    
    if (!month) return res.status(404).json({ message: 'Month not found' });
    res.json(month);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMonth = async (req, res) => {
  try {
    const { year, month } = req.body;
    
    // Check if month already exists
    const existingMonth = await Month.findOne({ year, month });
    if (existingMonth) {
      return res.status(400).json({ message: 'Month already exists' });
    }

    const newMonth = new Month({
      year,
      month,
      categories: { needs: 0, wants: 0, savings: 0 },
      income: 0,
      balance: 0,
      transactions: []
    });
    
    const savedMonth = await newMonth.save();
    const populatedMonth = await Month.findById(savedMonth._id).populate('transactions');
    res.status(201).json(populatedMonth);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMonth = async (req, res) => {
  try {
    const updatedMonth = await Month.findOneAndUpdate(
      { year: req.params.year, month: req.params.month },
      req.body,
      { new: true }
    );
    
    if (!updatedMonth) return res.status(404).json({ message: 'Month not found' });
    res.json(updatedMonth);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMonth = async (req, res) => {
  try {
    const month = await Month.findOneAndDelete({
      year: req.params.year,
      month: req.params.month
    });
    
    if (!month) return res.status(404).json({ message: 'Month not found' });
    
    // Delete associated transactions
    await Transaction.deleteMany({ _id: { $in: month.transactions } });
    res.json({ message: 'Month and associated transactions deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
