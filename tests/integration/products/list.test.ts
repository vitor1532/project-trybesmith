import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import { secondvalidProductFromModel, validProductFromModel } from '../../mocks/products.mocks';
import UserModel from '../../../src/database/models/user.model';
import { validUserFromModel } from '../../mocks/user.service.mocks';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Tests GET /products in case of success', async function () {
    // arrange
    const productsMock = [
      ProductModel.build(validProductFromModel),
      ProductModel.build(secondvalidProductFromModel)
    ];
    const userMock = UserModel.build(validUserFromModel)
    sinon.stub(UserModel, 'findOne').resolves(userMock);
    sinon.stub(ProductModel, 'findAll').resolves(productsMock);

    // act
    const httpResponse = await chai.request(app)
      .get('/products')
      .send();
  
    //assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(productsMock.map(product => product.toJSON()));
  });
});
