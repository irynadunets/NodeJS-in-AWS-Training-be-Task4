import { createClient } from './db/connect';

export const getAllProducts = async (event) => {
  try {
    const client = await createClient();
    console.log('getAllProducts');
    const { rows: products } = await client.query(`select * from product`);
    console.log(products);
    client.end();
  return {
    statusCode: 200,
    body: JSON.stringify(products)
  };
} catch (e) {
  return {
    statusCode: 500,
    body: 'Error while reading data',
  };
     next(e);
  }
};
