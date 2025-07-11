
import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  clerkId: { type: String, required: true }, // Clerk ID of the owner
  quantitySold: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now }
});

const Sale = mongoose.model('Sale', saleSchema);
export default Sale;
