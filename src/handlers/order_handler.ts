import express, { NextFunction, Request, Response } from 'express'
import { Order, OrderStore } from '../models/order_model'

const store = new OrderStore()

const showCompletedOrders = async (req: Request, res: Response,next:NextFunction ) => {
   
   try {const orders = await store.showCompletedOrders(+(req.params.id))
    res.json(orders)
    
   } catch (error) {
    next(error)
   } 
}

const showCurrentOrder = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const orders = await store.showCurrentOrder(+(req.params.id))
        res.json(orders)
        
    } catch (error) {
      
        next(error)
        
    }
   
}

 


const createOrder = async (req: Request, res: Response,next:NextFunction) => {
    try {
         
           
        
       
        const newProduct= await store.createOrder(req.body.user_id)
        res.json(newProduct)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req: Request, res: Response,next:NextFunction) => {
try {
    const deleted = await store.delete(+req.params.id)
    res.json(deleted)
    
} catch (error) {
    next(error)
    
}}
const addProduct = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const deleted = await store.addProductToOrder(req.body.product_id,req.body.order_id)
        res.json(deleted)
        
    } catch (error) {
        next(error)
        
    }
  
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders/completed/:id', showCompletedOrders)
    app.get('/orders/:id', showCurrentOrder)
    app.post('/orders/addProduct/', addProduct)
    app.post('/orders/create', createOrder)
    app.delete('/orders/delete/:id', destroy)
}

export default orderRoutes