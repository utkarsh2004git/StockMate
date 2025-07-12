import Product from "../models/Product.js";

export const addProduct = async(req,res)=>{
    try {
        const { name, price,sold,sku, quantity, barcode, imageUrl, category, shopId } = req.body;
        
        // Validate required fields
        if (!name ||!sku || !sold || !price || !shopId) {
        return res.status(400).json({ message: 'Name, price, and shop ID are required.' });
        }
    
        // Create new product
        const newProduct = new Product({
        name,
        price,
        sold,
        sku,
        quantity: quantity || 0,
        barcode : barcode || '',
        imageUrl : imageUrl || '',
        category : category || '',
        shopId
        });
    
        await newProduct.save();
        res.status(201).json({success: true, message: 'Product added successfully', product: newProduct});
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const getProductsByShop = async (req, res) => {
    try {
        const { shopId } = req.params;
        const products = await Product.find({ shopId }).sort({ createdAt: -1 });
        
        if (!products.length) {
            return res.status(404).json({ message: 'No products found for this shop.' });
        }
        
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const updateProductStock = async(req,res)=>{
    try {
        const { productId, quantity } = req.body;
        console.log(req.body)
        // Validate required fields
        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: 'Product ID and quantity are required.' });
        }

        // Find the product and update its stock
        const product = await Product.findByIdAndUpdate(
            productId,
            {  quantity: quantity  },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ success: true, message: 'Product stock updated successfully', product });
    } catch (error) {
        console.error('Error updating product stock:', error);
        res.status(500).json({ message: 'Server error' });
    }
}