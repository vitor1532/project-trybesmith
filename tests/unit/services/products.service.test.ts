import { expect, use } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import ProductService from '../../../src/services/products.service';
import { 
  invalidProduct,
  updatedProduct,
  validProduct,
  validProductFromModel,
  invalidUserIdProduct,
  newProduct,
  secondvalidProductFromModel,
} from '../../mocks/products.mocks';
import UserModel from '../../../src/database/models/user.model';
import { validUserFromModel } from '../../mocks/user.service.mocks';


describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  const NOT_FOUND = 'NOT_FOUND';
  const SUCCESS = 'SUCCESS';
  const CREATED = 'CREATED';
  const UNPROCESSABLE = 'UNPROCESSABLE';

  it('Test the create function in case of a invalid userId', async function() {
    //arrange

    sinon.stub(UserModel, 'findByPk').resolves(null);

    //act
    const serviceResponse = await ProductService.create(invalidUserIdProduct);

    //assert
    expect(serviceResponse.status).to.be.eq(UNPROCESSABLE);
    expect(serviceResponse.data).to.deep.equal({message: '"userId" not found'});
  });

  it('Test the create function in case of success', async function() {
    //arrange
    const userMock = UserModel.build(validUserFromModel);
    const productMock = ProductModel.build(newProduct);
    sinon.stub(UserModel, 'findByPk').resolves(userMock);
    sinon.stub(ProductModel, 'create').resolves(productMock);
    //act
    const serviceResponse = await ProductService.create(newProduct);

    //assert
    expect(serviceResponse.status).to.be.eq(CREATED);
    expect(serviceResponse.data).to.deep.equal(productMock.dataValues);
  });

  it('Test the update function in case of a invalid id', async function() {
    //arrange

    sinon.stub(ProductModel, 'findOne').resolves(null);

    //act
    const serviceResponse = await ProductService.update(invalidProduct);

    //assert
    expect(serviceResponse.status).to.be.eq(NOT_FOUND);
    expect(serviceResponse.data).to.deep.equal({message: 'Product not found'});
  });

  it('Test the update function in case of success', async function() {
    //arrange
    const productMock = ProductModel.build(validProductFromModel);
    const updatedMock = ProductModel.build(updatedProduct);
    const productSinon = sinon.stub(ProductModel, 'findOne');
    productSinon.onCall(0).resolves(productMock);
    productSinon.onCall(1).resolves(updatedMock);
    sinon.stub(ProductModel, 'update').resolves([1]);

    //act
    const serviceResponse = await ProductService.update(validProduct);

    Promise.all([serviceResponse]);

    //assert
    expect(serviceResponse.status).to.be.eq(SUCCESS);
    expect(serviceResponse.data).to.deep.equal(updatedProduct);
  });

  it('Test the getAll function in case of success', async function() {
    //arrange
    const productsMock = [
      ProductModel.build(validProductFromModel),
      ProductModel.build(secondvalidProductFromModel)
    ]
    sinon.stub(ProductModel, 'findAll').resolves(productsMock);

    //act
    const serviceResponse = await ProductService.getAll();

    Promise.all([serviceResponse]);

    //assert
    expect(serviceResponse.status).to.be.eq(SUCCESS);
    expect(serviceResponse.data).to.deep.equal([validProductFromModel, secondvalidProductFromModel]);
  });
});
