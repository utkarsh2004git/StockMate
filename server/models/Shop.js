
import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerClerkId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;
