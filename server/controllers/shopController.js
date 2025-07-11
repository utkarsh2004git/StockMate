import Shop from "../models/Shop.js";

export const createShop = async (req, res) => {
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
        res.status(201).json({ success: true, message: "Shop Added Succesfully", shop: shop });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error Adding Shop", error: error.message });
    }
}

export const getShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        res.status(200).json({ success: true, shops: shops });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error Fetching Shops", error: error.message });
    }
}

export const getShopById = async (req, res) => {
    try {
        const { shopId } = req.params;
        console.log(shopId);

        if (!shopId) {
            return res.status(400).json({ message: "Shop ID is required" });
        }
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }
        res.status(200).json({ success: true, shop });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching shop", error: error.message });
    }
}