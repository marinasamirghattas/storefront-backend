import client from '../database';

export type OrderProducts = {
    id ?:number,
    order_id :number,
    product_id :number,
    quantity :number,
};

export class OrderProductsStore {

async addProductToOrder(
    product_id: number,
    order_id: number
  ): Promise<OrderProducts> {
    try {
      const connection = await client.connect();
      const sql = [

        `INSERT INTO order_products ( product_id,order_id) VALUES ($1,$2) RETURNING *; `,
        `UPDATE order_products SET quantity = quantity +1 WHERE product_id = $1  RETURNING *; `
      ];
      const result1 = await connection.query(sql[0], [product_id, order_id]);
      const result2 = await connection.query(sql[1], [product_id]);
      // const order1 = result1.rows[0]
      // const order2 = result2.rows[0]
      connection.release();
      return result1.rows[0], result2.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product with ${product_id} to order ${order_id}. Error: ${err}`
      );
    }
  } 


  async deleteProductFromOrder(
    order_id: number,
    product_id: number
  ): Promise<OrderProducts> {
    try {
      const connection = await client.connect();
      const sql = [
        `DELETE FROM order_products WHERE order_id = $1 AND product_id = $2 `,
        `UPDATE order_products SET quantity = quantity -1 WHERE product_id = $1;`
      ];
      const result1 = await connection.query(sql[0], [order_id, product_id]);
      const result2 = await connection.query(sql[1], [product_id]);
      connection.release();
      return result1.rows[0], result2.rows[0];
    } catch (error) {
      throw new Error(`cannot remove product from order  ${error}`);
    }
  }

}  