// models/StockHistory.jsimport mongoose from 'mongoose';

const stockHistorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  clerkId: { type: String, required: true }, // Clerk ID of the owner
  action: { type: String, enum: ['add', 'remove', 'adjust'], required: true },
  quantityChanged: { type: Number, required: true },
  reason: String,
  date: { type: Date, default: Date.now }
});

const StockHistory = mongoose.model('StockHistory', stockHistorySchema);
export default StockHistory;
