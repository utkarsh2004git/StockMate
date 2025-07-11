import express from 'express'
import { createShop, getShopById, getShops } from '../controllers/shopController.js';

const shopRouter = express.Router();

shopRouter.post('/',createShop);
shopRouter.get('/',getShops);
shopRouter.get('/:shopId',getShopById);
export default shopRouter;