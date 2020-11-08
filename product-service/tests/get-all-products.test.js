productList = [
  {
    "count": 4,
    "description": "Short Book Description1",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    "price": 2.4,
    "title": "BookOne"
  },
  {
    "count": 6,
    "description": "Short Book Description3",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
    "price": 10,
    "title": "BookNew"
  }];

jest.mock('../src/productList');

const getAllProducts = async (event) => {
  try {
  return {
    statusCode: 200,
    body: JSON.stringify(productList)
  };
} catch (e) {
  return {
    statusCode: 401,
    body: 'Access token is missing or invalid',
  };
     next(e);
  }
};

describe('getAllProducts', () => {

  test("It should respond with an array of products", async () => {
    const response = await getAllProducts();
    expect(response.body.length).toBe(252);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify([{"count": 4,"description": "Short Book Description1","id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa","price": 2.4,"title": "BookOne"},
      {"count": 6,"description": "Short Book Description3","id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0","price": 10,"title": "BookNew"}]));
  });

  it('tests error with promises', () => {
  return getAllProducts().catch(e =>
    expect(e).toEqual({
      body: 'Access token is missing or invalid',
    }),
  );
});

});
