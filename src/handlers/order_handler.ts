import express, { NextFunction, Request, Response } from 'express';
import { auth } from '../middlewares/auth_middleware';
import { OrderStore } from '../models/order_model';

const store = new OrderStore();

const showCompletedOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await store.showCompletedOrders(+req.params.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const showCurrentOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await store.showCurrentOrder(+req.params.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await store.createOrder(req.body.user_id);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await store.delete(+req.params.id);
    res.json(deleted);
  } catch (error) {
    next(error);
  }
};
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

const orderRoutes = (app: express.Application) => {
  app.get('/orders/completed/:id', auth, showCompletedOrders);
  app.get('/orders/:id', auth, showCurrentOrder);
  app.post('/orders/addProduct/', auth, addProduct);
  app.post('/orders/create', auth, createOrder);
  app.delete('/orders/delete/:id', auth, destroy);
};

export default orderRoutes;
