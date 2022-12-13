import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { UserStore } from './models/user_model';
import cors from 'cors';
import userRoutes from './handlers/user_handler';
import productRoutes from './handlers/product_handler';
import morgan from 'morgan';
import { errorMiddleWare } from './middlewares/err_middelware';
import orderRoutes from './handlers/order_handler';

export const app: express.Application = express();
const address: string = '0.0.0.0:3000';

//use cors
app.use(cors());

//use morgan
app.use(morgan(':method :url :status :http-version :response-time '));

app.use(bodyParser.json());
userRoutes(app);
productRoutes(app);
orderRoutes(app);
app.get('/', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const user = new UserStore();
    console.log(await user.index());
    res.send('indexing done !!!!!!');
  } catch (err) {
    next(err);
  }
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

//Not found
app.use((req: Request, res: Response): void => {
  res.status(404).send('<h1>404 Page not found</h1>');
});

//error MW
app.use(errorMiddleWare);
