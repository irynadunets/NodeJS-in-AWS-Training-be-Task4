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

const getProductById = async (event) => {

try {
  const item = productList.find(el => el.id === event.path.split('/')[2]);

  if(item){
    return {
      statusCode: 200,
      body: JSON.stringify({product:item}, null, 2),
    };
  } else {
    return {
      statusCode: 404,
      body: 'Not found',
    };
  }
} catch (e) {
  return {
    statusCode: 401,
    body: 'Access token is missing or invalid',
  };
     next(e);
  }

};

describe('getProductById', () => {

  test("It should respond with an array of products", async () => {
    const response = await getProductById("7567ec4b-b10c-48c5-9345-fc73c48a80a0");
    expect(response.body.length).toBe(252);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify([{"count": 6,"description": "Short Book Description3","id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0","price": 10,"title": "BookNew"}]));
  });

  it('tests error with promises', () => {
  return getProductById().catch(e =>
    expect(e).toEqual({
      body: 'Access token is missing or invalid',
    }),
  );
});

it('tests error with rejects', () => {
  return expect(getProductById (3)).rejects.toEqual({
    body: 'Not found',
  });
});

it('tests error with async/await and rejects', async () => {
  await expect(user.getUserName(3)).rejects.toEqual({
    body: 'Not found',
  });
});

});
