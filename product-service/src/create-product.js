import { createClient } from './db/connect';

export const createProduct = async event => {
  try {
    const client = await createClient();

    const { title, description, price, count } = JSON.parse(event.body);
    console.log(event.body);
    console.log(title);
    if (
      typeof description !== 'string' || typeof title !== 'string' || typeof price !== 'number' || typeof count !== 'number'
    ) {
      return {
        statusCode: 400,
        body: 'Input data is invalid'
      };
    }

    const product = await client.query('INSERT INTO product (title, description, price) VALUES ($1, $2, $3) RETURNING id',[title, description, price]);
    const productId = product.rows[0].id;
    await client.query('INSERT INTO stock (product_id, count) values ($1, $2)',[productId, count]);

    client.end();

    return {
      statusCode: 200
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Error while post data',
    };
  }
};

