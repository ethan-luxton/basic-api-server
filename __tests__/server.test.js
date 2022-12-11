'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const { sequelize } = require('../src/models/index.js');
const request = supertest(server);

beforeAll(async () => {await sequelize.sync()});

describe('RESTful API', () => {

  test('Handles 404 requests', async () => {
    const res = await request.get('/bar');
    expect(res.status).toEqual(404);
  });

  test('Create two items', async () => {
    let res = await request.post('/food').send({   
        name:'strawberry',
        group: 'fruit',
    });
    let resTwo = await request.post('/food').send({
        name:'lettuce',
        group: 'vegetable',
    });
    expect(res.body.name).toEqual('strawberry');
    expect(res.body.group).toEqual('fruit');
    expect(resTwo.body.name).toEqual('lettuce');
    expect(resTwo.body.group).toEqual('vegetable');
  });

  test('Find all items', async () => {
    let res = await request.get('/food');
    expect(res.body[0].name).toEqual('strawberry');
    expect(res.body[0].group).toEqual('fruit');
    expect(res.body[1].name).toEqual('lettuce');
    expect(res.body[1].group).toEqual('vegetable');
  });

  test('Find one item', async () => {
    let res = await request.get('/food/2');
    expect(res.body.name).toEqual('lettuce');
    expect(res.body.group).toEqual('vegetable');
  });

  test('updates a single food item', async () => {
    await request.put('/food/1').send({
        name: "tomato",
        group: 'vegetable',
    });
    let res = await request.get('/food/1');
    expect(res.body.name).toEqual('tomato');
    expect(res.body.group).toEqual('vegetable');
  });

  test('deletes a single food item', async () => {
    await request.delete('/food/1');
    let res = await request.get('/food');
    expect(res.body[0].name).toEqual('lettuce');
    expect(res.body[0].group).toEqual('vegetable');
  });
});

afterAll(async () => {await sequelize.drop();});
