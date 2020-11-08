import { createClient } from './db/connect';

export const createProduct = async event => {
  try {
    console.log('Event Path Parameters', event.body);
    const client = await createClient();
    const requestBody = JSON.parse(event.body);

    const {  title, description, price, count} = requestBody;

    if (
      typeof description !== 'string' || typeof title !== 'string' || typeof price !== 'number' || typeof count !== 'number'
    ) {
      return {
        statusCode: 400,
        body: 'Bad input provided in product fields'
      };
    }

    const result1 = await client.query(`INSERT INTO product (title, description, price) VALUES (${title}, ${description}, ${price}) RETURNING id`);
    const productId = result1.rows[0].id;
    await client.query(`INSERT INTO stock (product_id, count) VALUES (${productId}, ${count})`);
    client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ product: {description, title, price, count, id: productId } }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Error while post data',
    };
  }
};
