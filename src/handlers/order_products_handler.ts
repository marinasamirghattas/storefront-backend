import express, { NextFunction, Request, Response } from 'express';
import { auth } from '../middlewares/auth_middleware';
import { OrderProductsStore } from '../models/order_products_model';


const store = new OrderProductsStore();

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prd = await store.addProductToOrder(
      req.body.product_id,
      req.body.order_id
    );
    res.json(prd);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await store.deleteProductFromOrder(+req.body.order_id , +req.body.product_id);
      res.json(deleted);
    } catch (error) {
      next(error);
    }
  };

  const orderProductsRoutes = (app: express.Application) => {
    app.post('/orders/addProduct', auth, addProduct);
    app.delete('/orders/deleteProduct', auth, destroy);
  };
  
  export default orderProductsRoutes;
  

  