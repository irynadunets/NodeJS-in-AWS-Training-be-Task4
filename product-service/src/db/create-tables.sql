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
