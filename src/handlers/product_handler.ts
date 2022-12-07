import express, { NextFunction, Request, Response } from 'express'
 
import { Product, ProductStore } from '../models/product_model'

const store = new ProductStore()

const index = async (req: Request, res: Response,next:NextFunction ) => {
   
   try {const products = await store.index()
    res.json(products)
    
   } catch (error) {
    next(error)
   } 
}

const show = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const products = await store.show(+(req.params.id))
        res.json(products)
        
    } catch (error) {
      
        next(error)
        
    }
   
}

const showByCategory = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const products = await store.showByCategory(req.params.cat)
    res.json(products)
        
    } catch (error) {
        next(error)
        
    }
    
}


const create = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const product: Product = {
            name: req.body.name,
           price: req.body.price,
            category: req.body.category
        }
        const newProduct= await store.create(product)
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
    
}
  
}

const productRoutes = (app: express.Application) => {
    app.get('/Products', index)
    app.get('/Products/:id', show)
    app.get('/Products/category/:cat', showByCategory)
    app.post('/Products', create)
    app.delete('/Products/:id', destroy)
}

export default productRoutes