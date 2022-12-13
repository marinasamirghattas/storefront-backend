import client from '../database';

export type Order = {
  id?: number;
  product_id: string[];
  user_id: number;
  quantity: number;
  order_status: string;
};

export class OrderStore {
  async showCurrentOrder(order_id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)  ';
      const result = await connection.query(sql, [order_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${order_id}. Error: ${err}`);
    }
  }

  async createOrder(user_id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO orders (product_id,user_id,quantity,order_status) VALUES($2,$1, 0, $3) RETURNING *';
      const result = await connection.query(sql, [user_id, [], 'active']);
      const order = result.rows[0];
      connection.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create order . Error: ${err}`);
    }
  }

  async addProductToOrder(
    product_id: number,
    order_id: number
  ): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = [
        'update orders set product_id = array_append(product_id,$1)  where id=($2) RETURNING *',
        'update orders set quantity = quantity +1  where id=($1) RETURNING *'
      ];
      const result1 = await connection.query(sql[0], [product_id, order_id]);
      const result2 = await connection.query(sql[1], [order_id]);
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

  async delete(id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      const order = result.rows[0];
      connection.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete product with ${id}. Error: ${err}`);
    }
  }

  async showCompletedOrders(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)  ';
      const result = await connection.query(sql, [user_id, 'completed']);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find order for ${user_id} category . Error: ${err}`
      );
    }
  }
}
