import express from 'express';
import { addProduct, getProductsByShop, updateProductStock } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/',addProduct );
productRouter.get('/:shopId',getProductsByShop );
productRouter.put('/',updateProductStock );

export default productRouter;
