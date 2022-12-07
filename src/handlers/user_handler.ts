import express, { NextFunction, Request, Response } from 'express'
import { User, UserStore } from '../models/user_model'
import bcrypt from 'bcrypt'

const store = new UserStore()

const index = async (_req: Request, res: Response,next:NextFunction) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (error) {
        next(error)
    }
   
}

const show = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const users = await store.show(parseInt(req.params.id))
        res.json(users)
        
    } catch (error) {next(error)
        
    }

}

const create = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: await bcrypt.hash(req.body.password, await bcrypt.genSalt())
        }
        const newUser = await store.create(user)
        res.json(newUser)
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

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.delete('/users/:id', destroy)
}

export default userRoutes