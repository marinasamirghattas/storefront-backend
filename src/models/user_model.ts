
import client from "../database";

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password: string;

};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * From users'
            const result = await connection.query(sql)
            connection.release()
            return result.rows
        } catch (err) {
            throw new Error(`can't get users ${err}`)
        }


    }

    async show(id: number): Promise<User> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1) '
            const result = await connection.query(sql, [id])
            connection.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }


    async create(u: User): Promise<User> {
        try {
            const connection = await client.connect()
            const sql = 'INSERT INTO users (first_name,last_name,password) VALUES($1, $2, $3) RETURNING *'
            const result = await connection
                .query(sql, [u.first_name, u.last_name, u.password])
            const user = result.rows[0]
            connection.release()
            return user
        } catch (err) {
            throw new Error(`Could not add  ${u.first_name} ${u.last_name} as new user. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'
            const connection = await client.connect()
            const result = await connection.query(sql, [id])
            const user = result.rows[0]
            connection.release()
            return user
        } catch (err) {
            throw new Error(`Could not delete user with ${id}. Error: ${err}`)
        }
    }

}