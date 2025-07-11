import Shop from "../models/Shop.js";

export const createShop = async (req,res)=>{
    try {
        const { name, ownerClerkId } = req.body;
        if (!name || !ownerClerkId) {
            return res.status(400).json({ message: "Name and ownerClerkId are required" });
        }
        const shop = new Shop({
            name,
            ownerClerkId
        });

        await shop.save();
        res.status(201).json({success:true, message: "Shop Added Succesfully", shop: shop });
    } catch (error) {
        res.status(500).json({success:false, message: "Error Adding Shop", error: error.message });
    }
}

export const getShops = async (req,res)=>{
    try {
        const shops = await Shop.find();
        res.status(200).json({success:true, shops: shops });
    } catch (error) {
        res.status(500).json({success:false, message: "Error Fetching Shops", error: error.message });
    }
}