import { createClient } from './db/connect';

export const getAllProducts = async (event) => {
  try {
    const client = await createClient();

    console.log('getAllProducts');
    console.log(event);
    const { rows: products } = await client.query(`SELECT p.id, p.title, p.description, p.price, s.count
        FROM product AS p JOIN stock AS s ON p.id = s.product_id`);
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
