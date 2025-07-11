
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true }, // Unique within a shop
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  barcode: String,
  imageUrl: String,
  category: String,
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


productSchema.index({ shopId: 1, sku: 1 }, { unique: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
