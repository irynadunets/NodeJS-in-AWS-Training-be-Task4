import { createClient } from './db/connect';

export const getProductById = async (event) => {

  try {
    const client = await createClient();

    console.log('getProductById');
    const productId = event.path.split('/')[2];
    const { rows: products } = await client.query(`SELECT p.id, p.title, p.description, p.price, s.count
        FROM product AS p JOIN stock AS s ON p.id = s.product_id`);
    console.log(products);
    const item = products.find(el => el.id === event.path.split('/')[2]);
    console.log(item);
    
    client.end();

  return {
    statusCode: 200,
    body: JSON.stringify({product:item}, null, 2),
  };
  } catch (e) {
  return {
    statusCode: 500,
    body: 'Error while reading data',
  };
     next(e);
  }
  };
