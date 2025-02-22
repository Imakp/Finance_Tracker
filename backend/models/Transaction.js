import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'needs', 'wants', 'savings']
  }
}, {
  timestamps: true
});

export default mongoose.model('Transaction', transactionSchema); 