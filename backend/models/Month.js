import mongoose from "mongoose";

const monthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    enum: [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ]
  },
  year: {
    type: Number,
    required: true,
    min: 2000,
    max: 2100
  },
  categories: {
    needs: {
      type: Number,
      default: 0
    },
    wants: {
      type: Number,
      default: 0
    },
    savings: {
      type: Number,
      default: 0
    }
  },
  income: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }]
}, {
  timestamps: true,
  indexes: [
    { month: 1, year: 1, unique: true }
  ]
});

monthSchema.index({ month: 1, year: 1 }, { unique: true });

export default mongoose.model('Month', monthSchema); 