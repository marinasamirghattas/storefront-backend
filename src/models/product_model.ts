
import client from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    category?: string;

};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * From products  '
            const result = await connection.query(sql)
            connection.release()
            return result.rows
        } catch (err) {
            throw new Error(`can't get products ${err}`)
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)  '
            const result = await connection.query(sql, [id])
            connection.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }


    async create(p: Product): Promise<Product> {
        try {
            const connection = await client.connect()
            const sql = 'INSERT INTO products (name,price,category) VALUES($1, $2, $3) RETURNING *'
            const result = await connection
                .query(sql, [p.name, p.price, p.category])
            const Product = result.rows[0]
            connection.release()
            return Product
        } catch (err) {
            throw new Error(`Could not add  ${p.name} with ${p.category} category as new product. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
            const connection = await client.connect()
            const result = await connection.query(sql, [id])
            const Product = result.rows[0]
            connection.release()
            return Product
        } catch (err) {
            throw new Error(`Could not delete product with ${id}. Error: ${err}`)
        }
    }


    async showByCategory(cat: string): Promise<Product[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM products WHERE category=($1)  RETURNING *'
            const result = await connection.query(sql, [cat])
            connection.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not find product in ${cat} category . Error: ${err}`)
        }
    }


}