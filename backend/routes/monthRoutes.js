import express from 'express';
import {
  getMonths,
  getMonth,
  createMonth,
  updateMonth,
  deleteMonth
} from '../controllers/monthController.js';

const router = express.Router();

router.get('/', getMonths);
router.get('/:year/:month', getMonth);
router.post('/', createMonth);
router.put('/:year/:month', updateMonth);
router.delete('/:year/:month', deleteMonth);

export default router; 