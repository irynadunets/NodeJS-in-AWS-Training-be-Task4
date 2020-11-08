import { createClient } from './db/connect';

export const getProductById = async (event) => {

try {
  const client = await createClient();
    const { id } = event.pathParameters;
    console.log(id);
    const dbResponse = await client.query(`SELECT product.id, product.title, product.description, product.price
    from  product where product.id = ${id}`);
    const product = dbResponse.rows[0];

    client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ product }),
    };
  } catch (e) {

    return {
      statusCode: 500,
      body: 'Error while reading data',
    };
    next(e);
  }
};
