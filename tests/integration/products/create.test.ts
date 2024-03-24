import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { invalidUserIdProduct, newProduct } from '../../mocks/products.mocks';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import { validUserFromModel } from '../../mocks/user.service.mocks';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Tests POST /products in case of success', async function () {
    // arrange
    const httpRequestBody = newProduct;
    const productMock = ProductModel.build(newProduct);
    const userMock = UserModel.build(validUserFromModel)
    sinon.stub(UserModel, 'findOne').resolves(userMock);
    sinon.stub(ProductModel, 'create').resolves(productMock);

    // act
    const httpResponse = await chai.request(app)
      .post('/products')
      .send(httpRequestBody);
  
    //assert
    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body.name).to.equal(newProduct.name);
    expect(httpResponse.body.price).to.equal(newProduct.price);
    expect(httpResponse.body.userId).to.equal(newProduct.userId);
  });

  it('Tests POST /products in case of invalid userId', async function () {
    // arrange
    const httpRequestBody = invalidUserIdProduct;

    sinon.stub(UserModel, 'findOne').resolves(null);

    // act
    const httpResponse = await chai.request(app)
      .post('/products')
      .send(httpRequestBody);
  
    //assert
    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.deep.equal({message: 'User not found'});
  });
});
