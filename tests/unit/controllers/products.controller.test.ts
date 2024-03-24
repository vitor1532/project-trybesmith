import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { 
  successfulServiceResponse,
  notFoundServiceResponse,
  invalidUserIdProduct,
  newProduct,
  newProductFromService
} from '../../mocks/products.service.mocks';
import ProductsService from '../../../src/services/products.service';
import ProductsController from '../../../src/controllers/products.controller';
import UserModel from '../../../src/database/models/user.model';
import { validUserFromModel } from '../../mocks/user.service.mocks';


chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Tests create function in case of success', async function () {
    // arrange
    req.body = newProduct;
    const userMock = UserModel.build(validUserFromModel);
    sinon.stub(UserModel, 'findByPk').resolves(userMock);
    sinon.stub(ProductsService, 'create').resolves(successfulServiceResponse);
    // assert
    await ProductsController.create(req, res);

    // act
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductFromService);
  });

  it.only('Tests create function in case of invalid userID', async function () {
    // arrange
    req.body = invalidUserIdProduct;
    sinon.stub(UserModel, 'findByPk').resolves(null);
    sinon.stub(ProductsService, 'create').resolves(notFoundServiceResponse);
    // assert
    await ProductsController.create(req, res);

    // act
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'User not found'});
  });

});
