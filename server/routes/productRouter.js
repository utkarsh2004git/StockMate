import express from 'express';
import { addProduct, getProductsByShop } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/',addProduct );
productRouter.get('/:shopId',getProductsByShop );

export default productRouter;
