import chai, { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';
import { NextFunction, Request, Response } from 'express';
import { 
  createdServiceResponse,
  successfulServiceResponse,
  productNotFoundServiceResponse,
  invalidUserIdProduct,
  newProduct,
  newProductFromService,
  validProduct,
  updatedProduct,
  getAllSuccessfulServiceResponse,
  productsFromServiceArray
} from '../../mocks/products.mocks';
import ProductsService from '../../../src/services/products.service';
import ProductsController from '../../../src/controllers/products.controller';
import UserModel from '../../../src/database/models/user.model';
import { userNotFoundServiceResponse, validUserFromModel } from '../../mocks/user.service.mocks';


chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

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
    sinon.stub(ProductsService, 'create').resolves(createdServiceResponse);
    // assert
    await ProductsController.create(req, res, next);

    // act
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductFromService);
  });

  it('Tests create function in case of invalid userID', async function () {
    // arrange
    req.body = invalidUserIdProduct;
    sinon.stub(UserModel, 'findByPk').resolves(null);
    sinon.stub(ProductsService, 'create').resolves(userNotFoundServiceResponse);
    // assert
    await ProductsController.create(req, res, next);

    // act
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'User not found'});
  });


  it('Tests create function in case of server error', async function () {
    // arrange
    const nextStub: SinonStub = sinon.stub();
    const error = new Error('Server error');
    req.body = newProduct;
    // const userMock = UserModel.build(validUserFromModel);
    sinon.stub(ProductsService, 'create').rejects(error);
    
    // act
    await ProductsController.create(req, res, nextStub);
    const errorMessage = nextStub.firstCall.args[0];
    // assert
    expect(nextStub).to.have.been.calledOnce;
    expect(nextStub).to.have.been.calledWith(error);
    expect(errorMessage).to.be.equal(error);
  });

  it('Tests update function in case of success', async function () {
    // arrange
    req.body = validProduct;
    sinon.stub(ProductsService, 'update').resolves(successfulServiceResponse);
    // assert
    await ProductsController.update(req, res, next);

    // act
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct);
  });

  it('Tests update function in case of invalid product', async function () {
    // arrange
    req.body = validProduct;
    sinon.stub(ProductsService, 'update').resolves(productNotFoundServiceResponse);
    // assert
    await ProductsController.update(req, res, next);

    // act
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});
  });

  it('Tests update function in case of server error', async function () {
    // arrange
    const nextStub: SinonStub = sinon.stub();
    const error = new Error('Server error');
    req.body = validProduct;
    // const userMock = UserModel.build(validUserFromModel);
    sinon.stub(ProductsService, 'update').rejects(error);
    
    // act
    await ProductsController.update(req, res, nextStub);
    const errorMessage = nextStub.firstCall.args[0];
    // assert
    expect(nextStub).to.have.been.calledOnce;
    expect(nextStub).to.have.been.calledWith(error);
    expect(errorMessage).to.be.equal(error);
  });

  it('Tests getAll function in case of success', async function () {
    // arrange
    sinon.stub(ProductsService, 'getAll').resolves(getAllSuccessfulServiceResponse);
    // assert
    await ProductsController.getAll(req, res, next);

    // act
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromServiceArray);
  });

  it('Tests getAll function in case of server error', async function () {
    // arrange
    const nextStub: SinonStub = sinon.stub();
    const error = new Error('Server error');
    // const userMock = UserModel.build(validUserFromModel);
    sinon.stub(ProductsService, 'getAll').rejects(error);
    
    // act
    await ProductsController.getAll(req, res, nextStub);
    const errorMessage = nextStub.firstCall.args[0];
    // assert
    expect(nextStub).to.have.been.calledOnce;
    expect(nextStub).to.have.been.calledWith(error);
    expect(errorMessage).to.be.equal(error);
  });
});
