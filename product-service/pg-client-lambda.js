'use strict';
import { createClient } from './src/db/connect';

module.exports.invoke = async event => {
    const client = await createClient();

    try {
        //make ddl query for creation table
        const ddlResult = await client.query(`
            create table if not exists product (
                id serial primary key,
                title text,
                description text,
                price integer
            )`);
        const ddlResult2 = await client.query(`
            create table if not exists stock (
                id serial primary key,
                product_id integer,
                count integer,
                foreign key ("product_id") references "product" ("id")
            )`);
         console.log(ddlResult. ddlResult2);


        // POST/products make initial dml queries
        const result1 = await client.query(
        `INSERT INTO product (title, description, price) VALUES ('Book1','Short Book Description1', 10) RETURNING id`);
        const productId1 = result1.rows[0].id;
        await client.query(`INSERT INTO stock (product_id, count) VALUES (${productId1}, 2)`);
        const result2 = await client.query(
        `INSERT INTO product (title, description, price) VALUES ('Book2','Short Book Description2', 20) RETURNING id`);
        const productId2 = result2.rows[0].id;
        await client.query(`INSERT INTO stock (product_id, count) VALUES (${productId2}, 3)`);
        const result3 = await client.query(
        `INSERT INTO product (title, description, price) VALUES ('Book31','Short Book Description31', 30) RETURNING id`);
        const productId3 = result3.rows[0].id;
        await client.query(`INSERT INTO stock (product_id, count) VALUES (${productId3}, 4)`);

        // getAllProducts make select query
        console.log('getAllProducts');
        const { rows: products } = await client.query(`select * from product`);
        console.log(products);

        // getStock make select query
        console.log('getStock');
        const { rows: stocks } = await client.query(`select * from stock`);
        console.log(stocks);

    } catch (err) {
        // you can process error here. In this example just log it to console.
        console.error('Error during database request executing:', err);
    } finally {
        // in case if error was occurred, connection will not close automatically
        client.end(); // manual closing of connection
    }

};
